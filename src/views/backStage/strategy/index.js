import { useState } from 'react';
import { Input, Tag, Button, Modal, Form } from 'antd'
import './index.scss'

const { Search } = Input;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function Strategy(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const tagData = [{
    id: '1',
    text: 'magenta'
  }, {
    id: '2',
    text: 'red'
  }]

  return (
    <div className="backStage-strategy-main">
      <div className="strategy-header">
        <Search
          className="dt-search"
          placeholder="请输入关键词"
          allowClear
          enterButton
          bordered={false}
          style={{boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2}}
        />
        <Button type="primary" onClick={() => setIsModalVisible(true)}>增加</Button>
      </div>
      <div className="tags-div" style={{boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2}}>
        {tagData?.map(({id, text}, index) => (
          <Tag color={tagColor[index % 11]} closable key={id}>
            {text}
          </Tag>
        ))}
      </div>
      <div>
        <h2>示例</h2>
      </div>
      <Modal title="添加" visible={isModalVisible} onOk={() => setIsModalVisible(false)} onCancel={() => setIsModalVisible(false)}>
        <Form
        {...layout}
        name="basic"
        form={form}
      >
          <Form.Item
            label="标签"
            name="semanticsName"
            rules={[{ required: true, message: '请输入内容!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Strategy