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
  const launchTimeImage = getChartsBlobImage({
    xAxis: {
      type: 'category',
      data: sortData.map(e => dayjs.unix(e.time).format('M-D HH:mm'))
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: sortData.map(e => (e.launchCost / 1000).toFixed(2)),
      type: 'line'
    }]
  });
  const sortTimeObjs = launchTimeData.sort((a, b) => (b.launchCost - a.launchCost));
  const launchRank = sortTimeObjs.length > 5 ? sortTimeObjs.slice(0, 5) : sortTimeObjs;
  return (
    <View break>
      <View style={styles.contentContainer}>
        <Text style={launchStyles.launchStylesTitle}>启动速度</Text>
        <Image src={launchTimeImage} break />
        {launchRank.length > 0 ? <Text style={launchStyles.launchStylesSubTitle}>启动时间排行:</Text> : null}
        {launchRank.length > 0 ? <Table data={launchRank}>
          <TableBody>
            <DataTableCell style={launchStyles.launchtRow} getContent={(r) => dayjs.unix(r.time).format('M-D HH:mm')} />
            <DataTableCell style={launchStyles.launchtRow} getContent={(r) => ((r.launchCost / 1000).toFixed(2) + "秒")} />
          </TableBody>
        </Table> : null}
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
    marginTop: 30,
    marginBottom: 15
  },
  launchtRow: {
    margin: '8',
    textAlign: "center"
  }
});

export default LaunchTime;