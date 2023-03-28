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
    const gpsTableHint = "the follow table lists the number of times positioning was used and the total length of time, in milliseconds"

    const recommendations = [
        `Optimizing GPS requests on mobile devices can improve the accuracy, response time, and user experience of an application. Here are some suggestions for optimizing GPS requests on mobile devices:`,

        `1. Reduce the number of network requests: By combining multiple requests into one or using caching techniques, the number of requests can be reduced, which reduces network latency and data transfer time.`,

        `2. Enable location caching: Enabling location caching can reduce the number of location requests and response time, improving the performance and user experience of the application.`,

        `3. Adjust the priority of GPS requests: Adjusting the priority of GPS requests to a lower priority can reduce battery consumption and network traffic, improving the performance and user experience of the application.`,
    ]

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

            <View>
                <Text style={styles.subTitle}>3.5.1 Recommendations for Optimisation</Text>
                <View style={styles.recommendationLayout} wrap={false}>
                    {recommendations.map(e => <Text style={styles.text}>{e}</Text>)}
                </View>
            </View>
        </View>
    )
};

export default LocationUse;