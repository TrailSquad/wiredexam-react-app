import { useContext } from 'react';
import { Text, Image, View } from '@react-pdf/renderer';
import logo from 'src/static/wcl.jpg';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import dayjs from 'dayjs';

const CoverRow = ({left, right}) => (
  <View style={styles.coverRow}>
    <Text style={styles.coverRowLeft}>{left}</Text>
    <Text style={styles.coverRowRight}>{right}</Text>
  </View>
)

const Cover = () => {
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }
  const {
    appName,
    deviceInfo
  } = performanceData;

  return (
    <View style={styles.pageContainer}>
      <View style={styles.coverImageContainer}>
        <Image style={styles.coverImage} src={logo} />
      </View>
      <Text style={styles.coverTitle}>App 性能检测报告</Text>
      <CoverRow left="产品名：" right={appName} />
      <CoverRow left="产品型号：" right={deviceInfo} />
      <CoverRow left="报告出处：" right="Wiredcraft Mobile Team" />
      <CoverRow left="报告日期：" right={dayjs().format('YYYY-MM-DD')} />
    </View>
  )
};

export default Cover;
