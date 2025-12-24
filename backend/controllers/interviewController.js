const Interview = require('../models/Interview')

const getInterviews = async (req, res) => {
  try {
    const { publicationType, sortBy } = req.query
    let query = {}
    if (publicationType) query.publicationType = publicationType
    let sortOption = { publishedDate: -1 }
    if (sortBy === 'oldest') sortOption = { publishedDate: 1 }

    const interviews = await Interview.find(query).sort(sortOption)
    res.json(interviews)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interviews', error: error.message })
  }
}

const getInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id)
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' })
    }
    res.json(interview)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interview', error: error.message })
  }
}

const createInterview = async (req, res) => {
  try {
    const { title, publicationName } = req.body

    if (!title || !publicationName) {
      return res.status(400).json({ message: 'Title and publication name are required' })
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-')

    const interview = new Interview({
      title,
      slug,
      publicationName,
      ...req.body,
    })

    await interview.save()
    res.status(201).json({ message: 'Interview created', interview })
  } catch (error) {
    res.status(500).json({ message: 'Error creating interview', error: error.message })
  }
}

const updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    )
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' })
    }
    res.json({ message: 'Interview updated', interview })
  } catch (error) {
    res.status(500).json({ message: 'Error updating interview', error: error.message })
  }
}

const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id)
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' })
    }
    res.json({ message: 'Interview deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting interview', error: error.message })
  }
}

module.exports = {
  getInterviews,
  getInterview,
  createInterview,
  updateInterview,
  deleteInterview,
}