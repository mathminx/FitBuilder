import { gql } from "@apollo/client";

// TODO: Add mutations for adding a workout and individual exercises.

export const LOGIN_USER = gql`
  mutation loginUser($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String, $email: String, $password: String) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;

export const ADD_WORKOUT = gql`
`;

export const REMOVE_WORKOUT = gql`
`;

export const UPDATE_WORKOUT = gql`
`;

export const ADD_EXERCISE = gql`
`;