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
        title
        weeks
        days
        workouts {
          _id
          name
        exercises {
          _id
          name
          equipment
          diffculty
          description
          sets
          reps
          weight
          muscle
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
      weeks
      days
    }`;

export const GET_SINGLE_PROGRAM = gql`
  query GetSinglePrograms {
    programs {
      _id
      title
      weeks
      days
      workouts {
        _id
        name
        exercises {
          _id
          name
          equipment
          diffculty
          description
          sets
          reps
          weight
          muscle
        }
      }
    }
  }
`;

export const GET_SINGLE_WORKOUT = gql`
  query GetSingleWorkout($workoutId: ID!) {
    workout(id: $workoutId) {
      _id
      name
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
      }
    }
  }
`;

export const GET_SINGLE_EXERCISE = gql`
  query GetSingleExercise($exercsieId: ID!) {
    exercises(id: $exerciseId) {
      _id
      name
      equipment
      diffculty
      description
      sets
      reps
      weight
      muscle
    }
  }
`;

export const GET_EXERCISEs = gql`
  query GetSingleExercise {
    exercises {
      _id
      name
      equipment
      diffculty
      description
      sets
      reps
      weight
      muscle
    }
  }
`;