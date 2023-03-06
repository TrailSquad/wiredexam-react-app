import { useContext } from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import * as echarts from 'echarts';
import getChartsBlobImage from 'src/utils/getChartsBlobImage';

const getStartTime = (netTimes, locationTimes) => {
    const netStart = netTimes.length > 0 ? netTimes[0] : 0;
    const locationStart = locationTimes.length > 0 ? locationTimes[0] : 0;
    if (netStart === 0 || locationStart === 0) return Math.max(netStart, locationStart);
    return Math.min(netStart, locationStart)
}

const getEndTime = (netTimes, locationTimes) => {
    const netEnd = netTimes.length > 0 ? netTimes[netTimes.length - 1] : 0;
    const locationEnd = locationTimes.length > 0 ? locationTimes[locationTimes.length - 1] : 0;
    return Math.max(netEnd, locationEnd)
}

function renderItem(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var height = api.size([0, 1])[1] * 0.6;
    var rectShape = echarts.graphic.clipRectByRect(
        {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height: height
        },
        {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height
        }
    );
    return (
        rectShape && {
            type: 'rect',
            transition: ['shape'],
            shape: rectShape,
            style: api.style()
        }
    );
}

const PowerUsageChart = () => {
    const performanceData = useContext(Context);
    if (!performanceData) {
        return null;
    }
    const { networkFlowData } = performanceData;
    const { locationData } = performanceData;
    const sortNetworkFlowData = networkFlowData.sort((a, b) => (a.time - b.time));
    const sortLocationData = locationData.sort((a, b) => (a.time - b.time));

    var categories = [{ name: "N", color: "#72b362", data: sortNetworkFlowData }, { name: "G", color: "#dc77dc", data: sortLocationData }];

    const startTime = +new Date(getStartTime(sortNetworkFlowData.map(e => e.time), sortLocationData.map(e => e.time)))
    const endTime = +new Date(getEndTime(sortNetworkFlowData.map(e => e.time), sortLocationData.map(e => e.time)))

    var data = [];
    categories.forEach(function (category, index) {
        var baseTime = startTime;
        var datas = category.data;
        for (var i = 0; i < datas.length; i++) {
            var item = datas[i];
            var duration = item.duration;
            // var time = item.time;
            // var baseTime = new Date(time)
            data.push({
                name: category.name,
                value: [index, baseTime, (baseTime += duration) , duration],
                color: category.color
            });
            baseTime += duration;
        }
    });

    const option = {
        title: {
            text: `Profile`,
            textStyle: {
                fontWeight: "normal",
                fontSize: 14
            },
            left: 'center'
        },
        // dataZoom: [
        //     {
        //         type: 'slider',
        //         filterMode: 'weakFilter',
        //         showDataShadow: false,
        //         top: 400,
        //         labelFormatter: ''
        //     },
        //     {
        //         type: 'inside',
        //         filterMode: 'weakFilter'
        //     }
        // ],
        // grid: {
        //     height: 300
        // },
        xAxis: {
            min: startTime,
            // max: endTime,
            scale: true,
            interval: (endTime - startTime),
            axisLabel: {
                formatter: function (val) {
                    return Math.max(0, val - startTime) + ' ms';
                }
            }
        },
        yAxis: {
            data: categories.map(e => e.name)
        },
        series: [
            {
                type: 'custom',
                renderItem: renderItem,
                encode: {
                    x: [1, 2],
                    y: 0
                },
                itemStyle: {
                    color: (params) => params.data.color
                },
                data: data
            }
        ]
    };
    const chartImage = getChartsBlobImage(option);

    return (
        <View>
            <View style={styles.contentContainer}>
                <Text style={styles.sectionsTitle}>Section: PowerUsage</Text>
                <Image src={chartImage} break />
            </View>
        </View>
    )
};

// const powerUsageChart = StyleSheet.create({
//     title: styles.title = {
//         textAlign: "left",
//         fontSize: 28,
//         width: "100%",
//         fontWeight: "bold"
//     },
//     subTitle: styles.title = {
//         textAlign: "left",
//         fontSize: 24,
//         width: "100%",
//         fontWeight: "bold",
//         marginTop: 0,
//         marginBottom: 15
//     }
// });

export default PowerUsageChart;