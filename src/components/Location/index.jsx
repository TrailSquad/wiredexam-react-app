import { useContext } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';

const LocationUse = () => {
    const performanceData = useContext(Context);
    if (!performanceData) {
        return null;
    }
    const { locationData } = performanceData;
    if (!locationData) {
        return null;
    }
    const { count, totalTime } = locationData;
    return (
        <View>
            <View style={styles.contentContainer}>
                <Text style={locationUseStyles.title}>Use of GPS positioning</Text>
                <Text style={locationUseStyles.subTitle}>Total Count: {count}</Text>
                <Text style={locationUseStyles.subTitle}>Total Duration: {totalTime} ms</Text>
                <Text style={locationUseStyles.subTitle}>
                    Frequent positioning or long positioning times indicate a greater impact on power consumption, please judge according to the specific business scenario
                </Text>
            </View>
        </View>
    )
};

const locationUseStyles = StyleSheet.create({
    title: styles.title = {
        textAlign: "left",
        fontSize: 28,
        width: "100%",
        fontWeight: "bold"
    },
    subTitle: styles.title = {
        textAlign: "left",
        fontSize: 24,
        width: "100%",
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 15
    }
});

export default LocationUse;