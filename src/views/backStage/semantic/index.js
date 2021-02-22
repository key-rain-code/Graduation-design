import { Table, Tag, Space, Tabs } from 'antd';

import './index.scss'

const { TabPane } = Tabs;

function Semantic(props) {
  return (
    <div>
      <Tabs defaultActiveKey="1" >
        <TabPane tab="场景策略" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="自定义策略" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Semantic