const { Router } = require('express');

const UserPost = require('../models/Post');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await UserPost.find();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const userPost = new UserPost(req.body);
    const createdEntry = await userPost.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
