import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Login from '../views/login/Login'

export const RequireUserAuth = ({ children }) => {
  const isAuthentication = useSelector(
    (state) => state.user.userInfo.isAuthentication
  )
  if (!isAuthentication) {
    return <Navigate to="/login" replace />
  }
  return children
}

export const IsDefaultLogin = () => {
  const isAuthentication = useSelector(
    (state) => state.user.userInfo.isAuthentication
  )
  if (!isAuthentication) {
    return <Login />
  }
}
