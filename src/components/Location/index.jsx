import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'

import Strings from 'src/constants/strings';

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
    
    return (
        <View bookmark={{ title: "3.5 GPS Positioning", fit: true }}>
            <View style={styles.contentContainer}>
                <Text style={styles.sectionsSubTitle} id='link_gps'>3.5 GPS Positioning</Text>
                <Text style={styles.text}>{Strings.location.sectionDescription}</Text>
                <Text style={styles.text}>Frequent positioning or long positioning times indicate a greater impact on power consumption, please judge according to the specific business scenario</Text>
                <Text style={styles.hint}>{Strings.location.hint}</Text>
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
                    {Strings.powerUsage.locationRecommendations.map(e => <Text style={styles.text}>{e}</Text>)}
                </View>
            </View> : null}
        </View>
    )
};

export default LocationUse;