import { memo, useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import PerformanceContext from 'src/context/PerformanceContext';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'
import Strings from 'src/constants/strings';
import useSectionIndex from 'src/utils/hooks/useSectionIndex';

const CPU = () => {
    const performanceData = useContext(PerformanceContext);
    const sectionIndex = useSectionIndex('powerUsage')

    if (!performanceData) {
        return null;
    }
    const { cpuData } = performanceData;
    if (!cpuData) {
        return null;
    }
    const anomalies = cpuData.anomalies.length > 5 ? cpuData.anomalies.slice(0, 5) : cpuData.anomalies;
    const count = anomalies.length

    return (
        <View bookmark={{ title: `${sectionIndex}.6 CPU Usage`, fit: true }}>
            <View style={styles.contentContainer}>
                <Text style={styles.sectionsSubTitle} id='link_cpu'>{`${sectionIndex}.6 CPU Usage`}</Text>
                <Text style={styles.text}>{Strings.cpu.description}</Text>
                <Text style={styles.text}>{Strings.cpu.highUsageDescription}</Text>
            </View>
            {count > 0 ?
                <View>
                    <Text style={styles.subTitle}>{`${sectionIndex}.6.1 Rank Table`}</Text>
                    <Text style={styles.hint}>{Strings.cpu.hint}</Text>
                    <View style={styles.tableContainer} wrap={false}><Table data={anomalies}>
                        <TableHeader>
                            <TableCell weighting={0.3} style={styles.tableHeader}>Average</TableCell>
                            <TableCell weighting={0.3} style={styles.tableHeader}>Maximum</TableCell>
                            <TableCell weighting={0.4} style={styles.tableHeader}>Duration</TableCell>
                        </TableHeader>
                        <TableBody>
                            <DataTableCell weighting={0.3} style={styles.tableRowLabel} getContent={(r) => (`${r.averageCpuUsageRate}%`)} />
                            <DataTableCell weighting={0.3} style={styles.tableRowValue} getContent={(r) => (`${r.maxCpuUsageRate}%`)} />
                            <DataTableCell weighting={0.4} style={styles.tableRowValue} getContent={(r) => (`${r.count * 0.5} s`)} />
                        </TableBody>
                    </Table></View>
                </View> : null}
            {count > 0 ?
                <View>
                    <Text style={styles.subTitle}>{`${sectionIndex}.6.2 Recommendations for optimisation`}</Text>
                    <View style={styles.recommendationLayout} wrap={false}>
                        <Text style={styles.text}>{Strings.cpu.recommendation}</Text>
                    </View>
                </View> : null}
            {count === 0 ?
                <View>
                    <Text style={styles.subTitle}>{`${sectionIndex}.6.1 Abnormal data`}</Text>
                    <Text style={styles.text}>No cpu overuse scenarios found</Text>
                </View> : null}
        </View>
    )
}

export default memo(CPU);