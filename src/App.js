import './App.css';
import React, { useState } from "react";
import setupWKWebViewJavascriptBridge from './jsBridge';
import Fps from './Fps';
import ReportHeader from './ReportHeader/ReportHeader';
import ReportCover from "./Cover/ReportCorver"

function App() {
  setupWKWebViewJavascriptBridge(function (bridge) {
    /* Initialize your app here */
    bridge.registerHandler('testJavascriptHandler', function (data, responseCallback) {
      console.log('iOS called testJavascriptHandler with', data);
      setValue(data);
      responseCallback({ 'Javascript received': data });
    });
  });

  const [value, setValue] = useState(
    {
      "fps": {
        "xValues": [12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7],
        "data": [120, 200, 150, 80, 70, 110, 130]
      }
    }
  ) 

  // const {reportName, appName, deviceSys, fromPpace, publishDate} = this.props;
  return (
    <div class="md:container md:mx-auto">
      <ReportCover reportName={"App 性能检测报告"} appName={"Confirm"} deviceSys={"iOS 15.0"} fromPlace={"Wiredcraft Mobile Team"} publishDate={"2023-01-10"} />
      <li id="report">
        <Fps xValues={value.fps.xValues} data={value.fps.data} />
      </li>
    </div>
  )
}

export default App;
