const { Router } = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const createdUser = await user.save();
    res.json(createdUser);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
