import { useState } from 'react'
import { Input, Button, Table, Select, Modal, Form, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons'

import './index.scss'

const { Search, TextArea } = Input
const { Option } = Select

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function Semantic(props) {
  const [visible, setVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState(0)
  const [strategy, serStrategy] = useState([])
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
        <Space>
          <a 
          href="#/"
          onClick={(e) =>{
            e.preventDefault()
            setVisible(true)
            setModalTitle(1)
           }}
          >
            编辑
          </a>
          <a 
          href="#/"
          onClick={(e) =>{
            e.preventDefault()
           }}
          >
            删除
          </a>
        </Space>
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

  const add = () => {
    let newStrategy = [...strategy]
    serStrategy(newStrategy.push({ key:'', name:'', value: '' }))
  }

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
          <label>
            <span>
              策略类型：
            </span>
            <Select 
              bordered={false}
              style={{ width: 220, boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2 }}
              >
              <Option value="scene_strategy">场景策略</Option>
              <Option value="custom_strategy">自定义策略</Option>
            </Select>
          </label>
        </div>
        <Button
         type="primary" 
         onClick={() =>{
           setVisible(true)
           setModalTitle(0)
          }}
         >
           新增策略
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        className="auto-table"
        style={{ boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2 }}
        />
        {visible &&
          <Modal
            title={modalTitle ? '编辑策略':'新增策略'}
            centered
            visible={visible}
            onOk={() => console.log(form.getFieldsValue(),'123')}
            onCancel={() => setVisible(false)}
          >
            <Form
              {...layout}
              form={form}
              name="basic"
            >
            <Form.Item
              label="策略名称"
              name="name"
              rules={[{ required: true, message: '请输入策略名称！' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="描述"
              name="description"
            >
              <TextArea rows={3} />
            </Form.Item>
            <Form.Item
              label="策略类型"
              name="type"
              rules={[{ required: true, message: '请选择策略类型！' }]}
            >
              <Select>
                <Option value="scene_strategy">场景策略</Option>
                <Option value="custom_strategy">自定义策略</Option>
              </Select>
            </Form.Item>
            <Form.Item
                label="策略标签"
                name="label"        
                >
                  <Form.List name="strategy">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field,index) => (
                          <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                              {...field}
                              name={[field.name, 'first']}
                              fieldKey={[field.fieldKey, 'first']}
                              rules={[{ required: true, message: 'Missing first name' }]}
                            >
                              <Input placeholder="id" />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              name={[field.name, 'last']}
                              fieldKey={[field.fieldKey, 'last']}
                              rules={[{ required: true, message: 'Missing last name' }]}
                            >
                              <Input placeholder="key" />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              name={[field.name, 'last']}
                              fieldKey={[field.fieldKey, 'last']}
                              rules={[{ required: true, message: 'Missing last name' }]}
                            >
                              <Input placeholder="value" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field.name)}/>
                            <PlusCircleOutlined />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
              </Form.Item>
              <Form.Item
                label="策略结果"
                name="result"
                rules={[{ required: true, message: '请输入策略结果！' }]}
              >
                <TextArea 
                  rows={4}
                  allowClear
                  placeholder="例:((策略1+策略2)+策略3)"
                  />
              </Form.Item>
            </Form>
          </Modal>
        }
    </div>
  )
}

export default Semantic