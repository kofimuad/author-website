const mongoose = require('mongoose')

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: String,
  genre: [String],
  thumbnailImage: String,
  postedDate: {
    type: Date,
    default: Date.now,
  },
  readTime: Number,
  tags: [String],
  featured: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Publication', publicationSchema)