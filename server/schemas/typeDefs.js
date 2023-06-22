const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    name: String
    email: String
    password: String
    programs: [Program]
    activeProgram: Program
  }

  type Program {
    _id: ID
    name: String
    creator: User
    workouts: [Workout]
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
    exercises [Exercise]
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(username: String, email: String, password: String): Auth


    addProgram(name: String!, creator: ID!): Program
    removeProgram(programId: ID!): Program
    updateProgram(programId: ID!, name: String): Program

    addWorkout(programId: ID!, workout: ID!): Program
    removeWorkout(programId: ID!, workout: ID!): Program
    updateWorkout(workoutId: ID!, name: String): Workout

    addExercise(workoutId: ID!, exercise: ID!): Workout
    removeExercise(workoutId: ID!, exercise: ID!): Workout
    updateExercise(exerciseId: ID!, name: String, type: String, equipment: String, difficulty: String, instructions: String, sets: Int, reps: Int, weight: Float, duration: Int): Exercise
  }
`;

module.exports = typeDefs;
