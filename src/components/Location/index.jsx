import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'

const LocationUse = () => {
    const performanceData = useContext(Context);
    if (!performanceData) {
        return null;
    }
    const { locationData } = performanceData;
    if (!locationData) {
        return null;
    }

    const count = locationData.length
    const totalTime = locationData.reduce(function (sum, item) {
        return sum + item.duration;
    }, 0);
    const tableData = [
        { "name": "Count", "value": count },
        { "name": "totalTime", "value": Math.round(totalTime) + " ms" }
    ]

    const gpsDes = `GPS positioning is an important factor in the app's power consumption, and the more frequently it is used and the longer it is used the greater the impact on power consumption.`

    return (
        <View>
            <View style={styles.contentContainer}>
                <Text style={styles.sectionsSubTitle} id='link_gps'>2.2 GPS positioning</Text>
                <Text style={styles.text}>{gpsDes}</Text>
                <Text style={styles.text}>Frequent positioning or long positioning times indicate a greater impact on power consumption, please judge according to the specific business scenario</Text>
                <View style={styles.tableContainer} wrap={false}><Table data={tableData}>
                    <TableHeader>
                        <TableCell weighting={0.5} style={styles.tableHeader}>Name</TableCell>
                        <TableCell weighting={0.5} style={styles.tableHeader}>Value</TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell weighting={0.5} style={styles.tableRowLabel} getContent={(r) => r.name} />
                        <DataTableCell weighting={0.5} style={styles.tableRowValue} getContent={(r) => (r.value)} />
                    </TableBody>
                </Table></View>
            </View>
        </View>
    )
};

export default LocationUse;