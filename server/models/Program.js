const { Schema, model } = require("mongoose");
const Workout = require("./Workout");

const programSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  weeks: {
    type: Number, 
    required: true, 
  }, 
  days: {
    type: Number, 
    required: true,
  },
  workouts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Workout",
    }],
//   dateCreated: {
//     type: Date,
//     default: Date.now,
//   },
});

const Program = model("Program", programSchema);

module.exports = Program;
