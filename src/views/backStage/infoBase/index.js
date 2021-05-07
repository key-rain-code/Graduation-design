import { useState, useEffect } from 'react'
import { Input, Tabs, DatePicker, Button, Modal, Form, Select } from 'antd';

import SendedTable from './components/sendedTable'
import SendingTable from './components/sendingTable'

import { _getAllRusList, _getAllInfoList, _addSendingInfo, _deleteInfo } from '../../../http'
import './index.scss'

const { TabPane } = Tabs
const { Search } = Input
const { Option } = Select
const { RangePicker } = DatePicker;
const { TextArea } = Input

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const infoType = ["车辆安全与控制服务", "出行服务", "公共交通服务", "交通管理服务", "停车管理服务", "公共安全服务", "货运车辆管理服务", "养护施工服务", "气象服务", "数据管理服务", "支持系统服务"]

function InfoBase(props) {
  const [visibile, setVisibile] = useState(false)
  const [unitArray, setUnitArray] = useState([])
  const [dataSource, setDataSource] = useState([])
  const [params, setParams] = useState({page: 1})
  const [is_send, setIs_send] = useState(0)
  const [form] = Form.useForm()

  const handleCacel = () => {
    const { resetFields } = form
    setVisibile(false)
    resetFields()
  }

  const apiGetAllRusList = async() => {
    const res = await _getAllRusList()
    const { status, data } = res
    if(!status === 200) return
    setUnitArray(data)
  }

  const apiGetAllInfoList = async() => {
    const res = await _getAllInfoList({...params, is_send})
    const { status, data } = res
    if(!status === 200) return
    setDataSource(data)
  }

  const apiAddSendingInfo = async() => {
    const { getFieldsValue } = form
    const res = await _addSendingInfo(getFieldsValue())
    const { status } = res
    if(!status === 200) return
    apiGetAllInfoList()
    handleCacel()
  }

  const apiDeleteInfo = async(id) => {
    const res = await _deleteInfo({id})
    const { status } = res
    if(!status === 200) return
    apiGetAllInfoList()
  }

  useEffect(() => {
    apiGetAllRusList()
  }, [])

  useEffect(() => {
    apiGetAllInfoList()
  }, [params, is_send])

  return (
    <div className="backStage-infoBase-main">
      <Tabs defaultActiveKey="0" onChange={(activeKey) => {setIs_send(+activeKey);setDataSource([]);setParams({page:1})}}>
        <TabPane tab="未发信息" key="0">
        <div className="infoBase-header" style={{justifyContent: 'space-between'}}>
          <Search
            className="dt-search"
            placeholder="请输入查询内容"
            allowClear
            enterButton
            bordered={false}
            onSearch={(value) => setParams({...params, content: value})}
            style={{boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2}}
          />
          <Button type="primary" onClick={() => setVisibile(true)}>添加信息</Button>
        </div>
        <SendingTable 
          unitArray={unitArray} 
          setParams={(values) => setParams({...params, ...values})} 
          dataSource={dataSource} 
          deleteInfo={apiDeleteInfo}
          apiGetAllInfoList={apiGetAllInfoList}
        />
        </TabPane>
        <TabPane tab="已发信息" key="1">
          <div className="infoBase-header">
          <Search
            className="dt-search"
            placeholder="请输入查询内容"
            allowClear
            enterButton
            bordered={false}
            onSearch={(value) => setParams({...params, content: value})}
            style={{boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2}}
          />
          <RangePicker 
            showTime 
            bordered={false}
            className='dt-rangepicker'
            style={{display: 'none'}}
            />
          </div>
          <SendedTable 
            unitArray={unitArray} 
            setParams={(values) => setParams({...params, ...values})} 
            dataSource={dataSource}
            deleteInfo={apiDeleteInfo} 
            />
        </TabPane>
      </Tabs>
      <Modal 
        title="添加信息" 
        visible={visibile} 
        onOk={apiAddSendingInfo} 
        onCancel={handleCacel}
      >
        <Form
          {...layout}
          name="basic"
          form={form}
        >
            <Form.Item
              label="信息内容"
              name="content"
              rules={[{ required: true, message: '请输入内容!' }]}
            >
              <TextArea rows={3}/>
            </Form.Item>
            <Form.Item
              label="下发单元"
              name="unit"
              rules={[{ required: true, message: '请输入内容!' }]}
            >
              <Select>
                {unitArray?.map(({serial_number, id}) => (<Option value={id}>{serial_number}</Option>))}
              </Select>
            </Form.Item>
            <Form.Item
              label="信息类型"
              name="type"
              rules={[{ required: true, message: '请输入内容!' }]}
            >
              <Select>
                {infoType?.map((item, index) => (
                  <Option value={index}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
      </Modal>
    </div>
  )
}

export default InfoBase