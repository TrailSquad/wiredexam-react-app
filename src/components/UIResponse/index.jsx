import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import PerformanceContext from 'src/context/PerformanceContext';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'
import gradeUtil from 'src/utils/grade';
import RichText from 'src/components/customize/RichText';
import Constants from 'src/constants';
import useSectionIndex from 'src/utils/hooks/useSectionIndex';

const { generalMarkMap, getBlockMark } = gradeUtil;

const UIResponse = () => {
  const performanceData = useContext(PerformanceContext);
  const sectionIndex = useSectionIndex('UIResponse')

  if (!performanceData) {
    return null;
  }
  const { blockData } = performanceData;
  if (!blockData || blockData.length < 1) {
    return null;
  }
  const blockMark = getBlockMark(blockData)

  return (
    <View bookmark={{ title: `Section ${sectionIndex}: UIResponse`, fit: true }} break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsChapter}>{`Section ${sectionIndex}`}</Text>
        <Text style={styles.sectionsTitle} id='link_UIResponse'>UI Response</Text>
        {/* des */}
        <Text style={styles.sectionsSubTitle}>{`${sectionIndex}.1 Description`}</Text>
        <Text style={styles.text}>{Constants.strings.uiRes.sectionDescription}</Text>

        <Text style={styles.sectionsSubTitle}>{`${sectionIndex}.2 Grade`}</Text>
        <Text style={styles.highlightNumber} wrap={false}>{generalMarkMap(blockMark)}</Text>

        <Text style={styles.sectionsSubTitle}>{`${sectionIndex}.3 Data Detail`}</Text>
        {/* data source descraption */}
        {blockData.length === 0 ? <Text style={styles.text}>{Constants.strings.uiRes.noDataDescription}</Text> : <RichText richItems={Constants.strings.uiRes.dataDescription} normalStyle={styles.text} richStyle={styles.richText} />}

        {blockData.length > 0 ? <Text style={styles.subTitle}>{`${sectionIndex}.3.1 Rank Table`}</Text> : null}
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
        <Text style={styles.sectionsSubTitle}>{`${sectionIndex}.4 Recommendations for optimisation`}</Text>
        <View style={styles.recommendationLayout} wrap={false}>
          <Text style={styles.text}>{Constants.strings.uiRes.recommendation}</Text>
        </View>
      </View>)}
      
    </View>
  )
};

export default UIResponse;