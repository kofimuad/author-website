export const getToken = () => {
  return localStorage.getItem('authToken')
}

export const setToken = (token) => {
  localStorage.setItem('authToken', token)
}

export const removeToken = () => {
  localStorage.removeItem('authToken')
}

export const isTokenValid = () => {
  const token = getToken()
  return !!token
}

export const getAuthHeader = () => {
  const token = getToken()
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}