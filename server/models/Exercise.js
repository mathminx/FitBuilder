const { Schema, model } = require("mongoose");

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  Description: {
    type: String,
  },
  sets: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  duration: {
    type: Number,
  },
});

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;
