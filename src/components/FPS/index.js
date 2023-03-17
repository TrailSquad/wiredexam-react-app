import { useContext } from 'react';
import { View, Text } from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer';
import Context from 'src/context';
import styles from 'src/pdfStyles';
import getChartsBlobImage from 'src/utils/getChartsBlobImage';
import dayjs from 'dayjs';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'

const FPS = () => {
  const droppedFramesFpsValue = 50
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }
  const { fps } = performanceData;
  if (!fps) {
    return null;
  }
  const lowFps = fps.filter(item => item.value <= droppedFramesFpsValue);
  const lowrate = lowFps.length / fps.length;
  const normalFps = fps.filter(item => (item.value <= droppedFramesFpsValue && item.value >= 50));
  const normalrate = normalFps.length / fps.length;
  const perfectRate = 1 - lowrate - normalrate
  const chartTitle = `Dropout Rate：${(lowrate * 100).toFixed(2)}%， Dropout Count：${lowFps.length}, Normal Rate: ${(lowrate * 100).toFixed(2)}%, Noemal Count: ${normalFps.length}, Perfect Rate: ${(perfectRate * 100).toFixed(2)}%, Perfect Count: ${fps.length - lowFps.length - normalFps.length}`

  var dataSourceDes
  if (fps.length > 2) {
    const beginDate = dayjs.unix(Math.round(fps[0].time)).format('MM/DD HH:mm');
    const endDate = dayjs.unix(Math.round(fps[fps.length - 1].time)).format('MM/DD HH:mm');
    dataSourceDes = `The above data is derived from Fps sampling using the app between ${beginDate} and ${endDate}`
  }

  const option = {
    grid: {
      top: '5%',
      left: '0%',
      right: '6%',
      bottom: '6%',
      containLabel: true,
      show: true,
    },
    xAxis: {
      data: fps.map(e => Math.round(e.time)),
      boundaryGap: false,
      axisTick: { show: false },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#f1f1f1',
          type: 'solid',
        },
      },
      splitLine: {
        show: true,
        interval: '10%',
        lineStyle: {
          color: '#f1f1f1',
          type: 'solid',
        }
      },
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
        formatter: function (_, index) {
          return index
          // return dayjs.unix(Math.round(fps[index].time)).format('HH:mm');
        }
      }
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 60,
      interval: 10
    },
    series: [
      {
        data: fps.map(e => e.value),
        type: 'scatter',
        symbolSize: 3,
        itemStyle: {
          color: (params) => params.value <= droppedFramesFpsValue ? 'red' : '#5470c6'
        }
      },
    ]
  };
  const fpsImage = getChartsBlobImage(option);
  const chartDes = "The x-axis represents the index of the sample, the y-axis represents the FPS value, blue dots indicate excellent or normal FPS, red dots indicate abnormal FPS"

  const pieChartOption = {
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: fps.length - lowFps.length - normalFps.length, name: `Perfect(${(perfectRate * 100).toFixed(2)}%)` },
          { value: normalFps.length, name: `Normal(${(normalrate * 100).toFixed(2)}%)` },
          { value: lowFps.length, name: `Bad(${(lowrate * 100).toFixed(2)}%)` },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  const fpsPieImage = getChartsBlobImage(pieChartOption);

  var rankObj = {};
  lowFps.forEach((element, index) => {
    var count = rankObj[element.topView]
    if (count === undefined) {
      rankObj[element.topView] = 1;
    } else {
      rankObj[element.topView] = count + 1;
    }
  })
  var rankArray = [];
  Object.keys(rankObj).forEach(key => {
    rankArray.push({
      name: key,
      count: rankObj[key]
    })
  })
  const sortRankArray = rankArray.sort((a, b) => (b.count - a.count));
  const topRankArray = sortRankArray.length > 3 ? sortRankArray.slice(0, 3) : sortRankArray;

  const fpsDes = `FPS (frames per second) is an important metric in app development that measures the smoothness and performance of a app; higher FPS means smoother graphics, while low FPS can lead to problems such as lagging and frame skipping. Therefore, FPS is one of the key metrics to measure a app performance.`;
  const stutteringDes = `If the screen stutters when the user is using the app, the interface will keep flickering, jittering or there will be a noticeable delay.`
  const impactDes = `The lagging will have a bad impact on the user experience and users will feel uncomfortable.lag may cause app function failure, data loss, security vulnerability and other problems`

  const indicators = [
    { name: "Perfect", value: "55 ~ 60" },
    { name: "Normal", value: "50 ~ 55" },
    { name: "Bad", value: "<50" },
  ]
  const indicatorsDes = "The indicators of PFS are divided into three categories as Perfect, Normal and Bad, as follows"

  const notDroppedFramesDes = "No frame drops were found in this test, which means the app is running quite smoothly. Keep it up"
  const recommendations = [
    `a、 optimisation of code: unnecessary code should be minimised and if there is code that can be reused, it should be reused as much as possible.`,

    `b、 reducing page elements: reducing the number of elements in a page, such as images, text, animations, etc.`,

    `c、 rational use of layout: use a rational layout to reduce rendering time.`,

    `d、 optimise image resources: optimise the size and format of image resources to avoid excessively large images taking too long to load.`,

    `e、 Avoid unnecessary re-layout and re-drawing: avoid unnecessary re-layout and re-drawing without affecting the display of the interface .`
  ]
  return (
    <View bookmark={{ title: "Section 2: FPS", fit: true }} break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsChapter}>Section 2</Text>
        <Text style={styles.sectionsTitle} id='link_fps'>FPS</Text>
        {/* Description */}
        <Text style={styles.text}>{fpsDes}</Text>
        <Text style={styles.text}>{stutteringDes}</Text>
        <Text style={styles.text}>{impactDes}</Text>
        {/* Indicator classification */}
        <Text style={styles.sectionsSubTitle}>Indicator classification</Text>
        <Text style={styles.text}>{indicatorsDes}</Text>
        <Text style={styles.hint}>The right is the range of indicator for left category</Text>
        <View style={styles.tableContainer} wrap={false}><Table data={indicators}>
          <TableHeader>
            <TableCell weighting={0.5} style={styles.tableHeader}>Category</TableCell>
            <TableCell weighting={0.5} style={styles.tableHeader}>Value</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.5} style={styles.tableRowLabel} getContent={(r) => r.name} />
            <DataTableCell weighting={0.5} style={styles.tableRowValue} getContent={(r) => r.value} />
          </TableBody>
        </Table></View>
        {/* chart */}
        <View style={styles.chartContainer}><Image src={fpsImage} break /></View>
        <View style={styles.chartDesContainer}>
          <Text style={styles.hint}>{chartDes}</Text>
        </View>
        <View style={styles.chartContainer}><Image src={fpsPieImage} break /></View>
        <View style={styles.chartDesContainer}>
        <Text style={styles.hint}>{chartTitle}</Text>
        </View>
        {/* data source description */}
        {dataSourceDes === undefined ? <></> : <Text style={styles.text}>{dataSourceDes}</Text>}
        {/* Rank Table */}
        {topRankArray.length > 0 ? <Text style={styles.sectionsSubTitle}>1.1 Dropout Rank Table</Text> : null}
        {topRankArray.length > 0 ? <Text style={styles.text}>Here are the screens where the most jams occur</Text> : null}
        {topRankArray.length > 0 ? <Text style={styles.hint}>The number on the right is the number of frame drops in left</Text> : null}
        {topRankArray.length > 0 ? <View style={styles.tableContainer} wrap={false}><Table data={topRankArray}>
          <TableHeader>
            <TableCell weighting={0.8} style={styles.tableHeader}>View</TableCell>
            <TableCell weighting={0.2} style={styles.tableHeader}>Count</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.8} style={styles.tableRowLabel} getContent={(r) => r.name} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.count} />
          </TableBody>
        </Table></View> : null}
        {topRankArray.length <= 0 ? <Text style={styles.sectionsSubTitle}>{notDroppedFramesDes}</Text> : null}
      </View>
      {topRankArray.length > 0 ?
        <View>
          <Text style={styles.sectionsSubTitle}>1.2 Recommendations for optimisation</Text>
          <Table data={recommendations}>
            <TableHeader>
              <TableCell weighting={1} style={styles.tableHeader}>Optimisation</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell weighting={1} style={styles.tableRowLabel} getContent={(r) => r} />
            </TableBody>
          </Table>
        </View> : null}
    </View>
  );
}

export default FPS;