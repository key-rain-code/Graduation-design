import { useState } from 'react'
import { Input, Button, Table, Select, Modal, Form, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons'

import './index.scss'

const { Search, TextArea } = Input
const { Option } = Select

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16
  }
}

function Semantic(props) {
  const [visible, setVisible] = useState(false)
  const [modalTitle, setModalTitle] = useState(0)
  const [strategy, setStrategy] = useState([])
  const [form] = Form.useForm()

  const handleDelete = (record) => {
    const { id } = record
  }

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
            handleDelete(record)
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

  const iconOperation = (operation, index) => {
    let newStrategy = [...strategy]
    if(operation === 'add') {
      newStrategy.push({ name:'', value: '' })
    } else {
      newStrategy.splice(index, 1)
    }
    setStrategy(newStrategy)
  }

  const handleChangeStrategy = (value, index, column) => {
    let newStrategy = [...strategy]
    newStrategy[index][column] = value
    setStrategy(newStrategy)
  }

  const handleCancel = () => {
    setVisible(false)
    setStrategy([])
  }

  const handleAddBrackets = () => {
    const { setFieldsValue, getFieldValue } = form
    const newResult = '(' + getFieldValue('result') + ')'
    setFieldsValue({'result' : newResult})
  }

  const handleAddStrategy = (index) => {
    const { getFieldValue, setFieldsValue } = form
    const strategy = '策略'+ (index+1)
    const nowResult = getFieldValue('result')
    if(!nowResult) {
      setFieldsValue({'result' : strategy})
    } else {
      setFieldsValue({'result' : nowResult + strategy })
    }
  }

  const handleAddLogic = (operat) => {
    const { getFieldValue, setFieldsValue } = form
    const nowResult = getFieldValue('result')
    setFieldsValue({'result' : `${nowResult} ${operat} ` })
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
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                取消
              </Button>,
              <Button key="submit" type="primary" onClick={() => console.log(form.getFieldsValue(),'123')}>
                确定
              </Button>,
            ]}
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
                <Button type="dashed" onClick={() => iconOperation('add')} block icon={<PlusOutlined />}>
                  Add
                </Button>
            </Form.Item>
            {strategy?.map((item,index) => (
              <Form.Item
                label={'策略'+(index+1)}
                name={index+1}
                >
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <Input value={item.name} onChange={({target:{ value }}) => handleChangeStrategy(value, index, 'name')}/>
                    <Input value={item.value} onChange={({target:{ value }}) => handleChangeStrategy(value, index, 'value')} style={{marginLeft: 10}}/>
                    <MinusCircleOutlined style={{marginLeft: 10}} onClick={() => iconOperation('reduce', index)}/>
                    <PlusCircleOutlined style={{marginLeft: 10}} onClick={() => handleAddStrategy(index)}/>
                  </div>
              </Form.Item>
            ))}
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
              <Form.Item
                {...tailLayout}
              >
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Button type="primary" onClick={handleAddBrackets}>
                    逻辑合并
                  </Button>
                  <Button type="primary" onClick={() => handleAddLogic('and')}>
                    逻辑与
                  </Button>
                  <Button type="primary" onClick={() => handleAddLogic('or')}>
                    逻辑或
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Modal>
        }
    </div>
  )
}

export default Semantic