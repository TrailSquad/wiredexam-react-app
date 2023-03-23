import { memo, useContext } from 'react';
import { Text, View, Link } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';

const Contents = (props) => {
  const { powerIndex ,launchTimeIndex, memoryIndex, endIndex } = props
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }

  return (
    <View style={styles.pageContainer} bookmark={{ title: "Contents", fit: true }}>
      <Text style={styles.contentsTitle}>Contents</Text>
      <View style={{ width: "80%", flexDirection: "row" }}>
        <View style={{ width: "90%" }}>
          <Link style={styles.contentsItem} src='#link_overview'>1. Overview   … … … … … … … … … … … … … … … … … … … …</Link>
          <Link style={styles.contentsItem} src='#link_fps'>2. FPS  … … … … … … … … … … … … … … … … … … … … … … … …</Link>
          <Link style={styles.contentsItem} src='#link_power'>3. Power Usage  … … … … … … … … … … … … … … … … … … …</Link>
          <Link style={styles.contentsItem} src='#link_launch'>4. Launch Time  … … … … … … … … … … … … … … … … … … …</Link>
          <Link style={styles.contentsItem} src='#link_memory'>5. Memory Leak  … … … … … … … … … … … … … … … … … … …</Link>
          <Link style={styles.contentsItem} src='#link_back_cover'>6. About  … … … … … … … … … … … … … … … … … … …</Link>
        </View>
        <View style={{ width: "10%" }}>
          <Text style={styles.contentsPage}>3</Text>
          <Text style={styles.contentsPage}>5</Text>
          <Text style={styles.contentsPage}>{powerIndex}</Text>
          <Text style={styles.contentsPage}>{launchTimeIndex}</Text>
          <Text style={styles.contentsPage}>{memoryIndex}</Text>
          <Text style={styles.contentsPage}>{endIndex}</Text>
        </View>
      </View>
    </View>
  )
};

export default memo(Contents);
