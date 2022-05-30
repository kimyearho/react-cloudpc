import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import staticDefaultImage from '../assets/images/login/login_portal.jpg'

const EmptyLayout = () => {
  const { meta, isAuthentication } = useSelector((state) => ({
    isAuthentication: state.user.userInfo.isAuthentication,
    meta: state.user.portalPublic
  }))

  //* 연동 이미지가 있으면 사용하고, 없으면 기본 이미지를 사용한다.
  const lin_bg_stor_path =
    meta['login'].lin_bg_stor_path === null
      ? staticDefaultImage
      : meta['login'].lin_bg_stor_path

  const loginImage = () => {
    if (meta && !isAuthentication) {
      return {
        background: 'url(' + lin_bg_stor_path + ') 0% 0% / cover',
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
