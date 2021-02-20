import { Card, Col, Row } from 'antd';

import BarEcharts from './component/barEcharts'
import LineEcharts from './component/lineEcharts'

import './index.scss'

function Statistic(props) {

  return (
    <div className="backStage-statistic-main">
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={true} hoverable={true}>
              <BarEcharts title='接入信息'/>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={true} hoverable={true}>
              <BarEcharts title='基本策略'/>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={true} hoverable={true}>
              <BarEcharts title='自定义策略'/>
            </Card>
          </Col>
        </Row>
    </div>
    <LineEcharts />
  </div>
  )
}

export default Statistic