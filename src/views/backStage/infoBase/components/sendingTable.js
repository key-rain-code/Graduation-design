import { useState } from 'react'
import { Table, Modal, Form, Input, Space } from 'antd';

const { TextArea } = Input

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

function SendingTable(props) {
  const [visible, setVisible] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    setVisible(true)
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
      type: '天灾路况类'
    }
  ];

  return (
    <>
      <Table 
        columns={columns} 
        dataSource={data} 
        className="auto-table"
        />
        <Modal
          title="策略设置"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          footer={false}
        >
          <Form
            {...layout}
            name="basic"
          >
          <Form.Item
            label="设置方式"
            name="username"
          >
            <TextArea disabled rows={4}/>
          </Form.Item>

          <Form.Item
            label="密文"
            name="password"
          >
            <TextArea disabled rows={4}/>
          </Form.Item>

          <Form.Item
            label="策略"
            name="password"
          >
            <TextArea disabled rows={4}/>
          </Form.Item>

          </Form>
        </Modal>
    </>
  )
}

export default SendingTable