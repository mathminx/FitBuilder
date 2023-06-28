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
    description: String
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
    workout(_id: ID!): Workout
    exercises: [Exercise]
    exercise(_id: ID!): Exercise
    user(_id: ID!): User
    program(_id: ID!): Program
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(username: String, email: String, password: String): Auth
    setActiveProgram(userId: ID!, programId: ID!): User

    addProgram(
      title: String!
      daysPerWeek: Int!
      duration: Int!
      description: String
    ): Program!

    removeProgram(programId: ID!, userId: ID!): Program
    updateProgram(
      programId: ID!
      title: String
      daysPerWeek: Int
      duration: Int
      description: String
    ): Program
    updateActiveProgram(userId: ID!, programId: ID!): User

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
