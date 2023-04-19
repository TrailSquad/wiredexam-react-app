import { memo, useContext } from 'react';
import { Text, View, Image } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'
import dayjs from 'dayjs';
import getChartsBlobImage from 'src/utils/getChartsBlobImage';
import gradeUtil from 'src/utils/grade';
import RichText from 'src/components/customize/RichText';
import Constants from 'src/constants';

const { generalMarkMap, formatLaunchTimeGrade } = gradeUtil;

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
  const launchAverage = formatLaunchTimeGrade((averageCost).toFixed(0))

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
          return index
          // return dayjs.unix(Math.round(sortData[index].time)).format('HH:mm');
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
  const chartDes = "The x-axis represents the index of sample, the y-axis represents the launch time value, blue dots indicate excellent or normal time, red dots indicate abnormal launch time"

  const sortTimeObjs = launchTimeData.sort((a, b) => (b.launchCost - a.launchCost));
  const launchRank = sortTimeObjs.length > 5 ? sortTimeObjs.slice(0, 5) : sortTimeObjs;
  const indicatorsDes = "The indicators of launch time are divided into three categories as Perfect, Normal and Bad, as follows"
  const indicators = [
    { name: "Perfect", value: "within 400 ms" },
    { name: "Normal", value: "400 ms ~ 800 ms" },
    { name: "Bad", value: "> 800 ms" },
  ]

  let dataSourceDes
  if (sortTimeObjs.length > 2) {
    const beginDate = dayjs(sortTimeObjs[0].time).format('YYYY-MM-DD HH:mm:ss');
    const endDate = dayjs(sortTimeObjs[sortTimeObjs.length - 1].time).format('YYYY-MM-DD HH:mm:ss');
    dataSourceDes = [
      { "text": `The follow data is derived from every launch the app between `, "isRich": false },
      { "text": `${beginDate}`, "isRich": true },
      { "text": " and ", "isRich": false },
      { "text": `${endDate}`, "isRich": true },
      { "text": ". A total of ", "isRich": false },
      { "text": `${sortTimeObjs.length}`, "isRich": true },
      { "text": " times were recorded in this test, and the average time was ", "isRich": false },
      { "text": `${averageCost.toFixed(0)}`, "isRich": true },
      { "text": " ms.", "isRich": false },
    ]
  }

  return (
    <View bookmark={{ title: "Section 4: Launch Time", fit: true }}>
      <View style={styles.contentContainer}>
        {/* <Text style={styles.sectionsChapter}>Section 4</Text> */}
        <Text style={styles.sectionsTitle} id='link_launch'>Launch Time</Text>
        {/* launchTimeDes */}
        <Text style={styles.sectionsSubTitle}>4.1 Description</Text>
        <Text style={styles.text}>{Constants.strings.launchTime.sectionDescription}</Text>

        <Text style={styles.sectionsSubTitle}>4.2 Grade</Text>
        <Text style={styles.highlightNumber} wrap={false}>{generalMarkMap(launchAverage)}</Text>

        <Text style={styles.sectionsSubTitle}>4.3 Data Detail</Text>
        {/* data source descraption */}
        {dataSourceDes === undefined ? <></> : <RichText richItems={dataSourceDes} normalStyle={styles.text} richStyle={styles.richText} />}
        {/* indicators of launch time */}
        <Text style={styles.subTitle}>4.3.1 Indicator Classification</Text>
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
        <Text style={styles.subTitle}>4.3.2 Data Chart</Text>
        {/* chart and descraption */}
        <View style={styles.chartDesBox} break>
          <View style={styles.chartContainer}><Image src={launchTimeImage} /></View>
          <View style={styles.chartDesContainer}>
            <Text style={styles.hint}>{chartDes}</Text>
          </View>
        </View>

        {launchRank.length > 0 ? <Text style={styles.subTitle}>4.3.3 Rank Table</Text> : null}
        {launchRank.length > 0 ? <Text style={styles.hint}>The number on the right is the cost time of this launch</Text> : null}
        {launchRank.length > 0 ? <View style={styles.tableContainer} wrap={false}><Table data={launchRank}>
          <TableHeader>
            <TableCell weighting={0.5} style={styles.tableHeader}>Time</TableCell>
            <TableCell weighting={0.5} style={styles.tableHeader}>Cost</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.5} style={styles.tableRowLabel} getContent={(r) => dayjs(r.time).format('YYYY-MM-DD HH:mm:ss')} />
            <DataTableCell weighting={0.5} style={styles.tableRowValue} getContent={(r) => (r.launchCost.toFixed(0) + " ms")} />
          </TableBody>
        </Table></View> : null}
      </View>

      <View>
        <Text style={styles.sectionsSubTitle}>4.4 Recommendations for Optimisation</Text>
        <View style={styles.recommendationLayout} wrap={false}>
          <Text style={styles.text}>{Constants.strings.launchTime.recommendation}</Text>
        </View>
      </View>

    </View>
  )
}

export default memo(LaunchTime);