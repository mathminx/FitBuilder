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

export const ADD_PROGRAM = gql`
  mutation AddWorkout {
    # Add your fields and logic for adding a workout
  }
`;

export const REMOVE_PROGRAM = gql`
  mutation AddWorkout {
    # Add your fields and logic for adding a workout
  }
`;

export const ADD_WORKOUT = gql`
  mutation AddWorkout {
    # Add your fields and logic for adding a workout
  }
`;

export const REMOVE_WORKOUT = gql`
  mutation RemoveWorkout {
    # Add your fields and logic for removing a workout
  }
`;

export const UPDATE_WORKOUT = gql`
  mutation UpdateWorkout {
    # Add your fields and logic for updating a workout
  }
`;

export const ADD_EXERCISE = gql`
  mutation AddExercise {
    # Add your fields and logic for adding an exercise
  }
`;
