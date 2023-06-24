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
    user: async (_, { _id }) => {
      try {
        const user = await User.findById(_id).populate({
          path: "programs",
          populate: {
            path: "workouts",
            model: "Workout",
            populate: {
              path: "exercises",
              model: "Exercise",
            },
          },
        });
        if (!user) {
          throw new Error("No user found with this id");
        }
        return user;
      } catch (error) {
        throw new Error(`Error retrieving user: ${error.message}`);
      }
    },
    programs: async () => {
      try {
        const programs = await Program.find({});
        console.log(programs);
        if (programs.length === 0) {
          throw new Error("No programs saved to db!");
        }
        return programs;
      } catch (error) {
        throw new Error(
          `Something went wrong fetching the program data: ${error.message}`
        );
      }
    },
    workouts: async () => {
      try {
        const workouts = await Workout.find({});
        console.log(workouts);
        if (workouts.length === 0) {
          throw new Error("No workouts saved to db!");
        }
        return workouts;
      } catch (error) {
        throw new Error(
          `Something went wrong fetching the workout data: ${error.message}`
        );
      }
    },
    exercises: async () => {
      try {
        const exercises = await Exercise.find({});
        console.log(exercises);
        if (exercises.length === 0) {
          throw new Error("No exercises saved to db!");
        }
        return exercises;
      } catch (error) {
        throw new Error(
          `Something went wrong fetching the exercise data: ${error.message}`
        );
      }
    },
    program: async (parent, { _id, name }) => {
      let query = {};
      if (_id) {
        query._id = _id;
      }
      if (name) {
        query.name = name;
      }
      try {
        const program = await Program.findOne(query);
        if (!program) {
          throw new Error("No program with this id/name");
        }
        return program;
      } catch (error) {
        throw new Error(`Something went wrong: ${error.message}`);
      }
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      console.log(`email: ${email}`);
      console.log(`password: ${password}`);
      try {
        const user = await User.findOne({ email: email });
        console.log(`user: ${user}`);
        if (!user) {
          throw new AuthenticationError(
            "Unable to locate a user account associated with that email!"
          );
        }
        const correctPW = await user.isCorrectPassword(password);
        console.log(`correctPW: ${correctPW}`);
        if (!correctPW) {
          throw new AuthenticationError("Invalid login credentials!");
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
      console.log(`addUser args: ${JSON.stringify(args)}`);
      console.log(`args: ${args}`);
      try {
        const newUser = await User.create(args);
        console.log(`newUser:${newUser}`);

        if (!newUser) {
          throw new Error("There was a problem creating the new user!");
        }
        const token = signToken(newUser);
        return { token, user: newUser };
      } catch (err) {
        console.error(err);
        throw new Error("An error occurred during new user creation!");
      }
    },
    addProgram: async (_, { name, creator }, context) => {
      try {
        if (!context.user) {
          throw new Error("You must be logged in to create a program.");
        }
        const program = await new Program({ name, creator: context.user._id });
        await program.save();
        return program;
      } catch (error) {
        throw new Error(
          `There was a problem adding your program: ${error.message}`,
        );
      }
    },
    removeProgram: async (_, { programId }, context) => {
      try {
        if (!context.user) {
          throw new Error(
            "You must be logged in to add a workout to a program."
          );
        }
        await Program.findByIdAndRemove(programId);
      } catch (error) {
        throw new Error(
          `An error occurred removing the program: ${error.message} `
        );
      }
    },
    updateProgram: async (
      _,
      { programId, name, daysPerWeek, duration, workouts }, context
    ) => {
      try {
        if (!context.user) {
          throw new Error(
            "You must be logged in to add a workout to a program."
          );
        }
        const updatedProgram = await Program.findByIdAndUpdate(
          programId,
          { name, daysPerWeek, duration, workouts },
          { new: true }
        );
        if (!updatedProgram) {
          throw new Error("No program found with this id");
        }
        return updatedProgram;
      } catch (error) {
        throw new Error(`Error updating program: ${error.message}`);
      }
    },
    addWorkout: async (_, { programId, workoutId }, context) => {
      try {
        if (!context.user) {
          throw new Error(
            "You must be logged in to add a workout to a program."
          );
        }
        const program = await Program.findById(programId);
        program.workouts.push(workoutId);
        await program.save();
        return program;
      } catch (error) {
        throw new Error(
          `There was an error adding the workout: ${error.message}`,
        );
      }
    },
    removeWorkout: async (_, { programId, workoutId }, context) => {
      try {
        if (!context.user) {
          throw new Error(
            "You must be logged in to add a workout to a program."
          );
        }
        const program = await Program.findById(programId);
        program.workouts.pull(workoutId);
        await program.save();
        return program;
      } catch (error) {
        throw new Error(
          `There was an error removing the workout: ${error.message}`,
        );
      }
    },
    updateWorkout: async (_, { workoutId, name }, context) => {
      try {
        if (!context.user) {
          throw new Error(
            "You must be logged in to add a workout to a program."
          );
        }
        const updatedWorkout = await Workout.findByIdAndUpdate(
          workoutId,
          { name },
          { new: true }
        );
        return updatedWorkout;
      } catch (error) {
        throw new Error(
          `There was an error updating the workout: ${error.message}`,
        );
      }
    },
    addExercise: async (_, { workoutId, exerciseId }, context) => {
      try {
        if (!context.user) {
          throw new Error(
            "You must be logged in to add a workout to a program."
          );
        }
        const workout = await Workout.findById(workoutId);
        workout.exercises.push(exerciseId);
        await workout.save();
        return workout;
      } catch (error) {
        throw new Error(
          `There was an error adding the exercise to the workout: ${error.message}`,
        );
      }
    },
    removeExercise: async (_, { workoutId, exerciseId }, context) => {
      try {
        if (!context.user) {
          throw new Error(
            "You must be logged in to add a workout to a program."
          );
        }
        const workout = await Workout.findById(workoutId);
        workout.exercises.pull(exerciseId);
        await workout.save();
        return workout;
      } catch (error) {
        throw new Error(
          `There was an error adding the exercise to the workout: ${error.message}`,
        );
      }
    },
    updateExercise: async (_, args, context) => {
      try {
        if (!context.user) {
          throw new Error(
            "You must be logged in to add a workout to a program."
          );
        }
        const { exerciseId, ...rest } = args;
        return await Exercise.findByIdAndUpdate(
          exerciseId,
          { ...rest },
          { new: true }
        );
      } catch (error) {
        throw new Error(
          `There was an error adding the exercise to the workout: ${error.message}`,
        );
      }
    },
  },
};

module.exports = resolvers;
