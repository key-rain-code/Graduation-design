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
          <h2>解决方案</h2>
          <p>为车联网环境提供一站式的服务</p>
          <p>路况变更、紧急消息都能第一时间精准触达用户</p>
          <div className="business-content">
            <img src='home-business.svg' alt='' />
            <div>
              <p className="business-description-title">车联网信息分发策略解决方案</p>
              <p className="business-p-detail">
                构建面向联接的车联网平台，为企业和个人提供高安全、高性能、高可靠的车联网服务支撑；
                针对分发过程中重要信息的篡改、无差别广播等结合特定的加密算法以及定制化的信息策略设置，
                提高信息的安全性和精准性。
              </p>
              <p className="business-description-title">方案优势</p>
              <p className="business-sub-title">- 基于属性基加密</p>
              <p className="business-sub-text">结合CP-ABE属性基加密算法，对分发过程中重要的信息进行策略设置，只有当车辆属性满足时才能获取相应的明文信息，提高了信息的精准性。</p>
              <p className="business-sub-title">- 稳定可靠</p>
              <p className="business-sub-text">云服务采用高稳定高可靠性设计，支持车联网系统基于策略弹性扩展，平滑扩容，轻松应对车辆出行高峰期对平台的冲击。</p>
              <p className="business-sub-title">- 多场景策略支持</p>
              <p className="business-sub-text">支持预设多场景策略，信息分发时可直接应用。</p>
            </div>
          </div>
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
