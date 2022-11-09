const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    posts: Array,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
