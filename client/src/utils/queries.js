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
  query Programs {
    programs {
      _id
      title
      weeks
      days
    }`;

export const GET_SINGLE_PROGRAM = gql`
  query Program($id: ID!) {
    program(_id: $id) {
      daysPerWeek
      duration
      title
      current
      duration
      daysperWeek
      workouts {
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
  query Exercise($id: ID!) {
    exercise(_id: $id) {
      _id
      difficulty
      duration
      equipment
      instructions
      name
      reps
      sets
      type
      weight
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

export const GET_WORKOUTS = gql`
  query Workouts {
    workouts {
      _id
      name
      exercises {
        _id
        difficulty
        duration
        equipment
        instructions
        name
        reps
        sets
        type
        weight
      }
    }
  }
`;

export const GET_WORKOUT = gql`
  query GetWorkout($id: ID!) {
    workout(id: $id) {
      id
      name
      duration
      intensity
    }
  }
`;

