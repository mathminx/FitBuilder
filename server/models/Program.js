const { Schema, model } = require("mongoose");
const Workout = require("./Workout");
const User = require("./User");

const programSchema = new Schema({
  name: {
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
    },
  ],
  //   dateCreated: {
  //     type: Date,
  //     default: Date.now,
  //   },
});

const Program = model("Program", programSchema);

module.exports = Program;
