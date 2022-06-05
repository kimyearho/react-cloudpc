import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import staticDefaultImage from '../assets/images/login/login_portal.jpg'

/**
 * @description
 * 빈 레이아웃 컴포넌트 입니다.
 * 해당 레이아웃은 인증 정보가 유효하지 않은 경우 사용 됩니다.
 * 주로, 로그인 페이지에서 사용되거나, 오류 페이지에서 사용될 수 있습니다.
 *
 * @returns AppBody
 */
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
