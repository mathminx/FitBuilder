const { Schema, model } = require("mongoose");
const exerciseSchema = require('./Exercise');

const workoutSchema = new Schema({
  creatorId:
  name: { type: String, required: true },
  exercises: [exerciseSchema],
  //date: { type: Date, default: Date.now },
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;