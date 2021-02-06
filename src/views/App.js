import { Layout } from 'antd';

import './App.scss'
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header className="home-header">
          <img src='Car Rental.png' alt='' style={{ width: 35 }}/>
          <p>车联网信息分发访问策略</p>
      </Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
