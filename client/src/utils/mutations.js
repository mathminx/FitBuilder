import { gql } from "@apollo/client";

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
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_PROGRAM = gql`
  mutation AddProgram($userId: ID!, $title: String!, $workouts: [ID]!, $weeks: Int!, $days: Int! ) {
    AddProgram(userId: $userId, title: $title, workouts: $workouts, weeks: $weeks, days: $days) {
      _id
      title
      current
      duration
      daysPerWeek
      workouts {
        _id
          name
          dayNumber
          complete
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

export const REMOVE_PROGRAM = gql`
  mutation RemoveProgram($programId: ID!) {
    RemoveProgram(programId: $programId) {
      _id
      success
    }
  }
`;

export const UPDATE_PROGRAM = gql`
  mutation AddProgram(
    $title: String!
    $workouts: [ID]!
    $weeks: Int!
    $days: Int!
  ) {
    AddProgram(title: $title, workouts: $workouts, weeks: $weeks, days: $days) {
      title
      current
      duration
      daysPerWeek
      workouts {
        _id
          name
          dayNumber
          complete
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

// add workout to program
export const ADD_WORKOUT = gql`
  mutation AddWorkout($programId: ID!, $workouts: [ID]!) {
    addWorkout(programId: $programId, workouts: $workouts) {
      _id
      title
      current
      duration
      daysPerWeek
      workouts {
        _id
        name
        dayNumber
        complete
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

export const REMOVE_WORKOUT = gql`
  mutation RemoveWorkout($programId: ID!, $workoutId: ID!) {
    RemoveWorkout(programId: $programId, workoutId: $workoutId) {
      _id
      success
    }
  }
`;

export const UPDATE_WORKOUT = gql`
  mutation UpdateWorkout(
    $title: String!
    $exerciseId: ID!
    $muscle: String!
    $reps: Int
    $sets: Int
    $description: String!
  ) {
    UpdateWorkout(
      title: $title
      exerciseId: $exerciseId
      muscle: $muscle
      reps: $reps
      sets: $sets
      description: $description
    ) {
      _id
      name
      dayNumber
      complete
      exercise {
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
`;

export const ADD_EXERCISE = gql`
  mutation AddExercise(
    $workoutId: ID!
    $exerciseId: ID!
    $muscle: String!
    $reps: Int
    $sets: Int
    $description: String!
  ) {
    AddExercise(
      workoutId: $workoutId
      exerciseId: $exerciseId
      muscle: $muscle
      reps: $reps
      sets: $sets
      description: $description
    ) {
      _id
      name
      exercise {
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
`;

// This is the one messing things up!!
// export const UPDATE_EXERCISE = gql`
//   mutation UpdateExercise($exerciseId: ID!, $muscle: String!, $reps: Int, $sets: Int, $description: String!) {
//    UpdateExercise($exerciseId: $exerciseId, muscle: $muscle, reps: $reps, sets: $sets, description: $description) {
//       _id
//       name
//       exercise {
//         _id
//         name
//         equipment
//         diffculty
//         description
//         sets
//         reps
//         weight
//         muscle
//         duration
//       }
//    }
//   }
// `;

export const REMOVE_EXERCISE = gql`
  mutation UpdateExercise(
    $workoutId: ID!
    $exerciseId: ID!
    $muscle: String!
    $reps: Int
    $sets: Int
    $description: String!
  ) {
    UpdateExercise(
      workoutId: $workoutId
      exerciseId: $exerciseId
      muscle: $muscle
      reps: $reps
      sets: $sets
      description: $description
    ) {
      _id
      name
      exercise {
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
`;
