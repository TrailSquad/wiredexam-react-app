import React from "react";
import ReactEcharts from "echarts-for-react";

function Fps(props) {
  const option = {
    xAxis: {
      type: 'category',
      data: props.xValues
    },
    yAxis: {
      type: 'value'
    },
    series: [

      {
        data: props.data,
        type: 'line'
      }
    ]
  }; 

  return (
  <div>
    <h3>FPS</h3>
    <ReactEcharts option={option} />
  </div>
  )
}

export default Fps;