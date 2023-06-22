import { gql } from "@apollo/client";

// TODO: write requried queries.

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedWorkouts {
        _id
        name
        exercises {
          _id
          name
          sets
          reps
        }
      }
    }
  }
`;
