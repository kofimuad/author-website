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
  magazine: {
    type: String,
    required: true,
  },
  publicationType: {
    type: String,
    enum: ['Poetry', 'Article', 'Feature', 'Essay', 'Short Story'],
    default: 'Poetry',
  },
  category: String,
  description: String,
  poemExcerpt: String,
  publicationLogo: String,
  readUrl: String,
  publishedDate: Date,
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