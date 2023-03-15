import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableCell, TableHeader, TableBody } from '@david.kucsai/react-pdf-table'

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
        <Text style={styles.sectionsTitle} id='link_memory'>4 Memory Leak</Text>
        <Text style={styles.text}>What is Memory Leak? </Text>
        <Text style={styles.text}>Failure to release unused objects from the memory, which means that there are unused objects in the application that the GC cannot clear from memory.</Text>
        <Text style={styles.text}>How does it affect the app?</Text>
        <Text style={styles.text}>The memory resources allocated by the system to a single application are limited, and memory leaks lead to less available memory, resulting in application freezes even crashes.</Text>
        <Text style={styles.sectionsSubTitle}>4.1 Memory leak occurrences</Text>
        <Text style={styles.text}>The total number of memory leaks that occurred during this test.</Text>
        <Text style={styles.highlightNumber}>{totalCount}</Text>
        {rank.length > 0 ? <Text style={styles.sectionsSubTitle}>4.2 Occurrence Ranking</Text> : null}
        {rank.length > 0 ? <View style={styles.tableContainer} wrap={false}><Table data={rank}>
          <TableHeader>
            <TableCell weighting={0.8} style={styles.tableHeader}>Description</TableCell>
            <TableCell weighting={0.2} style={styles.tableHeader}>Count</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.8} style={styles.tableRowLabel} getContent={(r) => r.info} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.count} />
          </TableBody>
        </Table></View> : null}
      </View>
    </View>
  )
};

export default MemoryLeak;