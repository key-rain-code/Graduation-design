import { useState, useEffect } from 'react';
import { Input, Button, Modal, Form, Select, Space, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { _getAllRusList, _getRsuInfo } from '../../../http'
import axios from 'axios'
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

const { TextArea } = Input
const { Option } = Select

function Verification(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalForm] = Form.useForm()
  const [currentCar, setCurrentCar] = useState(0)
  const [dynamicLabel, setDynamicLabel] = useState('')
  const [unitArray, setUnitArray] = useState([])
  const [rsuModel, setRsuModel] = useState(false)
  const [infoArray, setInfoArray] = useState([])
  const [unit, setUnit] = useState(undefined)
  const [carAttr, setCarAttr] = useState([
    {
      license: '浙A·F8976',
      attribution: 'HangZhou',
      type: 'Car',
      speed: undefined,
      key: '',
      secret: '',
      plaintext: [],
      vehicle: '',
      dynamic: []
    },
    {
      license: '浙A·F8977',
      attribution: 'HangZhou',
      type: 'Ambulance',
      speed: undefined,
      key: '',
      secret: '',
      vehicle: '',
      plaintext: [],
      dynamic: []
    },
    {
      license: '浙A·F8978',
      attribution: 'HangZhou',
      type: 'Ambulance',
      speed: undefined,
      key: '',
      secret: '',
      vehicle: '',
      plaintext: [],
      dynamic: []
    },
    {
      license: '浙A·F8979',
      attribution: 'HangZhou',
      type: 'Car',
      speed: undefined,
      key: '',
      secret: '',
      vehicle: '',
      plaintext: [],
      dynamic: []
    }
  ])

  const handleAddAttr = () => {
    let newCarAttr = [...carAttr]
    newCarAttr[currentCar].dynamic.push({label: dynamicLabel, value: ''})
    setCarAttr(newCarAttr)
    setDynamicLabel('')
  }

  const apiGetAllRusList = async() => {
    const res = await _getAllRusList()
    const { status, data } = res
    if(!status === 200) return
    setUnitArray(data)
  }

  const handleChange = (index, value) => {
    let newCarAttr = [...carAttr]
    newCarAttr[currentCar].dynamic[index].value = value
    setCarAttr(newCarAttr)
  }

  // const onSubmit = () => {
  //   const { resetFields, getFieldValue } = modalForm
  //   let newCarAttr = [...carAttr]
  //   newCarAttr[currentCar].speed = getFieldValue('speed')
  //   setModalVisible(false)
  //   resetFields()
  // }

  const handleSetCarAttr = (index) => {
    const { setFieldsValue } = modalForm
    setModalVisible(true)
    setCurrentCar(index)
    setFieldsValue(carAttr[index])
  }

  const handleMockShare = async() => {
    const res = await _getRsuInfo({unit, 'carAttr': carAttr.map(({license,vehicle}) => ({license, vehicle}))})
    const { status, data } = res
    if(!status === 200) return
    if(data?.length > 0){
      const { content, strategy_details = [] } = data?.[0]
      const infoStrategy = JSON.parse(strategy_details)
      carAttr.forEach(({type, dynamic, speed}, index) => {
        let flag = true
        infoStrategy.forEach(({name, value}) => {
          if(name === '车速'&&speed !== value) {
            flag = false
          }
          if(name === '车辆类型'&&type !== value) {
              flag = false
          } else {
            dynamic.forEach(({name: carName, value: carValue}) => {
              if(name === carName && value !== carValue){
  
                flag = false
              }
            })
          }
        })
        if(flag) {
          let newCarAttr = [...carAttr]
          newCarAttr[index].plaintext = [content]
          setCarAttr(newCarAttr)
        }
      })
    }
  }

  const handleFinish = async() => {
    const currentCarInfo = carAttr[currentCar]
    const license = currentCarInfo?.license
    let attr = ''
    const formValues = modalForm.getFieldsValue()
    Object.keys(formValues).forEach((key) => {
      if(formValues?.[key]){
        attr = attr + formValues?.[key] + ','
      }
    })
    attr = attr.substring(0, attr?.length -1)
    attr = attr.replace(license + ',', '')
    try{
      const result = await axios.get(`http://47.114.104.103:8081/Test/Tokeygen?attr=${attr}&license=${license}`)
      const newCarAttr = [...carAttr]
      newCarAttr[currentCar].key = result?.data
      newCarAttr[currentCar].vehicle = attr
      newCarAttr[currentCar].speed = modalForm.getFieldValue('speed')
      setCarAttr(newCarAttr)
    } catch(err) {
      message.warn('车辆属性设置有误！')
    }
  }

  useEffect(() => {
    apiGetAllRusList()
  }, [])

  return (
    <div className="backStage-verification-main">
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <h2>紧急救护场景分发模拟</h2>
        <label>
            <span>
              所在单元：
            </span>
          <Select 
            bordered={false}
            onChange={value => setUnit(value)}
            allowClear
            style={{ width: 220, boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2 }}
          >
              {unitArray?.map(({serial_number, id}) => (<Option value={id}>{serial_number}</Option>))}
          </Select>
        </label>
        <Button type="primary" onClick={handleMockShare}>
          分发模拟
        </Button>
      </div>
      <div className="main-content">
        <div className="width-50">
          <img src='Car.jpg' alt='' className="img-150" onClick={() => handleSetCarAttr(0)}/>
          {carAttr[0].plaintext.map((item) => (<label>{item}<br /></label>))}
        </div>
        <div className="width-50">
          <img src='Ambulance.jpg' alt='' className="img-150" onClick={() => handleSetCarAttr(1)}/>
          {carAttr[1].plaintext.map((item) => (<label>{item}<br /></label>))}
        </div>
        <div className="width-100">
          <img src='Rus.jpg' alt='' style={{width: '380px', cursor: 'pointer'}} />
        </div>
        <div className="width-50">
          <img src='Ambulance.jpg' alt='' className="img-150" onClick={() => handleSetCarAttr(2)}/>
          {carAttr[2].plaintext.map((item) => (<label>{item}<br /></label>))}
        </div>
        <div className="width-50">
          <img src='Car.jpg' alt='' className="img-150" onClick={() => handleSetCarAttr(3)}/>
          {carAttr[3].plaintext.map((item) => (<label>{item}<br /></label>))}
        </div>
      </div>
      {modalVisible&&
      <Modal 
        title="新增属性" 
        visible={modalVisible}
        // onOk={onSubmit} 
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button onClick={() => setModalVisible(false)}>取消</Button>,
          <Button type="primary" onClick={handleFinish}>完成</Button>
          // <Button type="primary" onClick={{onSubmit}}>确定</Button>
        ]}
        >
        <Form
          {...modalLayout}
          name="basic"
          form={modalForm}
        >
          <h3>基本属性</h3>
          <Form.Item
            label="车牌"
            name="license"
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
            label="车速"
            name="speed"
          >
            <Input />
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
            <h3>私钥</h3>
            <Form.Item
              {...{
                wrapperCol: {
                  offset: 2,
                  span: 20
                }
              }}
              >
                <TextArea rows={3} disabled value={carAttr[currentCar].key}/>
              </Form.Item>
        </Form>
      </Modal>}
    </div>
  )
}

export default Verification