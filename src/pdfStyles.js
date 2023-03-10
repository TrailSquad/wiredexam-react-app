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
    paddingTop: 35,
    paddingBottom: 65,
    paddingLeft: 20,
    paddingRight: 20,
    paddingHorizontal: 35,
    fontFamily: "FZHeiti",
  },
  header: {
    fontSize: 12,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
    fontFamily: "FZHeiti",
  },
  sectionsTitle: {
    textAlign: "left",
    fontSize: 32,
    width: "100%",
    fontWeight: "bold",
    fontFamily: "FZHeiti",
    marginBottom: 15,
  },
  sectionsSubTitle: {
    textAlign: "left",
    fontSize: 24,
    width: "100%",
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15
  },
  title: {
    fontSize: 24,
    fontFamily: "FZHeiti",
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: "FZHeiti",
    fontSize: 18,
    marginBottom: 12,
    marginTop: 16
  },
  text: {
    marginBottom: 12,
    fontSize: 14,
    fontFamily: "FZHeiti",
    width: "100%",
    textAlign: 'left',
  },
  hint: {
    marginBottom: 12,
    fontSize: 12,
    fontFamily: "FZHeiti",
    width: "100%",
    textAlign: 'left',
    color: 'grey',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  chartContainer: {
    width: "100%",
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
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
  },
  // cover
  coverTitle: {
    fontSize: 28,
    marginTop: 60,
    marginBottom: 30
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
    textAlign: 'right'
  },
  coverRowRight: {
    width: 250
  },
  //
  contentsTitle:{
    textAlign: "center",
    fontSize: 32,
    width: "100%",
    fontWeight: "bold",
    fontFamily: "FZHeiti",
    margin: 16,
  },
  contentsItem: {
    textAlign: "left",
    fontSize: 20,
    width: "80%",
    fontWeight: "bold",
    fontFamily: "FZHeiti",
    margin: 8,
    color: '#000000',
  },
  contentsSubItem: {
    textAlign: "left",
    fontSize: 20,
    width: "80%",
    fontWeight: "bold",
    fontFamily: "FZHeiti",
    paddingHorizontal: 24,
    marginVertical: 8,
    color: '#000000',
  },
  //
  tableTitle: {
    textAlign: "left",
    fontSize: 20,
    width: "100%",
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 16
  },
  tableHeader: {
    padding: 8,
    textAlign: "center",
    backgroundColor: '#90EE90',
    fontSize: 10,
  },
  tableRowLabel: {
    padding: 8,
    textAlign: "left",
    backgroundColor: '#F0FFF0',
    fontSize: 10,
    maxLines: 1,
    textOverflow: 'ellipsis',
  },
  tableRowValue: {
    padding: 8,
    backgroundColor: '#F0FFF0',
    textAlign: "center",
    fontSize: 10,
  }
  // FPS
});

export default styles;
