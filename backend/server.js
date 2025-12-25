require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const authRoutes = require('./routes/auth')
const bookRoutes = require('./routes/books')
const publicationRoutes = require('./routes/publications')
const behindTheScenesRoutes = require('./routes/behindTheScenes')
const interviewRoutes = require('./routes/interviews')

const app = express()

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://kataru.netlify.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.options('*', cors())

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Connect to database
connectDB()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/publications', publicationRoutes)
app.use('/api/behind-the-scenes', behindTheScenesRoutes)
app.use('/api/interviews', interviewRoutes)

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Author Website API running successfully! 🚀',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      books: '/api/books',
      stories: '/api/stories'
    }
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Server error', error: err.message })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(``)
  console.log(`🚀 Author Website API Server`)
  console.log(`📡 Running on http://localhost:${PORT}`)
  console.log(``)
  console.log(`Available endpoints:`)
  console.log(`  POST   /api/auth/register        - Register new user`)
  console.log(`  POST   /api/auth/login           - Login user`)
  console.log(`  GET    /api/books                - Get all books`)
  console.log(`  POST   /api/books                - Create book (auth required)`)
  console.log(`  GET    /api/publications         - Get all publications`)
  console.log(`  POST   /api/publications         - Create publication (auth required)`)
  console.log(`  GET    /api/behind-the-scenes    - Get all posts`)
  console.log(`  POST   /api/behind-the-scenes    - Create post (auth required)`)
  console.log(`  GET    /api/interviews           - Get all interviews`)
  console.log(`  POST   /api/interviews           - Create interview (auth required)`)
  console.log(``)
  console.log(`Press Ctrl+C to stop the server`)
  console.log(``)
})