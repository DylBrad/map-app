const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { notFound, errorHandler } = require('./middlewares');
require('dotenv').config();
const logs = require('./api/logs');

const app = express();

// connect mongoDB
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.DATABASE_URL, () => {
    console.log('We connected to mongoDb yo!');
  });
}

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    // Only requests coming from here can reach the backend
    origin: process.env.CORS_ORIGIN,
  }),
);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World, from index.js!',
  });
});

app.use('/api/logs', logs);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
