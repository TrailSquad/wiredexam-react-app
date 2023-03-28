import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableCell, TableHeader, TableBody } from '@david.kucsai/react-pdf-table'
import grateUtil from 'src/utils/grade';
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
  var memoryLeakMark = getMemoryLeakMark(memoryLeakData.length);

  const dataSourceDes = [
    { "text": `This test found `, "isRich": false },
    { "text": `${sortData.length}`, "isRich": true },
    { "text": " memory leaks in total. All issues should be fixed before going live. Here is a list of the most frequently occurring issues.", "isRich": false },
  ]

  const recommendations = [
    `1. Use memory management tools: Using memory management tools such as Valgrind, LeakCanary, Instruments, etc. can help you quickly identify and fix memory leak issues.`,

    `2. Avoid circular references: Make sure there are no circular references in your code, which can prevent memory from being released.`,

    `3. Release resources in a timely manner: Release resources that are no longer needed, such as closing file handles, freeing dynamically allocated memory, etc.`,

    `4. Avoid unnecessary memory allocation: Avoid unnecessarily allocating memory in loops or recursive functions.`,

    `5. Use weak references: If you need to reference an object but don't want to keep it alive, you can use weak references, which can reduce the risk of memory leaks.`,

    `6. Use autorelease pools: In iOS development, you can use autorelease pools to release temporarily allocated objects, which can help reduce the risk of memory leaks.`,

    `7. Check for errors in your code: Check for errors in your code such as array out of bounds, pointer errors, etc., which can lead to memory leaks or other issues.`
  ]
  return (
    <View bookmark={{ title: "Section 5: Memory Leak", fit: true }}>
      <View style={styles.contentContainer}>
        {/* <Text style={styles.sectionsChapter}>Section 5</Text> */}
        <Text style={styles.sectionsTitle} id='link_memory'>Memory Leak</Text>

        <Text style={styles.sectionsSubTitle}>5.1 Description</Text>
        <Text style={styles.text}>Memory leak means failure to release unused objects from the memory, which means that there are unused objects in the application that the GC cannot clear from memory.</Text>
        <Text style={styles.text}>The impact of memory leaks on mobile applications is significant and can lead to the following issues:</Text>
        <Text style={styles.text}>1. App crashes: When memory leaks cause the application to occupy more memory than the device's available memory, the application will crash or be forcibly closed by the system.</Text>
        <Text style={styles.text}>2. Performance degradation: Memory leaks can cause the application's performance to degrade because they occupy the device's resources and make the application slow and unstable.</Text>
        <Text style={styles.text}>3. Increased battery consumption: Memory leaks can cause the application to occupy the device's resources, including CPU and memory, thereby increasing the device's battery consumption.</Text>
        <Text style={styles.text}>4. Poor user experience: When memory leaks cause the application to become slow, unstable, or crash, the user experience is affected.</Text>
        <Text style={styles.text}>Therefore, to ensure the stability and performance of the application</Text>

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
          {recommendations.map(e => <Text style={styles.text}>{e}</Text>)}
        </View>
      </View>
    </View>
  )
};

export default MemoryLeak;