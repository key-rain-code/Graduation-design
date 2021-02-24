import { Input, Tag, Button } from 'antd'
import './index.scss'

const { Search } = Input;

function Strategy(props) {

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
        <Button type="primary">增加</Button>
      </div>
      <div className="tags-div" style={{boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2}}>
        <Tag color="magenta" closable>magenta</Tag>
        <Tag color="red" closable>red</Tag>
        <Tag color="volcano" closable>volcano</Tag>
        <Tag color="orange" closable>orange</Tag>
        <Tag color="gold" closable>gold</Tag>
        <Tag color="lime" closable>lime</Tag>
        <Tag color="green" closable>green</Tag>
        <Tag color="cyan" closable>cyan</Tag>
        <Tag color="blue" closable>blue</Tag>
        <Tag color="geekblue" closable>geekblue</Tag>
        <Tag color="purple" closable>purple</Tag>
        <Tag color="magenta" closable>magenta</Tag>
        <Tag color="red" closable>red</Tag>
        <Tag color="volcano" closable>volcano</Tag>
        <Tag color="orange" closable>orange</Tag>
        <Tag color="gold" closable>gold</Tag>
        <Tag color="lime" closable>lime</Tag>
        <Tag color="green" closable>green</Tag>
        <Tag color="cyan" closable>cyan</Tag>
        <Tag color="blue" closable>blue</Tag>
        <Tag color="geekblue" closable>geekblue</Tag>
        <Tag color="purple" closable>purple</Tag>
      </div>
      <div>
        <h2>示例</h2>
      </div>
    </div>
  )
}

export default Strategy