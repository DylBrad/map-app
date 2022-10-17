const { Router } = require('express');

// const LogEntry = require('../models/LogEntry');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: '🌎',
  });
});

module.exports = router;
