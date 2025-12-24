const User = require('../models/User')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    const user = new User({ email, password, name })
    await user.save()

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, email: user.email, name: user.name },
    })
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isValid = await user.comparePassword(password)
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email, name: user.name },
    })
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message })
  }
}

module.exports = { register, login }