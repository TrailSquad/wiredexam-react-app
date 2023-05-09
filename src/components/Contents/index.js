import { memo, useCallback, useContext } from "react";
import { Text, View, Link } from "@react-pdf/renderer";
import styles from "src/pdfStyles";
import PerformanceContext from "src/context/PerformanceContext";
import ContentsContext from "src/context/ContentsContext";

const Contents = ({
  powerIndex,
  launchTimeIndex,
  pageLoadTimeIndex,
  memoryIndex,
  endIndex,
}) => {
  const performanceData = useContext(PerformanceContext);
  const contents = useContext(ContentsContext);

  const renderContentItem = useCallback(
    ({ source, title, index }) => (
      <Link key={source} style={styles.contentsItem} src={source}>
        {`${index}. ${title}`}
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
          {contents.map((item) => renderContentItem(item))}
        </View>
        <View style={{ width: "10%" }}>
          {contents.map((item) => renderContentPageIndex(item))}
        </View>
      </View>
    </View>
  );
};

const arePropsEqual = (oldPros, newPros) => newPros.endIndex === 0;

export default memo(Contents, arePropsEqual);
