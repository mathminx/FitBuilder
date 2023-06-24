const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const programSchema = require('./Program');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  programs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Program",
    },
  ],
  activeProgram: {
    type: Schema.Types.ObjectId,
    ref: "Program",
  },
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  console.log(`tried password: ${password}`);
  console.log(`stored password: ${this.password}`);
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("program count").get(function () {
  return this.programs.length;
});

const User = model("User", userSchema);

module.exports = User;
