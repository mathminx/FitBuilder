const db = require("../config/connection");
const User = require("../models/User");

const faker = require('faker')

const seedPrograms = Array.from({ length: 10 }).map(() => ({
  title: faker.lorem.words(3),
  current: faker.random.boolean(),
  creator: new mongoose.Types.ObjectId(), // fake id, replace with actual User ids
  workouts: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()], // fake ids, replace with actual Workout ids
  duration: faker.random.number({ min: 1, max: 52 }),
  daysPerWeek: faker.random.number({ min: 1, max: 7 }),
}));

console.log(seedPrograms);


db.once("open", async () => {
  try {
    await User.deleteMany({});
    const users = await User.create(seedUsers);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});


