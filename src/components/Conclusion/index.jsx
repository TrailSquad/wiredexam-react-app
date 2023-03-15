import { useContext } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'

const Conclusion = () => {
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }

  const fpsDes = `FPS is a simple and direct reflection of the app's lag,55-60fps is excellent,50-55 is normal,below 50 is considered to be dropped frames`

  const tableData = [
    {
      "categary": "FPS",
      "summary": fpsDes,
      "value": "A",
    },
    {
      "categary": "LaunchTime",
      "summary": "LaunchTime",
      "value": "A",
    },
    {
      "categary": "PwerUsage",
      "summary": "",
      "value": "A",
    },
    {
      "categary": "MemoryLeak",
      "summary": "",
      "value": "A",
    },
  ]
  // const counclusionImage = getChartsBlobImage(option);

  const des = 'According to the professional test team, the average score given';


  return (

    <View break>
      <View style={styles.contentContainer}>
        <Text style={conclusionStyles.leakStylesTitle}>Conclusion</Text>
        <Text style={styles.sectionsSubTitle}>{des}</Text>
        <Table data={tableData}>
          <TableHeader>
            <TableCell weighting={0.2} style={styles.tableHeader}>Category</TableCell>
            <TableCell weighting={0.6} style={styles.tableHeader}>suggest</TableCell>
            <TableCell weighting={0.2} style={styles.tableHeader}>Grade</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.categary} />
            <DataTableCell weighting={0.6} getContent={(r) => r.summary} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.value} />
          </TableBody>
        </Table>
      </View>
    </View>
  )
};

const conclusionStyles = StyleSheet.create({
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

export default Conclusion;