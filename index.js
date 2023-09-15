import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import sqlite from 'better-sqlite3';

// data
import db from './_db.js'
const real_db = new sqlite("./dev.db");
// types
import { typeDefs } from './schema.js'

// resolvers
const resolvers = {
  Query: {
    // async customer() {
    //   return await real_db.prepare(`SELECT * FROM customers;`).all();
    // },
    async customer(_, { orderBy }) {
      console.log(orderBy)
      if (orderBy) {
        // let sortedBooks = [...booksData];
        // const { field, direction } = orderBy;
        // sortedBooks.sort((a, b) => {
        //   if (direction === OrderByDirection.ASC) {
        //     return a[field] > b[field] ? 1 : -1;
        //   } else {
        //     return a[field] < b[field] ? 1 : -1;
        //   }
        // });
        return await real_db.prepare(`SELECT * FROM customers ORDER BY ${orderBy.field} ${orderBy.direction};`).all();

      } else {
        return await real_db.prepare(`SELECT * FROM customers;`).all();
      }
      return await real_db.prepare(`SELECT * FROM customers ORDER BY ${field} ${OrderByDirection.ASC};`).all();
    },
    async order() {
      return await real_db.prepare(`SELECT * FROM orders;`).all();
    },
    async product() {
      return await real_db.prepare(`SELECT * FROM products;`).all();
    },
    games() {
      return db.games
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id)
    },
    authors() {
      return db.authors
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id)
    },
    reviews() {
      return db.reviews
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id)
    }
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id)
    }
  },
  Review: {
    author(parent) {
      return db.authors.find((a) => a.id === parent.author_id)
    },
    game(parent) {
      return db.games.find((g) => g.id === parent.game_id)
    }
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id)
    }
  },
  Mutation: {
    addGame(_, args) {
      let game = {
        ...args.game, 
        id: Math.floor(Math.random() * 10000).toString()
      }
      db.games.push(game)

      return game
    },
    deleteGame(_, args) {
      db.games = db.games.filter((g) => g.id !== args.id)

      return db.games
    },
    updateGame(_, args) {
      db.games = db.games.map((g) => {
        if (g.id === args.id) {
          return {...g, ...args.edits}
        }

        return g
      })

      return db.games.find((g) => g.id === args.id)
    }
  },
  Customer : {
    async orders(parent) {
      return await real_db.prepare(`SELECT * FROM orders where customer_id = '${parent.customer_id}';`).all();
    }
  },
  Order : {
    async customers(parent) {
      return await real_db.prepare(`SELECT * FROM customer where customer_id = '${parent.customer_id}';`).all();
    },
    async products(parent) {
      return await real_db.prepare(`SELECT * FROM products where product_id = '${parent.product_id}';`).all();
    }
  },
  Product : {
    async orders(parent) {
      return await real_db.prepare(`SELECT * FROM orders where order_id = '${parent.order_id}';`).all();
    }
  }
}

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`Server ready at: ${url}`)