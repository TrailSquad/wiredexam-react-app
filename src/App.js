import './App.css';
import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";
import setupWKWebViewJavascriptBridge from './jsBridge';

function App() {
  setupWKWebViewJavascriptBridge(function (bridge) {
    /* Initialize your app here */
    bridge.registerHandler('testJavascriptHandler', function (data, responseCallback) {
      console.log('iOS called testJavascriptHandler with', data);
      setValue(data);
      responseCallback({ 'Javascript received': data });
    });
  });

  const [value, setValue] = useState([120, 200, 150, 80, 70, 110, 131]);

  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [

      {
        data: value,
        type: 'line'
      }
    ]
  }; 

  return <ReactEcharts option={option} />;    
}

export default App;
