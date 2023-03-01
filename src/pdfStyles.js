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
  title: {
    fontSize: 24,
    fontFamily: "FZHeiti",
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: "FZHeiti",
    fontSize: 18,
    marginBottom: 12,
  },
  text: {
    marginBottom: 12,
    fontSize: 14,
    fontFamily: "FZHeiti",
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
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
    height: contentHeight,
    // marginTop: 50,
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
  // FPS
});

export default styles;
