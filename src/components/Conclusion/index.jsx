import { useContext } from 'react';
import { Text, View, Link } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'
import RichText from 'src/components/customize/RichText';
import gradeUtil from 'src/utils/grade';
import { getColorStyle } from "../../utils/conclusion.util"
import constants from '../../constants'

const { generalMarkMap, formatLaunchTimeGrade, getMemoryLeakMark, getFpsMark, getLocationMark, getNetworkMark, getSlowRequestRate, getMemoryLeakDataSummaryDescription } = gradeUtil
const des = 'According to the professional test team, the average score given:';
const explanationRichText = [
  { "text": "The report rating includes ", "isRich": false },
  { "text": "A+", "isRich": true },
  { "text": ", ", "isRich": false },
  { "text": "A", "isRich": true },
  { "text": ", ", "isRich": false },
  { "text": "B", "isRich": true },
  { "text": ", ", "isRich": false },
  { "text": "C", "isRich": true },
  { "text": ", ", "isRich": false },
  { "text": "D", "isRich": true },
  { "text": " 5 grades, ", "isRich": false },
  { "text": "A+", "isRich": true },
  { "text": " is the best and ", "isRich": false },
  { "text": "D", "isRich": true },
  { "text": " is the worst. Ratings are converted based on specific numerical values ​​(", "isRich": false },
  { "text": "0", "isRich": true },
  { "text": " to ", "isRich": false },
  { "text": "100", "isRich": true },
  { "text": "). The total rating comes from the weighted average of the values ​​of each section. The weights for each section are as follows:", "isRich": false },
]
const weightTableData = [
  {
    "section": "FPS",
    "weight": 0.3,
  },
  {
    "section": "Power Usage",
    "weight": 0.1,
  },
  {
    "section": "Launch Time",
    "weight": 0.3,
  },
  {
    "section": "Memory Leak",
    "weight": 0.3,
  },
]
const tableHeader = [
  {
    weight: 0.2,
    text: "Section"
  },
  {
    weight: 0.7,
    text: "Description"
  }, {
    weight: 0.1,
    text: "Grade"
  },
]
const tableContent = [
  {
    weight: 0.2,
    text: "Section",
    style: styles.tableRowLabel,
    content: (r) => r.section
  },
  {
    weight: 0.7,
    text: "Description",
    style: styles.tableRowLabel,
    content: (r) => <RichText richItems={r.summary} normalStyle={styles.tableRowLabel} richStyle={styles.richText} />
  }, {
    weight: 0.1,
    text: "Grade",
    style: styles.tableRowValue,
    content: (r) => r.value

  },
]
const weightTableHeader = [
  {
    weight: 0.5,
    text: "Section"
  },
  {
    weight: 0.5,
    text: "Weight"
  }
]
const weightTableContent = [
  {
    weight: 0.5,
    text: "Section",
    style: styles.tableRowLabel,
    content: (r) => r.section
  },
  {
    weight: 0.5,
    text: "Weight",
    style: styles.tableRowValue,
    content: (r) => r.weight
  }
]

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
  const highFpsValue = 55
  const lowFps = fps.filter(item => item.value < droppedFramesFpsValue);
  const lowRate = lowFps.length / fps.length;
  const highFps = fps.filter(item => item.value >= highFpsValue);
  const highRate = (highFps.length * 100 / fps.length).toFixed(0);
  const fpsMark = getFpsMark(lowRate);
  const fpsDes = [
    { "text": "FPS is a simple and direct reflection of the app's lag, ", "isRich": false },
    { "text": `${highFpsValue} ~ 60`, "isRich": true },
    { "text": " is excellent, ", "isRich": false },
    { "text": `${droppedFramesFpsValue} ~ ${highFpsValue}`, "isRich": true },
    { "text": " is normal,below ", "isRich": false },
    { "text": `${droppedFramesFpsValue}`, "isRich": true },
    { "text": " is considered to be dropped frames. In this test, ", "isRich": false },
    { "text": `${highRate}%`, "isRich": true },
    { "text": " of the FPS sampling values ​​are excellent.", "isRich": false },
  ]

  // Power Usage
  const { network } = performanceData;
  let slowRequestRate = getSlowRequestRate(network.slowRequestCount, network.summaryRequestCount);
  let networkMark = getNetworkMark(network.requestSuccessRate, slowRequestRate);
  let locationMark = getLocationMark();
  let powerUsageMark = networkMark * 0.8 + locationMark * 0.2;
  let powerUsageDes = [
    { "text": "Power consumption grade is based on success rate of network requests and rate of slow requests. In this test, success rate of network requests is ", "isRich": false },
    { "text": `${(network.requestSuccessRate * 100).toFixed(0)}%`, "isRich": true },
    { "text": `. Rate of slow requests is `, "isRich": false },
    { "text": `${(slowRequestRate * 100).toFixed(0)}%`, "isRich": true },
    { "text": ". ", "isRich": false },
  ]

  //launchTimeDes
  const { launchTimeData } = performanceData;
  const sortData = launchTimeData.sort((a, b) => (a.time - b.time));
  const averageCost = (sortData.reduce(function (sum, item) { return sum + item.launchCost; }, 0) / sortData.length).toFixed(0)
  const launchAverage = formatLaunchTimeGrade(averageCost)
  const launchTimeDes = [
    { "text": "Launch speed is the first thing users experience about our app, ", "isRich": false },
    { "text": "within 400ms", "isRich": true },
    { "text": " is excellent, ", "isRich": false },
    { "text": "400 ms ~ 800 ms", "isRich": true },
    { "text": " is normal, more than ", "isRich": false },
    { "text": "800 ms", "isRich": true },
    { "text": " is considered to be in need of optimisation. In this test, the average launch time is ", "isRich": false },
    { "text": `${averageCost} ms`, "isRich": true },
    { "text": ".", "isRich": false },
  ]

  // Memory Leak
  const { memoryLeakData } = performanceData;
  let memoryLeakMark = getMemoryLeakMark(memoryLeakData.length);
  let memoryLeakDes = getMemoryLeakDataSummaryDescription(memoryLeakData);

  // Total Mark
  const totalMark = fpsMark * 0.3 + powerUsageMark * 0.1 + launchAverage * 0.3 + memoryLeakMark * 0.3

  const tableData = [
    {
      "section": "FPS",
      "summary": fpsDes,
      "value": generalMarkMap(fpsMark),
    },
    {
      "section": "Power Usage",
      "summary": powerUsageDes,
      "value": generalMarkMap(powerUsageMark),
    },
    {
      "section": "Launch Time",
      "summary": launchTimeDes,
      "value": generalMarkMap(launchAverage),
    },
    {
      "section": "Memory Leak",
      "summary": memoryLeakDes,
      "value": generalMarkMap(memoryLeakMark),
    },
  ]
  // const counclusionImage = getChartsBlobImage(option);

  return (
    <View bookmark={{ title: "Section 1: Overview", fit: true }} break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsChapter}>Section 1</Text>
        <Text style={styles.sectionsTitle} id='link_overview'>Overview</Text>

        <Text style={styles.text}>{des}</Text>
        <Text style={getColorStyle(totalMark)}>{generalMarkMap(totalMark)}</Text>
        <View style={styles.tableContainer} wrap={false}>
          <Table data={tableData}>
            <TableHeader>
              {tableHeader.map(header =>
                <TableCell weighting={header.weight} style={styles.tableHeader} key={header.text}>{header.text}</TableCell>
              )}
            </TableHeader>
            <TableBody>
              {tableContent.map(({ weight, style, content, text }) => <DataTableCell weighting={weight} style={style} getContent={content} key={text} />)}
            </TableBody>
          </Table>
        </View>
        <Text style={styles.subTitle}>Explanation</Text>
        <RichText richItems={explanationRichText} normalStyle={styles.text} richStyle={styles.richText} />
        <View style={styles.tableContainer} wrap={false}>
          <Table data={weightTableData}>
            <TableHeader>
              {weightTableHeader.map(header =>
                <TableCell weighting={header.weight} style={styles.tableHeader} key={header.text}>{header.text}</TableCell>
              )}
            </TableHeader>
            <TableBody>
              {weightTableContent.map(({ weight, style, content, text }) => <DataTableCell weighting={weight} style={style} getContent={content} key={text} />)}
            </TableBody>
          </Table>
        </View>
        <Text style={styles.subTitle}>Reference links</Text>
        <Text style={styles.text}><Link>{constants.strings.launchTime.launchTimeStandardLink}</Link></Text>
        {constants.strings.network.standardLinks.map(e => <Text style={styles.text}><Link>{e}</Link></Text>)}
      </View>
    </View >
  )
};

export default Conclusion;