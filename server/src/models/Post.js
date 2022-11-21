const mongoose = require('mongoose');

const userPostSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  author: String,
  authorImage: String,
});

const UserPost = mongoose.model('UserPost', userPostSchema);

module.exports = UserPost;
