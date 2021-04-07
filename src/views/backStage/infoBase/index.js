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
            enterButton
            bordered={false}
            style={{boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2}}
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
            enterButton
            bordered={false}
            style={{boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', backgroundColor: '#FFFFFF', borderRadius: 2}}
          />
          <RangePicker 
            showTime 
            bordered={false}
            className='dt-rangepicker'
            />
          </div>
          <SendedTable />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default InfoBase