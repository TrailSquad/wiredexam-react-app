// 实际的pdf内容在这里渲染
import { Document, Page, Text, Font } from '@react-pdf/renderer';
import Cover from 'src/components/Cover';
import Contents from 'src/components/Contents';
import FPS from 'src/components/FPS';
import LaunchTime from 'src/components/LaunchTime';
import PageLoadTime from 'src/components/PageLoadTime';
import NetAbstract from "src/components/NetAbstract"
import MemoryLeak from "src/components/MemoryLeak"
import LocationUse from "src/components/Location"
import PowerUsageChart from "src/components/PowerUsageChart"
import FZHei from 'src/fonts/FZHei.ttf';
import Context from 'src/context';
import styles from 'src/pdfStyles';
import Conclusion from '../Conclusion';
import BackCover from '../BackCover';
import { memo, useState, useCallback } from 'react';

// 默认只支持拉丁英文，中文字体一定要注入
// 方正黑体相对来说非常小（3M），而且是可免费商用无书面授权的字体，因此采用
Font.register({
  family: "FZHeiti",
  src: FZHei
});

const PageSection = ({children}) => {
  return (
    <Page size="A4" style={styles.page} >
      <Text style={styles.header} fixed>Wiredcraft</Text>
      {children}
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  )
}

const Section = ({ index, setIndex, title }) => {
  const handleRender = useCallback(
    ({ pageNumber }) => {
      if (pageNumber !== index) {
        setIndex(pageNumber);
      }
      return title;
    },
    [index, setIndex, title]
  );

  return (
    <Text style={styles.sectionsChapter} render={handleRender} />
  );
};

// 需要使用指定Component组织内容，更多可见 https://react-pdf.org/components
const PDFDocument = ({ performanceData }) => {

  const [powerIndex, setPowerIndex] = useState(0)
  const [launchTimeIndex, setLaunchTimeIndex] = useState(0)
  const [pageLoadTimeIndex, setPageLoadTimeIndex] = useState(0)
  const [memoryIndex, setMemoryIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(0)

  return (
    <Context.Provider value={performanceData}>
      <Document pageMode='useOutlines'>

        <PageSection>
          <Cover performanceData={performanceData} />
          <Contents powerIndex={powerIndex} launchTimeIndex={launchTimeIndex} pageLoadTimeIndex={pageLoadTimeIndex} memoryIndex={memoryIndex} endIndex={endIndex} />
          <Conclusion />
          <FPS />
        </PageSection>

        <PageSection>
          <Section index={powerIndex} setIndex={setPowerIndex} title="Section 3" />
          <PowerUsageChart />
          <NetAbstract />
          <LocationUse />
        </PageSection>

        <PageSection>
          <Section index={launchTimeIndex} setIndex={setLaunchTimeIndex} title="Section 4" />
          <LaunchTime />
        </PageSection>

        <PageSection>
          <Section index={pageLoadTimeIndex} setIndex={setPageLoadTimeIndex} title="Section 5" />
          <PageLoadTime />
        </PageSection>

        <PageSection>
          <Section index={memoryIndex} setIndex={setMemoryIndex} title="Section 6" />
          <MemoryLeak />
        </PageSection>

        <PageSection>
          <Section index={endIndex} setIndex={setEndIndex} title="" />
          <BackCover />
        </PageSection>

      </Document>
    </Context.Provider>
  )
}

export default memo(PDFDocument);