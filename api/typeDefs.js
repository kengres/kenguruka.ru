const { gql } = require('apollo-server-express')

module.exports = gql`
  type User {
    id: ID!
    active: Boolean
    email: String
    name: String
    verified: Boolean!
    role: Int!
    createdAt: String
    updatedAt: String
  }

  type Depense {
    id: ID!
    name: String!
    notes: String
    amount: Int
    displayedAmount: String
    date: String
    currency: Currency
    category: Category
    createdAt: String
    updatedAt: String
    createdBy: User
    updatedBy: User
  }

  type Currency {
    id: ID!
    name: String!
    abbreviation: String
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

  type Query {
    # me: User
    # users: [User!]!
    # user(id: ID!): User
    # DEPENSES
    depenses: [Depense!]!
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
    # createUser(name: String! password: String! email: String! role: Int! active: Boolean!): User
    # updateUser(id: ID! name: String password: String email: String role: Int active: Boolean verified: Boolean): User
    # updateProfile(name: String newPassword: String oldPassword: String email: String): User
    # deleteUser(id: ID!): User
    # AUTH STRATEGY
    # logUserIn(email: String! password: String!): AuthData!
    # refreshTokens(token: String! refreshToken: String!): AuthData!
    # DEPENSES
    createDepense(
      name: String!
      notes: String
      amount: Int
      currencyId: ID!
      categoryId: ID
    ): Depense
    updateDepense(
      id: ID!
      name: String
      notes: String
      amount: Int
      currencyId: ID
      categoryId: ID
    ): Depense
    deleteDepense(id: ID!): Depense
    # CURRENCIES
    createCurrency(name: String!, abbreviation: String!): Currency
    updateCurrency(id: ID!, name: String, abbreviation: String): Currency
    deleteCurrency(id: ID!): Currency
    # CATEGORIES
    createCategory(name: String!): Category
    updateCategory(id: ID!, name: String): Category
    deleteCategory(id: ID!): Category
  }
`;
