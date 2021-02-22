import { Input, Tabs, DatePicker } from 'antd';

import SendedTable from './components/sendedTable'
import SendingTable from './components/sendingTable'

import './index.scss'

const { TabPane } = Tabs
const { Search } = Input
const { RangePicker } = DatePicker;

function InfoBase(props) {

  return (
    <div className="backStage-infoBase-main">
      <Tabs defaultActiveKey="1" >
        <TabPane tab="未发信息" key="1">
        <div className="infoBase-header">
          <Search
            className="dt-search"
            placeholder="请输入查询内容"
            allowClear
          />
          </div>
          <SendingTable />
        </TabPane>
        <TabPane tab="已发信息" key="2">
          <div className="infoBase-header">
          <Search
            className="dt-search"
            placeholder="请输入查询内容"
            allowClear
          />
            <RangePicker showTime />
          </div>
          <SendedTable />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default InfoBase