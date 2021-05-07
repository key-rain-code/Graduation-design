import { useState, useEffect } from 'react';
import { Input, Tag, Button, Modal, Form, message } from 'antd'
import { _getAllAttrList, _searchAttr, _deleteAttr, _addAttr } from '../../../http'
import './index.scss'

const { Search, TextArea } = Input;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function Strategy(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [attrArr, setAttrArr] = useState([])
  const [edit, setEdit] = useState(false)
  const [form] = Form.useForm()

  const tagColor = [
    'magenta', 
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple'
  ]

  const apiGetAllAttrList = async() => {
    const res = await _getAllAttrList()
    const { status, data } = res
    if(!status === 200) return
    setAttrArr(data)
  }

  const handleCheckDetail = (index) => {
    const { setFieldsValue } = form
    setIsModalVisible(true)
    setFieldsValue(attrArr[index])
    setEdit(false)
  }

  const handleCancel = () => {
    const { resetFields } = form
    resetFields()
    setIsModalVisible(false)
  }

  const apiSearchAttr = async(name) => {
    const res = await _searchAttr({name})
    const { status, data } = res
    if(!status === 200) return
    setAttrArr(data)
  }

  const apiDeleteAttr = async(id) => {
    const res = await _deleteAttr({id})
    const { status } = res
    if(!status === 200) return
    message.success('删除成功！')
    apiGetAllAttrList()
  }

  const apiAddAttr = async(params) => {
    const res = await _addAttr(params)
    const { status } = res
    if(!status === 200) return
    message.success('增加成功！')
    apiGetAllAttrList()
  }

  const handleSubmit = () => {
    const { getFieldsValue } = form
    if(edit) {
      apiAddAttr(getFieldsValue())
    }
    handleCancel()
  }

  useEffect(() => {
    apiGetAllAttrList()
  },[])

  return (
    <div className="backStage-strategy-main">
      <div className="strategy-header">
        <Search
          className="dt-search"
          placeholder="请输入关键词"
          allowClear
          enterButton
          bordered={false}
          onSearch={(value) => value?apiSearchAttr(value):apiGetAllAttrList()}
          style={{boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2}}
        />
        <Button type="primary" onClick={() => {setIsModalVisible(true);setEdit(true)}}>增加</Button>
      </div>
      <div className="tags-div" style={{boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2}}>
        {attrArr?.map(({id, name}, index) => (
          <Tag 
            color={tagColor[index % 11]} 
            closable 
            key={id} 
            style={{cursor: 'pointer'}}
            onClose={() => apiDeleteAttr(id)}
            onClick={() => handleCheckDetail(index)}
          >
            {name}
          </Tag>
        ))}
      </div>
      <div>
        <h2>信息属性提取示例</h2>
        <div style={{display: 'flex'}}>
          <div style={{width: '50%'}}>
            <h4>
              信息1：驶向萍水街道路的车辆请把车速降低至60km/h
            </h4>
            <h4>
              信息2：驶向萍水街道路的车辆请把车辆的速度速降低至60km/h
            </h4>
          </div>
          <h4 style={{width: '50%', textAlign: 'center', alignItems: 'center', lineHeight: '58px'}}>
            属性标准：车速
          </h4>
        </div>
      </div>
      <Modal 
        title={edit? '新增':'详情'} 
        visible={isModalVisible} 
        onOk={() => handleSubmit()} 
        onCancel={() => handleCancel()}
      >
        <Form
        {...layout}
        name="basic"
        form={form}
      >
          <Form.Item
            label="属性名"
            name="name"
            rules={[{ required: true, message: '请输入内容!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="描述"
            name="describe"
          >
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Strategy