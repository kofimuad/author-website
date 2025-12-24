import { getToken } from './auth'

const API_BASE_URL = 'http://localhost:5000/api'

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (getToken()) {
    options.headers.Authorization = `Bearer ${getToken()}`
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'API Error')
  }

  return await response.json()
}

// Auth API calls
export const authAPI = {
  register: (email, password, name) =>
    apiCall('/auth/register', 'POST', { email, password, name }),
  login: (email, password) =>
    apiCall('/auth/login', 'POST', { email, password }),
}

// Books API calls
export const booksAPI = {
  getAll: (genre, sortBy) => {
    let url = '/books'
    const params = new URLSearchParams()
    if (genre) params.append('genre', genre)
    if (sortBy) params.append('sortBy', sortBy)
    if (params.toString()) url += '?' + params.toString()
    return apiCall(url)
  },
  getOne: (id) => apiCall(`/books/${id}`),
  create: (bookData) => apiCall('/books', 'POST', bookData),
  update: (id, bookData) => apiCall(`/books/${id}`, 'PUT', bookData),
  delete: (id) => apiCall(`/books/${id}`, 'DELETE'),
}

// Stories API calls
export const storiesAPI = {
  getAll: (genre, sortBy) => {
    let url = '/stories'
    const params = new URLSearchParams()
    if (genre) params.append('genre', genre)
    if (sortBy) params.append('sortBy', sortBy)
    if (params.toString()) url += '?' + params.toString()
    return apiCall(url)
  },
  getOne: (id) => apiCall(`/stories/${id}`),
  create: (storyData) => apiCall('/stories', 'POST', storyData),
  update: (id, storyData) => apiCall(`/stories/${id}`, 'PUT', storyData),
  delete: (id) => apiCall(`/stories/${id}`, 'DELETE'),
}

// Behind the Scenes API calls
export const btsAPI = {
  getAll: (contentType, sortBy) => {
    let url = '/behind-the-scenes'
    const params = new URLSearchParams()
    if (contentType) params.append('contentType', contentType)
    if (sortBy) params.append('sortBy', sortBy)
    if (params.toString()) url += '?' + params.toString()
    return apiCall(url)
  },
  getOne: (id) => apiCall(`/behind-the-scenes/${id}`),
  create: (postData) => apiCall('/behind-the-scenes', 'POST', postData),
  update: (id, postData) => apiCall(`/behind-the-scenes/${id}`, 'PUT', postData),
  delete: (id) => apiCall(`/behind-the-scenes/${id}`, 'DELETE'),
}

// Interviews API calls
export const interviewsAPI = {
  getAll: (publicationType, sortBy) => {
    let url = '/interviews'
    const params = new URLSearchParams()
    if (publicationType) params.append('publicationType', publicationType)
    if (sortBy) params.append('sortBy', sortBy)
    if (params.toString()) url += '?' + params.toString()
    return apiCall(url)
  },
  getOne: (id) => apiCall(`/interviews/${id}`),
  create: (interviewData) => apiCall('/interviews', 'POST', interviewData),
  update: (id, interviewData) => apiCall(`/interviews/${id}`, 'PUT', interviewData),
  delete: (id) => apiCall(`/interviews/${id}`, 'DELETE'),
}