import { useContext, memo } from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import PerformanceContext from 'src/context/PerformanceContext';
import * as echarts from 'echarts';
import getChartsBlobImage from 'src/utils/getChartsBlobImage';
import dayjs from 'dayjs';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'
import grateUtil from 'src/utils/grade';
import RichText from 'src/components/customize/RichText';
import Constants from 'src/constants';
import { getStartTime, getEndTime } from "../../utils/powerUsage.util"
import useSectionIndex from 'src/utils/hooks/useSectionIndex';

const { generalMarkMap, getNetworkMark, getCpuMark } = grateUtil


function renderItem(params, api) {
    let categoryIndex = api.value(0);
    let start = api.coord([api.value(1), categoryIndex]);
    let end = api.coord([api.value(2), categoryIndex]);
    let height = api.size([0, 1])[1] * 0.7;
    let rectShape = echarts.graphic.clipRectByRect(
        {
            x: start[0],
            y: start[1] - height / 3,
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
    const sectionIndex = useSectionIndex("powerUsage")
    const performanceData = useContext(PerformanceContext);
    if (!performanceData) {
        return null;
    }
    const { networkFlowData } = performanceData;
    const { locationData } = performanceData;
    const { cpuData } = performanceData;
    const sortNetworkFlowData = networkFlowData.sort((a, b) => (a.time - b.time));
    const sortLocationData = locationData.sort((a, b) => (a.time - b.time));
    const sortCpuData = cpuData.itemList.sort((a, b) => (a.time - b.time));
    const networkTotalTime = sortNetworkFlowData.reduce(function (sum, item) {
        return sum + item.duration;
    }, 0);
    const locationTotalTime = sortLocationData.reduce(function (sum, item) {
        return sum + item.duration;
    }, 0);
    const cpuTotalTime = sortCpuData.reduce(function (sum, item) {
        return sum + 500;
    }, 0);

    const { network } = performanceData;
    let networkMark = getNetworkMark(network.requestSuccessRate, network.slowRequestCount / network.summaryRequestCount);
    let cpuMark = getCpuMark(cpuData);
    let powerUsageMark = networkMark * 0.5 + cpuMark * 0.5;

    let categories = [
        { name: "Network", color: "#72b362", data: sortNetworkFlowData },
        { name: "GPS", color: "#dc77dc", data: sortLocationData },
        { name: "CPU", color: "#a90000", data: sortCpuData }
    ];

    const startTime = getStartTime(sortNetworkFlowData.map(e => e.time), sortLocationData.map(e => e.time), sortCpuData.map(e => e.time))
    const endTime = getEndTime(sortNetworkFlowData.map(e => e.time), sortLocationData.map(e => e.time), sortCpuData.map(e => e.time))

    let data = [];
    data.push({
        name: "Network",
        value: [0, startTime, endTime, endTime - startTime],
        color: "#72b36222"
    });
    data.push({
        name: "GPS",
        value: [1, startTime, endTime, endTime - startTime],
        color: "#dc77dc22"
    });
    data.push({
        name: "CPU",
        value: [2, startTime, endTime, endTime - startTime],
        color: "#a9000022"
    });
    categories.forEach(function (category, index) {
        let datas = category.data;
        for (let i = 0; i < datas.length; i++) {
            let item = datas[i];
            let duration = category.name === "CPU" ? 500 : item.duration;
            let time = item.time;
            let beginTime = time
            let endTime = beginTime + duration
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
                // interval: '20%',
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
                    fontSize: 10,
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

    const beginDate = dayjs(startTime).format('YYYY-MM-DD HH:mm:ss');
    const endDate = dayjs(endTime).format('YYYY-MM-DD HH:mm:ss');
    const dataSourceDes = [
        { "text": `The data for the above chart comes from app usage between `, "isRich": false },
        { "text": `${beginDate}`, "isRich": true },
        { "text": " and ", "isRich": false },
        { "text": `${endDate}`, "isRich": true },
        { "text": ".", "isRich": false },
    ]

    const tableHeader = [
        {
            weight: 0.3,
            text: "Category"
        },
        {
            weight: 0.35,
            text: "Total Count"
        }, {
            weight: 0.35,
            text: "Total Duration"
        },
    ]

    const tableContent = [
        {
            weight: 0.3,
            text: "name",
            style: styles.tableHeader,
            content: (r) => r.name
        },
        {
            weight: 0.35,
            text: "count",
            style: styles.tableRowValue,
            content: (r) => r.count
        }, {
            weight: 0.35,
            text: "duration",
            style: styles.tableRowValue,
            content: (r) => `${r.duration} ms`
        },
    ]

    const tableDatas = [
        { name: 'Network', count: sortNetworkFlowData.length, duration: networkTotalTime },
        { name: 'GPS', count: sortLocationData.length, duration: locationTotalTime },
        { name: 'CPU', count: sortCpuData.length, duration: cpuTotalTime },
    ];

    return (
        <View bookmark={{ title: `Section ${sectionIndex}: Power Usage`, fit: true }}>
            <View style={styles.contentContainer}>
                {/* <Text style={styles.sectionsChapter}>Section 3</Text> */}
                <Text style={styles.sectionsTitle} id='link_power'>Power Usage</Text>

                <Text style={styles.sectionsSubTitle}>{sectionIndex}.1 Description</Text>
                <Text style={styles.text}>{Constants.strings.powerUsage.sectionDescription}</Text>

                <Text style={styles.sectionsSubTitle}>{sectionIndex}.2 Grade</Text>
                <Text style={styles.highlightNumber} wrap={false}>{generalMarkMap(powerUsageMark)}</Text>

                <Text style={styles.sectionsSubTitle}>{sectionIndex}.3 Data Detail</Text>
                <RichText richItems={dataSourceDes} normalStyle={styles.text} richStyle={styles.richText} />
                <Text style={styles.text}>Through the statistics of the number and time of GPS and network requests, some unexpected problems may be found, such as too many times or long-term requests.</Text>
                <View style={styles.tableContainer} wrap={false}><Table data={tableDatas}>
                    <TableHeader>
                        {tableHeader.map(header =>
                            <TableCell weighting={header.weight} style={styles.tableHeader} key={header.text}>{header.text}</TableCell>
                        )}
                    </TableHeader>
                    <TableBody>
                        {tableContent.map(({ weight, style, content, text }) =>
                            <DataTableCell weighting={weight} style={style} getContent={content} key={text}
                            />)}
                    </TableBody>
                </Table></View>
                <Text style={styles.text}></Text>
                <Text style={styles.text}>Through this chart, we can visually see the distribution of GPS and network requests in the time dimension.</Text>
                <View style={styles.chartDesBox} break>
                    <View style={styles.chartContainer}><Image src={chartImage} /></View>
                    <View style={styles.chartDesContainer}><Text style={styles.hint}>{chartDes}</Text></View>
                </View>
            </View>
        </View>
    )
}

export default memo(PowerUsageChart);