import { gql } from "@apollo/client";

// TODO: write requried queries.

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      programs {
        _id
        name
        current
        duration
        daysPerWeek
        workouts {
          _id
          name
          dayNumber
          exercises {
            _id
            name
            equipment
            difficulty
            description
            sets
            reps
            weight
            muscle
            duration
          }
        }
      }
    }
  }
`;

export const GET_ALL_PROGRAMS = gql`
  query GetAllPrograms {
    programs {
      _id
      title
      current
      duration
      daysPerWeek
    }
  }
`;

export const GET_SINGLE_PROGRAM = gql`
  query GetSinglePrograms {
    programs {
      _id
      title
      current
      duration
      daysperWeek
      workouts {
        _id
        name
        dayNumber
        exercises {
          _id
          name
          equipment
          difficulty
          description
          sets
          reps
          weight
          muscle
          duration
        }
      }
    }
  }
`;

export const GET_SINGLE_EXERCISE = gql`
  query GetSingleExercise($exerciseId: ID!) {
    exercises(id: $exerciseId) {
      _id
      name
      equipment
      difficulty
      description
      sets
      reps
      weight
      muscle
      duration
    }
  }
`;

export const GET_EXERCISES = gql`
  query GetExercises {
    exercises {
      _id
      name
      equipment
      difficulty
      description
      sets
      reps
      weight
      muscle
      duration
    }
  }
`;
