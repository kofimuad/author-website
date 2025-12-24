const Story = require('../models/Story')

const getStories = async (req, res) => {
  try {
    const { genre, sortBy } = req.query
    let query = {}
    if (genre) query.genre = genre
    let sortOption = { postedDate: -1 }
    if (sortBy === 'oldest') sortOption = { postedDate: 1 }

    const stories = await Story.find(query).sort(sortOption)
    res.json(stories)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stories', error: error.message })
  }
}

const getStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
    if (!story) {
      return res.status(404).json({ message: 'Story not found' })
    }
    res.json(story)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching story', error: error.message })
  }
}

const createStory = async (req, res) => {
  try {
    const { title, content, genre } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' })
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-')

    const story = new Story({
      title,
      slug,
      content,
      genre,
      ...req.body,
    })

    await story.save()
    res.status(201).json({ message: 'Story created', story })
  } catch (error) {
    res.status(500).json({ message: 'Error creating story', error: error.message })
  }
}

const updateStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    )
    if (!story) {
      return res.status(404).json({ message: 'Story not found' })
    }
    res.json({ message: 'Story updated', story })
  } catch (error) {
    res.status(500).json({ message: 'Error updating story', error: error.message })
  }
}

const deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id)
    if (!story) {
      return res.status(404).json({ message: 'Story not found' })
    }
    res.json({ message: 'Story deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting story', error: error.message })
  }
}

module.exports = {
  getStories,
  getStory,
  createStory,
  updateStory,
  deleteStory,
}