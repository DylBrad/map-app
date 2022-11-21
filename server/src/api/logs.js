const { Router } = require('express');

const LogEntry = require('../models/LogEntry');
const Users = require('../models/User');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();

    const user = await Users.findOne({ _id: req.body.authorId });
    // eslint-disable-next-line no-underscore-dangle
    user.logs.push(createdEntry._id);
    await user.save();

    res.json(createdEntry);
  } catch (error) {
    if (error.constructor.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
