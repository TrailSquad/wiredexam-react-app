## 本机数据获取

TODO

## 图表图片生成

调用`utils/getChartsBlobImage`，传入`echarts.setOptions`所用的options参数即可获得图片。

## PDF ui 搭建

PDF的ui定义在`src/components/PdfDocument`中，最后会被渲染为canvas。

所使用的组件必须是从`@react-pdf/renderer`中引入，完整的component列表见[Components文档](https://react-pdf.org/components)。

样式定义的方式类似于React的内联样式，需要注意的是，默认单位并非px（毕竟我们的产物是固定尺寸固定DPI的PDF文档，尺寸为595x842pt），更多请见[Styling文档](https://react-pdf.org/styling)。

当需要强制换页时，使用`break`属性即可。 

需要实现每页固定的页头，页脚时，使用`fixed`属性即可。

更多配置请见[Advanced文档](https://react-pdf.org/advanced)。