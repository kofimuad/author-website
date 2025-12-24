const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  description: String,
  genre: [String],
  series: String,
  seriesNumber: Number,
  publicationDate: Date,
  pages: Number,
  isbn: String,
  coverImage: String,
  buyLinks: {
    amazon: String,
    goodreads: String,
    appleBooks: String,
    barnesAndNoble: String,
  },
  authorNote: String,
  reviews: [
    {
      reviewer: String,
      text: String,
      rating: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Book', bookSchema)