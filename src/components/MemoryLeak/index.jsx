import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody } from '@david.kucsai/react-pdf-table'

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
  const totalCount = memoryLeakData.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count,
    0
  );
  return (
    <View break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsTitle} id='link_memory'>4 MemoryLeak</Text>
        <Text style={styles.sectionsSubTitle}>MemoryLeak Total Count: {totalCount}</Text>
        {rank.length > 0 ? <Text style={styles.sectionsSubTitle}>Top 3:</Text> : null}
        {rank.length > 0 ? <Table data={rank}>
          <TableBody>
            <DataTableCell style={styles.tableRowLabel} getContent={(r) => r.info} />
            <DataTableCell style={styles.tableRowValue} getContent={(r) => r.count} />
          </TableBody>
        </Table> : null}
      </View>
    </View>
  )
};

export default MemoryLeak;