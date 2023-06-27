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
    workout: async (_, { _id }) => {
      try {
        const workout = await Workout.findById(_id);
        if (!workout) {
          throw new Error("No workout found with this id!");
        }
        return workout;
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
    exercise: async (_, { _id }) => {
      try {
        const exercise = await Exercise.findById(_id);
        if (!exercise) {
          throw new Error("No exercise found with this id!");
        }
        return exercise;
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
    setActiveProgram: async (parent, { userId, programId }, context) => {
      const user = await User.findByIdAndUpdate(
        userId,
        { activeProgram: programId },
        { new: true }
      );
      return user;
    },
    addProgram: async (
      _,
      { title, daysPerWeek, duration, description },
      context
    ) => {
      try {
        if (!context.user) {
          throw new Error("You must be logged in to create a program.");
        }
        const program = new Program({
          title,
          creator: context.user._id,
          daysPerWeek,
          duration,
          description,
        });
        await program.save();

        // get user from context
        const user = await User.findById(context.user._id);
        user.programs.push(program);
        await user.save();

        return program;
      } catch (error) {
        throw new Error(
          `There was a problem adding your program: ${error.message}`
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
      { programId, title, current, daysPerWeek, duration, workouts },
      context
    ) => {
      try {
        if (!context.user) {
          throw new AuthenticationError(
            "You must be logged in to add a workout to a program."
          );
        }
        const updatedProgram = await Program.findByIdAndUpdate(
          programId,
          { title, current, daysPerWeek, duration, workouts },
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
    addWorkout: async (_, { programId, name }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError(
            "You must be logged in to add a workout to a program."
          );
        }
        // Create a new workout
        const newWorkout = await Workout.create({
          programId: programId,
          name: name,
        });
        // Find the program and add the new workout
        const program = await Program.findById(programId);
        program.workouts.push(newWorkout._id);
        await program.save();
        return program;
      } catch (error) {
        throw new Error(
          `There was an error adding the workout: ${error.message}`
        );
      }
    },
    removeWorkout: async (_, { programId, workout }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError(
            "You must be logged in to add a workout to a program."
          );
        }
        const program = await Program.findById(programId);
        program.workouts.pull(workout);
        await program.save();
        return program;
      } catch (error) {
        throw new Error(
          `There was an error removing the workout: ${error.message}`
        );
      }
    },
    updateWorkout: async (_, { workoutId, name }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError(
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
          `There was an error updating the workout: ${error.message}`
        );
      }
    },
    addExercise: async (_, { workoutId, exercise }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError(
            "You must be logged in to add an exercise to a workout."
          );
        }
        // Create a new exercise
        const newExercise = await Exercise.create(exercise);

        // Find the workout and add the new exercise
        const workout = await Workout.findById(workoutId);
        workout.exercises.push(newExercise._id);
        await workout.save();

        // Populate the exercises before returning
        return Workout.findById(workout._id).populate("exercises");
      } catch (error) {
        throw new Error(
          `There was an error adding the exercise to the workout: ${error.message}`
        );
      }
    },
    removeExercise: async (_, { workoutId, exercise }, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError(
            "You must be logged in to remove a workout from a program."
          );
        }
        const workout = await Workout.findById(workoutId);
        workout.exercises.pull(exercise);
        await workout.save();
        return workout;
      } catch (error) {
        throw new Error(
          `There was an error adding the exercise to the workout: ${error.message}`
        );
      }
    },
    updateExercise: async (_, args, context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError(
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
          `There was an error adding the exercise to the workout: ${error.message}`
        );
      }
    },
  },
};

module.exports = resolvers;
