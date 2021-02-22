import React, { useState } from 'react'
import { Layout, Menu, Dropdown } from 'antd';
import { 
  AliwangwangFilled, DownOutlined, BarChartOutlined, 
  CopyOutlined, FormOutlined, MediumOutlined, MenuUnfoldOutlined, 
  MenuFoldOutlined 
} from '@ant-design/icons';
import { hashHistory } from "react-router";

import './Container.scss'

const { Header, Content, Sider } = Layout;

function Container(props) {
  const [collapsed, setCollapsed] = useState(false)
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

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  return (
    <Layout className="backStage-content">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div style={{ height: 32, margin: 6, display: 'flex', justifyContent: 'center' }} className="header">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle
            })}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<BarChartOutlined />} onClick={() => handleMenuClick('statistic')}>数据概览</Menu.Item>
            <Menu.Item key="2" icon={<CopyOutlined />} onClick={() => handleMenuClick('infoBase')}>信息总库</Menu.Item>
            <Menu.Item key="3" icon={<FormOutlined />} onClick={() => handleMenuClick('semantic')}>策略制定</Menu.Item>
            <Menu.Item key="4" icon={<MediumOutlined />} onClick={() => handleMenuClick('strategy')}>语义库</Menu.Item>
          </Menu>
        </Sider>
      
      <Layout style={{ minHeight: '100vh' }}>
          <Header className="header">
            <span></span>
            <h1>车联网信息分发访问策略生成后台</h1>
            <div>
              <AliwangwangFilled className="user-icon"/>
              <Dropdown overlay={menu}>
                <a href="/#" onClick={e => e.preventDefault()}>
                  kongshan <DownOutlined />
                </a>
            </Dropdown>
            </div>
          </Header>

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