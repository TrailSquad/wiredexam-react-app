import { useContext } from 'react';
import { Text, View, Link } from '@react-pdf/renderer';
import logo from 'src/static/wcl.jpg';
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
      <Link style={styles.contentsItem} src='#link_'>1. Overview</Link>
      <Link style={styles.contentsItem} src='#link_fps'>2. FPS</Link>
      <Link style={styles.contentsItem} src='#link_power'>3. Power</Link>
      <Link style={styles.contentsSubItem} src='#link_network'>3.1. Network</Link>
      <Link style={styles.contentsSubItem} src='#link_gps'>3.2. Location</Link>
      <Link style={styles.contentsItem} src='#link_launch'>4. Launch</Link>
      <Link style={styles.contentsItem} src='#link_memory'>5. Memory</Link>
    </View>
  )
};

export default Contents;
