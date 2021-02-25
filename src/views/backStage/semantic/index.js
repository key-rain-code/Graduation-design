import { useState } from 'react'
import { Input, Button, Table, Select, Modal, Form, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import './index.scss'

const { Search } = Input
const { Option } = Select

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

function Semantic(props) {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm();

  const columns = [
    {
      title: '策略名称',
      dataIndex: 'strategyName',
      key: 'strategyName'
    },
    {
      title: '描述',
      dataIndex: 'describe',
      key: 'describe'
    },
    {
      title: '策略类型',
      dataIndex: 'strategyType',
      key: 'strategyType'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <a href="/#">删除</a>
      )
    }
  ];
  
  const data = [
    {
      key: '1',
      content: '萍水街发生拥堵福建省开发技术开发和健康烦恼是会计法',
      unit: 'G11',
      issueTime: '2021-02-02 13:43',
      strategyType: '场景策略',
      setType: '手动'
    }
  ];

  return (
    <div className="backStage-semantic-main">
      <div className="semantic-header">
        <div>
          <Search
            className="dt-search"
            placeholder="请输入查询内容"
            allowClear
            enterButton
            bordered={false}
            style={{boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2}}
          />
          <Select 
            defaultValue="lucy" 
            bordered={false}
            style={{ width: 220, marginLeft: 25, boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2 }}
            >
            <Option value="lucy">场景策略</Option>
            <Option value="lucy">自定义策略</Option>
          </Select>
        </div>
        <Button type="primary" onClick={() => setVisible(true)}>添加策略</Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        className="auto-table"
        style={{ boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2 }}
        />
        <Modal
          title="策略设置"
          centered
          visible={visible}
          onOk={() => setVisible(true)}
          onCancel={() => setVisible(false)}
        >
          <Form
            {...layout}
            form={form}
            name="basic"
          >
          <Form.Item
              label="策略内容"
              name="password"        
              >
                <Form.List name="users">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(field => (
                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                          <Form.Item
                            {...field}
                            name={[field.name, 'first']}
                            fieldKey={[field.fieldKey, 'first']}
                            rules={[{ required: true, message: 'Missing first name' }]}
                          >
                            <Input placeholder="First Name" />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            name={[field.name, 'last']}
                            fieldKey={[field.fieldKey, 'last']}
                            rules={[{ required: true, message: 'Missing last name' }]}
                          >
                            <Input placeholder="Last Name" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(field.name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          Add field
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
            </Form.Item>
          </Form>
        </Modal>
    </div>
  )
}

export default Semantic