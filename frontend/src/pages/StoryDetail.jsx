import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { storiesAPI } from '../utils/api'

function StoryDetail() {
  const { storyId } = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const data = await storiesAPI.getOne(storyId)
        setStory(data)
      } catch (error) {
        console.error('Error fetching story:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStory()
  }, [storyId])

  if (loading) return <div className="container"><p>Loading...</p></div>
  if (!story) return <div className="container"><p>Story not found</p></div>

  return (
    <div className="container">
      <article className="story-detail">
        {story.thumbnailImage && <img src={story.thumbnailImage} alt={story.title} className="cover-image" />}
        <h1>{story.title}</h1>
        <p className="meta">Published: {new Date(story.postedDate).toLocaleDateString()}</p>
        <div className="story-content">
          {story.content}
        </div>
      </article>
    </div>
  )
}

export default StoryDetail