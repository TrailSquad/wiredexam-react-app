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
import { memo, useState } from 'react';

// 默认只支持拉丁英文，中文字体一定要注入
// 方正黑体相对来说非常小（3M），而且是可免费商用无书面授权的字体，因此采用
Font.register({
  family: "FZHeiti",
  src: FZHei
});


// 需要使用指定Component组织内容，更多可见 https://react-pdf.org/components
const PDFDocument = ({ performanceData }) => {

  const [powerIndex, setPowerIndex] = useState(0)
  const [launchTimeIndex, setLaunchTimeIndex] = useState(0)
  const [pageLoadTimeIndex, setPageLoadTimeIndex] = useState(0)
  const [memoryIndex, setMemoryIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(0)

  return (<Context.Provider value={performanceData}>
    <Document pageMode='useOutlines'>
      <Page size="A4" style={styles.page} >
        <Text style={styles.header} fixed>Wiredcraft</Text>
        <Cover performanceData={performanceData} />
        <Contents powerIndex={powerIndex} launchTimeIndex={launchTimeIndex} pageLoadTimeIndex={pageLoadTimeIndex} memoryIndex={memoryIndex} endIndex={endIndex} />
        <Conclusion />
        <FPS />
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      <Page size="A4" style={styles.page} >
        <Text style={styles.header} fixed>Wiredcraft</Text>
        <Text style={styles.sectionsChapter} render={({ pageNumber }) => {
          if (pageNumber !== powerIndex) {
            setPowerIndex(pageNumber)
          }
          return "Section 3"
        }} />
        <PowerUsageChart />
        <NetAbstract />
        <LocationUse />
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      <Page size="A4" style={styles.page} >
        <Text style={styles.header} fixed>Wiredcraft</Text>
        <Text style={styles.sectionsChapter} render={({ pageNumber }) => {
          if (pageNumber !== launchTimeIndex) {
            setLaunchTimeIndex(pageNumber)
          }
          return "Section 4"
        }} />
        <LaunchTime />
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      <Page size='A4' style={styles.page}>
        <Text style={styles.header} fixed>Wiredcraft</Text>
        <Text style={styles.sectionsChapter} render={({ pageNumber }) => {
          if (pageNumber !== pageLoadTimeIndex) {
            setPageLoadTimeIndex(pageNumber)
          }
          return "Section 5"
        }} />
        <PageLoadTime />
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      <Page size="A4" style={styles.page} >
        <Text style={styles.header} fixed>Wiredcraft</Text>
        <Text style={styles.sectionsChapter} render={({ pageNumber }) => {
          if (pageNumber !== memoryIndex) {
            setMemoryIndex(pageNumber)
          }
          return "Section 6"
        }} />
        <MemoryLeak />
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
      <Page size="A4" style={styles.page} >
        <Text style={styles.header} fixed>Wiredcraft</Text>
        <Text render={({ pageNumber }) => {
          if (pageNumber !== endIndex) {
            setEndIndex(pageNumber)
          }
          return ""
        }} />
        <BackCover />
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  </Context.Provider>)
}

export default memo(PDFDocument);