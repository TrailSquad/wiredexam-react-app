// 实际的pdf内容在这里渲染
import { Document, Page, Text, Font } from '@react-pdf/renderer';
import styles from './pdfStyles';
import Cover from 'src/components/Cover';
import FZHei from 'src/fonts/FZHei.ttf';

// 默认只支持拉丁英文，中文字体一定要注入
// 方正黑体相对来说非常小（3M），而且是可免费商用无书面授权的字体，因此采用
Font.register({
  family: "FZHeiti",
  src: FZHei
});

// 需要使用指定Component组织内容，更多可见 https://react-pdf.org/components
const PDFDocument = ({ performanceData }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 每页固定页头 */}
        <Text style={styles.header} fixed>
          Wiredcreaft
        </Text>
        {/* 主体内容 */}
        <Cover />
        {/* 每页固定页脚 */}
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
);

export default PDFDocument;