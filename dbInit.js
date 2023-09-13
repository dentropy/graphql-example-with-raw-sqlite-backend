import sqlite from 'better-sqlite3';

let populate_data = `
-- Create the 'customers' table
CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT
);

-- Create the 'products' table
CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY,
    product_name TEXT,
    price REAL
);

-- Create the 'orders' table
CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Insert data into the 'customers' table
INSERT INTO customers (first_name, last_name, email)
VALUES
    ('John', 'Doe', 'john.doe@example.com'),
    ('Jane', 'Smith', 'jane.smith@example.com'),
    ('Bob', 'Johnson', 'bob.johnson@example.com');

-- Insert data into the 'products' table
INSERT INTO products (product_name, price)
VALUES
    ('Widget A', 19.99),
    ('Widget B', 29.99),
    ('Widget C', 39.99);

-- Insert data into the 'orders' table
INSERT INTO orders (customer_id, order_date)
VALUES
    (1, '2023-09-13'),
    (2, '2023-09-14'),
    (3, '2023-09-15');
`
const db = new sqlite("./db.sqlite");
await db.exec(populate_data);
let query  = await db.prepare(`SELECT * FROM orders;`).all();
console.log(query)