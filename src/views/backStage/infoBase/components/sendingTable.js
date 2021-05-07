import { useState, useEffect } from 'react'
import { Table, Modal, Form, Input, Space, Radio, Select, Button, message } from 'antd'
import { MinusCircleOutlined, PlusOutlined, PlusCircleOutlined } from '@ant-design/icons'

import { _getAllStrategy, _setInfoStrategy } from '../../../../http'

import { renderTime } from '../../../until'
import axios from 'axios'

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

// console.log((async() =>{const res = await axios.get('http://47.114.104.103:8081/Test/Tokeygen?attr=a,b,c&license=123');console.log(res.data)})())

const infoType = ["车辆安全与控制服务", "出行服务", "公共交通服务", "交通管理服务", "停车管理服务", "公共安全服务", "货运车辆管理服务", "养护施工服务", "气象服务", "数据管理服务", "支持系统服务"]
const unitType = {1: 'G1'}

function SendingTable(props) {
  const {
    dataSource,
    unitArray,
    deleteInfo,
    apiGetAllInfoList
  } = props

  const [visible, setVisible] = useState(false)
  const [strategyModel, setStrategyModel] = useState([])
  const [strategy, setStrategy] = useState([])
  const [setType, setSetType] = useState(1)
  const [modelId, setModelId] = useState(undefined)
  const [editId, setEditId] = useState(undefined)
  const [plaintext, setPlaintext] = useState('')
  const [form] = Form.useForm();

  const handleClick = (e, setId) => {
    e.preventDefault()
    setVisible(true)
    setEditId(setId)
    setSetType(1)
    form.setFieldsValue({'strategy_status': 1})
    dataSource.forEach((item) => {
      const {id, strategy_status, strategy_details, strategyModel_id} = item
      if(setId === id && strategy_status){
        form.setFieldsValue(item)
        setSetType(strategy_status)
        setStrategy(JSON.parse(strategy_details))
        setModelId(strategyModel_id)
      }
    })
  }

  const apiGetAllStrategy = async() => {
    const res = await _getAllStrategy()
    const { status, data } = res
    if(!status === 200) return
    setStrategyModel(data)
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
    const nowResult = getFieldValue('strategy_result')
    if(!nowResult) {
      setFieldsValue({'strategy_result' : strategy})
    } else {
      setFieldsValue({'strategy_result' : nowResult + strategy })
    }
  }

  const handleAddBrackets = () => {
    const { setFieldsValue, getFieldValue } = form
    const newResult = '(' + getFieldValue('strategy_result') + ')'
    setFieldsValue({'strategy_result' : newResult})
  }

  const handleAddLogic = (operat) => {
    const { getFieldValue, setFieldsValue } = form
    const nowResult = getFieldValue('strategy_result')
    setFieldsValue({'strategy_result' : `${nowResult} ${operat} ` })
  }

  const handleOnChange = (pagination, filters) => {
    const { setParams } = props
    let params = {}
    Object.keys(filters).forEach((key) => {
        params[key] = filters[key]?.[0]
    })
    setParams({page: pagination?.current ? pagination?.current : 1, ...params })
  }

  const handleCancel = () => {
    const { resetFields } = form
    resetFields()
    setVisible(false)
    setStrategy([])
  }

  const handleSetModel = (value) => {
    setModelId(value)
    strategyModel.forEach(({id, strategy_details, strategy_result}) => {
      if(id === value){
        setStrategy(JSON.parse(strategy_details))
        form.setFieldsValue({strategy_result})
      }
    })
  }

  const handleSave = async(value) => {
    let infoPolicy = ''
    let result = form.getFieldValue('strategy_result').split(' ')
    for(let i=0; i<result?.length; i++){
      if(['and','or'].includes(result[i])){
        infoPolicy=infoPolicy+ ' ' + result[i] + ' '
      } else {
        let detail = result[i]
        for(let j=0; j<detail?.length; j++){
          if(['(',')'].includes(detail[j])){
            infoPolicy = infoPolicy + detail[j]
          }
          if(!isNaN(+detail[j])){
            infoPolicy = infoPolicy + strategy[+detail[j]-1]?.value
          }
        }
      }
    }
    try{
      const ciphertext = await axios.get(`http://47.114.104.103:8081/Test/Toservlet?info=${plaintext}&infoPolicy=${infoPolicy}`)
      const res = await _setInfoStrategy({...form.getFieldsValue(), ...{is_send: value, id: editId, strategy_details: JSON.stringify(strategy), ciphertext: ciphertext?.data}})
      const { status } = res
      if(!status === 200) return
      message.success('策略设置成功！')
      handleCancel()
      apiGetAllInfoList()
    }catch(err){
      console.log(err)
      message.warn('策略设置不合法！')
    }
  }

  useEffect(() => {
    apiGetAllStrategy()
  }, [])

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
      filters: unitArray?.map(({serial_number, id}) => ({text: serial_number, value: id})),
      filterMultiple: false,
      render: (text) => unitType[text]
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => renderTime(text)
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      filters: [...infoType].map((item, index) => ({text: item, value: index})),
      filterMultiple: false,
      render: (text) => infoType[text]
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
          <a href="/#" onClick={e => {handleClick(e, record?.id);setPlaintext(record?.content)}} >设置</a>
          <a href="/#" onClick={e => { e.preventDefault(); deleteInfo(record?.id) }}>删除</a>
        </Space>
      )
    }
  ];

  return (
    <>
      <Table 
        columns={columns} 
        dataSource={dataSource} 
        className="auto-table"
        onChange={handleOnChange}
        style={{ boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2 }}
        />
        <Modal
          title="策略设置"
          centered
          visible={visible}
          onOk={() => setVisible(true)}
          onCancel={handleCancel}
          footer={[
            <Button onClick={handleCancel}>取消</Button>,
            <Button type="primary" onClick={() => handleSave(0)}>保存</Button>,
            <Button type="primary" onClick={() => handleSave(1)}>发布</Button>
          ]}
        >
          <Form
            {...layout}
            form={form}
            name="basic"
          >
          <Form.Item
            label="设置方式"
            name="strategy_status"
          >
            <Group onChange={({target: { value }}) => {setSetType(value);setModelId(undefined);form.resetFields(['strategyModel_id','strategy_result']);setStrategy([])}}>
              <Radio value={1}>手动</Radio>
              <Radio value={2}>自动</Radio>
            </Group>
          </Form.Item>

          { setType === 2 ?
            (
              <>
              <Form.Item
                label="策略元模型"
                name="strategyModel_id"        
                >
                  <Select onChange={value => handleSetModel(value)}>
                    {strategyModel?.map(({name, id}) => (<Option value={id}>{name}</Option>))}
                  </Select>
              </Form.Item>
              {modelId &&
              <Form.Item
                label="策略标签"
                >
                  <Button type="dashed" onClick={() => iconOperation('add')} block icon={<PlusOutlined />}>
                    Add
                  </Button>
              </Form.Item>}
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
                {modelId&&
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
                </Form.Item>}
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
            ):(
              <>
                <Form.Item
                label="策略标签"
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
              </>
            )
          }
          </Form>
        </Modal>
    </>
  )
}

export default SendingTable