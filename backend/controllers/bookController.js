const Book = require('../models/Book')

const getBooks = async (req, res) => {
  try {
    const { genre, sortBy } = req.query

    let query = {}
    if (genre) query.genre = genre

    let sortOption = { publicationDate: -1 }
    if (sortBy === 'oldest') sortOption = { publicationDate: 1 }
    if (sortBy === 'title') sortOption = { title: 1 }

    const books = await Book.find(query).sort(sortOption)
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message })
  }
}

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }
    res.json(book)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message })
  }
}

const createBook = async (req, res) => {
  try {
    const { title, description, genre, publicationDate, buyLinks } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-')

    const book = new Book({
      title,
      slug,
      description,
      genre,
      publicationDate,
      buyLinks,
      ...req.body,
    })

    await book.save()
    res.status(201).json({ message: 'Book created', book })
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message })
  }
}

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    )

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    res.json({ message: 'Book updated', book })
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message })
  }
}

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    res.json({ message: 'Book deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message })
  }
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
}