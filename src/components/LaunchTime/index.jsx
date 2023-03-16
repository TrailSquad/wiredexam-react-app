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
  const chartTitle = `Average LaunTime`

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
  const launchTimeDes = "Launch speed is the time elapsed from the time the user clicks on the app Icon to the time the user sees the first screen";
  const impactOfLaunchTime = `1、Impact on user experience: when users open the app, if they find that the start-up speed is slow, it will affect the user's experience and the user may get bored.

  2、Impact on activity: If the app starts slowly, it will have a certain impact on the user's frequency of use, thus affecting the app's activity.

  3、Impact on retention rate: If the app starts slowly, it will have a certain impact on the user's usage habits, thus affecting the app's retention rate.
  `
  const indicatorsDes = "The indicators of LaunchTime are divided into three categories as Perfect, Normal and Bad, as follows"
  const indicators = [
    { name: "Perfect", value: "400 ms ~ 600 ms" },
    { name: "Normal", value: "600 ms ~ 800 ms" },
    { name: "Bad", value: "> 800 ms" },
  ]

  var dataSourceDes
  if (sortTimeObjs.length > 2) {
    const beginDate = dayjs.unix(Math.round(sortTimeObjs[0].time)).format('MM/DD HH:mm');
    const endDate = dayjs.unix(Math.round(sortTimeObjs[sortTimeObjs.length - 1].time)).format('MM/DD HH:mm');
    dataSourceDes = `The above data is derived from every launch the app between ${beginDate} and ${endDate}`
  }
  const recommendations =
    [
      `a. minimizing the loading of resources at startup, such as images, audio, video, etc.`,

      `b. optimising the code logic at startup to minimise unnecessary judgements and loops.`,

      `c. running some time-consuming tasks in the background, such as database queries, network requests, etc.`,

      `d. using multi-process or multi-threaded approaches to achieve parallel processing.`,

      `e. delaying the initialisation or loading of some less frequently used functions.`
    ]
  return (
    <View bookmark={{ title: "Chapter 3: Launch Time", fit: true }} break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsChapter}>Chapter 3</Text>
        <Text style={styles.sectionsTitle} id='link_launch'>Launch Time</Text>
        {/* launchTimeDes */}
        <Text style={styles.subTitle}>What is the launch time?</Text>
        <Text style={styles.text}>{launchTimeDes}</Text>
        {/* impact of launch time */}
        <Text style={styles.subTitle}>What will be the impact of the app's slowly launch time?</Text>
        <Text style={styles.text}>{impactOfLaunchTime}</Text>
        {/* indicators of launch time */}
        <Text style={styles.subTitle}>Indicator classification</Text>
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
        {/* chart and descraption */}
        <View style={styles.chartContainer}><Image src={launchTimeImage} /></View>
        <View style={styles.chartDesContainer}>
          <Text style={styles.hint}>The x-axis represents the time, the y-axis represents the launch time value, blue dots indicate excellent or normal time, red dots indicate abnormal launch time</Text>
        </View>
        {/* averageCost */}
        <Text style={styles.subTitle}>{chartTitle}</Text>
        <Text style={styles.highlightNumber}>{`${(averageCost / 1000).toFixed(2)} s`}</Text>
        {/* data source descraption */}
        {dataSourceDes === undefined ? <></> : <Text style={styles.text}>{dataSourceDes}</Text>}

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
        <Table data={recommendations}>
          <TableHeader>
            <TableCell weighting={1} style={styles.tableHeader}>Optimisation</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={1} style={styles.tableRowLabel} getContent={(r) => r} />
          </TableBody>
        </Table>
      </View>
    </View>
  )
};

export default LaunchTime;