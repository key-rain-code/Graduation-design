import { useState } from 'react'
import { Table, Modal, Form, Input, Space } from 'antd';

import { renderTime } from '../../../until'

const { TextArea } = Input

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const unitType = {1: 'G1'}

function SendedTable(props) {
  const { 
    dataSource,
    deleteInfo,
    unitArray,
    setParams
  } = props

  const [visible, setVisible] = useState(false)
  const [strategy, setStrategy] = useState([])
  const [form] = Form.useForm();

  const handleClick = (e, editId) => {
    e.preventDefault()
    setVisible(true)
    dataSource.forEach((item) => {
      const { id, strategy_details } = item
      if(id === editId){
        form.setFieldsValue(item)
        setStrategy(JSON.parse(strategy_details))
      }
    })
  }

  const handleOnChange = (pagination, filters) => {
    let params = {}
    Object.keys(filters).forEach((key) => {
        params[key] = filters[key]?.[0]
    })
    setParams({page: pagination?.current ? pagination?.current : 1, ...params })
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
      filters: unitArray?.map(({serial_number, id}) => ({text: serial_number, value: id})),
      filterMultiple: false,
      render: (text) => unitType[text]
    },
    {
      title: '下发时间',
      dataIndex: 'sendTime',
      key: 'sendTime',
      render: (text) => text? renderTime(text): '--'
    },
    // {
    //   title: '策略类型',
    //   dataIndex: 'strategyType',
    //   key: 'strategyType',
    //   filters: [
    //     {
    //       text: '场景策略',
    //       value: 'London',
    //     },
    //     {
    //       text: '自定义策略',
    //       value: 'New York',
    //     },
    //     {
    //       text: '自动采集',
    //       value: 'New York',
    //     }
    //   ],
    //   filterMultiple: false
    // },
    {
      title: '设置方式',
      dataIndex: 'strategy_status',
      key: 'strategy_status',
      filters: [
        {
          text: '手动策略',
          value: 1,
        },
        {
          text: '模型策略',
          value: 2,
        }
      ],
      filterMultiple: false,
      render: (text) => <span>{text === 1 ? '手动策略':'模型策略'}</span>
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Space>
          <a href="/#" onClick={e => { e.preventDefault(); deleteInfo(record?.id) }} >删除</a>
          <a href="/#" onClick={e => handleClick(e, record?.id)} >详情</a>
        </Space>
      )
    }
  ];

  return (
    <>
      <Table 
        columns={columns} 
        dataSource={dataSource} 
        onChange={handleOnChange}
        className="auto-table"
        style={{ boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2 }}
        />
        <Modal
          title="信息详情"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          footer={false}
        >
          <Form
            {...layout}
            form={form}
            name="basic"
          >
          <Form.Item
            label="内容"
            name="content"
          >
            <TextArea disabled rows={4}/>
          </Form.Item>

          <Form.Item
            label="密文"
            name="ciphertext"
          >
            <TextArea disabled rows={4}/>
          </Form.Item>

          <Form.Item
            label="策略结果"
            name="strategy_result"
          >
            <TextArea disabled rows={4}/>
          </Form.Item>

          <div style={{marginBottom: 8}}>策略标签</div>
          {strategy?.map((item,index) => (
                <Form.Item
                  // label={'策略'+(index+1)}
                  name={index+1}
                  >
                    <div style={{display: 'flex', alignItems: 'center'}}>

                      <Input value={item.name} disabled style={{width: 200, marginRight:10}}/>
                      ：
                      <Input value={item.value} disabled/>
                    </div>
                </Form.Item>
              ))}
          </Form>
        </Modal>
    </>
  )
}

export default SendedTable