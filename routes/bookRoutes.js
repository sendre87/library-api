const express = require('express');

const booksController = require('../controllers/booksController');

function routes(Book) {
  const bookRouter = express.Router();
  const controller = booksController(Book);

  bookRouter.route('/books')
    .post(controller.post)
    .get(controller.getAllBooks);

  bookRouter.use('/books/:bookId', controller.getBookById);
  bookRouter.route('/books/:bookId')
    .get(controller.processBookById)
    .put(controller.putBookById)
    .patch(controller.patchBookById)
    .delete(controller.deleteBookById);

  return bookRouter;
}

module.exports = routes;
