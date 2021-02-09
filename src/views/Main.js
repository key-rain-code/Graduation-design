import { Layout, Button } from 'antd';
import { hashHistory } from "react-router";

import './Main.scss'

const { Header } = Layout;

function Main(props) {
  const { children } = props

  const hashPath = window.location.hash
  const isLoginRegister = ['#/login', '#/register'].indexOf(hashPath) > -1

  return (
    <Layout>
      <Header className={hashPath === '#/' ? 'home-header header-lucency': 'home-header'}>
          <div style={{ display: 'flex' }}>
            <img src='Car Rental.png' alt='' style={{ width: 40 }}/>
            <div className="title">
              <p>车联网信息分发访问策略生成平台</p>
              <p>Internet of vehicles information</p>
            </div>
          </div>
          <Button ghost onClick={() => hashHistory.push(isLoginRegister ? '/' : '/login')}>{isLoginRegister? '首页' : '控制台登录'}</Button>
      </Header>
      {children}
    </Layout>
  )
}

export default Main