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
    <View style={styles.pageContainer}>
      <Text style={styles.contentsTitle}>Contents</Text>
      <View style={{ width: "80%", flexDirection: "row" }}>
        <View style={{ width: "80%" }}>
          <Link style={styles.contentsItem} src='#link_'>1. Overview</Link>
          <Link style={styles.contentsItem} src='#link_fps'>2. FPS</Link>
          <Link style={styles.contentsItem} src='#link_power'>3. Power Usage</Link>
          <Link style={styles.contentsSubItem} src='#link_network'>3.1. Network Monitoring</Link>
          <Link style={styles.contentsSubItem} src='#link_gps'>3.2. GPS Positioning</Link>
          <Link style={styles.contentsItem} src='#link_launch'>4. Launch Time</Link>
          <Link style={styles.contentsItem} src='#link_memory'>5. Memory Leak</Link>
        </View>
        <View style={{ width: "20%" }}>
          <Text style={styles.contentsPage}>2</Text>
          <Text style={styles.contentsPage}>3</Text>
          <Text style={styles.contentsPage}>5</Text>
          <Text style={styles.contentsPage}>5</Text>
          <Text style={styles.contentsPage}>8</Text>
          <Text style={styles.contentsPage}>10</Text>
          <Text style={styles.contentsPage}>12</Text>
        </View>
      </View>
    </View>
  )
};

export default Contents;
