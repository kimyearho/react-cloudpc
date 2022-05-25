import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const EmptyLayout = () => {
  const { meta, isAuthentication } = useSelector((state) => ({
    isAuthentication: state.user.userInfo.isAuthentication,
    meta: state.user.portalPublic
  }))

  const loginImage = () => {
    if (meta && !isAuthentication) {
      return {
        background: 'url(' + meta['login'].lin_bg_stor_path + ') 0% 0% / cover',
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
