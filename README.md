# 性能检测报告PDF生成-web端

由 [Create React App](https://github.com/facebook/create-react-app) 搭建。

## 数据获取原理

TODO

## PDF渲染原理

![PDF渲染原理](https://s2.loli.net/2023/01/11/hkN4xJDCMcfZELF.png)

主要用了[React-PDF](https://react-pdf.org/)来实现在浏览器通过canvas模拟渲染PDF。

图表则先是通过Echarts渲染为canvas，再生成Base64图片字符串，将字符串插入React-PDF的Image组件实现展示。

## 安装依赖

`yarn`

## 本地启动

在根目录

`yarn start`

项目会在[http://localhost:3000](http://localhost:3000) 启动。

## 生产环境部署

TODO