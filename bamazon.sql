DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Electronics", 150.66, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent", "Outdoors", 350.86, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LED lights", "Electronics", 50.35, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beach Cruiser", "Sports", 200.50, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blender", "Kitchen", 100.00, 43);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Knives", "Kitchen", 80.75, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rainbow TuTu", "Womens Accessories", 25.50, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Glitter", "Hair and Makeup", 10, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Camera", "Electronics", 320.69, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Barbi", "Kids Toys", 20.45, 48);


