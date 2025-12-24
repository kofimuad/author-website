import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import BooksPage from './pages/BooksPage'
import BookDetail from './pages/BookDetail'
import StoriesPage from './pages/StoriesPage'
import StoryDetail from './pages/StoryDetail'
import BehindTheScenesPage from './pages/BehindTheScenesPage'
import PostDetail from './pages/PostDetail'
import InterviewsPublicationsPage from './pages/InterviewsPublicationsPage'
import ItemDetail from './pages/ItemDetail'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import './styles/global.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:bookId" element={<BookDetail />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/stories/:storyId" element={<StoryDetail />} />
            <Route path="/behind-the-scenes" element={<BehindTheScenesPage />} />
            <Route path="/behind-the-scenes/:postId" element={<PostDetail />} />
            <Route path="/interviews-publications" element={<InterviewsPublicationsPage />} />
            <Route path="/interviews-publications/:itemId" element={<ItemDetail />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App