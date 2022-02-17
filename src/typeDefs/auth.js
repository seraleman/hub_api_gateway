/**
 * @constant gql @requires desde apollo-server [COnstante para poder declarar los type Defs]
 */
const { gql } = require('apollo-server')

/**
 * @constant authTypeDefs [Lista de todos los type defs de auth]
 */
const authTypeDefs = gql`
  type User {
    id: ID!
    date_of_birth: String!
    document: String!
    document_type: String!
    email: String!
    enabled: Boolean!
    entity: String!
    full_name: String!
    password: String!
    phoneNumber: String!
    position: String!
    role: String!
  }

  type Token {
    refresh: String!
    access: String!
  }

  type Access {
    access: String!
  }

  input disableEnableUserInput {
    date_of_birth: String!
    document: String!
    document_type: String!
    email: String!
    enabled: Boolean!
    entity: String!
    full_name: String!
    password: String!
    phoneNumber: String!
    position: String!
    role: String!
  }

  input CredentialsInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    date_of_birth: String!
    document: String!
    document_type: String!
    email: String!
    entity: String!
    full_name: String!
    password: String!
    phoneNumber: String!
    position: String!
    role: String!
  }

  input UpdateInput {
    date_of_birth: String!
    document: String!
    document_type: String!
    email: String!
    entity: String!
    full_name: String!
    password: String!
    phoneNumber: String!
    position: String!
    role: String!
  }

  input RegisterUser {
    date_of_birth: String!
    document: String!
    document_type: String!
    email: String!
    entity: String!
    full_name: String!
    phoneNumber: String!
    position: String!
  }

  type Query {
    userDetailById(userIdInput: ID!): User!
  }

  type Mutation {
    disableUnableUser(
      userIdInput: ID!
      userInput: disableEnableUserInput!
    ): User!
    logIn(credentialsInput: CredentialsInput!): Token!
    refreshToken(refreshInput: String!): Access!
    signUpUser(userInput: SignUpInput!): Token!
    updateUser(userIdInput: ID!, userInput: UpdateInput!): User!

    # Mutación destinada al registro del usuario sin loguin
    registerUser(userInput: RegisterUser!): Token!
  }
`

/**
 * @const {Object} authTypeDefs [exporta la constante para que
 *  sus typeDefs estén disponibles]
 */
module.exports = authTypeDefs
