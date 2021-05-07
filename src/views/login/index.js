import { Form, Input, Button, Select, message } from 'antd';
import { hashHistory } from "react-router";
import { _login } from '../../http'

import './index.scss'

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};

const { Option } = Select

function Login() {
  const onFinish = (values) => {
    checkLogin(values)
  };

  const handleClickRegister = (e) => {
    e.preventDefault()
    hashHistory.push('/register')
  }

  const checkLogin = async(params) => {
    const res = await _login(params)
    const { data } = res
    if(data?.results?.length === 0) return message.warn('用户名或密码不正确！')
    hashHistory.push('/backStage')
  } 

  return (
    <div className='login-content'>
      <img src='background.jpeg' alt='' style={{ width: 540, height: 540 }}/>
      <div className='form-div'>
        <h1>欢迎登录</h1>
        <Form
          {...layout}
          name="basic"
          requiredMark={false}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="身份"
            name="identity"
            initialValue="1"
          >
            <Select>
              <Option value="0">管理员</Option>
              <Option value="1">分发管理</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <div style={{fontSize: 10, marginTop: -35, display: 'flex', justifyContent: 'space-between'}}>
              <a href='#/' onClick={e => handleClickRegister(e)}>免费注册</a>
              <a href='#/' style={{color: 'grey'}} onClick={e => e.preventDefault()}>忘记密码</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login