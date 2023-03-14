import { useContext } from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'
import dayjs from 'dayjs';
import getChartsBlobImage from 'src/utils/getChartsBlobImage';

const LaunchTime = () => {
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }
  const { launchTimeData } = performanceData;
  if (!launchTimeData || launchTimeData.length < 1) {
    return null;
  }
  const sortData = launchTimeData.sort((a, b) => (a.time - b.time));
  const averageCost = sortData.reduce(function (sum, item) {
    return sum + item.launchCost;
  }, 0) / sortData.length
  const chartTitle = `Average LaunTime: ${(averageCost / 1000).toFixed(2)}s`

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
      data: sortData.map(e => Math.round(e.time)),
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
          return dayjs.unix(Math.round(sortData[index].time)).format('HH:mm');
        }
      }
    },
    yAxis: {
      // type: "value",
    },
    series: [
      {
        data: sortData.map(e => e.launchCost / 1000),
        type: 'scatter',
        symbolSize: 5,
        itemStyle: {
          color: (params) => params.value >= 0.8 ? 'red' : '#5470c6'
        }
      },
      {
        data: sortData.map(e => e.launchCost / 1000),
        type: 'line',
        symbolSize: 5,
        itemStyle: {
          color: (params) => params.value >= 0.8 ? 'red' : '#5470c6'
        }
      },
    ]
  };
  const launchTimeImage = getChartsBlobImage(option);

  const sortTimeObjs = launchTimeData.sort((a, b) => (b.launchCost - a.launchCost));
  const launchRank = sortTimeObjs.length > 5 ? sortTimeObjs.slice(0, 5) : sortTimeObjs;
  const launchTimeDes = "Launch speed is the first thing users experience about our app, 400-600ms is excellent, 600-800 is normal, more than 800ms is considered to be in need of optimisation";
  const recommendations = `
        a. minimizing the loading of resources at startup, such as images, audio, video, etc.

        b. optimising the code logic at startup to minimise unnecessary judgements and loops.
        
        c. running some time-consuming tasks in the background, such as database queries, network requests, etc.
        
        d. using multi-process or multi-threaded approaches to achieve parallel processing.
        
        e. delaying the initialisation or loading of some less frequently used functions.
      `
  return (
    <View break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsTitle} id='link_launch'>3 Launch Time</Text>
        <Text style={styles.text}>{launchTimeDes}</Text>
        <Text style={styles.text}>The x-axis represents the time, the y-axis represents the launch time value, blue dots indicate excellent or normal time, red dots indicate abnormal launch time</Text>
        <Text style={styles.subtitle}>{chartTitle}</Text>
        <View style={styles.chartContainer}><Image src={launchTimeImage} /></View>
        {launchRank.length > 0 ? <Text style={styles.sectionsSubTitle}>3.1 Rank Table</Text> : null}
        {launchRank.length > 0 ? <Text style={styles.hint}>The number on the right is the cost time of this launch</Text> : null}
        {launchRank.length > 0 ? <View style={styles.tableContainer} wrap={false}><Table data={launchRank}>
          <TableHeader>
            <TableCell weighting={0.5} style={styles.tableHeader}>Time</TableCell>
            <TableCell weighting={0.5} style={styles.tableHeader}>Cost</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.5} style={styles.tableRowLabel} getContent={(r) => dayjs.unix(r.time).format('M-D HH:mm')} />
            <DataTableCell weighting={0.5} style={styles.tableRowValue} getContent={(r) => ((r.launchCost / 1000).toFixed(2) + " seconds")} />
          </TableBody>
        </Table></View> : null}
        <Text style={styles.sectionsSubTitle}>3.2 Recommendations for optimisation</Text>
        <Text style={styles.text}>{recommendations}</Text>
      </View>
    </View>
  )
};

export default LaunchTime;