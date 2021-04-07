import { useState } from 'react';
import { Input, Tag, Button, Modal, Form, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.scss'

const modalLayout  = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16
  }
}

function Verification(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalForm] = Form.useForm()
  const [currentCar, setCurrentCar] = useState(0)
  const [dynamicLabel, setDynamicLabel] = useState('')
  const [carAttr, setCarAttr] = useState([
    {
      license_plate: '浙A·F8976',
      attribution: 'HangZhou',
      type: 'Car',
      unit: undefined,
      speed: undefined,
      key: '',
      secret: '',
      plaintext: '',
      dynamic: []
    },
    {
      license_plate: '浙A·F8977',
      attribution: 'HangZhou',
      type: 'Ambulance',
      unit: undefined,
      speed: undefined,
      key: '',
      secret: '',
      plaintext: '',
      dynamic: []
    },
    {
      license_plate: '浙A·F8978',
      attribution: 'HangZhou',
      type: 'Ambulance',
      unit: undefined,
      speed: undefined,
      key: '',
      secret: '',
      plaintext: '',
      dynamic: []
    },
    {
      license_plate: '浙A·F8979',
      attribution: 'HangZhou',
      type: 'Car',
      unit: undefined,
      speed: undefined,
      key: '',
      secret: '',
      plaintext: '',
      dynamic: []
    }
  ])

  const handleAddAttr = () => {
    let newCarAttr = [...carAttr]
    newCarAttr[currentCar].dynamic.push({label: dynamicLabel, value: ''})
    setCarAttr(newCarAttr)
    setDynamicLabel('')
  }

  const handleChange = (index, value) => {
    let newCarAttr = [...carAttr]
    newCarAttr[currentCar].dynamic[index].value = value
    setCarAttr(newCarAttr)
  }

  const onSubmit = () => {
    const { resetFields, getFieldValue } = modalForm
    let newCarAttr = [...carAttr]
    newCarAttr[currentCar].unit = getFieldValue('unit')
    newCarAttr[currentCar].speed = getFieldValue('speed')
    setModalVisible(false)
    resetFields()
  }

  const handleSetCarAttr = (index) => {
    const { setFieldsValue } = modalForm
    setModalVisible(true)
    setCurrentCar(index)
    setFieldsValue(carAttr[index])
  }

  const handleMockShare = () => {

  }

  return (
    <div className="backStage-verification-main">
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>紧急救护场景分发模拟</h2>
        <Button type="primary" onClick={handleMockShare}>
          分发模拟
        </Button>
      </div>
      <div className="main-content">
        <div className="width-50">
          <img src='Car.jpg' alt='' className="img-150" onClick={() => handleSetCarAttr(0)}/>
          <label>{carAttr[0].plaintext}</label>
        </div>
        <div className="width-50">
          <img src='Ambulance.jpg' alt='' className="img-150" onClick={() => handleSetCarAttr(1)}/>
          <label>{carAttr[1].plaintext}</label>
        </div>
        <div className="width-100">
          <img src='Rus.jpg' alt='' style={{width: '380px'}}/>
        </div>
        <div className="width-50">
          <img src='Ambulance.jpg' alt='' className="img-150" onClick={() => handleSetCarAttr(2)}/>
          <label>{carAttr[2].plaintext}</label>
        </div>
        <div className="width-50">
          <img src='Car.jpg' alt='' className="img-150" onClick={() => handleSetCarAttr(3)}/>
          <label>{carAttr[3].plaintext}</label>
        </div>
      </div>
      {modalVisible&&
      <Modal 
        title="新增属性" 
        visible={modalVisible}
        onOk={onSubmit} 
        onCancel={() => setModalVisible(false)}>
        <Form
          {...modalLayout}
          name="basic"
          form={modalForm}
        >
          <h3>基本属性</h3>
          <Form.Item
            label="车牌"
            name="license_plate"
          >
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item
            label="归属地"
            name="attribution"
          >
            <Select disabled={true}></Select>
          </Form.Item>
          <Form.Item
            label="车型"
            name="type"
          >
            <Input disabled={true}/>
          </Form.Item>
          <h3>动态属性</h3>
          <Form.Item
            label="下发单元"
            name="unit"
          >
            <Select></Select>
          </Form.Item>
          <Form.Item
            label="车速"
            name="speed"
          >
            <Input suffix="km/h"/>
          </Form.Item>
          {carAttr[currentCar].dynamic?.map((item, index) => {
            const { label, value } = item
            return (
              <Form.Item
                label={label}
                name={index}
                initialValue={value}
              >
                <Input onChange={({ target: { value } }) => handleChange(index,value)}/>
              </Form.Item>
            )
            }
          )}
          <Form.Item
            {...tailLayout}  
          >
            <Space style={{display: 'flex'}}>
              <Input allowClear value={dynamicLabel} onChange={({ target: { value } }) => setDynamicLabel(value)}/>
              <Button 
                type="dashed" 
                onClick={handleAddAttr} block icon={<PlusOutlined />}
                style={{width: '120px'}}
              >
                Add
              </Button>
            </Space>
            </Form.Item>
        </Form>
      </Modal>}
    </div>
  )
}

export default Verification