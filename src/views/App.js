import { Layout, Button } from 'antd';

import './App.scss'
const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header className="home-header">
          <div style={{ display: 'flex' }}>
            <img src='Car Rental.png' alt='' style={{ width: 40 }}/>
            <div className="title">
              <p>车联网信息分发访问策略生成平台</p>
              <p>Internet of vehicles information</p>
            </div>
          </div>
          <Button ghost>控制台登录</Button>
      </Header>
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
        </div>
      </Content>
    </Layout>
  );
}

export default App;
