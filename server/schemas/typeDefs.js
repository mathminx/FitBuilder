const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedWorkouts: [Workout]
  }

  type Workout {
      _id: ID
      name: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(username: String, email: String, password: String): Auth
  }

  input SaveWorkout {
  }
`;

module.exports = typeDefs;
