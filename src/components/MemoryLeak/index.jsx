import { useContext } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
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
        <Text style={memoryLeakStyles.leakStylesTitle}>MemoryLeak</Text>
        <Text style={memoryLeakStyles.leakStylesSubTitle}>MemoryLeak Total Count: {totalCount}</Text>
        {rank.length > 0 ? <Text style={memoryLeakStyles.leakStylesSubTitle}>Top 3:</Text> : null}
        {rank.length > 0 ? <Table data={rank}>
          <TableBody>
            <DataTableCell style={memoryLeakStyles.row} getContent={(r) => r.info} />
            <DataTableCell style={memoryLeakStyles.row} getContent={(r) => r.count} />
          </TableBody>
        </Table> : null}
      </View>
    </View>
  )
};

const memoryLeakStyles = StyleSheet.create({
  leakStylesTitle: styles.title = {
    textAlign: "left",
    fontSize: 28,
    width: "100%",
    fontWeight: "bold"
  },
  leakStylesSubTitle: styles.title = {
    textAlign: "left",
    fontSize: 24,
    width: "100%",
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15
  },
  row: {
    margin: '8',
    textAlign: "center"
  }
});

export default MemoryLeak;