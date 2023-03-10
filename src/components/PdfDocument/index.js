// 实际的pdf内容在这里渲染
import { Document, Page, Text, Font } from '@react-pdf/renderer';
import Cover from 'src/components/Cover';
import FPS from 'src/components/FPS';
import LaunchTime from 'src/components/LaunchTime';
import NetAbstract from "src/components/NetAbstract"
import MemoryLeak from "src/components/MemoryLeak"
import LocationUse from "src/components/Location"
import PowerUsageChart from "src/components/PowerUsageChart"
import FZHei from 'src/fonts/FZHei.ttf';
import Context from 'src/context';
import styles from 'src/pdfStyles';

// 默认只支持拉丁英文，中文字体一定要注入
// 方正黑体相对来说非常小（3M），而且是可免费商用无书面授权的字体，因此采用
Font.register({
  family: "FZHeiti",
  src: FZHei
});

// 需要使用指定Component组织内容，更多可见 https://react-pdf.org/components
const PDFDocument = ({ performanceData }) => (
  <Context.Provider value={performanceData}>
    <Document pageMode='useOutlines'>
      <Page size="A4" style={styles.page} bookmark="APM" >
        {/* 每页固定页头 */}
        <Text style={styles.header} fixed>
          Wiredcraft
        </Text>
        {/* 主体内容 */}
        <Cover />
        <FPS />
        <PowerUsageChart />
        <NetAbstract />
        <LocationUse />
        <LaunchTime />
        <MemoryLeak />
        {/* 每页固定页脚 */}
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  </Context.Provider>
);

export default PDFDocument;