import { useState } from 'react'
import { Table, Modal, Form, Input } from 'antd';

const { TextArea } = Input

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

function SendedTable(props) {
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
      title: '下发时间',
      dataIndex: 'issueTime',
      key: 'issueTime'
    },
    {
      title: '策略类型',
      dataIndex: 'strategyType',
      key: 'strategyType',
      filters: [
        {
          text: '场景策略',
          value: 'London',
        },
        {
          text: '自定义策略',
          value: 'New York',
        },
        {
          text: '自动采集',
          value: 'New York',
        }
      ],
      filterMultiple: false
    },
    {
      title: '设置方式',
      dataIndex: 'setType',
      key: 'setType',
      filters: [
        {
          text: '手动',
          value: 'London',
        },
        {
          text: '自动',
          value: 'New York',
        }
      ],
      filterMultiple: false
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <a href="/#" onClick={e => handleClick(e)} >详情</a>
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

  return (
    <>
      <Table 
        columns={columns} 
        dataSource={data} 
        className="auto-table"
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
            name="basic"
          >
          <Form.Item
            label="内容"
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

export default SendedTable