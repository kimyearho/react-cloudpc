import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Collapse, Space, Menu } from 'antd'
import { DesktopOutlined } from '@ant-design/icons'
import { call_resource, call_imageInfo } from '../../api/resource'
import Icon from '@ant-design/icons'
import vmicon from '../../assets/images/vm_on.png'
import ControlContent from './ControlContent'

const { Text } = Typography
const { Panel } = Collapse

function Home() {
  // const dispatch = useDispatch()
  const [resource, setResource] = useState([])
  const [defaultKey, setDefaultKey] = useState('')

  useEffect(() => {
    //* 전체 리소스 조회
    call_resource().then((resource) => {
      if (resource.length > 0) {
        const vm_auth_id = resource[0].vm_auth_id
        const img_id = resource[0].img_id
        //* Collapse 기본 키
        setDefaultKey(vm_auth_id)
        //* 이미지 아이디로 이미지 조회
        call_imageInfo(img_id).then((data) => {
          //* 소프트웨어 명을 리소스 정보에 추가한다.
          resource[0].sw_nm = data.img_sw_l[0].sw_nm
          setResource(resource)
        })
      }
    })
  }, [])

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

  const customHeader = ({ vm_als, vm_nm }) => {
    return (
      <>
        <Row>
          <Col span={2}>
            <div className="vm-number">01</div>
          </Col>
          <Col span={16}>
            <span className="vm-prefix">
              <Text>{vm_als}</Text>
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

  const onChnageUserResource = (key) => {
    console.log(key)
    // setDefaultKey(key)
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
              activeKey={[defaultKey]}
              onChange={onChnageUserResource}
            >
              {resource.map((item) => (
                <Panel
                  // forceRender={true}
                  className="control-panel"
                  header={customHeader(item)}
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
                      <ControlContent {...item} />
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
