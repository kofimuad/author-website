import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { btsAPI } from '../utils/api'

function PostDetail() {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await btsAPI.getOne(postId)
        setPost(data)
      } catch (error) {
        console.error('Error fetching post:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [postId])

  if (loading) return <div className="container"><p>Loading...</p></div>
  if (!post) return <div className="container"><p>Post not found</p></div>

  // Extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null
    
    // Try to match various YouTube URL formats
    let videoId = null
    
    // YouTube Shorts format: youtube.com/shorts/VIDEO_ID
    let match = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/)
    if (match) {
      videoId = match[1]
    }
    
    // Standard YouTube formats: youtube.com/watch?v=VIDEO_ID or youtu.be/VIDEO_ID
    if (!videoId) {
      match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
      if (match) {
        videoId = match[1]
      }
    }
    
    // Embedded format: youtube.com/embed/VIDEO_ID
    if (!videoId) {
      match = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/)
      if (match) {
        videoId = match[1]
      }
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null
  }

  const embedUrl = getYouTubeEmbedUrl(post.videoUrl)

  // Debug log
  console.log('Full Post data:', JSON.stringify(post, null, 2))
  console.log('Video URL field:', post.videoUrl)
  console.log('All post keys:', Object.keys(post))
  console.log('Embed URL:', embedUrl)

  return (
    <div className="container">
      <article className="post-detail">
        {post.featuredImage && <img src={post.featuredImage} alt={post.title} className="cover-image" />}
        
        {post.videoUrl && embedUrl && (
          <div className="video-container" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <iframe
              width="100%"
              height="500"
              src={embedUrl}
              title={post.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <h1>{post.title}</h1>
        <p className="meta">{new Date(post.postedDate).toLocaleDateString()} • {post.contentType}</p>
        <div className="post-content">
          {post.content}
        </div>
      </article>
    </div>
  )
}

export default PostDetail