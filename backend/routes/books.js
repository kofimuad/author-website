const express = require('express')
const authMiddleware = require('../middleware/auth')
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController')

const router = express.Router()

router.get('/', getBooks)
router.get('/:id', getBook)
router.post('/', authMiddleware, createBook)
router.put('/:id', authMiddleware, updateBook)
router.delete('/:id', authMiddleware, deleteBook)

module.exports = router