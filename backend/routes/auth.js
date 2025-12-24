const express = require('express')
const { register, login } = require('../controllers/authController')

const router = express.Router()

// Register endpoint - only allow first account
router.post('/register', register)

// Login endpoint
router.post('/login', login)

module.exports = router