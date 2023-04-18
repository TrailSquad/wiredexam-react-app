import { memo, useContext } from 'react';
import { Text, View, Link } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';

const Contents = (props) => {
  const { powerIndex, launchTimeIndex, pageLoadTimeIndex, memoryIndex, endIndex } = props
  const performanceData = useContext(Context);
  const CONTENT_ITEMS = [
    {
      title: "1. Overview   … … … … … … … … … … … … … … … … … … … …",
      source: "#link_overview",
      pageIndex: 3,
    },{
      title: "2. FPS  … … … … … … … … … … … … … … … … … … … … … … … …",
      source: "#link_fps",
      pageIndex: 5,
    },{
      title: "3. Power Usage  … … … … … … … … … … … … … … … … … … …",
      source: "#link_power",
      pageIndex: powerIndex,
    },{
      title: "4. Launch Time  … … … … … … … … … … … … … … … … … … …",
      source: "#link_launch",
      pageIndex: launchTimeIndex,
    },
    {
      title: "5. Page Load Time  … … … … … … … … … … … … … … … …",
      source: "#link_page_load",
      pageIndex: pageLoadTimeIndex,
    },
    {
      title: "6. Memory Leak  … … … … … … … … … … … … … … … … … … …",
      source: "#link_memory",
      pageIndex: memoryIndex,
    },{
      title: "7. About  … … … … … … … … … … … … … … … … … … …",
      source: "#link_back_cover",
      pageIndex: endIndex,
    },
  ]
  
  if (!performanceData) {
    return null;
  }

  return (
    <View style={styles.pageContainer} bookmark={{ title: "Contents", fit: true }}>
      <Text style={styles.contentsTitle}>Contents</Text>
      <View style={{ width: "80%", flexDirection: "row" }}>
        <View style={{ width: "90%" }}>
          {CONTENT_ITEMS.map(i => 
            <Link key={i.source} style={styles.contentsItem} src={i.source} >{i.title}</Link>
          )}
        </View>
        <View style={{ width: "10%" }}>
          {CONTENT_ITEMS.map(i => 
            <Text key={i.source} style={styles.contentsPage}>{i.pageIndex}</Text>
          )}
        </View>
      </View>
    </View>
  )
};

export default memo(Contents);
