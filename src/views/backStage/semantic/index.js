import { useState, useEffect } from 'react'
import { Input, Button, Table, Select, Modal, Form, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { renderTime } from '../../until'
import { _getAllStrategyModel, _getDeleteStrategyModel, _getEditStrategyModel, _addStrategyModel } from '../../../http'

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
  const [dataSource, setDataSource] = useState([])
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [type, setType] = useState(undefined)
  const [editId, setEditId] = useState()
  const [form] = Form.useForm()

  const apiGetAllStrategyModel = async() => {
    const res = await _getAllStrategyModel({page, type, name: searchValue})
    const { status, data } = res
    if(!status === 200) return
    setDataSource(data)
  }

  const apiGetDeleteStrategyModel = async(id) => {
    const res = await _getDeleteStrategyModel({id})
    const { status } = res
    if(!status === 200) return
    message.success('删除成功！')
    apiGetAllStrategyModel()
  }

  useEffect(() => {
    apiGetAllStrategyModel()
  }, [page, searchValue, type])

  const handleEdit = (e, record) => {
    const { setFieldsValue } = form
    e.preventDefault()
    setVisible(true)
    setModalTitle(1)
    setFieldsValue(record)
    setStrategy(JSON.parse(record?.strategy_details))
    setEditId(record?.id)
  }

  const apiGetEditStrategyModel = async() => {
    const { getFieldValue } = form
    const params = {
      id: editId,
      name: getFieldValue('name'),
      describe: getFieldValue('describe'),
      type: getFieldValue('type'),
      strategy_result: getFieldValue('strategy_result'),
      strategy_details: JSON.stringify(strategy)
    }
    const res = await _getEditStrategyModel(params)
    const { status } = res
    if(!status === 200) return
    message.success('更新成功！')
    apiGetAllStrategyModel()
  }

  const apiAddStrategyModel = async() => {
    const { getFieldValue } = form
    const params = {
      name: getFieldValue('name'),
      describe: getFieldValue('describe'),
      type: getFieldValue('type'),
      strategy_result: getFieldValue('strategy_result'),
      strategy_details: JSON.stringify(strategy)
    }
    const res = await _addStrategyModel(params)
    const { status } = res
    if(!status === 200) return
    message.success('新增成功！')
    apiGetAllStrategyModel()
  }

  const columns = [
    {
      title: '策略名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '描述',
      dataIndex: 'describe',
      key: 'describe'
    },
    {
      title: '策略类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => text ? '自定义策略':'场景策略'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => renderTime(text)
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space>
          <a 
          href="#/"
          onClick={(e) => handleEdit(e, record)}
          >
            编辑
          </a>
          <a 
          href="#/"
          onClick={(e) =>{
            e.preventDefault()
            apiGetDeleteStrategyModel(record?.id)
           }}
          >
            删除
          </a>
        </Space>
      )
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
    const { resetFields } = form
    setVisible(false)
    resetFields()
    setStrategy([])
  }

  const handleAddBrackets = () => {
    const { setFieldsValue, getFieldValue } = form
    const newResult = '(' + getFieldValue('strategy_result') + ')'
    setFieldsValue({'strategy_result' : newResult})
  }

  const handleAddStrategy = (index) => {
    const { getFieldValue, setFieldsValue } = form
    const strategy = '策略'+ (index+1)
    const nowResult = getFieldValue('strategy_result')
    if(!nowResult) {
      setFieldsValue({'strategy_result' : strategy})
    } else {
      setFieldsValue({'strategy_result' : nowResult + strategy })
    }
  }

  const handleAddLogic = (operat) => {
    const { getFieldValue, setFieldsValue } = form
    const nowResult = getFieldValue('strategy_result')
    setFieldsValue({'strategy_result' : `${nowResult} ${operat} ` })
  }

  const handleSubmit = () => {
    if(modalTitle){
      apiGetEditStrategyModel()
    } else {
      apiAddStrategyModel()
    }
    handleCancel()
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
            onSearch={(value) => setSearchValue(value)}
            style={{boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2}}
          />
          <label>
            <span>
              策略类型：
            </span>
            <Select 
              bordered={false}
              onChange={value => setType(value)}
              allowClear
              style={{ width: 220, boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2 }}
              >
              <Option value={0}>场景策略</Option>
              <Option value={1}>自定义策略</Option>
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
        dataSource={dataSource} 
        className="auto-table"
        onChange={(page) => setPage(page)}
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
              <Button key="submit" type="primary" onClick={handleSubmit}>
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
              name="describe"
            >
              <TextArea rows={3} />
            </Form.Item>
            <Form.Item
              label="策略类型"
              name="type"
              rules={[{ required: true, message: '请选择策略类型！' }]}
            >
              <Select>
                <Option value={0}>场景策略</Option>
                <Option value={1}>自定义策略</Option>
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
                name="strategy_result"
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