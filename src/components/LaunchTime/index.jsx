import { useContext } from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody } from '@david.kucsai/react-pdf-table'
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

  const option = {
    title: {
      text: `Average LaunTime: ${(averageCost / 1000).toFixed(2)}s`,
      textStyle: {
        fontWeight: "normal",
        fontSize: 14
      },
      subtext: `launch times greater than 0.8 seconds \nare recommended for speed optimisation`,
      left: 'center'
    },
    xAxis: {
      data: sortData.map(e => dayjs.unix(e.time).format('HH:mm')),
      name: "时间 时：分",
      nameLocation: "center",
      nameGap: 25
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

  const recommendations = `
        1. minimizing the loading of resources at startup, such as images, audio, video, etc.

        2. optimising the code logic at startup to minimise unnecessary judgements and loops.
        
        3. running some time-consuming tasks in the background, such as database queries, network requests, etc.
        
        4. using multi-process or multi-threaded approaches to achieve parallel processing.
        
        5. delaying the initialisation or loading of some less frequently used functions.
      `
  return (
    <View break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsTitle}>Section: LaunchTime</Text>
        <Image src={launchTimeImage} break />
        {launchRank.length > 0 ? <Text style={launchStyles.launchStylesSubTitle}>启动时间排行:</Text> : null}
        {launchRank.length > 0 ? <Table data={launchRank}>
          <TableBody>
            <DataTableCell style={launchStyles.launchtRow} getContent={(r) => dayjs.unix(r.time).format('M-D HH:mm')} />
            <DataTableCell style={launchStyles.launchtRow} getContent={(r) => ((r.launchCost / 1000).toFixed(2) + "秒")} />
          </TableBody>
        </Table> : null}
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsTitle}>Section: LaunchTime</Text>
        <Text style={launchStyles.launchStylesTitle}>Recommendations for optimisation：</Text>
        <Text style={launchStyles.launchStylesSubTitle}>{recommendations}</Text>
      </View>
    </View>
  )
};

const launchStyles = StyleSheet.create({
  launchStylesTitle: styles.title = {
    textAlign: "left",
    fontSize: 28,
    width: "100%",
    fontWeight: "bold"
  },
  launchStylesSubTitle: styles.title = {
    textAlign: "left",
    fontSize: 24,
    width: "100%",
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 15
  },
  launchtRow: {
    margin: '8',
    textAlign: "center"
  }
});

export default LaunchTime;