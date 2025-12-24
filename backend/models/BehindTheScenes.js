const mongoose = require('mongoose')

const behindTheScenesSchema = new mongoose.Schema({
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
  contentType: {
    type: String,
    enum: ['Blog Post', 'Photo Series', 'Video', 'Announcement'],
    default: 'Blog Post',
  },
  featuredImage: String,
  postedDate: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
  media: [
    {
      type: String,
      url: String,
    },
  ],
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

module.exports = mongoose.model('BehindTheScenes', behindTheScenesSchema)