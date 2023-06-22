const db = require("../config/connection");
const { User, Program, Workout, Exercise } = require("../models");

const userData = require("./userData");
const programData = require("./programData.json");
const workoutData = require("./workoutData.json");
const exerciseData = require("./exerciseData.json");

db.once('open', async () => {
  // To start us with a clean database each time.
  await User.deleteMany({});
  await Program.deleteMany({});
  await Workout.deleteMany({});
  await Exercise.deleteMany({});

  // To bulk create a couple examples of each model.
  const users = await User.insertMany(userData);
  const programs = await Program.insertMany(programData);
  const workouts = await Workout.insertMany(workoutData);
  const exercises = await Exercise.insertMany(exerciseData);

  console.log('Finished seeding database!');
  process.exit(0);

});