export const typeDefs = `#graphql
  type Customer {
    customer_id: Int!,
    first_name: String!
    last_name: String!
    email: String!,
    orders: [Order!]
  }
  type Product {
    product_id: Int!,
    product_name: String!
    price: Int!,
    # orders: [Order!]
  }
  type Order {
    order_id: Int!,
    customer_id: Int!
    order_date: String!
    # customers: [Customer!]
    # product: [Product!]
  }


  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    author: Author!
    game: Game!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }
  type Query {
    customer: [Customer]
    order: [Order]
    product: [Product]


    games: [Game]
    game(id: ID!): Game
    reviews: [Review]
    review(id: ID!): Review
    authors: [Author]
    author(id: ID!): Author
  }
  type Mutation {
    addGame(game: AddGameInput!): Game
    deleteGame(id: ID!): [Game]
    updateGame(id: ID!, edits: EditGameInput): Game
  }
  input AddGameInput {
    title: String!,
    platform: [String!]!
  }
  input EditGameInput {
    title: String,
    platform: [String!]
  }
`