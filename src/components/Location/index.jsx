import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import Constants from 'src/constants';
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
    const gpsTableHint = "the follow table lists the number of times positioning was used and the total length of time, in milliseconds"

    return (
        <View bookmark={{ title: "3.5 GPS Positioning", fit: true }}>
            <View style={styles.contentContainer}>
                <Text style={styles.sectionsSubTitle} id='link_gps'>3.5 GPS Positioning</Text>
                <Text style={styles.text}>{gpsDes}</Text>
                <Text style={styles.text}>Frequent positioning or long positioning times indicate a greater impact on power consumption, please judge according to the specific business scenario</Text>
                <Text style={styles.hint}>{gpsTableHint}</Text>
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

            {count > 0 ? <View>
                <Text style={styles.subTitle}>3.5.1 Recommendations for Optimisation</Text>
                <View style={styles.recommendationLayout} wrap={false}>
                    {Constants.strings.powerUsage.locationRecommendations.map(e => <Text style={styles.text}>{e}</Text>)}
                </View>
            </View> : null}
        </View>
    )
};

export default LocationUse;