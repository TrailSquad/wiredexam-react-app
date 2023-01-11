import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import setupWKWebViewJavascriptBridge, { androidFunction, isAndroid } from './jsBridge';

/**
 * 注册 setupWebViewJavascriptBridge 方法
 *  之所以不将上面两个方法融合成一个方法，是因为放在一起，那么就只有 iosFuntion 中相关的方法体生效
 */
window.setupWebViewJavascriptBridge = isAndroid ? androidFunction : setupWKWebViewJavascriptBridge;

/**
 * 这里如果不做判断是不是安卓，而是直接就执行下面的方法，就会导致 
 *      1、IOS 无法调用 H5 这边注册的事件函数
 *      2、H5 可以正常调用 IOS 这边的事件函数，并且 H5 的回调函数可以正常执行
 */
if (isAndroid) {
  /**
   * 与安卓交互时，不调用这个函数会导致：
   *      1、H5 可以正常调用 安卓这边的事件函数，但是无法再调用到 H5 的回调函数
   * 
   * 前提 setupWebViewJavascriptBridge 这个函数使用的是 andoirFunction 这个，否则还是会导致上面 1 的现象出现
   */
  window.setupWebViewJavascriptBridge(function (bridge) {
      // 注册 H5 界面的默认接收函数（与安卓交互时，不注册这个事件无法接收回调函数）
      bridge.init(function (msg, responseCallback) {
          responseCallback("JS 返回给原生的消息内容");
      })
  })
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
