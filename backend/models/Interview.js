const mongoose = require('mongoose')

const interviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  publicationName: String,
  publicationType: {
    type: String,
    enum: ['Interview', 'Article', 'Feature', 'Podcast', 'Press Release'],
    default: 'Interview',
  },
  description: String,
  content: String,
  publicationLogo: String,
  featuredImage: String,
  externalLink: String,
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

module.exports = mongoose.model('Interview', interviewSchema)