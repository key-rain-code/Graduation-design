import { Card, Col, Row } from 'antd';

import LineEcharts from './component/lineEcharts'

import './index.scss'

function Statistic(props) {

  const cardArray = [{
    id: 'accessInfo',
    title: '接入信息',
    data: 1000,
    imgUrl: 'statistic-card-first.png'
  }, {
    id: 'scenStrategy',
    title: '场景策略',
    data: 4,
    imgUrl: 'statistic-card-second.png'
  }, {
    id: 'customStrategy',
    title: '自定义策略',
    data: 10,
    imgUrl: 'statistic-card-third.png'
  }]

  return (
    <div className="backStage-statistic-main">
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {
            cardArray.map(({ id, title, data, imgUrl }) => (
              <Col span={8} key={id}>
                <Card bordered={true} style={{ boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', borderRadius: 2, height: 160, padding: 24 }}>
                  <div style={{display: 'flex', padding: '0 30px'}}>
                    <img alt="" src={imgUrl} style={{width: 80, height: 80}}/>
                    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 25}}>
                      <p style={{color: '#666666'}}>{title}</p>
                      <p style={{margin: -10, fontSize: 36}}>{data}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))
          }
        </Row>
    </div>
    <LineEcharts />
  </div>
  )
}

export default Statistic