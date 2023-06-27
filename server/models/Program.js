const { Schema, model } = require("mongoose");
const Workout = require("./Workout");
const User = require("./User");

const programSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workouts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Workout",
      required: true,
    },
  ],
  duration: {
    type: Number,
    required: true,
  },
  daysPerWeek: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

const Program = model("Program", programSchema);

module.exports = Program;
