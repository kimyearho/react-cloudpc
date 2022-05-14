import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const EmptyLayout = () => {
  const { meta, isAuthentication } = useSelector((state) => ({
    isAuthentication: state.user.userInfo.isAuthentication,
    meta: state.user.portalPublic
  }))

  const loginImage = () => {
    if (meta && !isAuthentication) {
      return {
        backgroundImage: 'url(' + meta['login'].lin_bg_stor_path + ')',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }
    } else {
      return {
        marginTop: '40px'
      }
    }
  }

  const AppBody = () => {
    return (
      <>
        <div className="ant-login" style={loginImage()}>
          {!isAuthentication && <Navigate to="/login" replace />}
          <Outlet />
        </div>
      </>
    )
  }

  return (
    <>
      <AppBody />
    </>
  )
}

export default EmptyLayout
