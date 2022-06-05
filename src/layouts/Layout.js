import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import AppLayout from './AppLayout'
import EmptyLayout from './EmptyLayout'

/**
 * @description
 * 인증 정보 유무 따라 어떤 레이아웃 컴포넌트를 노출할지 결정 합니다.
 *
 * @returns EmptyLayout(빈 레이아웃) / AppLayout(앱 레이아웃)
 */
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
