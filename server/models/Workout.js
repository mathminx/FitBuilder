const { Schema, model } = require("mongoose");
const Exercise = require("./Exercise");
const User = require("./User");

const workoutSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  dayNumber: { type: Number, required: true },
  complete: {
    type: Boolean,
    required: true,
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
});

const Workout = model("Workout", workoutSchema);

module.exports = Workout;
