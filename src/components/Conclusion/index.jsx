import { useContext } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'

function formatFPSGrade(number){
  if( number < 90)
      return "A"
  if( number < 80)
      return "B"
  if( number <70)
      return "B"
  else
      return "D"
}

const Conclusion = () => {
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }
  const { fps } = performanceData;
  if (!fps) {
    return null;
  }
  const droppedFramesFpsValue = 50
  const lowFps = fps.filter(item => item.value <= droppedFramesFpsValue);
  const lowrate = (lowFps.length / fps.length)*100;
  const fpsDes = `FPS is a simple and direct reflection of the app's lag,55-60fps is excellent,50-55 is normal,below 50 is considered to be dropped frames`
  const launchTimeDes = "Launch speed is the first thing users experience about our app, 400-600ms is excellent, 600-800 is normal, more than 800ms is considered to be in need of optimisation";
  const tableData = [
    {
      "categary": "FPS",
      "summary": fpsDes,
      "value":formatFPSGrade(lowrate),
    },
    {
      "categary": "LaunchTime",
      "summary": launchTimeDes,
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
            <TableCell weighting={0.6} style={styles.tableHeader}>Suggest</TableCell>
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