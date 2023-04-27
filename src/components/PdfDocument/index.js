// 实际的pdf内容在这里渲染
import { Document, Page, Text, Font } from "@react-pdf/renderer";
import Cover from "src/components/Cover";
import Contents from "src/components/Contents";
// import FPS from 'src/components/FPS';
import ANR from "src/components/ANR";
import LaunchTime from "src/components/LaunchTime";
import PageLoadTime from "src/components/PageLoadTime";
import NetAbstract from "src/components/NetAbstract";
import CPU from "src/components/CPU";
import MemoryLeak from "src/components/MemoryLeak";
import LocationUse from "src/components/Location";
import PowerUsageChart from "src/components/PowerUsageChart";
import FZHei from "src/fonts/FZHei.ttf";
import PerformanceContext from "src/context/PerformanceContext";
import ContentsContext from "src/context/ContentsContext";
import styles from "src/pdfStyles";
import Conclusion from "../Conclusion";
import BackCover from "../BackCover";
import { memo, useState, useCallback } from "react";
import Constants from "src/constants";

// 默认只支持拉丁英文，中文字体一定要注入
// 方正黑体相对来说非常小（3M），而且是可免费商用无书面授权的字体，因此采用
Font.register({
  family: "FZHeiti",
  src: FZHei,
});

const PageSection = ({ children }) => {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={styles.header} fixed>
        Wiredcraft
      </Text>
      {children}
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  );
};

const Section = ({ index, setIndex, title }) => {
  const handleRender = useCallback(
    ({ pageNumber }) => {
      if (pageNumber !== index) {
        setIndex(pageNumber);
      }
      return `Section ${title}`;
    },
    [index, setIndex, title]
  );

  return <Text style={styles.sectionsChapter} render={handleRender} />;
};
const BackCoverSection = ({ index, setIndex }) => {
  const handleRender = useCallback(
    ({ pageNumber }) => {
      if (pageNumber !== index) {
        setIndex(pageNumber);
      }
      return "";
    },
    [index, setIndex]
  );

  return <Text render={handleRender} />;
};

// 需要使用指定Component组织内容，更多可见 https://react-pdf.org/components
const PDFDocument = ({ performanceData }) => {
  const [powerIndex, setPowerIndex] = useState(0);
  const [launchTimeIndex, setLaunchTimeIndex] = useState(0);
  const [pageLoadTimeIndex, setPageLoadTimeIndex] = useState(0);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const CONTENT_ITEMS = [
    {
      index: null,
      title: "Overview   … … … … … … … … … … … … … … … … … … … …",
      source: "#link_overview",
      pageIndex: 3,
      key: Constants.directories.DIRECTORIES_KEY_OVER_VIEW
    },
    {
      index: null,
      title: "ANR  … … … … … … … … … … … … … … … … … … … … … … … …",
      source: "#link_ANR",
      pageIndex: 5,
      key: Constants.directories.DIRECTORIES_KEY_ANR
    },
    {
      index: null,
      title: "Power Usage  … … … … … … … … … … … … … … … … … … …",
      source: "#link_power",
      pageIndex: powerIndex,
      key: Constants.directories.DIRECTORIES_KEY_POWER_USAGE
    },
    {
      index: null,
      title: "Launch Time  … … … … … … … … … … … … … … … … … … …",
      source: "#link_launch",
      pageIndex: launchTimeIndex,
      key: Constants.directories.DIRECTORIES_KEY_LAUNCH_TIME
    },
    {
      index: null,
      title: "Page Load Time  … … … … … … … … … … … … … … … …",
      source: "#link_page_load",
      pageIndex: pageLoadTimeIndex,
      key: Constants.directories.DIRECTORIES_KEY_PAGE_LOAD_TIME
    },
    {
      index: null,
      title: "Memory Leak  … … … … … … … … … … … … … … … … … … …",
      source: "#link_memory",
      pageIndex: memoryIndex,
      key: Constants.directories.DIRECTORIES_KEY_MEMORY_LEAK
    },
    {
      index: null,
      title: "About  … … … … … … … … … … … … … … … … … … …",
      source: "#link_back_cover",
      pageIndex: endIndex,
      key: Constants.directories.DIRECTORIES_KEY_ABOUT
    },
  ];

  const displayContents = [];

  Constants.directories.DIRECTORIES_PLATFORMS[performanceData.platform].forEach((i, idx) => {
    CONTENT_ITEMS.forEach((j) => {
      if (j.key === i) {
        displayContents.push({
          ...j,
          index: idx + 1,
        });
      }
    });
  });

  return (
    <PerformanceContext.Provider value={performanceData}>
      <ContentsContext.Provider value={displayContents}>
        <Document pageMode="useOutlines">
          <PageSection>
            <Cover performanceData={performanceData} />
            <Contents
              powerIndex={powerIndex}
              launchTimeIndex={launchTimeIndex}
              pageLoadTimeIndex={pageLoadTimeIndex}
              memoryIndex={memoryIndex}
              endIndex={endIndex}
            />
            <Conclusion />
            <ANR />
          </PageSection>
          <PageSection>
            <Section
              index={powerIndex}
              setIndex={setPowerIndex}
              title={displayContents.find(i => i.key === "powerUsage")?.index}
            />
            <PowerUsageChart />
            <NetAbstract />
            <LocationUse />
            <CPU />
          </PageSection>
          <PageSection>
            <Section
              index={launchTimeIndex}
              setIndex={setLaunchTimeIndex}
              title={displayContents.find(i => i.key === "launchTime")?.index}
            />
            <LaunchTime />
          </PageSection>
          <PageSection>
            <Section
              index={pageLoadTimeIndex}
              setIndex={setPageLoadTimeIndex}
              title={displayContents.find(i => i.key === "pageLoadTime")?.index}
            />
            <PageLoadTime />
          </PageSection>
          <PageSection>
            <Section
              index={memoryIndex}
              setIndex={setMemoryIndex}
              title={displayContents.find(i => i.key === "memoryLeak")?.index}
            />
            <MemoryLeak />
          </PageSection>
          <PageSection>
            <BackCoverSection index={endIndex} setIndex={setEndIndex} />
            <BackCover />
          </PageSection>
        </Document>
      </ContentsContext.Provider>
    </PerformanceContext.Provider>
  );
};

export default memo(PDFDocument);
