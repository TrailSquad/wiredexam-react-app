import { memo, useMemo, useCallback, useContext } from "react";
import { Text, View, Link } from "@react-pdf/renderer";
import styles from "src/pdfStyles";
import Context from "src/context";

const Contents = ({
  powerIndex,
  launchTimeIndex,
  pageLoadTimeIndex,
  memoryIndex,
  endIndex,
}) => {
  const performanceData = useContext(Context);

  const CONTENT_ITEMS = useMemo(
    () => [
      {
        title: "1. Overview   … … … … … … … … … … … … … … … … … … … …",
        source: "#link_overview",
        pageIndex: 3,
      },
      {
        title: "2. ANR  … … … … … … … … … … … … … … … … … … … … … … … …",
        source: "#link_ANR",
        pageIndex: 5,
      },
      {
        title: "3. Power Usage  … … … … … … … … … … … … … … … … … … …",
        source: "#link_power",
        pageIndex: powerIndex,
      },
      {
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
      },
      {
        title: "7. About  … … … … … … … … … … … … … … … … … … …",
        source: "#link_back_cover",
        pageIndex: endIndex,
      },
    ],
    [powerIndex, launchTimeIndex, pageLoadTimeIndex, memoryIndex, endIndex]
  );

  const renderContentItem = useCallback(
    ({ source, title }) => (
      <Link key={source} style={styles.contentsItem} src={source}>
        {title}
      </Link>
    ),
    []
  );

  const renderContentPageIndex = useCallback(
    ({ source, pageIndex }) => (
      <Text key={source} style={styles.contentsPage}>
        {pageIndex}
      </Text>
    ),
    []
  );

  if (!performanceData) {
    return null;
  }

  return (
    <View
      style={styles.pageContainer}
      bookmark={{ title: "Contents", fit: true }}
    >
      <Text style={styles.contentsTitle}>Contents</Text>
      <View style={{ width: "80%", flexDirection: "row" }}>
        <View style={{ width: "90%" }}>
          {CONTENT_ITEMS.map((item) => renderContentItem(item))}
        </View>
        <View style={{ width: "10%" }}>
          {CONTENT_ITEMS.map((item) => renderContentPageIndex(item))}
        </View>
      </View>
    </View>
  );
};

const arePropsEqual = (oldPros, newPros) => newPros.endIndex === 0;

export default memo(Contents, arePropsEqual);
