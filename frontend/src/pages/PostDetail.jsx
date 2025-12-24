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

  return (
    <div className="container">
      <article className="post-detail">
        {post.featuredImage && <img src={post.featuredImage} alt={post.title} className="cover-image" />}
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