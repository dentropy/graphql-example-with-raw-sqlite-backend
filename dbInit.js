import sqlite from 'better-sqlite3';
import fs from 'fs';

let date1 = new Date('2023-09-15T00:00:00Z')
let date2 = new Date('2023-09-14T00:00:00Z')
let date3 = new Date('2023-09-13T00:00:00Z')


/* 

I use Unix Timestamps for DateTime cause that is what Prisma requires

[Use Prisma with an SQLite DATETIME datatype | Yet another developer blog](https://boxman.dev/blog/use-prisma-with-an-sq-lite-datetime-datatype)

*/
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
    (1, '${Math.floor(date1.getTime() / 1000)}'),
    (2, '${Math.floor(date2.getTime() / 1000)}'),
    (3, '${Math.floor(date3.getTime() / 1000)}');
`
let db_file_name = "./dev.db"
if(fs.existsSync(db_file_name)){
    await fs.unlinkSync(db_file_name)
}
const db = new sqlite(db_file_name);
await db.exec(populate_data);
let query  = await db.prepare(`SELECT * FROM orders;`).all();
console.log(query)