import './App.css';
import React from "react";
import ReactEcharts from "echarts-for-react";
import setupWKWebViewJavascriptBridge from './jsBridge';

function App() {
  setupWKWebViewJavascriptBridge(function (bridge) {
    /* Initialize your app here */
    bridge.registerHandler('testJavascriptHandler', function (data, responseCallback) {
      console.log('iOS called testJavascriptHandler with', data);
      value = data;
      responseCallback({ 'Javascript received': data });
    });
  });

  let value = [120, 200, 150, 80, 70, 110, 130];

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
