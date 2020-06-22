const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const chalk = require('chalk');

const app = express();
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter.route('/books')
  .get((req, res) => {
    const response = { hello: 'This is my API' };

    res.json(response);
  });
app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!!');
});

app.server = app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});

module.exports = app;
