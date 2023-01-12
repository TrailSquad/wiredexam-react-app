import { useContext } from 'react';
import { Image } from '@react-pdf/renderer';
import Context from 'src/context';
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
    <Image src={fpsImage} break />
  );
}

export default FPS;