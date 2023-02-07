import { useContext, memo } from 'react';
import { View } from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer';
import Context from 'src/context';
import styles from 'src/pdfStyles';
import getChartsBlobImage from 'src/utils/getChartsBlobImage';

const FPS = () => {
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }
  const { fps } = performanceData;
  const { xValues, data } = fps;
  const fpsImage = getChartsBlobImage({
    xAxis: {
      type: 'category',
      data: xValues
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data,
      type: 'line'
    }]
  });
  return (
      <View style={styles.contentContainer}>
        <Image src={fpsImage} break />
      </View>
  );
}

export default memo(FPS);