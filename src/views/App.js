import { Layout, Card, Space } from 'antd';

import './App.scss'

const { Content } = Layout;

function App(props) {

  const sceneContent = [{
    title: '紧急救护场景',
    content: '当发生救护场景时，通知某一车道的车辆进行避让'
  },{
    title: '上下班高峰场景',
    content: '当遇到上下班高峰场景时，通知某些拥堵路段的车辆提前进行绕道'
  },{
    title: '多路段限速场景',
    content: '当驶入限速路段时，通知车辆进行必要的减速，避免事故发生'
  },{
    title: '零检场景',
    content: '当遇到需要零食检查时，通知特定车辆前往目标地点进行检查'
  }]

  return (
    <>
      <Content className="home-content">
        <img src='background.jpeg' alt='' />
        <div className="text">
          <p>精准的信息分发安全策略方案</p>
        </div>
        <div className="module-business">
          <h2>业务方案</h2>
          <p>为车联网环境提供一站式的服务</p>
          <p>路况变更、紧急消息都能第一时间精准触达用户</p>
        </div>
        <div className="module-scenerio">
          <h2>适用场景</h2>
          <div className="scenerio-content">
            {sceneContent.map(({title, content}) => (
              <Card bordered={false} hoverable>
                <h3>{title}</h3>
                <p>{content}</p>
              </Card>
            ))}
          </div>
          <Space className="home-ellipsis-component">
            <div></div>
            <div></div>
            <div></div>
          </Space>
        </div>
      </Content>
    </>
  );
}

export default App;
