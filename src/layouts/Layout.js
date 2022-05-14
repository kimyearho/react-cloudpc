import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import AppLayout from './AppLayout'
import EmptyLayout from './EmptyLayout'

const Layout = () => {
  const isAuth = useSelector((state) => state.user.userInfo.isAuthentication)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth && location.pathname === '/') {
      navigate('/login', { replace: true })
    }
  }, [isAuth, location, navigate])

  return <>{!isAuth ? <EmptyLayout /> : <AppLayout />}</>
}

export default Layout
