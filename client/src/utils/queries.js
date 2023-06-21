import { gql } from "@apollo/client";

// TODO: write requried queries.

//example:
// export const QUERY_SINGLE_PROFILE = gql`
//   query singleProfile($profileId: ID!) {
//     profile(profileId: $profileId) {
//       _id
//       name
//       skills
//     }
//   }
// `;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedWorkouts {
      }
    }
  }
`;