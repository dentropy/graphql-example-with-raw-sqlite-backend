# graphql-crash-course with better-sqlite3 data backend

## Attribution

Extension of [iamshaunjp/graphql-crash-course at lesson-9](https://github.com/iamshaunjp/graphql-crash-course/tree/lesson-9)

## TODO

* Add type in schema and write resolver fod said type for each table in sqlite database
* Figure out arguments so the database can be sorted or get individual records
* Write example join query for sqlite database and put it in README
* Update the schema.js so the types can look up one another on the graph

## Instructions

``` bash
npm install
node dbInit.js
node index.js
```

## Queries

``` graphql
query Query {
  customer {
    customer_id
    email
    first_name
    last_name
  }
}
```

``` graphql
query Order {
  order {
    customer_id
    order_date
    order_id
  }
}
```

``` graphql
query Product {
  product {
    price
    product_id
    product_name
  }
}
```

``` graphql
query Query {
  product {
    price
    product_id
    product_name
    orders {
      customer_id
      order_date
      order_id
    }
  }
}
```

## Get Prisma Working

``` bash
npm install typescript ts-node @types/node --save-dev
npx tsc --init
npm install prisma --save-dev
npx prisma init --datasource-provider sqlite

cp db.sqlite prisma/dev.db

npx prisma db pull
```

* [Quickstart with TypeScript & SQLite](https://www.prisma.io/docs/getting-started/quickstart)
* [Introspection | typescript-postgresql](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-postgresql)