const express = require('express')
const authMiddleware = require('../middleware/auth')
const {
  getPublications,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication,
} = require('../controllers/publicationController')

const router = express.Router()

router.get('/', getPublications)
router.get('/:id', getPublication)
router.post('/', authMiddleware, createPublication)
router.put('/:id', authMiddleware, updatePublication)
router.delete('/:id', authMiddleware, deletePublication)

module.exports = router