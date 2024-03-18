-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

USE ecommerce_db;

CREATE TABLE category (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category_name STRING NOT NULL
);

CREATE TABLE product (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_name STRING NOT NULL,
    price DECIMAL NOT NULL, --Validates that the value is a decimal
    stock INT NOT NULL, --Set a default value of 10, Validates that the value is numeric
    category_id INT, 
    FOREIGN KEY (category_id) REFERENCES product(id)
);

CREATE TABLE tag (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tag_name STRING,
);

CREATE TABLE productTag (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    product_id INT, 
    tag_id INT, 
    FOREIGN KEY (product_id) REFERENCES productTag(id)
    FOREIGN KEY (tag_id) REFERENCES productTag(id)
);
