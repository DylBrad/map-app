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

    const sanitisedEmail = user.email.toLowerCase();

    const existingUser = await User.findOne({ email: sanitisedEmail });
    if (existingUser) {
      return res.status(409).send('This email is already in use.');
    }

    user.email = sanitisedEmail;

    const createdUser = await user.save();
    res.json(createdUser);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
  return 'success';
});

module.exports = router;
