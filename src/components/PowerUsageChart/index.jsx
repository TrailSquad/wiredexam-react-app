import { useContext } from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import * as echarts from 'echarts';
import getChartsBlobImage from 'src/utils/getChartsBlobImage';
import dayjs from 'dayjs';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'
import grateUtil from 'src/utils/grade';

const {generalMarkMap, getNetworkMark, getLocationMark} = grateUtil

const getStartTime = (netTimes, locationTimes) => {
    const netStart = netTimes.length > 0 ? netTimes[0] : 0;
    const locationStart = locationTimes.length > 0 ? locationTimes[0] : 0;
    if (netStart === 0 || locationStart === 0) return Math.max(netStart, locationStart);
    return Math.round(Math.min(netStart, locationStart))
}

const getEndTime = (netTimes, locationTimes) => {
    const netEnd = netTimes.length > 0 ? netTimes[netTimes.length - 1] : 0;
    const locationEnd = locationTimes.length > 0 ? locationTimes[locationTimes.length - 1] : 0;
    return Math.round(Math.max(netEnd, locationEnd))
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
            width: (end[0] - start[0]) + 1,
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
    const networkTotalTime = sortNetworkFlowData.reduce(function (sum, item) {
        return sum + item.duration;
    }, 0);
    const locationTotalTime = sortLocationData.reduce(function (sum, item) {
        return sum + item.duration;
    }, 0);

    const { network } = performanceData;
    var networkMark = getNetworkMark(network.requestSucsessRate, network.slowRequestCount / network.summaryRequestCount);
    var locationMark = getLocationMark();
    var powerUsageMark = networkMark * 0.8 + locationMark * 0.2;

    var categories = [{ name: "Network", color: "#72b362", data: sortNetworkFlowData }, { name: "GPS", color: "#dc77dc", data: sortLocationData }];

    const startTime = getStartTime(sortNetworkFlowData.map(e => e.time), sortLocationData.map(e => e.time))
    const endTime = getEndTime(sortNetworkFlowData.map(e => e.time), sortLocationData.map(e => e.time))

    var data = [];
    data.push({
        name: "Network",
        value: [0, startTime, endTime, endTime - startTime],
        color: "#72b36222"
    });
    data.push({
        name: "Gps",
        value: [1, startTime, endTime, endTime - startTime],
        color: "#dc77dc22"
    });
    categories.forEach(function (category, index) {
        var datas = category.data;
        for (var i = 0; i < datas.length; i++) {
            var item = datas[i];
            var duration = item.duration;
            var time = item.time;
            var beginTime = time
            var endTime = beginTime + duration
            data.push({
                name: category.name,
                value: [index, beginTime, endTime, duration],
                color: category.color
            });
        }
    });

    const option = {
        grid: {
            top: '5%',
            left: '0%',
            right: '6%',
            bottom: '3%',
            containLabel: true,
            show: true,
            borderWidth: 0,
        },
        xAxis: {
            boundaryGap: false,
            axisTick: { show: false },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#ccc',
                    type: 'solid',
                },
            },
            splitLine: {
                show: true,
                interval: '20%',
                lineStyle: {
                    color: '#f1f1f100',
                    type: 'solid',
                }
            },
            min: startTime,
            max: endTime,
            axisLabel: {
                show: true,
                margin: 10,
                interval: 10000,
                showMinLabel: true,
                showMaxLabel: true,
                textStyle: {
                    color: '#999',
                    fontSize: 12,
                },
                formatter: function (val) {
                    if (Math.abs((val - startTime)) > 1000 && Math.abs((endTime - val)) > 1000) return "";
                    // return dayjs(val).format('HH:mm');
                    return dayjs(val).diff(dayjs(startTime), "minute")
                }
            },
            name: "Unit(minute)",
            nameLocation: "center"
        },
        yAxis: {
            axisTick: { show: false },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#ccc',
                    type: 'solid',
                },
            },
            splitLine: {
                show: true,
                interval: '20%',
                lineStyle: {
                    color: '#f1f1f100',
                    type: 'solid',
                }
            },
            verticalAlign: 'middle',
            axisLabel: {
                rotate: 90,
                textStyle: {
                    color: '#999',
                    fontSize: 12,
                },
            },
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
    const chartDes = "The x-axis represents time and the y-axis represents the hardware used, with denser lines on the way indicating more frequent use and wider lines indicating longer use"

    const impactOfPowerUsage = `
    1, power consumption will affect the user experience: apps with high power consumption will consume more power, which will lead to rapid power consumption of the phone and affect the user experience.

    2, power consumption will reduce the performance of the phone: if an app's power consumption is too large, it will take up system resources, thus reducing the performance of the phone.

    3. High power consumption may cause damage to the phone: If an app consumes too much power, it may cause the phone to heat up too much, damage internal components and other problems.
    `
    const beginDate = dayjs(startTime).format('YYYY-MM-DD HH:mm:ss');
    const endDate = dayjs(endTime).format('YYYY-MM-DD HH:mm:ss');
    const dataSourceDes = `The data for the above chart comes from app usage between ${beginDate} and ${endDate}`

    var tableDatas = [
        { name: 'Network', count: sortNetworkFlowData.length, duration: Math.round(networkTotalTime) },
        { name: 'GPS', count: sortLocationData.length, duration: Math.round(locationTotalTime) },
    ];

    return (
        <View bookmark={{ title: "Section 3: Power Usage", fit: true }}>
            <View style={styles.contentContainer}>
                {/* <Text style={styles.sectionsChapter}>Section 3</Text> */}
                <Text style={styles.sectionsTitle} id='link_power'>Power Usage</Text>

                <Text style={styles.sectionsSubTitle}>3.1 Description</Text>
                <Text style={styles.text}>Network requests and GPS location both affect the app's power consumption. The more network requests, the more data requested and the more time spent on requests, the more power is consumed, and the more positioning is used and the longer it is used, the more power is consumed.</Text>
                <Text style={styles.text}>What will be the impact of the app's power consumption?</Text>
                <Text style={styles.text}>{impactOfPowerUsage}</Text>

                <Text style={styles.sectionsSubTitle}>3.2 Grade</Text>
                <Text style={styles.highlightNumber} wrap={false}>{generalMarkMap(powerUsageMark)}</Text>

                <Text style={styles.sectionsSubTitle}>3.3 Data Detail</Text>
                <Text style={styles.text}>{dataSourceDes}</Text>
                <View style={styles.tableContainer} wrap={false}><Table data={tableDatas}>
                    <TableHeader>
                        <TableCell weighting={0.3} style={styles.tableHeader}>Category</TableCell>
                        <TableCell weighting={0.35} style={styles.tableHeader}>Total Count</TableCell>
                        <TableCell weighting={0.35} style={styles.tableHeader}>Total Duration</TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell weighting={0.3} style={styles.tableHeader} getContent={(r) => r.name} />
                        <DataTableCell weighting={0.35} style={styles.tableRowValue} getContent={(r) => r.count} />
                        <DataTableCell weighting={0.35} style={styles.tableRowValue} getContent={(r) => r.duration} />
                    </TableBody>
                </Table></View>

                <View style={styles.chartContainer}><Image src={chartImage} /></View>
                <View style={styles.chartDesContainer}>
                    <Text style={styles.hint}>{chartDes}</Text>
                </View>
            </View>
        </View>
    )
};

export default PowerUsageChart;