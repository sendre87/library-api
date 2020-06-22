const mongodb = require('mongoose');

const { Schema } = mongodb;

const bookModel = new Schema(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false },
  },
);

module.exports = mongodb.model('Book', bookModel);
