var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
var stars = "\n*********************************\n".rainbow;

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
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | "
                + res[i].product_name + " | "
                + res[i].department_name + " | "
                + res[i].price + " | "
                + res[i].stock_quantity + " | ");
        }
        console.log(stars);
        if (err) throw err;
     
        promptBuyer();
    });
}

// function which asks the user the ID of the product they would like to buy
// Also asks how much of the product they would like to buy.
function promptBuyer() {
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
            var productId = answer.id;
            var productQuantity = answer.quantity;
            buyer(productId, productQuantity);
        })
}

// Check to see if there is enough product to fulfill order
function buyer(prodId, productQuantity) {
    connection.query("SELECT * FROM products WHERE item_id = " + prodId, function (err, res) {
        if (err) throw err;
        console.log(res);
    })
    connection.end();
}
// If not enough, prompt "insufficient quantity", prevent  order from going through

// If store does have enough product, decrease quantity by correct amount and reflect remaining amount

// Add user purchases and show total at checkout

