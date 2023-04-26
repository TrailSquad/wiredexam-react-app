import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import PerformanceContext from 'src/context/PerformanceContext';
import { Table, DataTableCell, TableCell, TableHeader, TableBody } from '@david.kucsai/react-pdf-table'
import grateUtil from 'src/utils/grade';
import Constants from 'src/constants';
import RichText from 'src/components/customize/RichText';
import useSectionIndex from 'src/utils/hooks/useSectionIndex';
const { generalMarkMap, getMemoryLeakMark, getMemoryLeakDataSummaryDescription } = grateUtil

const MemoryLeak = () => {
  const sectionIndex = useSectionIndex("memoryLeak")
  const performanceData = useContext(PerformanceContext);
  const { memoryLeakData } = performanceData;
  const sortData = memoryLeakData.sort((a, b) => (b.count - a.count));
  const rank = sortData.length > 3 ? sortData.slice(0, 3) : sortData;
  const memoryLeakMark = getMemoryLeakMark(memoryLeakData.length);

  return (
    <View bookmark={{ title: `Section ${sectionIndex}: Memory Leak`, fit: true }}>
      <View style={styles.contentContainer}>
        {/* <Text style={styles.sectionsChapter}>Section 5</Text> */}
        <Text style={styles.sectionsTitle} id='link_memory'>Memory Leak</Text>

        <Text style={styles.sectionsSubTitle}>{sectionIndex}.1 Description</Text>
        <Text style={styles.text}>{Constants.strings.memoryLeak.sectionDescription}</Text>

        <Text style={styles.sectionsSubTitle}>{sectionIndex}.2 Grade</Text>
        <Text style={styles.highlightNumber} wrap={false}>{generalMarkMap(memoryLeakMark)}</Text>

        <Text style={styles.sectionsSubTitle}>{sectionIndex}.3 Data Detail</Text>
        <RichText richItems={getMemoryLeakDataSummaryDescription(sortData)} normalStyle={styles.text} richStyle={styles.richText} />
        {rank.length > 0 ? <>
          <Text style={styles.text}> Here is a list of the most frequently occurring issues.</Text>
          <View style={styles.tableContainer} wrap={false}><Table data={rank}>
            <TableHeader>
              <TableCell weighting={0.8} style={styles.tableHeader}>Description</TableCell>
              <TableCell weighting={0.2} style={styles.tableHeader}>Count</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell weighting={0.8} style={styles.tableRowLabelSingleLine} getContent={(r) => r.info} />
              <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.count} />
            </TableBody>
          </Table></View></> : null}
      </View>

      {memoryLeakMark < 100 ?
        <View>
          <Text style={styles.sectionsSubTitle}>{sectionIndex}.4 Recommendations for Optimisation</Text>
          <View style={styles.recommendationLayout} wrap={false}>
            <Text style={styles.text}>{Constants.strings.memoryLeak.recommendation}</Text>
          </View>
        </View> : null}

    </View>
  )
};

export default MemoryLeak;