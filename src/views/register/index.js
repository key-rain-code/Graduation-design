import { useState } from 'react'
import { Form, Input, Button, Select, Checkbox } from 'antd';
import { hashHistory } from "react-router";

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
const { TextArea } = Input

function Register() {
  const [form] = Form.useForm();
  const [isCarOwner, setIsCarOwner] = useState(false)

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    hashHistory.push('/backStage')
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='register-content'>
      <div className='form-div'>
        <div className="login-text">
          <p>已有账号？</p>
          <a href="#/login">去登录{'>'}</a>
        </div>
        <h1>欢迎注册</h1>
        <Form
          {...layout}
          name="basic"
          form={form}
          requiredMark={false}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请输入确认密码!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次密码不匹配!');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入姓名!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="身份"
            name="identity"
            rules={[
              {
                required: true,
                message: '请选择身份!',
              },
            ]}
          >
            <Select onChange={value => { setIsCarOwner(value === '2'? true : false) }}>
              <Option value="0">管理员</Option>
              <Option value="1">分发管理</Option>
              <Option value="2">车主</Option>
            </Select>
          </Form.Item>

          {
            isCarOwner ? 
            (
              <Form.Item
                label="车辆"
                name="Car"
              >
                <TextArea rows={2} placeholder="如有多辆车辆请以逗号分隔"/>
              </Form.Item>
            ) : null
          }

          <Form.Item {...tailLayout} shouldUpdate={true}>
            { () =>(
              <Button
              type="primary" 
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
              >
                注册
              </Button>
            )}
            
            
          </Form.Item>

          <Form.Item 
            {...tailLayout} 
            name="agreement" 
            className="checkbox-text"
            >
            <Checkbox>
              <span>
                我已阅读并同意
                <a href="#/" onClick={e => e.preventDefault()}>
                  《用户协议》、《隐私协议》
                </a>
              </span>
            </Checkbox>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register