var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var Table = require('cli-table');
var emoji = require('node-emoji');
var stars = "\n****************************************************************\n".rainbow;
var products;

// create connection information for mysql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB"
});

// connect to mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    start();
});

// Running this application will first display all of the items available for sale. 
// Include the ids, names, and prices of products for sale.

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log(stars);
        console.log(colors.bold(colors.cyan("              $$$ WELCOME TO BAMAZON! $$$")));
        console.log(colors.bold(colors.green(`


        <>=======() 
        (/\___   /|\\          ()==========<>_
              \_/ | \\        //|\   ______/ \)
                \_|  \\      // | \_/
                  \|\/|\_   //  /\/
                   (oo)\ \_//  /
                  //_/\_\/ /  |
                 @@/  |=\  \  |
                      \_=\_ \ |
                        \==\ \|\_
                     __(\===\(  )\

                (((~) __(_/   |
                    (((~) \  /
                    ______/ /
                    '------'
                        

                         `)))
        products = res;
        var table = new Table({
            head: [colors.bold(colors.magenta('ID')), colors.bold(colors.magenta('Product Name')), colors.bold(colors.magenta('Department')), colors.bold(colors.magenta('Price')), colors.bold(colors.magenta('Quantity'))]
        });
        
        for (var i = 0; i < res.length; i++) {
            table.push([
                colors.blue(res[i].item_id),
                colors.cyan(res[i].product_name),
                res[i].department_name,
                colors.cyan(res[i].price),
                colors.blue(res[i].stock_quantity)
            ])
        }
        console.log(table.toString())
        console.log(stars);
        if (err) throw err;
        promptId();
    });
}

// function which asks the user the ID of the product they would like to buy
// Also asks how much of the product they would like to buy.
function promptId() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the ID of the product you would like to buy?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How much of the product would you like to purchase?"
        }

    ])
        .then(function (answer) {
            var productId = parseInt(answer.id);
            var productQuantity = parseInt(answer.quantity);
            validateQuantity(productId, productQuantity);
        })
}

// Check to see if there is enough product to fulfill order
function validateQuantity(id, quantity) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].item_id === id) {
            if (products[i].stock_quantity >= quantity) {
                var newStock = products[i].stock_quantity - quantity;
                var price = products[i].price;
                var name = products[i].product_name;
                updateProduct(id, newStock, quantity, price, name);
            } else {
                console.log(colors.bold(colors.red("Sorry, there is not enough stock for your order!")));
                buyAgain();
            }
        }
    }
}

// If store does have enough product, decrease quantity by correct amount and reflect remaining amount
// Add user purchases and show total at checkout
function updateProduct(id, newStock, quantity, price, name) {
    connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: newStock
    }, {
        item_id: id
    }], function(err, res){
        if (err) throw err;
        if(res.changedRows === 1) {
            console.log(stars);
            console.log(colors.cyan("Product:"), name);
            console.log(colors.blue("Quantity:"), quantity);
            console.log(colors.cyan("Sub-Total:"), "$" + (quantity * price));
            console.log(stars);
            console.log(colors.green("\n**** Thank you for shopping at BAMAZON! ****\n"));
            console.log(stars);
            buyAgain();
        } else {
            console.log(colors.bold(colors.red("Uh oh! Something went wrong!")));
            console.log(colors.bold(colors.rainbow("-----------------------------")));
            console.log(colors.bold(colors.magenta("Please try again.")));
            start();
        }
    })
}

function buyAgain() {
    inquirer.prompt({
        type: "confirm",
        message: "Would you like to buy another product?",
        name: "buyAgain"
    })
        .then(function(res){
            if(res.buyAgain) {
                start();
            } else {
                console.log("\nCome again soon!\n", emoji.get('star-struck'));
                connection.end();
            }
        })
}

