CREATE DATABASE delilah_resto_db;

USE delilah_resto_db;

CREATE TABLE Users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_lastname VARCHAR(255) NOT NULL,
    user_mail VARCHAR(255) NOT NULL,
    user_phone BIGINT,
    user_address VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_active BOOLEAN NOT NULL,
    user_admin BOOLEAN NOT NULL
);

CREATE TABLE Orders(
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    order_time TIME NOT NULL,
    order_state ENUM('new','cooking','confirmed','sending','canceled','delivered'),
    order_description VARCHAR(255) NOT NULL,
    order_form_payment ENUM('cash','card'),
    order_total_price DOUBLE(40,2) NOT NULL,
    order_id_user INT NOT NULL,
    FOREIGN KEY(order_id_user) REFERENCES Users(user_id)
);

CREATE TABLE Products(
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    product_price DOUBLE(40,2) NOT NULL,
    product_description VARCHAR(255) NOT NULL,
    product_stock INT NOT NULL
);  

CREATE TABLE Order_detail(
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT,
    FOREIGN KEY(order_id) REFERENCES Orders(order_id),
    FOREIGN KEY(product_id) REFERENCES Products(product_id)
);