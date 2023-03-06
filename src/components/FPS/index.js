import { useContext } from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer';
import Context from 'src/context';
import styles from 'src/pdfStyles';
import getChartsBlobImage from 'src/utils/getChartsBlobImage';
import dayjs from 'dayjs';
import { Table, DataTableCell, TableBody } from '@david.kucsai/react-pdf-table'

const FPS = () => {
  const droppedFramesFpsValue = 50
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }
  const { fps } = performanceData;
  const lowFps = fps.filter(item => item.value <= droppedFramesFpsValue)
  const rate = lowFps.length / fps.length;
  const option = {
    title: {
      text: `Dropout Rate：${(rate * 100).toFixed(2)}%， Dropout Count：${lowFps.length}`,
      textStyle: {
        fontWeight: "normal",
        fontSize: 14
      },
      subtext: `When the sampled fps is less than ${droppedFramesFpsValue}, \nit is considered a dropped frame.`,
      left: 'center'
    },
    xAxis: {
      data: fps.map(e => dayjs.unix(e.time).format('HH:mm')),
      name: "time",
      nameRotate: 65
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 60,
      interval: 10
    },
    series: [
      {
        data: fps.map(e => e.value),
        type: 'scatter',
        symbolSize: 5,
        itemStyle: {
          color: (params) => params.value <= droppedFramesFpsValue ? 'red' : '#5470c6'
        }
      },
    ]
  };
  const fpsImage = getChartsBlobImage(option);

  var rankObj = {};
  lowFps.forEach((element, index) => {
    var count = rankObj[element.topView]
    if (count === undefined) {
      rankObj[element.topView] = 1;
    } else {
      rankObj[element.topView] = count + 1;
    }
  })
  var rankArray = [];
  Object.keys(rankObj).forEach(key => {
    rankArray.push({
      name: key,
      count: rankObj[key]
    })
  })
  const sortRankArray = rankArray.sort((a, b) => (b.count - a.count));
  const topRankArray = sortRankArray.length > 3 ? sortRankArray.slice(0, 3) : sortRankArray;

  const notDroppedFramesDes = "No frame drops were found in this test, which means the app is running quite smoothly. Keep it up"
  const recommendations = `
      - optimisation of code: unnecessary code should be minimised and if there is code that can be reused, it should be reused as much as possible
      
      - reducing page elements: reducing the number of elements in a page, such as images, text, animations, etc.
     
      - rational use of layout: use a rational layout to reduce rendering time.
      
      - optimise image resources: optimise the size and format of image resources to avoid excessively large images taking too long to load.
      
      - Avoid unnecessary re-layout and re-drawing: avoid unnecessary re-layout and re-drawing without affecting the display of the interface
      `
  return (
    <View break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsTitle}>Section: FPS</Text>
        <Image src={fpsImage} break />
        {topRankArray.length > 0 ? <Text style={fpsStyles.title}>Dropout Top3:</Text> : null}
        {topRankArray.length > 0 ? <Table data={topRankArray}>
          <TableBody>
            <DataTableCell style={fpsStyles.row} getContent={(r) => r.name} />
            <DataTableCell style={fpsStyles.row} getContent={(r) => r.count} />
          </TableBody>
        </Table> : null}
        {topRankArray.length <= 0 ? <Text style={fpsStyles.text}>{notDroppedFramesDes}</Text> : null}
      </View>
      {topRankArray.length > 0 ?
        <View style={styles.contentContainer}>
          <Text style={styles.sectionsTitle}>Section: FPS</Text>
          <Text style={fpsStyles.title}>Recommendations for optimisation：</Text>
          <Text style={fpsStyles.subTitle}>{recommendations}</Text>
        </View> : null}
    </View>
  );
}

const fpsStyles = StyleSheet.create({
  title: styles.title = {
    textAlign: "left",
    fontSize: 28,
    width: "100%",
    fontWeight: "bold",
    marginBottom: 15
  },
  subTitle: styles.title = {
    textAlign: "left",
    fontSize: 24,
    width: "100%",
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 15
  },
  text: {
    textAlign: "left",
    fontSize: 24,
    width: "100%",
    fontWeight: "bold",
  },
  row: {
    margin: '8',
    textAlign: "center"
  }
});

export default FPS;