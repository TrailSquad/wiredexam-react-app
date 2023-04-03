import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableCell, TableHeader, TableBody } from '@david.kucsai/react-pdf-table'
import grateUtil from 'src/utils/grade';
import Constants from 'src/constants';
import RichText from 'src/components/customize/RichText';

const { generalMarkMap, getMemoryLeakMark } = grateUtil

const MemoryLeak = () => {
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }
  const { memoryLeakData } = performanceData;
  if (!memoryLeakData || memoryLeakData.length < 1) {
    return null;
  }
  const sortData = memoryLeakData.sort((a, b) => (b.count - a.count));
  const rank = sortData.length > 3 ? sortData.slice(0, 3) : sortData;
  const memoryLeakMark = getMemoryLeakMark(memoryLeakData.length);

  const dataSourceDes = [
    { "text": `This test found `, "isRich": false },
    { "text": `${sortData.length}`, "isRich": true },
    { "text": " memory leaks in total. All issues should be fixed before going live. Here is a list of the most frequently occurring issues.", "isRich": false },
  ]
  
  return (
    <View bookmark={{ title: "Section 5: Memory Leak", fit: true }}>
      <View style={styles.contentContainer}>
        {/* <Text style={styles.sectionsChapter}>Section 5</Text> */}
        <Text style={styles.sectionsTitle} id='link_memory'>Memory Leak</Text>

        <Text style={styles.sectionsSubTitle}>5.1 Description</Text>
        <Text style={styles.text}>{Constants.strings.memoryLeak.sectionDescription}</Text>

        <Text style={styles.sectionsSubTitle}>5.2 Grade</Text>
        <Text style={styles.highlightNumber} wrap={false}>{generalMarkMap(memoryLeakMark)}</Text>

        <Text style={styles.sectionsSubTitle}>5.3 Data Detail</Text>
        <RichText richItems={dataSourceDes} normalStyle={styles.text} richStyle={styles.richText} />
        {rank.length > 0 ? <View style={styles.tableContainer} wrap={false}><Table data={rank}>
          <TableHeader>
            <TableCell weighting={0.8} style={styles.tableHeader}>Description</TableCell>
            <TableCell weighting={0.2} style={styles.tableHeader}>Count</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.8} style={styles.tableRowLabelSingleLine} getContent={(r) => r.info} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.count} />
          </TableBody>
        </Table></View> : null}
      </View>

      <View>
        <Text style={styles.sectionsSubTitle}>5.4 Recommendations for Optimisation</Text>
        <View style={styles.recommendationLayout} wrap={false}>
          <Text style={styles.text}>{Constants.strings.memoryLeak.recommendation}</Text>
        </View>
      </View>
    </View>
  )
};

export default MemoryLeak;