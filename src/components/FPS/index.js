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
  const rate = lowFps.length / fps.length;
  const chartTitle = `Dropout Rate：${(rate * 100).toFixed(2)}%， Dropout Count：${lowFps.length}`
  const option = {
    grid: {
      top: '5%',
      left: '0%',
      right: '6%',
      bottom: '3%',
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
          return dayjs.unix(Math.round(fps[index].time)).format('HH:mm');
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

  const fpsDes = `FPS is a simple and direct reflection of the app's lag,55-60fps is excellent,50-55 is normal,below 50 is considered to be dropped frames`;
  const notDroppedFramesDes = "No frame drops were found in this test, which means the app is running quite smoothly. Keep it up"
  const recommendations = `
      a、 optimisation of code: unnecessary code should be minimised and if there is code that can be reused, it should be reused as much as possible
      
      b、 reducing page elements: reducing the number of elements in a page, such as images, text, animations, etc.
     
      c、 rational use of layout: use a rational layout to reduce rendering time.
      
      d、 optimise image resources: optimise the size and format of image resources to avoid excessively large images taking too long to load.
      
      e、 Avoid unnecessary re-layout and re-drawing: avoid unnecessary re-layout and re-drawing without affecting the display of the interface
      `
  return (
    <View break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsTitle}>1 FPS</Text>
        <Text style={styles.text}>{fpsDes}</Text>
        <Text style={styles.text}>The x-axis represents the time, the y-axis represents the FPS value, blue dots indicate excellent or normal FPS, red dots indicate abnormal FPS</Text>
        <Text style={styles.subtitle}>{chartTitle}</Text>
        <View style={styles.chartContainer}><Image src={fpsImage} break /></View>

        {topRankArray.length > 0 ? <Text style={styles.sectionsSubTitle}>1.1 Dropout Rank Table</Text> : null}
        {topRankArray.length > 0 ? <Text style={styles.hint}>The number on the right is the number of frame drops in left</Text> : null}
        {topRankArray.length > 0 ? <View style={styles.tableContainer} wrap={false}><Table data={topRankArray}>
          <TableHeader>
            <TableCell weighting={0.5} style={styles.tableHeader}>View</TableCell>
            <TableCell weighting={0.5} style={styles.tableHeader}>Count</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.5} style={styles.tableRowLabel} getContent={(r) => r.name} />
            <DataTableCell weighting={0.5} style={styles.tableRowValue} getContent={(r) => r.count} />
          </TableBody>
        </Table></View> : null}
        {topRankArray.length <= 0 ? <Text style={styles.subtitle}>{notDroppedFramesDes}</Text> : null}
      </View>
      {topRankArray.length > 0 ?
        <View>
          <Text style={styles.sectionsSubTitle}>1.2 Recommendations for optimisation</Text>
          <Text style={styles.text}>{recommendations}</Text>
        </View> : null}
    </View>
  );
}

export default FPS;