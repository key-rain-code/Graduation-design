import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';
import { _getCountWeek } from '../../../../http'

function LineEcharts(props) {
  const echartsDom = useRef(null)
  const [echartData, setEchartData] = useState({
    'accessInfo': [],
    'scenStrategy': [],
    'customStrategy': [],
    'success': false
  })

  const getBeforeDate = (day) => {
    const data = new Date(new Date().getTime() - day * 24 * 3600 * 1000);
    return formatTime(data.getMonth() + 1) + '-' + formatTime(data.getDate())
  }

  const formatTime = (value) => {
      if(value.toString()?.length<2) {
          return '0' + value
      } else {
          return value
      }
  }

  const apiGetCountWeek = async() => {
    const res = await _getCountWeek()
    const { status, data } = res
    if(!status === 200) return
    setEchartData({...data, success: true})
  }

  useEffect(() => {
    apiGetCountWeek()
  }, [])

  useEffect(() => {
    const { current: node } = echartsDom
    if(!node) return
    const myChart = echarts.init(node);
    
    const option = {
      title: {
          text: '变化趋势图'
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      legend: {
          data: ['接入信息', '场景策略', '自定义策略']
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: [
          {
              type: 'category',
              boundaryGap: false,
              data: [getBeforeDate(6), getBeforeDate(5), getBeforeDate(4), getBeforeDate(3), getBeforeDate(2), getBeforeDate(1), getBeforeDate(0)]
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: [
          {
              name: '接入信息',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              emphasis: {
                  focus: 'series'
              },
              data: echartData.accessInfo
          },
          {
              name: '场景策略',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              emphasis: {
                  focus: 'series'
              },
              data: echartData.scenStrategy
          },
          {
              name: '自定义策略',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              emphasis: {
                  focus: 'series'
              },
              data: echartData.customStrategy
          }
      ]
  };

    option && myChart.setOption(option);
  }, [echartsDom, echartData.success])

  return (
    <div 
        ref={echartsDom} 
        style={{width: '100%', height: 'calc(100% - 180px)', padding: 30, marginTop: 20, boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', borderRadius: 2, background: '#FFFFFF'}}
    >
    </div>
  )
}

export default LineEcharts