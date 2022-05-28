import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Spin } from 'antd'
import { metaFactory } from '../../api/factory/common_factory'
import AlertDescription from '../alert/AlertDescription'
import CloudPcResourceTopSubMenu from '../topSubmenu/CloudPcTopMenu'
import SearchForm from '../searchForm/SearchForm'
import BreadCrumb from '../breadcrumb/BreadCrumb'

const ContainerLoading = () => {
  return (
    <>
      <div className="container-loader">
        <Spin size="large" />
      </div>
    </>
  )
}

const ContainerWrapper = ({
  loading,
  routeMeta,
  height,
  useSearch,
  searchType,
  children,
  callback
}) => {
  const navigate = useNavigate()
  const [metaData, setMetaData] = useState({})

  //* BreadCrumb에서 Home 아이콘을 클릭했을때 메인 페이지로 리다이렉트한다.
  const onRedirect = () => {
    navigate('/dashboard', { replace: true })
  }

  /**
   * @description
   * 검색 조회 callback
   *
   * @param {Object} model - 검색 조건과, 검색어
   */
  const searchCallback = (model) => {
    callback(model)
  }

  //* alert props
  const alertProps = {
    alertTitle: metaData['alertTitle'],
    alertMessage: metaData['alertMessage']
  }

  //* search props
  const searchProps = {
    selectSearch: searchType,
    callback: searchCallback
  }

  useEffect(() => {
    if (routeMeta) {
      setMetaData(metaFactory(routeMeta))
    }
  }, [routeMeta])

  return (
    <>
      <Card
        bordered
        className="container-panel"
        style={{ height: height }}
        title={<div className="container-title">{metaData['ctrTitle']}</div>}
        extra={<BreadCrumb callback={onRedirect} />}
      >
        {/* 컨테이너 알림 메시지 */}
        {metaData['ctrShowAlert'] && <AlertDescription {...alertProps} />}
        {/* 가상 PC 전용 메뉴 */}
        {metaData['ctrTopSubmenu'] && <CloudPcResourceTopSubMenu />}
        {/* 공통 검색 폼 */}
        {useSearch === true && <SearchForm {...searchProps} />}
        {/* 컨테이너 로딩과 콘텐츠 */}
        {loading === true ? <ContainerLoading /> : children}
      </Card>
    </>
  )
}

export default ContainerWrapper
