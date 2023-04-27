import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import PerformanceContext from 'src/context/PerformanceContext';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'
import gradeUtil from 'src/utils/grade';
import RichText from 'src/components/customize/RichText';
import Constants from 'src/constants';

const { generalMarkMap, formatPageLoadTimeGrade } = gradeUtil;

function sortPages(pages) {
  const sortedPages = {};
  pages.forEach(page => {
    if (!sortedPages[page.pageName]) {
      sortedPages[page.pageName] = [];
    }
    sortedPages[page.pageName].push(page.duration);
  });
  const result = Object.keys(sortedPages).map(pageName => {
    return {
      pageName,
      duration: sortedPages[pageName].reduce((acc, curr) => acc + curr, 0) / sortedPages[pageName].length
    };
  });
  return result.sort((a, b) => b.duration - a.duration);
}

function averageDuration(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].duration;
  }
  return sum / data.length;
}

const PageLoadTime = () => {
  const performanceData = useContext(PerformanceContext);
  if (!performanceData) {
    return null;
  }
  const { pageLoadTimeData } = performanceData;
  if (!pageLoadTimeData || pageLoadTimeData.length < 1) {
    return null;
  }

  const sortedPages = sortPages(pageLoadTimeData);
  const avgDuration = averageDuration(pageLoadTimeData);
  const loadAvgGrade = formatPageLoadTimeGrade(avgDuration.toFixed(0));

  const launchRank = sortedPages.length > 5 ? sortedPages.slice(0, 5) : sortedPages;
  const indicatorsDes = "The indicators of load time are divided into three categories as Perfect, Normal and Bad, as follows"
  const indicators = [
    { name: "Perfect", value: "50 ms ~ 100 ms" },
    { name: "Normal", value: "100 ms ~ 200 ms" },
    { name: "Bad", value: "> 200 ms" },
  ]

  let dataSourceDes = [
    { "text": "The following data derives from app pages loaded and appeared to user. ", "isRich": false },
    { "text": "A total of ", "isRich": false },
    { "text": `${pageLoadTimeData.length}`, "isRich": true },
    { "text": " times were recorded in this test, and the average time was ", "isRich": false },
    { "text": `${avgDuration.toFixed(0)}`, "isRich": true },
    { "text": " ms.", "isRich": false },
  ]

  return (
    <View bookmark={{ title: "Section 5: Page Load Time", fit: true }}>
      <View style={styles.contentContainer}>
        {/* <Text style={styles.sectionsChapter}>Section 4</Text> */}
        <Text style={styles.sectionsTitle} id='link_page_load'>Page Load Time</Text>
        {/* launchTimeDes */}
        <Text style={styles.sectionsSubTitle}>5.1 Description</Text>
        <Text style={styles.text}>{Constants.strings.pageLoadTime.sectionDescription}</Text>

        <Text style={styles.sectionsSubTitle}>5.2 Grade</Text>
        <Text style={styles.highlightNumber} wrap={false}>{generalMarkMap(loadAvgGrade)}</Text>

        <Text style={styles.sectionsSubTitle}>5.3 Data Detail</Text>
        {/* data source descraption */}
        {dataSourceDes === undefined ? <></> : <RichText richItems={dataSourceDes} normalStyle={styles.text} richStyle={styles.richText} />}
        {/* indicators of page load time */}
        <Text style={styles.subTitle}>5.3.1 Indicator Classification</Text>
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

        {launchRank.length > 0 ? <Text style={styles.subTitle}>5.3.2 Rank Table</Text> : null}
        {launchRank.length > 0 ? <Text style={styles.hint}>The number on the right is the load time for the page.</Text> : null}
        {launchRank.length > 0 ? <View style={styles.tableContainer} wrap={false}><Table data={launchRank}>
          <TableHeader>
            <TableCell weighting={0.5} style={styles.tableHeader}>Page Name</TableCell>
            <TableCell weighting={0.5} style={styles.tableHeader}>Load Time</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.5} style={styles.tableRowLabel} getContent={(r) => r.pageName} />
            <DataTableCell weighting={0.5} style={styles.tableRowValue} getContent={(r) => (r.duration.toFixed(0) + " ms")} />
          </TableBody>
        </Table></View> : null}
      </View>

      <View>
        <Text style={styles.sectionsSubTitle}>5.4 Recommendations for Optimisation</Text>
        <View style={styles.recommendationLayout} wrap={false}>
          <Text style={styles.text}>{Constants.strings.pageLoadTime.recommendation}</Text>
        </View>
      </View>

    </View>
  )
};

export default PageLoadTime;