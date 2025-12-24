const Publication = require('../models/Publication')

const getPublications = async (req, res) => {
  try {
    const { publicationType, sortBy } = req.query
    let query = {}
    if (publicationType) query.publicationType = publicationType

    let sortOption = { publishedDate: -1 }
    if (sortBy === 'oldest') sortOption = { publishedDate: 1 }
    if (sortBy === 'title') sortOption = { title: 1 }

    const publications = await Publication.find(query).sort(sortOption)
    res.json(publications)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching publications', error: error.message })
  }
}

const getPublication = async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id)
    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' })
    }
    res.json(publication)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching publication', error: error.message })
  }
}

const createPublication = async (req, res) => {
  try {
    const { title, magazine } = req.body

    if (!title || !magazine) {
      return res.status(400).json({ message: 'Title and magazine name are required' })
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-')

    const publication = new Publication({
      title,
      slug,
      magazine,
      ...req.body,
    })

    await publication.save()
    res.status(201).json({ message: 'Publication created', publication })
  } catch (error) {
    res.status(500).json({ message: 'Error creating publication', error: error.message })
  }
}

const updatePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    )

    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' })
    }

    res.json({ message: 'Publication updated', publication })
  } catch (error) {
    res.status(500).json({ message: 'Error updating publication', error: error.message })
  }
}

const deletePublication = async (req, res) => {
  try {
    const publication = await Publication.findByIdAndDelete(req.params.id)

    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' })
    }

    res.json({ message: 'Publication deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting publication', error: error.message })
  }
}

module.exports = {
  getPublications,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication,
}