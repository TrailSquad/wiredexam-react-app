import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'
import gradeUtil from 'src/utils/grade';
import RichText from 'src/components/customize/RichText';
import Constants from 'src/constants';

const { generalMarkMap, getBlockMark } = gradeUtil;

const ANR = () => {
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }
  const { blockData } = performanceData;
  if (!blockData || blockData.length < 1) {
    return null;
  }
  const blockMark = getBlockMark(blockData)



  return (
    <View bookmark={{ title: "Section 2: ANR", fit: true }} break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsChapter}>Section 2</Text>
        <Text style={styles.sectionsTitle} id='link_ANR'>ANR</Text>
        {/* des */}
        <Text style={styles.sectionsSubTitle}>2.1 Description</Text>
        <Text style={styles.text}>{Constants.strings.anr.sectionDescription}</Text>

        <Text style={styles.sectionsSubTitle}>2.2 Grade</Text>
        <Text style={styles.highlightNumber} wrap={false}>{generalMarkMap(blockMark)}</Text>

        <Text style={styles.sectionsSubTitle}>2.3 Data Detail</Text>
        {/* data source descraption */}
        {blockData.length === 0 ? <Text style={styles.text}>{Constants.strings.anr.noDataDescription}</Text> : <RichText richItems={Constants.strings.anr.dataDescription} normalStyle={styles.text} richStyle={styles.richText} />}

        {blockData.length > 0 ? <Text style={styles.subTitle}>2.3.1 Rank Table</Text> : null}
        {blockData.length > 0 ? <Text style={styles.hint}>The string on the left is the page info or main callstack, the number on the middle is the duration, the number on the right is the count</Text> : null}
        {blockData.length > 0 ? <View style={styles.tableContainer} wrap={false}><Table data={blockData}>
          <TableHeader>
            <TableCell weighting={0.4} style={styles.tableHeader}>Info</TableCell>
            <TableCell weighting={0.3} style={styles.tableHeader}>Duration</TableCell>
            <TableCell weighting={0.3} style={styles.tableHeader}>Count</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.4} style={styles.tableRowLabel} getContent={(r) => r.info} />
            <DataTableCell weighting={0.3} style={styles.tableRowValue} getContent={(r) => (r.duration.toFixed(0) + " ms")} />
            <DataTableCell weighting={0.3} style={styles.tableRowValue} getContent={(r) => (r.count + " times")} />
          </TableBody>
        </Table></View> : null}
      </View>

      {blockData.length === 0 ? null : (<View>
        <Text style={styles.sectionsSubTitle}>2.4 Recommendations for Optimisation</Text>
        <View style={styles.recommendationLayout} wrap={false}>
          <Text style={styles.text}>{Constants.strings.anr.recommendation}</Text>
        </View>
      </View>)}
      
    </View>
  )
};

export default ANR;