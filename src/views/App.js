import { Layout } from 'antd';

import './App.scss'

const { Content } = Layout;

function App(props) {
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
        </div>
      </Content>
    </>
  );
}

export default App;
