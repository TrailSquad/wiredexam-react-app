import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'
import RichText from 'src/components/customize/RichText';

function generalMarkMap(score) {
  if (score >= 100)
    return "A+"
  if (score >= 90)
    return "A"
  if (score >= 80)
    return "B"
  if (score >= 60)
    return "C"
  else
    return "D"
}

function mapToTextColor(score) {
  if (score >= 100)
    return "#2E7D32"
  if (score >= 90)
    return "#9E9D24"
  if (score >= 80)
    return "#F9A825"
  if (score >= 60)
    return "#EF6C00"
  else
    return "#D84315"
}

function mapToBgColor(score) {
  if (score >= 100)
    return "#A5D6A7"
  if (score >= 90)
    return "#E6EE9C"
  if (score >= 80)
    return "#FFF59D"
  if (score >= 60)
    return "#FFCC80"
  else
    return "#FFAB91"
}

function formatLaunchTimeGrade(average) {
  if (average <= 0.6)
    return 100
  if (average <= 0.8)
    return 95 // TODO Median of this grade, a more linear value is required
  if (average <= 0.9)
    return 85 // TODO Median of this grade, a more linear value is required
  if (average <= 1)
    return 70 // TODO Median of this grade, a more linear value is required
  else
    return 30 // TODO Median of this grade, a more linear value is required
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

  //FPS 
  const droppedFramesFpsValue = 50
  const lowFps = fps.filter(item => item.value <= droppedFramesFpsValue);
  const lowRate = (fps.length - lowFps.length) * 100 / fps.length;
  // const fpsDes = `FPS is a simple and direct reflection of the app's lag,55-60fps is excellent,50-55 is normal,below 50 is considered to be dropped frames`
  const fpsDes = [
    {"text": "FPS is a simple and direct reflection of the app's lag, ", "isRich": false},
    {"text": "55-60fps", "isRich": true},
    {"text": " is excellent, ", "isRich": false},
    {"text": "50-55", "isRich": true},
    {"text": " is normal,below ", "isRich": false},
    {"text": "50", "isRich": true},
    {"text": " is considered to be dropped frames.", "isRich": false},
  ]

  //launchTimeDes
  // const launchTimeDes = "Launch speed is the first thing users experience about our app, 400-600ms is excellent, 600-800 is normal, more than 800ms is considered to be in need of optimisation";
  const launchTimeDes = [
    {"text": "Launch speed is the first thing users experience about our app, ", "isRich": false},
    {"text": "400-600ms", "isRich": true},
    {"text": " is excellent, ", "isRich": false},
    {"text": "600-800ms", "isRich": true},
    {"text": " is normal, more than ", "isRich": false},
    {"text": "800ms", "isRich": true},
    {"text": " is considered to be in need of optimisation", "isRich": false},
  ]
  const { launchTimeData } = performanceData;
  const sortData = launchTimeData.sort((a, b) => (a.time - b.time));
  const averageCost = sortData.reduce(function (sum, item) {
    return sum + item.launchCost;
  }, 0) / sortData.length
  const launchAverage = formatLaunchTimeGrade((averageCost / 1000).toFixed(2))

  // Power Usage
  const { network } = performanceData;
  var networkMark = network.requestSucsessRate + (network.summaryRequestCount - network.slowRequestCount) / network.summaryRequestCount;
  var locationMark = 100; // TODO
  var powerUsageMark = (networkMark + locationMark) / 2;
  var powerUsageDes = [
    {"text": "Power consumption scoring is based on a number of subcategories.", "isRich": false},
  ]

  // Memory Leak
  const { memoryLeakData } = performanceData;
  var memoryLeakMark;
  // var memoryLeakDes = "The memory leak score is mainly based on the number of detected memory leaks. This test detected " + memoryLeakData.length + " memory leaks, and it is recommended to fix them before going live.";
  var memoryLeakDes = [
    {"text": "The memory leak score is mainly based on the number of detected memory leaks. This test detected ", "isRich": false},
    {"text": memoryLeakData.length , "isRich": true},
    {"text": " memory leaks, and it is recommended to fix them before going live.", "isRich": false},
  ]
  if (memoryLeakData.length <= 0) {
    memoryLeakMark = 100
    memoryLeakDes = "The memory leak score is mainly based on the number of detected memory leaks. This monitoring found no memory leaks.";
    memoryLeakDes = [
      {"text": "The memory leak score is mainly based on the number of detected memory leaks. This monitoring found no memory leaks.", "isRich": false},
    ]
  } else if (memoryLeakData.length <= 1) {
    memoryLeakMark = 95 // TODO Median of this grade, a more linear value is required
  } else if (memoryLeakData.length <= 3) {
    memoryLeakMark = 85 // TODO Median of this grade, a more linear value is required
  } else if (memoryLeakData.length <= 5) {
    memoryLeakMark = 70 // TODO Median of this grade, a more linear value is required
  } else {
    memoryLeakMark = 30 // TODO Median of this grade, a more linear value is required
  }

  // Total Mark
  const totalMark = (lowRate + powerUsageMark + launchAverage + memoryLeakMark) / 4

  const tableData = [
    {
      "categary": "FPS",
      "summary": fpsDes,
      "value": generalMarkMap(lowRate),
    },
    {
      "categary": "Power Usage",
      "summary": powerUsageDes,
      "value": generalMarkMap(powerUsageMark),
    },
    {
      "categary": "Launch Time",
      "summary": launchTimeDes,
      "value": generalMarkMap(launchAverage),
    },
    {
      "categary": "Memory Leak",
      "summary": memoryLeakDes,
      "value": generalMarkMap(memoryLeakMark),
    },
  ]
  // const counclusionImage = getChartsBlobImage(option);

  const des = 'According to the professional test team, the average score given';

  function getColorStyle(mark) {
    return {
      color: mapToTextColor(mark),
      backgroundColor: mapToBgColor(mark),
      fontSize: 56,
      fontFamily: "FZHeiti",
      padding: 16,
      maxLines: 1,
      textOverflow: 'ellipsis',
      textAlign: 'center',
      margin: 24,
    }
  }

  return (
    <View bookmark={{ title: "Overview", fit: true }} break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsChapter} id='link_overview'>Overview</Text>
        <Text style={styles.sectionsTitle}> </Text>
        <Text style={styles.text}>{des}</Text>
        <Text style={getColorStyle(totalMark)}>{generalMarkMap(totalMark)}</Text>
        <Table data={tableData}>
          <TableHeader>
            <TableCell weighting={0.2} style={styles.tableHeader}>Category</TableCell>
            <TableCell weighting={0.6} style={styles.tableHeader}>Suggest</TableCell>
            <TableCell weighting={0.2} style={styles.tableHeader}>Grade</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.2} style={styles.tableRowLabel} getContent={(r) => r.categary} />
            <DataTableCell weighting={0.6} style={styles.tableRowLabel} getContent={(r) => <RichText richItems={r.summary} />} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.value} />
          </TableBody>
        </Table>
      </View>
    </View>
  )
};

export default Conclusion;