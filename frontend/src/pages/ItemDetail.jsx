import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { interviewsAPI } from '../utils/api'

function ItemDetail() {
  const { itemId } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await interviewsAPI.getOne(itemId)
        setItem(data)
      } catch (error) {
        console.error('Error fetching item:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [itemId])

  if (loading) return <div className="container"><p>Loading...</p></div>
  if (!item) return <div className="container"><p>Item not found</p></div>

  return (
    <div className="container">
      <article className="item-detail">
        {item.featuredImage && <img src={item.featuredImage} alt={item.title} className="cover-image" />}
        <h1>{item.title}</h1>
        <p className="meta">{item.publicationName} • {new Date(item.publishedDate).toLocaleDateString()}</p>
        <p className="genre">{item.publicationType}</p>
        {item.description && <p>{item.description}</p>}
        {item.content && <div className="item-content">{item.content}</div>}
        {item.externalLink && (
          <a href={item.externalLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Read Original
          </a>
        )}
      </article>
    </div>
  )
}

export default ItemDetail