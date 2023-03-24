import { Text, Image, View } from '@react-pdf/renderer';
import logo from 'src/static/wcl.jpg';
import styles from 'src/pdfStyles';
import dayjs from 'dayjs';
import { memo } from 'react';

const CoverRow = ({left, right}) => (
  <View style={styles.coverRow}>
    <Text style={styles.coverRowLeft}>{left}</Text>
    <Text style={styles.coverRowRight}>{right}</Text>
  </View>
)

const Cover = ({performanceData}) => {
  if (!performanceData) {
    return null;
  }
  const {
    appName,
    deviceInfo
  } = performanceData;
  return (
    <View style={styles.pageContainer} bookmark={{ title: "Cover", fit: true }}>
      <View style={styles.coverImageContainer}>
        <Image style={styles.coverImage} src={logo} />
      </View>
      <Text style={styles.coverTitle}>App 性能检测报告</Text>
      <CoverRow left="应用名称：" right={appName} />
      <CoverRow left="测试机型：" right={deviceInfo} />
      <CoverRow left="报告出处：" right="Wiredcraft Mobile Team" />
      <CoverRow left="报告日期：" right={dayjs().format('YYYY-MM-DD')} />
    </View>
  )
};

export default memo(Cover);
