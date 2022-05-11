import { Row, Col, Card, Divider, Progress, Tooltip } from 'antd'
import { useEffect, useState } from 'react'

import winPc from '../../assets/images/img_win_pc_on.png'

const ControlContent = ({
  vm_auth_id,
  sw_nm,
  vm_state,
  vcpu_cnt,
  vhd_capa,
  vmm_capa,
  cpu_usage,
  disk_used_per,
  mem_used_per
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const WarnningAlarm = () => {
    let message = ''
    if (cpu_usage >= 50) {
      message = `CPU 사용율이 ${cpu_usage}% 이상 입니다.`
    } else if (mem_used_per >= 50) {
      message = `메모리 사용율이 ${mem_used_per}% 이상 입니다.`
    } else if (disk_used_per >= 50) {
      message = `디스크 사용율이 ${disk_used_per}% 이상 입니다.`
    }
    return (
      <>
        <Tooltip
          placement="top"
          color="red"
          visible={tooltipVisible}
          title={
            <>
              {tooltipVisible && (
                <div>
                  <div>경고</div>
                  <p>{message}</p>
                </div>
              )}
            </>
          }
        >
          <img width={180} src={winPc} alt="monitor" />
        </Tooltip>
      </>
    )
  }

  useEffect(() => {
    setTooltipVisible(false)
    if (cpu_usage > 50 || disk_used_per > 50 || mem_used_per > 50) {
      setTooltipVisible(true)
    }
    return () => {
      setTooltipVisible(false)
    }
  }, [cpu_usage, disk_used_per, mem_used_per])

  return (
    <Row>
      <Col span={24}>
        <Card
          className="control-content"
          title="Cloud PC 상세 정보"
          bordered={false}
        >
          <Row>
            <Col span={9}>
              <div className="monitor">
                {tooltipVisible ? (
                  <WarnningAlarm />
                ) : (
                  <img width={180} src={winPc} alt="monitor" />
                )}
              </div>
              <div className="os">
                <span>{sw_nm}</span>
              </div>
            </Col>
            <Col span={1}>
              <Divider type="vertical" className="control-content-divider" />
            </Col>
            <Col span={14}>
              <Row className="control-pc-status">
                <Col span={4}>PC 상태</Col>
                <Col span={2}>
                  <Divider className="shotcut-divider" type="vertical" />
                </Col>
                <Col span={18}>
                  <span
                    className={
                      vm_state === 'active'
                        ? 'vm-status active'
                        : 'vm-status fail'
                    }
                  >
                    {vm_state === 'active' ? '사용 가능' : '사용 불가'}
                  </span>
                </Col>
              </Row>
              <Row className="control-pc-usage">
                <Col span={4}>PC 사용</Col>
                <Col span={2}>
                  <Divider className="shotcut-divider" type="vertical" />
                </Col>
              </Row>
              <Row className="control-pc-useage-progress">
                <Col span={24} style={{ padding: '15px 20px 15px 10px' }}>
                  <Row gutter={20}>
                    <Col span={6}>
                      <span>
                        <span className="font-12">CPU</span>&nbsp;
                        <small>({vcpu_cnt}core)</small>
                      </span>
                    </Col>
                    <Col span={18}>
                      <Progress
                        className="useage-progress"
                        strokeColor="#ed6d6d"
                        percent={cpu_usage}
                        size="small"
                        status="active"
                      />
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col span={6}>
                      <span>
                        <span className="font-12">MEM</span>&nbsp;
                        <small>(8GB)</small>
                      </span>
                    </Col>
                    <Col span={18}>
                      <Progress
                        className="useage-progress"
                        strokeColor="#edd118"
                        percent={mem_used_per}
                        size="small"
                        status="active"
                      />
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col span={6}>
                      <span>
                        <span className="font-12">HDD</span>&nbsp;
                        <small>({vhd_capa}GB)</small>
                      </span>
                    </Col>
                    <Col span={18}>
                      <Progress
                        className="useage-progress"
                        percent={disk_used_per}
                        size="small"
                        status="active"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default ControlContent
