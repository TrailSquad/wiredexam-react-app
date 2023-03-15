import { useContext } from 'react';
import { Text, View, Link } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';

const Contents = () => {
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }

  return (
    <View style={styles.pageContainer} bookmark={{ title: "Contents", fit: true }}>
      <Text style={styles.contentsTitle}>Contents</Text>
      <View style={{ width: "80%", flexDirection: "row" }}>
        <View style={{ width: "80%" }}>
          <Link style={styles.contentsItem} src='#link_overview'>Overview</Link>
          <Link style={styles.contentsItem} src='#link_fps'>1. FPS</Link>
          <Link style={styles.contentsItem} src='#link_power'>2. Power Usage</Link>
          <Link style={styles.contentsSubItem} src='#link_network'>2.1. Network Monitoring</Link>
          <Link style={styles.contentsSubItem} src='#link_gps'>2.2. GPS Positioning</Link>
          <Link style={styles.contentsItem} src='#link_launch'>3. Launch Time</Link>
          <Link style={styles.contentsItem} src='#link_memory'>4. Memory Leak</Link>
        </View>
        <View style={{ width: "20%" }}>
          <Text style={styles.contentsPage}>3</Text>
          <Text style={styles.contentsPage}>4</Text>
          <Text style={styles.contentsPage}>7</Text>
          <Text style={styles.contentsPage}>7</Text>
          <Text style={styles.contentsPage}>10</Text>
          <Text style={styles.contentsPage}>11</Text>
          <Text style={styles.contentsPage}>13</Text>
        </View>
      </View>
    </View>
  )
};

export default Contents;
