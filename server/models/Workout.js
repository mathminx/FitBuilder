const { Schema, model } = require("mongoose");
const exerciseSchema = require('./Exercise');
const User = require('./User');

const workoutSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: { type: String, required: true },
  exercises: [exerciseSchema],
});

const Workout = model('Workout', workoutSchema);

module.exports = Workout;
