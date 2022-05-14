import React from 'react'
import { useSelector } from 'react-redux'

import AppLayout from './AppLayout'
import EmptyLayout from './EmptyLayout'

const Layout = () => {
  const isAuth = useSelector((state) => state.user.userInfo.isAuthentication)
  return <>{!isAuth ? <EmptyLayout /> : <AppLayout />}</>
}

export default Layout
