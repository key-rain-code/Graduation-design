import { useEffect, useRef } from 'react'
import * as echarts from 'echarts';

function LineEcharts(props) {
  const echartsDom = useRef(null)

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
              data: ['02-19', '02-20', '02-21', '02-22', '02-23', '02-24', '02-25']
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
              data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
              name: '场景策略',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              emphasis: {
                  focus: 'series'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
              name: '自定义策略',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              emphasis: {
                  focus: 'series'
              },
              data: [150, 232, 201, 154, 190, 330, 410]
          }
      ]
  };

    option && myChart.setOption(option);
  }, [echartsDom])

  return (
    <div 
        ref={echartsDom} 
        style={{width: '100%', height: 'calc(100% - 180px)', padding: 30, marginTop: 20, boxShadow:'0px 2px 8px 0px rgb(6 14 26 / 8%)', borderRadius: 2, background: '#FFFFFF'}}
    >
    </div>
  )
}

export default LineEcharts