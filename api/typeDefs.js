const { gql } = require('apollo-server-express')

module.exports = gql`
  scalar JSON

  type User {
    id: ID!
    active: Boolean!
    username: String!
    name: String!
    stats: JSON
    verified: Boolean!
    verifiedAt: String
    createdAt: String
    updatedAt: String
  }

  type Depense {
    id: ID!
    name: String!
    notes: String
    amount: Float
    convertedAmount: Float
    date: String
    currency: Currency
    category: Category
    createdAt: String
    updatedAt: String
    createdBy: User
    updatedBy: User
  }

  type Rate {
    id: ID!
    amount: Float!
    currencyTo: Currency!
  }

  type Currency {
    id: ID!
    name: String!
    abbreviation: String
    isPrimary: Boolean
    rates: [Rate]
    createdAt: String
    updatedAt: String
    createdBy: User
    updatedBy: User
  }

  type Category {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
    createdBy: User
    updatedBy: User
  }

  type AuthData {
    userId: ID!
    token: String!
    refreshToken: String!
  }

  input RateInput {
    currencyTo: ID!
    amount: Float!
  }

  type Query {
    me: User
    user(id: ID!): User
    # me @client: User
    users: [User!]!
    userCounts: JSON
    # user(id: ID!): User
    # DEPENSES
    depenses(monthDate: String, categoryId: ID): [Depense!]!
    depense(id: ID!): Depense
    # CURRENCIES
    currencies: [Currency!]!
    currency(id: ID!): Currency
    # CATEGORIES
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    # USERS
    createAccount(name: String, username: String!, password: String!): String!
    updateProfile(name: String, newPassword: String, oldPassword: String, username: String): User
    verifyCode(username: String!, code: String!): AuthData!
    # deleteUser(id: ID!): User
    # AUTH STRATEGY
    logUserIn(username: String!, password: String!): AuthData!
    # refreshTokens(token: String! refreshToken: String!): AuthData!
    # DEPENSES
    createDepense(name: String!, notes: String, amount: Int, currencyId: ID!, categoryId: ID, date: String): Depense
    updateDepense(
      id: ID!
      name: String
      notes: String
      amount: Int
      currencyId: ID
      categoryId: ID
      date: String
    ): Depense
    deleteDepense(id: ID!): Depense
    # CURRENCIES
    createCurrency(name: String!, abbreviation: String!, isPrimary: Boolean, rates: [RateInput]): Currency
    updateCurrency(id: ID!, name: String, abbreviation: String, isPrimary: Boolean, rates: [RateInput]): Currency
    deleteCurrency(id: ID!): Currency
    # CATEGORIES
    createCategory(name: String!): Category
    updateCategory(id: ID!, name: String): Category
    deleteCategory(id: ID!): Category
  }
`;
