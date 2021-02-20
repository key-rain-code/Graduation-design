import { useEffect, useRef } from 'react'
import * as echarts from 'echarts';

function BarEcharts(props) {
  const { title } = props
  const echartsDom = useRef(null)

  useEffect(() => {
    const { current: node } = echartsDom
    if(!node) return
    const myChart = echarts.init(node);
    
    const option = {
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        title: {
          text: title,
          left: "center"
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
    };

    option && myChart.setOption(option);
  }, [echartsDom, title])

  return (
    <div ref={echartsDom} style={{width: '100%', height: 220}}></div>
  )
}

export default BarEcharts