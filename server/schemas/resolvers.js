const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models/");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {},

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
    // ToDo: Create resolver for creating/saving a new workout.
    //createWorkout:

    // ToDo: Create resolver for creating/saving a new workout.
    //updateWorkout:

    // ToDo: Create resolver for creating/saving a new workout.
    //deleteWorkout:
    },
  };

module.exports = resolvers;
