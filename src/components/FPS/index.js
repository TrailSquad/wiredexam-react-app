import { useContext } from 'react';
import { View, Text } from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer';
import Context from 'src/context';
import styles from 'src/pdfStyles';
import getChartsBlobImage from 'src/utils/getChartsBlobImage';
import dayjs from 'dayjs';
import { Table, DataTableCell, TableBody, TableHeader, TableCell } from '@david.kucsai/react-pdf-table'
import gradeUtil from 'src/utils/grade';
import RichText from 'src/components/customize/RichText';

const { generalMarkMap, getFpsMark } = gradeUtil;
const FPS = () => {
  const droppedFramesFpsValue = 50
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }
  const { fps } = performanceData;
  if (!fps) {
    return null;
  }
  const lowFps = fps.filter(item => item.value <= droppedFramesFpsValue);
  const lowrate = lowFps.length / fps.length;
  const normalFps = fps.filter(item => (item.value <= droppedFramesFpsValue && item.value >= 50));
  const normalrate = normalFps.length / fps.length;
  const perfectRate = 1 - lowrate - normalrate
  const chartTitle = `Low PFS Rate: ${(lowrate * 100).toFixed(2)}%. Low PFS Count: ${lowFps.length}. Medium FPS Rate: ${(lowrate * 100).toFixed(2)}%. Medium FPS Count: ${normalFps.length}. High FPS Rate: ${(perfectRate * 100).toFixed(2)}%. High FPS Count: ${fps.length - lowFps.length - normalFps.length}.`

  var dataSourceDes
  if (fps.length > 2) {
    const beginDate = dayjs.unix(Math.round(fps[0].time)).format('YYYY-MM-DD HH:mm:ss');
    const endDate = dayjs.unix(Math.round(fps[fps.length - 1].time)).format('YYYY-MM-DD HH:mm:ss');
    dataSourceDes = [
      { "text": `The follow data is derived from FPS sampling using the app between `, "isRich": false },
      { "text": `${beginDate}`, "isRich": true },
      { "text": " and ", "isRich": false },
      { "text": `${endDate}`, "isRich": true },
      { "text": ".", "isRich": false },
    ]
  }

  const option = {
    grid: {
      top: '5%',
      left: '0%',
      right: '6%',
      bottom: '6%',
      containLabel: true,
      show: true,
    },
    xAxis: {
      data: fps.map(e => Math.round(e.time)),
      boundaryGap: false,
      axisTick: { show: false },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#f1f1f1',
          type: 'solid',
        },
      },
      splitLine: {
        show: true,
        interval: '10%',
        lineStyle: {
          color: '#f1f1f1',
          type: 'solid',
        }
      },
      axisLabel: {
        show: true,
        margin: 10,
        interval: 10000,
        showMinLabel: true,
        showMaxLabel: true,
        textStyle: {
          color: '#999',
          fontSize: 12,
        },
        formatter: function (_, index) {
          return index
          // return dayjs.unix(Math.round(fps[index].time)).format('HH:mm');
        }
      }
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
        symbolSize: 3,
        itemStyle: {
          color: (params) => params.value <= droppedFramesFpsValue ? 'red' : '#5470c6'
        }
      },
    ]
  };
  const fpsImage = getChartsBlobImage(option);
  const chartDes = "The x-axis represents the index of the sample, the y-axis represents the FPS value, blue dots indicate excellent or normal FPS, red dots indicate abnormal FPS"

  const pieChartOption = {
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: fps.length - lowFps.length - normalFps.length, name: `Perfect(${(perfectRate * 100).toFixed(2)}%)` },
          { value: normalFps.length, name: `Normal(${(normalrate * 100).toFixed(2)}%)` },
          { value: lowFps.length, name: `Bad(${(lowrate * 100).toFixed(2)}%)` },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  const fpsPieImage = getChartsBlobImage(pieChartOption);

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

  const fpsMark = getFpsMark(lowrate);

  const fpsDes = `FPS stands for "Frames Per Second," and it refers to the number of frames (or images) that a device or application can display per second. In other words, it is a measure of how smoothly and quickly a device or application can render graphics.`;
  const stutteringDes = `In mobile app performance, FPS can have a significant impact on user experience. If an app's FPS is too low, the app may appear sluggish or choppy, making it frustrating for users to interact with. On the other hand, if an app's FPS is high, the app will feel smoother and more responsive, leading to a better user experience.`
  const impactDes = `Factors that can affect FPS in mobile apps include the complexity of the graphics being rendered, the processing power of the device, and the optimization of the app's code. To ensure optimal performance, developers must carefully balance the visual quality of an app with its performance requirements, testing the app on a variety of devices and optimizing its code to achieve the best possible FPS.`

  const indicatorsDes = [
    `FPS indicators are typically classified as follows:`,
    `1. High FPS: This refers to a high number of frames per second, usually above 55 FPS. High FPS is desirable for smooth and responsive gameplay or graphics-intensive applications.`,
    `2. Medium FPS: This refers to a moderate number of frames per second, usually between 50-55 FPS. Medium FPS is still acceptable for most applications, but it may not feel as smooth or responsive as high FPS.`,
    `3. Low FPS: This refers to a low number of frames per second, usually below 50 FPS. Low FPS can result in choppy or sluggish performance, making it difficult or frustrating for users to interact with the application.`,
  ]

  const recommendations = [
    `1. Optimisation of code: unnecessary code should be minimised and if there is code that can be reused, it should be reused as much as possible.`,

    `2. Reducing page elements: reducing the number of elements in a page, such as images, text, animations, etc.`,

    `3. Rational use of layout: use a rational layout to reduce rendering time.`,

    `4. Optimise image resources: optimise the size and format of image resources to avoid excessively large images taking too long to load.`,

    `5. Avoid unnecessary re-layout and re-drawing: avoid unnecessary re-layout and re-drawing without affecting the display of the interface.`
  ]
  return (
    <View bookmark={{ title: "Section 2: FPS", fit: true }} break>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsChapter}>Section 2</Text>
        <Text style={styles.sectionsTitle} id='link_fps'>FPS</Text>

        {/* 2.1 Description */}
        <Text style={styles.sectionsSubTitle}>2.1 Description</Text>
        <Text style={styles.text}>{fpsDes}</Text>
        <Text style={styles.text}>{stutteringDes}</Text>
        <Text style={styles.text}>{impactDes}</Text>
        {/* 2.2 Grade */}
        <Text style={styles.sectionsSubTitle}>2.2 Grade</Text>
        <Text style={styles.highlightNumber} wrap={false}>{generalMarkMap(fpsMark)}</Text>

        {/* 2.3 Detail */}
        <Text style={styles.sectionsSubTitle}>2.3 Data Detail</Text>
        <RichText richItems={dataSourceDes} normalStyle={styles.text} richStyle={styles.richText} />
        {/* 2.3.1 Indicator Classification */}
        <Text style={styles.subTitle}>2.3.1 Indicator Classification</Text>
        {indicatorsDes.map(e => <Text style={styles.text}>{e}</Text>)}
        {/* 2.3.2 chart */}
        <Text style={styles.subTitle}>2.3.2 Data Chart</Text>
        <Text style={styles.text}>A dot line chart is a common choice for FPS data because it can show changes over time or frames.</Text>
        <View style={styles.chartDesBox} break>
          <View style={styles.chartContainer}><Image src={fpsImage} break /></View>
          <View style={styles.chartDesContainer}><Text style={styles.hint}>{chartDes}</Text></View>
        </View>
        <Text style={styles.text}>Divide the FPS data into categories based on the FPS ranges. We have categories as "High FPS" (above 55 FPS), "Medium FPS" (between 50-55 FPS), and "Low FPS" (below 50 FPS). Through this pie chart, we can intuitively see the ratio of the 3 pieces.</Text>
        <View style={styles.chartDesBox} break>
          <View style={styles.chartContainer}><Image src={fpsPieImage} break /></View>
          <View style={styles.chartDesContainer}><Text style={styles.hint}>{chartTitle}</Text></View>
        </View>
        {/* 2.3.3 Rank Table */}
        {topRankArray.length > 0 ? <Text style={styles.subTitle}>2.3.3 Dropout Ranking</Text> : null}
        {topRankArray.length > 0 ? <Text style={styles.text}>Here is a list of code locations where the most stuck occur. Occurrences are listed on the right side of the table.</Text> : null}
        {topRankArray.length > 0 ? <View style={styles.tableContainer} wrap={false}><Table data={topRankArray}>
          <TableHeader>
            <TableCell weighting={0.8} style={styles.tableHeader}>View</TableCell>
            <TableCell weighting={0.2} style={styles.tableHeader}>Count</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.8} style={styles.tableRowLabel} getContent={(r) => r.name} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.count} />
          </TableBody>
        </Table></View> : null}
      </View>

      {/* 2.4 Recommendations */}
      {topRankArray.length > 0 ?
        <View>
          <Text style={styles.sectionsSubTitle}>2.4 Recommendations for Optimisation</Text>
          <View style={styles.recommendationLayout} wrap={false}>
            {recommendations.map(e => <Text style={styles.text}>{e}</Text>)}
          </View>
        </View> : null}
    </View>
  );
}

export default FPS;