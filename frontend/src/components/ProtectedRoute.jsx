import { Navigate } from 'react-router-dom'
import { isTokenValid } from '../utils/auth'

function ProtectedRoute({ children }) {
  if (!isTokenValid()) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

export default ProtectedRoute