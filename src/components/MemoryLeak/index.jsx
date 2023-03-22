import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableCell, TableHeader, TableBody } from '@david.kucsai/react-pdf-table'
import grateUtil from 'src/utils/grade';

const {generalMarkMap, getMemoryLeakMark} = grateUtil

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
  var memoryLeakMark = getMemoryLeakMark(memoryLeakData.length);

  const recommendations = [
    `a、 Use memory management tools: Using memory management tools such as Valgrind, LeakCanary, Instruments, etc. can help you quickly identify and fix memory leak issues.`,

    `b、 Avoid circular references: Make sure there are no circular references in your code, which can prevent memory from being released.`,

    `c、 Release resources in a timely manner: Release resources that are no longer needed, such as closing file handles, freeing dynamically allocated memory, etc.`,

    `d、 Avoid unnecessary memory allocation: Avoid unnecessarily allocating memory in loops or recursive functions.`,

    `e、 Use weak references: If you need to reference an object but don't want to keep it alive, you can use weak references, which can reduce the risk of memory leaks.`,
    
    `f、 Use autorelease pools: In iOS development, you can use autorelease pools to release temporarily allocated objects, which can help reduce the risk of memory leaks.`,

    `g、 Check for errors in your code: Check for errors in your code such as array out of bounds, pointer errors, etc., which can lead to memory leaks or other issues.`
  ]
  return (
    <View bookmark={{ title: "Section 5: Memory Leak", fit: true }} break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsChapter}>Section 5</Text>
        <Text style={styles.sectionsTitle} id='link_memory'>Memory Leak</Text>

        <Text style={styles.sectionsSubTitle}>5.1 Description</Text>
        <Text style={styles.text}>Failure to release unused objects from the memory, which means that there are unused objects in the application that the GC cannot clear from memory.</Text>
        <Text style={styles.text}>The memory resources allocated by the system to a single application are limited, and memory leaks lead to less available memory, resulting in application freezes even crashes.</Text>

        <Text style={styles.sectionsSubTitle}>5.2 Grade</Text>
        <Text style={styles.highlightNumber} wrap={false}>{generalMarkMap(memoryLeakMark)}</Text>

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
        {recommendations.map(e => <Text style={styles.text}>{e}</Text>)}
      </View>
    </View>
  )
};

export default MemoryLeak;