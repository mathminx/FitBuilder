const { Schema, model } = require("mongoose");
const Exercise = require('./Exercise');
const User = require('./User');

const workoutSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: { type: String, required: true },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
});

const Workout = model('Workout', workoutSchema);

module.exports = Workout;
