import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Row, Col, Table } from 'antd'
import { call_noticeList } from '../../api/system'
import { noticeFactory } from '../../api/factory/system_factory'
import { notcieColumns, noticeSearchTypeItems } from './notice-helper'
import ContainerWrapper from '../../components/container/ContainerWrapper'

const Notice = ({ meta }) => {
  const [noticeList, setNoticeList] = useState([])
  /**
   * @description
   * 검색 조건과 검색어 정보를 전달 받습니다.
   *
   * @param {Object} searchParams - 검색 조건과 검색어
   */
  const searchCallback = async (searchParams) => {
    await fetchNoticeList(searchParams)
  }

  /**
   * @description
   * 공지사항 목록을 조회 합니다.
   *
   * @param {Object} searchParams - 검색 조건과 검색어
   */
  const fetchNoticeList = async (searchParams) => {
    try {
      const data = await call_noticeList(searchParams)
      if (!_.isEmpty(data)) {
        setNoticeList(noticeFactory(data))
      } else {
        setNoticeList([])
      }
    } catch (error) {
      console.error(error)
    }
  }

  //* 래퍼 컴포넌트 Props
  const wrapperProps = {
    routeMeta: meta,
    useSearch: true,
    searchType: noticeSearchTypeItems,
    height: '700px',
    callback: searchCallback
  }

  useEffect(() => {
    fetchNoticeList()
  }, [])

  return (
    <>
      <Row className="mr-30">
        <Col offset={2}>
          <ContainerWrapper {...wrapperProps}>
            <Row style={{ width: '100%' }}>
              <Col span={24}>
                <Table
                  className="ant-table"
                  columns={notcieColumns}
                  dataSource={noticeList}
                  size="middle"
                />
              </Col>
            </Row>
          </ContainerWrapper>
        </Col>
      </Row>
    </>
  )
}

export default Notice
