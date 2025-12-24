const express = require('express')
const authMiddleware = require('../middleware/auth')
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/btsController')

const router = express.Router()

router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', authMiddleware, createPost)
router.put('/:id', authMiddleware, updatePost)
router.delete('/:id', authMiddleware, deletePost)

module.exports = router