-- Database name
CREATE DATABASE Bamazon;
USE Bamazon;

-- 'products' table with inventory --
CREATE TABLE products (
	item_id INTEGER(15) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(15) NOT NULL,
	PRIMARY KEY (item_id)
);

-- 'products' table data --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Marantz Tape deck', 'electronics', 500.00, 5),
		('X-box', 'electronics', 299.99, 1300),
		('Mackie blue tooth speakers', 'electronics', 69.99, 50),
		('xv-88', 'electronics', 2199.00, 2),
		('onewheel', 'electronics', 1875.99, 120),
		('Paper towels', 'cleaning', 0.99, 100000),
		('broom', 'cleaning', 12.45, 322),
		('ugly mop', 'cleaning', 19.99, 123),
		('sponge', 'cleaning', 0.99, 10000),
		('spicnspan', 'cleaning', 2.99, 765),
		('andy cap fries', 'food', 1.50, 4123),
		('pear', 'food', 0.75, 1500),
		('lamb chop', 'food', 5.99, 891),
		('apple', 'food', 0.75, 200),
		('banana', 'food', 0.99, 250),
		('chicken noodle soup', 'food', 0.99, 517),
		('doggie good bones', 'pets', 2.50, 76),
		('fancy beast', 'pets', 12.95, 536),
		('Gorilla Glue', 'hardware', 6.99, 515),
		('nails', 'hardware', 20.50, 531);
        