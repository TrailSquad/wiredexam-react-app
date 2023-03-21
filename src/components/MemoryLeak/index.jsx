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
    <View bookmark={{ title: "Section 5: Memory Leak", fit: true }} break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsChapter}>Section 5</Text>
        <Text style={styles.sectionsTitle} id='link_memory'>Memory Leak</Text>

        <Text style={styles.sectionsSubTitle}>5.1 Description</Text>
        <Text style={styles.text}>Failure to release unused objects from the memory, which means that there are unused objects in the application that the GC cannot clear from memory.</Text>
        <Text style={styles.text}>The memory resources allocated by the system to a single application are limited, and memory leaks lead to less available memory, resulting in application freezes even crashes.</Text>


        <Text style={styles.sectionsSubTitle}>5.2 Grade</Text>
        <Text style={styles.highlightNumber} wrap={false}>TODO</Text>

        <Text style={styles.sectionsSubTitle}>5.3 Data Detail</Text>
        <Text style={styles.subTitle}>5.3.1 Memory leak occurrences</Text>
        <Text style={styles.hint}>The total number of memory leaks that occurred during this test.</Text>
        <Text style={styles.highlightNumber}>{totalCount}</Text>
        {rank.length > 0 ? <Text style={styles.subTitle}>5.3.2 Occurrence Ranking</Text> : null}
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

        <Text style={styles.sectionsSubTitle}>5.4 Recommendations for optimisation</Text>
        <Text style={styles.text}>TODO</Text>
      </View>
    </View>
  )
};

export default MemoryLeak;