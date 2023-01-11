import { StyleSheet } from '@react-pdf/renderer';

// PDFDocument的样式在此定义
const styles = StyleSheet.create({
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
});

export default styles;
