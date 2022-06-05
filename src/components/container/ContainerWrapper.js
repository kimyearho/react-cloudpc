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

/**
 * @description
 * 컨테이너 래퍼 컴포넌트 입니다.
 * 메인 페이지를 제외한 모든 페이지에서 사용되는 카드형 공통 컨테이너로,
 * Router meta props를 이용하여 컨테이너 알림 메시지나, extra를 사용할 수 있습니다.
 * 컨테이너 props는 아래 정보를 참고 해주세요.
 *
 * @param {...props} {
 *                      loading: true / false   | 컨테이너에 로딩을 표시할지 여부 | (default: false)
 *                      routeMeta: {...props}   | 라우터 props (Vue style)
 *                      height: number          | 컨테이너 높이                  | (default: 700px)
 *                      useSearch: true / false | 검색기능 사용 여부             | (default: false)
 *                      searchType: object      | 검색 옵션
 *                      children: <Node>        | 하위 Node
 *                      callback: function      | child callback
 *                   }
 * @returns
 */
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
        style={{ height: height ? height : '700px' }}
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
