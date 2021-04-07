import { useState } from 'react'
import { Table, Modal, Form, Input, Space, Radio, Select, Button } from 'antd'
import { MinusCircleOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons'


const { Group } = Radio
const { Option } = Select
const { TextArea } = Input

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16
  }
}

function SendingTable(props) {
  const [visible, setVisible] = useState(false)
  const [setType, setSetType] = useState(0)
  const [strategy, setStrategy] = useState([])
  const [form] = Form.useForm();

  const handleClick = (e) => {
    e.preventDefault()
    setVisible(true)
  }

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

  const handleAddBrackets = () => {
    const { setFieldsValue, getFieldValue } = form
    const newResult = '(' + getFieldValue('result') + ')'
    setFieldsValue({'result' : newResult})
  }

  const handleAddLogic = (operat) => {
    const { getFieldValue, setFieldsValue } = form
    const nowResult = getFieldValue('result')
    setFieldsValue({'result' : `${nowResult} ${operat} ` })
  }

  const columns = [
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      width: 300
    },
    {
      title: '下发单元',
      dataIndex: 'unit',
      key: 'unit',
      filters: [
        {
          text: 'G11',
          value: 'London',
        },
        {
          text: 'G22',
          value: 'New York',
        }
      ],
      filterMultiple: false
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      filters: [
        {
          text: '车距类',
          value: '0'
        },
        {
          text: '车速类',
          value: '1'
        },
        {
          text: '天灾路况类',
          value: '2'
        },
        {
          text: '节日路况类',
          value: '3'
        },
        {
          text: '事故路况类',
          value: '4'
        },
        {
          text: '普通路况类',
          value: '5'
        },
        {
          text: '新闻类',
          value: '6'
        },
        {
          text: '娱乐类',
          value: '7'
        }
      ],
      filterMultiple: false
    },
    {
      title: '策略设置状态',
      dataIndex: 'strategy_status',
      key: 'strategy_status',
      render: (text) => <span>{text ? '已设置':'未设置'}</span>
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space>
          <a href="/#" onClick={e => handleClick(e)} >设置</a>
          <a href="/#">忽略</a>
        </Space>
      )
    }
  ];
  
  const data = [
    {
      key: '1',
      content: '萍水街发生拥堵福建省开发技术开发和健康烦恼是会计法',
      unit: 'G11',
      strategy_status: 0,
      type: '天灾路况类'
    }
  ];

  return (
    <>
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
          footer={[
            <Button>取消</Button>,
            <Button type="primary">保存</Button>,
            <Button type="primary">发布</Button>
          ]}
        >
          <Form
            {...layout}
            form={form}
            name="basic"
          >
          <Form.Item
            label="设置方式"
            name="setType"
            initialValue={0}
          >
            <Group onChange={({target: { value }}) => setSetType(value)}>
              <Radio value={0}>手动</Radio>
              <Radio value={1}>自动</Radio>
            </Group>
          </Form.Item>

          { setType ?
            (<Form.Item
              label="策略元模型"
              name="password"        
              >
                <Select defaultValue="lucy">
                  <Option value="jack">场景策略1</Option>
                  <Option value="lucy">场景策略2</Option>
                </Select>
            </Form.Item>
            ):(
              <>
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
              </>
            )
          }

          </Form>
        </Modal>
    </>
  )
}

export default SendingTable