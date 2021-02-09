import { Layout, Menu, Dropdown } from 'antd';
import { AliwangwangFilled, DownOutlined } from '@ant-design/icons';
import { hashHistory } from "react-router";

import './Container.scss'

const { Header, Content, Sider } = Layout;

function Container(props) {
  const { children } = props

  const menu = (
    <Menu>
      <Menu.Item onClick={() => hashHistory.push('/') }>登出</Menu.Item>
    </Menu>
  );

  const handleMenuClick = (key) => {
    switch(key) {
      case 'statistic':
        hashHistory.push('/statistic');
        break;
      case 'infoBase':
        hashHistory.push('/infoBase');
        break;
      case 'semantic':
        hashHistory.push('/semantic');
        break;
      case 'strategy':
        hashHistory.push('/strategy');
        break;
      default:
        hashHistory.push('/');
    }
  }

  return (
    <Layout className="backStage-content">
      <Header className="header">
        <div>
          <img src='Car Rental.png' alt='' style={{ width: 40, height: 40 }}/>
          <h1>车联网信息分发访问策略生成后台</h1>
        </div>
        <div>
          <AliwangwangFilled className="user-icon"/>
          <Dropdown overlay={menu}>
            <a href="/#" onClick={e => e.preventDefault()}>
              kongshan <DownOutlined />
            </a>
        </Dropdown>
        </div>
      </Header>
      
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1" onClick={() => handleMenuClick('statistic')}>数据概览</Menu.Item>
            <Menu.Item key="2" onClick={() => handleMenuClick('infoBase')}>信息总库</Menu.Item>
            <Menu.Item key="3" onClick={() => handleMenuClick('semantic')}>策略制定</Menu.Item>
            <Menu.Item key="4" onClick={() => handleMenuClick('strategy')}>语义库</Menu.Item>
          </Menu>
        </Sider>
        
        <Layout style={{ padding: '24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Container