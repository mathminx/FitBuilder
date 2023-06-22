const { AuthenticationError } = require("apollo-server-express");
const { User, Program, Workout, Exercise } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({
          $or: [{ _id: context.user._id }, { username: context.user.username }],
        });
        if (!user) {
          throw new Error("Unable to find an associated user");
        }
        return user;
      }
      throw new Error("You must be logged in to access user-specific data");
    },
    programs: async () => {},
    workouts: async () => {},
    exercises: async () => {},
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      console.log(`email: ${email}`);
      console.log(`password: ${password}`);
      try {
        const user = await User.findOne({ email: email });
        console.log(`user: ${user}`);
        if (!user) {
          throw new Error(
            "Unable to locate a user account associated with that email!"
          );
        }

        const correctPW = await user.isCorrectPassword(password);
        console.log(`correctPW: ${correctPW}`);
        if (!correctPW) {
          throw new Error("Invalid login credentials!");
        }

        const token = signToken(user);
        console.log(`logging in user: ${user}`);
        console.log(`logging in token: ${token}`);
        return { token, user };
      } catch (err) {
        console.error(err);
        throw new Error("An error occurred during login.");
      }
    },
    addUser: async (parent, args) => {
      console.log(args);
      try {
        const newUser = await User.create(args);
        console.log(`newUser:${newUser}`);

        if (!newUser) {
          throw new Error("There was a problem creating the new user!");
        }
        const token = signToken(newUser);
        return { token, user: newUser }; // This returned successfully.
      } catch (err) {
        console.error(err);
        throw new Error("An error occurred during new user creation!");
      }
    },
    addProgram: async (_, { name, creator }) => {
      const program = new Program({ name, creator });
      await program.save();
      return program;
    },
    removeProgram: async (_, { programId }) => {
      return await Program.findByIdAndRemove(programId);
    },
    updateProgram: async (_, { programId, name }) => {
      return await Program.findByIdAndUpdate(
        programId,
        { name },
        { new: true }
      );
    },
    addWorkoutToProgram: async (_, { programId, workoutId }) => {
      const program = await Program.findById(programId);
      program.workouts.push(workoutId);
      await program.save();
      return program;
    },
    removeWorkoutFromProgram: async (_, { programId, workoutId }) => {
      const program = await Program.findById(programId);
      program.workouts.pull(workoutId);
      await program.save();
      return program;
    },
    updateWorkout: async (_, { workoutId, name }) => {
      return await Workout.findByIdAndUpdate(
        workoutId,
        { name },
        { new: true }
      );
    },
    addExerciseToWorkout: async (_, { workoutId, exerciseId }) => {
      const workout = await Workout.findById(workoutId);
      workout.exercises.push(exerciseId);
      await workout.save();
      return workout;
    },
    removeExerciseFromWorkout: async (_, { workoutId, exerciseId }) => {
      const workout = await Workout.findById(workoutId);
      workout.exercises.pull(exerciseId);
      await workout.save();
      return workout;
    },
    updateExercise: async (_, args) => {
      const { exerciseId, ...rest } = args;
      return await Exercise.findByIdAndUpdate(
        exerciseId,
        { ...rest },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
