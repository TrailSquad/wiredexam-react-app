import { useContext } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'

function formatFPSGrade(number){
  if( number < 90)
      return "A"
  if( number < 80)
      return "B"
  if( number <70)
      return "B"
  else
      return "D"
}

function generalMarkMap(score) {
  if(score >= 100)
      return "A+"
  if(score >= 90)
      return "A"
  if(score >= 80)
      return "B"
  if(score >= 60)
      return "C"
  else
      return "D"
}

const Conclusion = () => {
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }
  const { fps } = performanceData;
  if (!fps) {
    return null;
  }
  const droppedFramesFpsValue = 50
  const lowFps = fps.filter(item => item.value <= droppedFramesFpsValue);
  const lowrate = (lowFps.length / fps.length)*100;
  const fpsDes = `FPS is a simple and direct reflection of the app's lag,55-60fps is excellent,50-55 is normal,below 50 is considered to be dropped frames`
  const launchTimeDes = "Launch speed is the first thing users experience about our app, 400-600ms is excellent, 600-800 is normal, more than 800ms is considered to be in need of optimisation";

  // Power Usage
  const { network } = performanceData;
  const { locationData } = performanceData;
  var networkMark = network.requestSucsessRate + (network.summaryRequestCount - network.slowRequestCount) / network.summaryRequestCount;
  var locationMark = 100; // TODO
  var powerUsageMark = (networkMark + locationMark) / 2;
  var powerUsageDes = "Power consumption scoring is based on a number of subcategories.";

  // Memory Leak
  const { memoryLeakData } = performanceData;
  var memoryLeakMark;
  var memoryLeakDes = "The memory leak score is mainly based on the number of detected memory leaks. This test detected " + memoryLeakData.length + " memory leaks, and it is recommended to fix them before going live.";
  if(memoryLeakData.length <= 0) {
    memoryLeakMark = 100
    memoryLeakDes = "The memory leak score is mainly based on the number of detected memory leaks. This monitoring found no memory leaks.";
  } else if(memoryLeakData.length <= 1) {
    memoryLeakMark = 90
  } else if(memoryLeakData.length <= 3) {
    memoryLeakMark = 80
  } else if(memoryLeakData.length <= 5) {
    memoryLeakMark = 60
  } else {
    memoryLeakMark = 0
  }

  const tableData = [
    {
      "categary": "FPS",
      "summary": fpsDes,
      "value":formatFPSGrade(lowrate),
    },
    {
      "categary": "Launch Time",
      "summary": launchTimeDes,
      "value": "A",
    },
    {
      "categary": "Power Usage",
      "summary": powerUsageDes,
      "value": generalMarkMap(powerUsageMark),
    },
    {
      "categary": "Memory Leak",
      "summary": memoryLeakDes,
      "value": generalMarkMap(memoryLeakMark),
    },
  ]
  // const counclusionImage = getChartsBlobImage(option);

  const des = 'According to the professional test team, the average score given';


  return (

    <View bookmark={{ title: "Overview", fit: true }} break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsChapter} id='link_overview'>Overview</Text>
        <Text style={styles.sectionsTitle}> </Text>
        <Text style={styles.text}>{des}</Text>
        <Table data={tableData}>
          <TableHeader>
            <TableCell weighting={0.2} style={styles.tableHeader}>Category</TableCell>
            <TableCell weighting={0.6} style={styles.tableHeader}>Suggest</TableCell>
            <TableCell weighting={0.2} style={styles.tableHeader}>Grade</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.2} style={styles.tableRowLabel} getContent={(r) => r.categary} />
            <DataTableCell weighting={0.6} style={styles.tableRowLabel} getContent={(r) => r.summary} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.value} />
          </TableBody>
        </Table>
      </View>
    </View>
  )
};

const conclusionStyles = StyleSheet.create({
  leakStylesSubTitle: styles.title = {
    textAlign: "left",
    fontSize: 24,
    width: "100%",
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15
  },
  row: {
    margin: '8',
    textAlign: "center"
  }
});

export default Conclusion;