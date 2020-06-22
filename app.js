const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const chalk = require('chalk');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const db = mongoose.connect('mongodb://localhost:27017/test');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// bookRouter.route('/books')
//   .get((req, res) => {
//     const response = { hello: 'This is my API' };

//     res.json(response);
//   });

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!!');
});

app.server = app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});

module.exports = app;
