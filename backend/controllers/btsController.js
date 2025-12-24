const BehindTheScenes = require('../models/BehindTheScenes')

const getPosts = async (req, res) => {
  try {
    const { contentType, sortBy } = req.query
    let query = {}
    if (contentType) query.contentType = contentType
    let sortOption = { postedDate: -1 }
    if (sortBy === 'oldest') sortOption = { postedDate: 1 }

    const posts = await BehindTheScenes.find(query).sort(sortOption)
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message })
  }
}

const getPost = async (req, res) => {
  try {
    const post = await BehindTheScenes.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error: error.message })
  }
}

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' })
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-')

    const post = new BehindTheScenes({
      title,
      slug,
      content,
      ...req.body,
    })

    await post.save()
    res.status(201).json({ message: 'Post created', post })
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message })
  }
}

const updatePost = async (req, res) => {
  try {
    const post = await BehindTheScenes.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    )
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.json({ message: 'Post updated', post })
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message })
  }
}

const deletePost = async (req, res) => {
  try {
    const post = await BehindTheScenes.findByIdAndDelete(req.params.id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.json({ message: 'Post deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message })
  }
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
}