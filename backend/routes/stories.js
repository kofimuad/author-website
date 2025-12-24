const express = require('express')
const authMiddleware = require('../middleware/auth')
const {
  getStories,
  getStory,
  createStory,
  updateStory,
  deleteStory,
} = require('../controllers/storyController')

const router = express.Router()

router.get('/', getStories)
router.get('/:id', getStory)
router.post('/', authMiddleware, createStory)
router.put('/:id', authMiddleware, updateStory)
router.delete('/:id', authMiddleware, deleteStory)

module.exports = router
