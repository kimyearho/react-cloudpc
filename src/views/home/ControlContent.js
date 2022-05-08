import { Button, Row, Col, Card, Divider, Progress } from 'antd'
import { useCallback } from 'react'

import winPc from '../../assets/images/img_win_pc_on.png'

const ControlContent = ({
  vm_nm,
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
  function onPrefixChange() {}

  useCallback(() => {
    console.log('ControlContent', vm_auth_id)
  }, [vm_auth_id])

  return (
    <Row>
      <Col span={24}>
        <Card
          className="control-content"
          title="Cloud PC 상세 정보"
          bordered={false}
          extra={
            <Button type="link" size="small" onClick={onPrefixChange}>
              별칭 변경
            </Button>
          }
        >
          <Row>
            <Col span={9}>
              <div className="monitor">
                <img width={180} src={winPc} alt="monitor" />
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
                  <span className="fr">
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
                        CPU&nbsp;<small>({vcpu_cnt}core)</small>
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
                        MEM&nbsp;<small>(8GB)</small>
                      </span>
                    </Col>
                    <Col span={18}>
                      <Progress
                        className="useage-progress"
                        strokeColor="#edd118"
                        percent={disk_used_per}
                        size="small"
                        status="active"
                      />
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col span={6}>
                      <span>
                        HDD&nbsp;<small>({vhd_capa}GB)</small>
                      </span>
                    </Col>
                    <Col span={18}>
                      <Progress
                        className="useage-progress"
                        percent={mem_used_per}
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
