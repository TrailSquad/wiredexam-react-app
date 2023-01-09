import './App.css';
import React, { useState } from "react";
import setupWKWebViewJavascriptBridge from './jsBridge';
import Fps from './Fps';

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
   
  return <Fps xValues={value.fps.xValues} data={value.fps.data} />;
}

export default App;
