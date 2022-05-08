import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Collapse, Space, Menu } from 'antd'
import { DesktopOutlined } from '@ant-design/icons'
import { userResourceFactory } from '../../api/factory/resource_factory'
import {
  call_resource,
  call_userResource,
  call_imageInfo,
  call_resourceUsage
} from '../../api/resource'
import Icon from '@ant-design/icons'
import vmicon from '../../assets/images/vm_on.png'
import ControlContent from './ControlContent'
import _ from 'lodash'

const { Text } = Typography
const { Panel } = Collapse

function Home() {
  // const dispatch = useDispatch()
  const [resource, setResource] = useState([])
  const [activeKey, setActiveKey] = useState('')
  const [userResource, setUserResource] = useState(null)

  useEffect(() => {
    async function fetchInit() {
      //* 전체 리소스 조회
      const resourceList = await call_resource()
      if (resourceList.length > 0) {
        //* 1. 전체 리소스 데이터 상태 저장
        setResource(resourceList)
        //* 2. 첫번째 리소스 데이터의 아이디값들 추출
        const vm_auth_id = resourceList[0].vm_auth_id
        //* 3. 리소스 업데이트
        await fetchResource(vm_auth_id)
      }
    }
    fetchInit()
  }, [])

  /**
   * @description
   * 선택한 VM의 데이터와, VM의 이미지 아이디로 이미지 정보를 함께 조회한다.
   * 이미지 정보에는 소프트웨어 명이 포함되어 있어, 소프트웨어 명을 추출하여 VM정보에 추가한다.
   * 마지막으로 Collapse의 활성화 key값을 업데이트한다.
   *
   * @param {*} key - VM 인증 아이디
   */
  async function fetchResource(key) {
    try {
      //* 1. 선택한 VM 조회
      const userResourceData = await call_userResource(key)
      //* 2. VM의 이미지 아이디로 이미지 정보 조회
      const resourceImageData = await call_imageInfo(userResourceData.img_id)
      //* 3. 이미지내 소프트 웨어 이름을 1번에서 조회했던 VM데이터에 추가한다.
      userResourceData.sw_nm = resourceImageData.img_sw_l[0].sw_nm
      //* 4. 사용자 VM 상태 갱신
      await fetchUsageResource(userResourceData, key)
      //* 5. 활성키 상태 갱신
      setActiveKey(key)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * 선택한 VM 데이터에 해당 VM의 자원 사용량 정보를 조회하여 추가한다.
   *
   * @param {Object} userResourceData - 특정 VM 데이터
   * @param {String} vm_auth_id - VM 인증 아이디
   */
  async function fetchUsageResource(userResourceData, vm_auth_id) {
    try {
      const usageResource = await call_resourceUsage(vm_auth_id)
      const mergeResourceData = _.merge(userResourceData, usageResource)
      setUserResource(userResourceFactory(mergeResourceData))
    } catch (error) {
      console.error(error)
    }
  }

  const menuItems = [
    {
      key: '1',
      icon: <DesktopOutlined />,
      label: 'SPICE'
    },
    {
      key: '2',
      icon: <DesktopOutlined />,
      label: 'RDP'
    },
    {
      key: '3',
      icon: (
        <Icon
          style={{ verticalAlign: 'text-bottom' }}
          component={() => <img src={vmicon} alt="language" />}
        />
      ),
      label: 'Cloud PC 전원'
    }
  ]

  const customHeader = ({ vm_als, vm_nm }, index) => {
    return (
      <>
        <Row>
          <Col span={2}>
            <div className="vm-number">{index + 1}</div>
          </Col>
          <Col span={16}>
            <span className="vm-prefix">
              <Text>{!vm_als ? '─' : vm_als}</Text>
            </span>
          </Col>
          <Col span={6}>
            <span className="vm-name">
              <Text>{vm_nm}</Text>
            </span>
          </Col>
        </Row>
      </>
    )
  }

  const onChnageUserResource = async (key) => {
    if (key === activeKey) return
    if (!key) return

    //* 리소스 업데이트
    await fetchResource(key)
  }

  return (
    <>
      <Row className="control-wrapper">
        <Col offset={3} span={24}>
          <Space className="width-100" direction="vertical">
            <Collapse
              className="control-collapse"
              accordion={true}
              collapsible="header"
              expandIconPosition="right"
              destroyInactivePanel={true}
              activeKey={[activeKey]}
              onChange={onChnageUserResource}
            >
              {resource.map((item, index) => (
                <Panel
                  className="control-panel"
                  header={customHeader(item, index)}
                  key={item.vm_auth_id}
                >
                  <Row>
                    <Col span={6}>
                      <Menu
                        className="control-menu"
                        mode="inline"
                        theme="dark"
                        items={menuItems}
                        selectable={false}
                      />
                    </Col>
                    <Col span={18}>
                      {userResource !== null && (
                        <ControlContent key={item.vm_nm} {...userResource} />
                      )}
                    </Col>
                  </Row>
                </Panel>
              ))}
            </Collapse>
          </Space>
        </Col>
      </Row>
    </>
  )
}

export default Home
