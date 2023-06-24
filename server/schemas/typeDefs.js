const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    programs: [Program]
    activeProgram: Program
  }

  type Program {
    _id: ID
    title: String
    creator: User
    workouts: [Workout]
    duration: Int
    daysPerWeek: Int
  }

  type Workout {
    _id: ID
    name: String
    exercises: [Exercise]
  }

  type Exercise {
    _id: ID
    name: String
    type: String
    equipment: String
    difficulty: String
    instructions: String
    sets: Int
    reps: Int
    weight: Float
    duration: Int
  }

  type Query {
    me: User
    programs: [Program]
    workouts: [Workout]
    exercises: [Exercise]
    user(_id: ID!): User
    program(_id: ID!): Program
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(username: String, email: String, password: String): Auth

    addProgram(
      title: String!
      creator: ID!
      daysPerWeek: Int!
      duration: Int!
    ): Program
    removeProgram(programId: ID!): Program
    updateProgram(
      programId: ID!
      title: String
      daysPerWeek: Int
      duration: Int
      workouts: [ID]
    ): Program

    addWorkout(programId: ID!, name: String!): Program!
    removeWorkout(programId: ID!, workout: ID!): Program
    updateWorkout(workoutId: ID!, name: String): Workout

    addExercise(workoutId: ID!, exercise: ExerciseInput!): Workout
    removeExercise(workoutId: ID!, exercise: ID!): Workout
    updateExercise(
      exerciseId: ID!
      name: String
      type: String
      equipment: String
      difficulty: String
      instructions: String
      sets: Int
      reps: Int
      weight: Float
      duration: Int
    ): Exercise
  }

  input WorkoutInput {
    name: String!
    exercises: [ID!]!
  }

  input ExerciseInput {
    name: String!
    type: String
    equipment: String
    difficulty: String
    instructions: String
    sets: Int
    reps: Int
    weight: Float
    duration: Int
  }
`;

module.exports = typeDefs;
