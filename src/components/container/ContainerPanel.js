import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Row, Button, Card } from 'antd'
import { metaFactory } from '../../api/factory/common_factory'
import { CloseOutlined } from '@ant-design/icons'
import AlertDescription from '../alert/AlertDescription'

const ContainerPanel = ({ children, routeMeta }) => {
  const navigate = useNavigate()
  const [meta, setMeta] = useState({})

  useEffect(() => {
    if (routeMeta) {
      setMeta(metaFactory(routeMeta))
    }
  }, [routeMeta])

  const onRedirect = () => {
    navigate('/main', { replace: true })
  }

  return (
    <>
      <Card
        className="container-panel"
        title={<div className="container-title">{meta.ctrTitle}</div>}
        bordered={false}
        extra={
          <Button type="link" icon={<CloseOutlined />} onClick={onRedirect} />
        }
      >
        {meta.ctrShowAlert ? (
          <AlertDescription
            alertTitle={meta.alertTitle}
            alertMessage={meta.alertMessage}
          />
        ) : null}
        {children}
      </Card>
    </>
  )
}

export default ContainerPanel
