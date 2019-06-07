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
    beginningPrompt();
});

// Prompt that asks user what they would like to do
function beginningPrompt() {
    inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: emoji.get('crescent_moon') + colors.blue( " What would you like to do?"),
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]

        }

        // Answer function with switch case for response from user 
    ]).then(function (answer) {
        switch (answer.select) {
            case "View Products for Sale":
                start();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addPrompt();
                break;
            case "Add New Product":
                productPrompt();
                break;
            case "Quit":
                connection.end();
        }
    })
}

// Start prompt shows table when user selects 'View products for Sale'
function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log(stars);
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
        // console.log(res);
        console.log(table.toString())
        console.log(stars);
        if (err) throw err;
        beginningPrompt();

    });
}

// function for when user selects 'View low inventory'
function lowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log(stars);
        products = res;
        var table = new Table({
            head: [colors.bold(colors.magenta('ID')), colors.bold(colors.magenta('Product Name')), colors.bold(colors.magenta('Department')), colors.bold(colors.magenta('Price')), colors.bold(colors.magenta('Quantity'))]
        });

        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                table.push([
                    colors.blue(res[i].item_id),
                    colors.cyan(res[i].product_name),
                    res[i].department_name,
                    colors.cyan(res[i].price),
                    colors.blue(res[i].stock_quantity)
                ])
            }
        }

        console.log(table.toString())
        console.log(stars);
        if (err) throw err;
        beginningPrompt();

    });
}

function addPrompt() {
    connection.query("SELECT * FROM products", function (err, res) {
        products = res;
        inquirer.prompt([
            {
                name: "product",
                type: "list",
                message: colors.green("Which product would you like to update?"),
                choices: function () {
                    var choiceArr = [];
                    for (var i = 0; i < res.length; i++) {
                        choiceArr.push(res[i].product_name);
                    }
                    return choiceArr;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: colors.green("How much of the product would you like to add to the inventory?")
            }

        ]).then(function (answer) {
            //    console.log(answer.product);
            //    console.log(answer.quantity); 
            var chosenProduct = answer.product;
            var chosenQuantity = parseInt(answer.quantity);
            addInventory(chosenProduct, chosenQuantity)
        })
    });
}

function addInventory(product, quantity) {

    for (var i = 0; i < products.length; i++) {
        if (products[i].product_name === product) {
            var newQuantity = products[i].stock_quantity + quantity
        }
    }

    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newQuantity
            },
            {
                product_name: product
            }
        ],
        function (err) {
            if (err) throw err;
            console.log(stars);
            console.log(colors.magenta("Product successfully updated!", emoji.get('boom')));
            console.log(stars);
            beginningPrompt();
        }
    )
}
function productPrompt() {
    inquirer.prompt([
        {
            name: "newProduct",
            type: "input",
            message: emoji.get('star') + colors.green(" What is the product you would like to add to the store?",),
        },
        {
            name: "department",
            type: "list",
            message: emoji.get('star') + colors.green(" Which department does this product belong?"),
            choices: ["Electronics", "Outdoors", "Sports", "Kitchen", "Womens Accessories", "Hair and Makeup"]
        },
        {
            name: "price",
            type: "input",
            message: emoji.get('moneybag') + colors.green(" What is the price of the product?"),
        },
        {
            name: "productQuantity",
            type: "input",
            message: emoji.get('star') + colors.green(" Enter the quantity of the product you would like to add: "),
        }
    ]).then(function (answer) {
        var newProduct = answer.newProduct;
        var newDept = answer.department;
        var newPrice = answer.price;
        var newQuantity = answer.productQuantity;
        addProduct(newProduct, newDept, newPrice, newQuantity);
    })
}
function addProduct(product, department, price, quantity) {
    connection.query("INSERT INTO products SET ? ",{
        product_name: product,
        department_name: department,
        price: price,
        stock_quantity: quantity
    }, function(err, res) {
        if(err) throw err;
        console.log(stars);
        console.log(colors.magenta("Product successfully added to inventory!", emoji.get('boom')));
        console.log(stars);
        beginningPrompt();
    }
    )
}
