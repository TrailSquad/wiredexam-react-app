// 直接生成可插入pdf的图表图片
import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { ScatterChart } from 'echarts/charts';
import { TitleComponent } from 'echarts/components';
import { CustomChart } from 'echarts/charts';

// 只引入需要用到的图表类型
echarts.use([
    CanvasRenderer,
    LineChart,
    GridComponent,
    ScatterChart,
    TitleComponent,
    CustomChart
])

// options即echartsInstance.setOptions所用参数
const getChartsBlobImage = (options) => {
    const { width, height } = options;
    const canvas = window.document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.left = '-9999px';
    canvas.style.top = '-9999px';
    canvas.width = width || 300;
    canvas.height = height || 250;
    window.document.body.appendChild(canvas);

    const chart = echarts.init(canvas, null, {
    });
    chart.setOption({
        ...options,
        animation: false,
    })
    const imageBlob = chart.getDataURL({
        pixelRatio: 3
    });
    canvas.remove();
    return imageBlob;
};

export default getChartsBlobImage;
