// PDFDocument的样式在此定义

// NOTE:
// 此处的长度单位默认为'pt'，A4的尺寸为595x842
// more to read:
// https://react-pdf.org/styling
// https://www.gdpicture.com/guides/gdpicture/About%20a%20PDF%20format.html

import { StyleSheet } from '@react-pdf/renderer';

const contentHeight = 686;

const styles = StyleSheet.create({
  // 通用样式
  page: {
    paddingVertical: 68,
    paddingHorizontal: 48,
    fontFamily: "FZHeiti",
  },
  header: {
    position: 'absolute',
    fontSize: 10,
    marginTop: 30,
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'grey',
    fontFamily: "FZHeiti",
  },
  sectionsTitle: {
    textAlign: "right",
    fontSize: 40,
    width: "100%",
    paddingTop: 8,
    marginBottom: 72,
    fontWeight: 900,
  },
  sectionsChapter: {
    textAlign: "right",
    fontSize: 28,
    width: "100%",
    marginTop: 24,
    paddingBottom: 8,
    fontWeight: 900,
    borderBottom: 3,
  },
  sectionsSubTitle: {
    textAlign: "left",
    fontSize: 20,
    width: "100%",
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 16
  },
  text: {
    marginBottom: 14,
    fontSize: 14,
    fontFamily: "FZHeiti",
    width: "100%",
    textAlign: 'left',
  },
  richText: {
    fontWeight: "bold",
    color: "#FF4948"
  },
  subTitle: {
    fontSize: 18,
    fontFamily: "FZHeiti",
    width: "100%",
    fontWeight: "bold",
    textAlign: 'left',
    marginTop: 28,
    marginBottom: 16,
  },
  highlightNumber: {
    backgroundColor: '#F5F5F5',
    fontSize: 56,
    fontFamily: "FZHeiti",
    padding: 16,
    maxLines: 1,
    textOverflow: 'ellipsis',
    textAlign: 'center',
    margin: 24,
  },
  hint: {
    marginBottom: 12,
    fontSize: 10,
    fontFamily: "FZHeiti",
    width: "100%",
    textAlign: 'left',
    color: 'grey',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  chartDesBox: {
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
  },
  chartContainer: {
    width: "80%",
    padding: 16,
  },
  chartDesContainer: {
    width: "80%",
    padding: 16
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  pageContainer: {
    height: contentHeight,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  tableContainer: {
    width: "100%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 8,
  },
  // cover
  coverTitle: {
    fontSize: 32,
    marginTop: 60,
    marginBottom: 60
  },
  coverImageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 50
  },
  coverImage: {
    width: 70,
    height: 70
  },
  coverRow: {
    display: 'flex',
    flexDirection: 'row',
    width: 400,
    marginBottom: 15
  },
  coverRowLeft: {
    width: 150,
    fontSize: 14,
    textAlign: 'right',
    paddingRight: 16,
    color: 'grey',
  },
  coverRowRight: {
    width: 250,
    fontSize: 14,
  },
  //
  contentsTitle:{
    textAlign: "center",
    fontSize: 28,
    width: "100%",
    fontWeight: "bold",
    fontFamily: "FZHeiti",
    marginTop: 72,
    marginBottom: 48,
  },
  contentsItem: {
    textAlign: "left",
    fontSize: 20,
    height: 24,
    width: "100%",
    fontWeight: "bold",
    fontFamily: "FZHeiti",
    maxLines: 1,
    textOverflow: 'clip',
    margin: 8,
    color: '#000000',
    textDecoration: 'none',
    overflow: 'hidden',
  },
  contentsSubItem: {
    textAlign: "left",
    fontSize: 20,
    height: 24,
    width: "100%",
    fontWeight: "bold",
    fontFamily: "FZHeiti",
    maxLines: 1,
    textOverflow: 'clip',
    paddingLeft: 24,
    margin: 8,
    color: '#000000',
    textDecoration: 'none',
    overflow: 'hidden',
  },
  contentsPage: {
    textAlign: "right",
    fontSize: 20,
    height: 24,
    width: "100%",
    fontWeight: "bold",
    fontFamily: "FZHeiti",
    maxLines: 1,
    textOverflow: 'ellipsis',
    margin: 8,
    color: '#000000',
  },
  //
  tableTitle: {
    textAlign: "left",
    fontSize: 18,
    width: "100%",
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 16
  },
  tableHeader: {
    padding: 4,
    textAlign: "center",
    backgroundColor: '#DCDCDC',
    fontSize: 10,
  },
  tableRowLabel: {
    padding: 4,
    textAlign: "left",
    backgroundColor: '#F5F5F5',
    fontSize: 10,
  },
  tableRowLabelSingleLine: {
    padding: 4,
    textAlign: "left",
    backgroundColor: '#F5F5F5',
    fontSize: 10,
    maxLines: 1,
    textOverflow: 'ellipsis',
  },
  tableRowValue: {
    padding: 4,
    backgroundColor: '#F5F5F5',
    textAlign: "center",
    fontSize: 10,
  },
  // recommendation
  recommendationLayout: {
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  // FPS
  // Back Cover
  backCoverTitle: {
    position: 'absolute',
    bottom: 0,
    fontSize: 10,
  },
  backCoverImageContainer: {
    position: 'absolute',
    bottom: 32,
    alignItems: 'center',
  },
  backCoverImage: {
    width: 70,
    height: 70
  },
});

export default styles;
