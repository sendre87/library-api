const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const chalk = require('chalk');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const db = mongoose.connect('mongodb://localhost:27017/test', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 }).catch(error => debug(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// swagger tutorials:
// - https://medium.com/@kirtikau/how-to-add-swagger-ui-to-existing-node-js-and-express-js-project-2c8bad9364ce
// - https://levelup.gitconnected.com/swagger-time-to-document-that-express-api-you-built-9b8faaeae563

// bookRouter.route('/books')
//   .get((req, res) => {
//     const response = { hello: 'This is my API' };

//     res.json(response);
//   });

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/v1', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API!!');
});

app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.server = app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});

module.exports = app;
