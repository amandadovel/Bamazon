var mysql = require("mysql");
var inquirer = require("inquirer");

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
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i ++) {
            console.log(res[i].item_id + " | " 
            + res[i].product_name + " | " 
            + res[i].department_name +  " | "  
            + res[i].price + " | "
            + res[i].stock_quantity + " | " );
        }
        if (err) throw err;
        connection.end();
    });
}

// function which asks the user the ID of the product they would like to buys

// function which asks how many unite of the product they would like to buy

// Once customer has placed order, check to see if there is enough product to fulfill order

// If not enough, prompt "insufficient quantity", prevent order from going through

// If store does have enough product, decrease quantity by correct amount and reflect remaining amount

// Add user purchases and show total at checkout

