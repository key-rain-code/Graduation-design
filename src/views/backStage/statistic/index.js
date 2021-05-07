import { useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd';

import LineEcharts from './component/lineEcharts'
import { _getInfoCount, _getScenStrategy, _getCustomStrategy } from '../../../http'

import './index.scss'

function Statistic(props) {
  const [accessInfo, setAccessInfo] = useState(0)
  const [scenStrategy, setScenStrategy] = useState(0)
  const [customStrategy, setCustomStrategy] = useState(0)

  useEffect(() => {
    apiGetInfoCount()
    apiGetScenStrategy()
    apiGetCustomStrategy()
  }, [])

  const apiGetInfoCount = async() => {
    const res = await _getInfoCount()
    const { status, data } = res
    if(!status === 200) return
    setAccessInfo(data?.sum)
  }

  const apiGetScenStrategy = async() => {
    const res = await _getScenStrategy()
    const { status, data } = res
    if(!status === 200) return
    setScenStrategy(data?.sum)
  }

  const apiGetCustomStrategy = async() => {
    const res = await _getCustomStrategy()
    const { status, data } = res
    if(!status === 200) return
    setCustomStrategy(data?.sum)
  }

  const cardArray = [{
    id: 'accessInfo',
    title: '接入信息',
    data: accessInfo,
    imgUrl: 'statistic-card-first.png'
  }, {
    id: 'scenStrategy',
    title: '场景策略',
    data: scenStrategy,
    imgUrl: 'statistic-card-second.png'
  }, {
    id: 'customStrategy',
    title: '自定义策略',
    data: customStrategy,
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