const debug = require('debug')('app:controller');

function booksController(Book) {
  async function addBook(req, res) {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }
    await book.save();
    res.status(201);
    return res.json(book);
  }
  
  async function getAllBooks(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    await Book.find(query, async (err, books) => {
      if (err) {
        return res.send(err);
      }
      const returnBooks = await books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        // eslint-disable-next-line no-underscore-dangle
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      return res.json(returnBooks);
    });
  }

  async function getBookById(req, res, next) {
    await Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  }

  function processBookById(req, res) {
    const returnBook = req.book.toJSON();

    returnBook.links = {};
    let genre = ""
    if(req.book.genre)
      genre =  req.book.genre.replace(' ', '%20');
      
    returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
    res.json(returnBook);
  }

  async function putBookById(req, res) {
    const { book } = req;
    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.read = req.body.read;
    debug(req.body);
  

    await req.book.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  }

  async function patchBookById(req, res) {
    const { book } = req;
    // eslint-disable-next-line no-underscore-dangle
    if (req.body._id) {
      // eslint-disable-next-line no-underscore-dangle
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      book[key] = value;
    });
   
    await req.book.save((err) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
    });
  }

  async function deleteBookById(req, res) {
    await req.book.remove((err) => {
      if (err) {
        return res.send(err);
      }
      return res.sendStatus(204);
    });
  }

  return { 
    addBook,
    getAllBooks,
    getBookById,
    processBookById,
    putBookById,
    patchBookById,
    deleteBookById
  };
}

module.exports = booksController;
