import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      programs {
        _id
        name
        duration
        daysPerWeek
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
          duration
        }
      }
    }
  }
`;

export const GET_ALL_PROGRAMS = gql`
  query Programs {
    programs {
      _id
      title
      duration
      daysPerWeek
    }
  }
`;

export const GET_SINGLE_PROGRAM = gql`
  query Program($id: ID!) {
    program(_id: $id) {
      daysPerWeek
      duration
      title
      creator {
        _id
        username
      }
      workouts {
        name
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
        duration
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
      diffculty
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
      duration
    }
  }
`;
