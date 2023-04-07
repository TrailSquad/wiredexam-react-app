import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import Constants from 'src/constants';
import { Table, DataTableCell, TableCell, TableHeader, TableBody } from '@david.kucsai/react-pdf-table'

function formatNumber(number) {
  if (typeof number === 'number')
    return number.toFixed(2)
  else
    return number
}

function getReadableSizeString(sizeInBytes) {
  var i = -1;
  var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
  do {
    sizeInBytes /= 1024;
    i++;
  } while (sizeInBytes > 1024);

  return Math.max(sizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

function formatUrl(url) {
  const targetString = url.replace(" ", ":")
  const stringArr = targetString.split("")
  return stringArr.length > 70 ? stringArr.splice(0,70).join("") + "..." : targetString
}

const NetAbstract = () => {
  const performanceData = useContext(Context);
  if (!performanceData) {
    return null;
  }
  const { network } = performanceData;
  if (!network) {
    return null;
  }
  const {
    summaryRequestCount,  // 请求总次数
    summaryRequestTime,  // 请求总时长
    summaryRequestUploadFlow,  // 数据上传流量
    summaryRequestDownFlow,  // 数据下载流量
    requestAverageTime,  // 平均请求时长
    requestSuccessRate,  // 请求成功率
    slowRequestCount,  // 慢请求次数（请求时长大于1秒）
    reqCountRank,  // 请求次数排行
    failReqCountRank,  // 失败次数排行
    reqTimeRank,  // 请求时间排行榜
    uploadDataRank,  // 上行流量排行榜
    downloadDataRank  // 下行流量排行榜
  } = network;

  const tableData = [
    {
      "categary": "Total number of requests",
      "value": summaryRequestCount,
    },
    {
      "categary": "Total time requested",
      "value": `${summaryRequestTime} ms`,
    },
    {
      "categary": "Data upload flow",
      "value": getReadableSizeString(summaryRequestUploadFlow),
    },
    {
      "categary": "Data download flow",
      "value": getReadableSizeString(summaryRequestDownFlow),
    },
    {
      "categary": "Average request time",
      "value": `${requestAverageTime} ms`,
    },
    {
      "categary": "Request success rates",
      "value": formatNumber(requestSuccessRate),
    },
    {
      "categary": "Number of slow request",
      "value": slowRequestCount,
    }
  ]

  const noDataDesc = "No relevant data collected"

  return (
    <View bookmark={{ title: "3.4 Network Monitoring", fit: true }}>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsSubTitle} id='link_network'>3.4 Network Monitoring</Text>
        <Text style={styles.text}>Network traffic monitoring is to monitor network traffic through continuous collection of network data. By monitoring network traffic, we can find potential problems with too many or too large requests in the application.</Text>
        <Text style={styles.tableTitle}>3.4.1 Network Data Summary</Text>
        <View style={styles.tableContainer} wrap={false}><Table data={tableData}>
          <TableHeader>
            <TableCell weighting={0.5} style={styles.tableHeader}>Item</TableCell>
            <TableCell weighting={0.5} style={styles.tableHeader}>Value</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.5} style={styles.tableRowLabel} getContent={(r) => r.categary} />
            <DataTableCell weighting={0.5} style={styles.tableRowValue} getContent={(r) => r.value} />
          </TableBody>
        </Table></View>

        <Text style={styles.tableTitle}>3.4.2 Ranking of Requests</Text>
        {reqCountRank.length > 0 ? <>
          <Text style={styles.text}>Too many requests may be unnecessary and can be optimized. Here is a list of the most frequently requested items in the collected data.</Text>
          <Text style={styles.hint}>The number on the right is the number of requests</Text>
          <View style={styles.tableContainer} wrap={false}>
            <Table data={reqCountRank}>
              <TableHeader>
                <TableCell weighting={0.8} style={styles.tableHeader}>Url</TableCell>
                <TableCell weighting={0.2} style={styles.tableHeader}>Count</TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell  weighting={0.8} style={styles.tableRowLabel} getContent={(r) => formatUrl(r.key)} />
                <DataTableCell  weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.value} />
              </TableBody>
            </Table>
          </View>
        </> : <Text style={styles.hint}>{noDataDesc}</Text>}

        <Text style={styles.tableTitle}>3.4.3 Ranking of Failed Requests</Text>
        {failReqCountRank.length > 0 ? <>
          <Text style={styles.text}>Failed requests tell us there is a problem with the backend. Discover them and solve them.</Text>
          <Text style={styles.hint}>The number on the right is the number of requests</Text>
          <View style={styles.tableContainer} wrap={false}>
            <Table data={failReqCountRank}>
              <TableHeader>
                <TableCell weighting={0.8} style={styles.tableHeader}>Url</TableCell>
                <TableCell weighting={0.2} style={styles.tableHeader}>Count</TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell weighting={0.8} style={styles.tableRowLabel} getContent={(r) => formatUrl(r.key)} />
                <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.value} />
              </TableBody>
            </Table>
          </View>
        </> : <Text style={styles.hint}>{noDataDesc}</Text>}

        <Text style={styles.tableTitle}>3.4.4 Request Time Ranking</Text>
        {reqTimeRank.length > 0 ? <>
          <Text style={styles.text}>Excessive request time means that it can be optimized to improve response speed and improve user experience.</Text>
          <Text style={styles.hint}>The number on the right is the average request time of a single request</Text>
          <View style={styles.tableContainer} wrap={false}>
            <Table data={reqTimeRank}>
              <TableHeader>
                <TableCell weighting={0.8} style={styles.tableHeader}>Url</TableCell>
                <TableCell weighting={0.2} style={styles.tableHeader}>Times</TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell weighting={0.8} style={styles.tableRowLabel} getContent={(r) => formatUrl(r.key)} />
                <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => `${r.value} ms`} />
              </TableBody>
            </Table>
          </View>
        </> : <Text style={styles.hint}>{noDataDesc}</Text>}

        <Text style={styles.tableTitle}>3.4.5 Uplink Traffic Ranking</Text>
        {uploadDataRank.length > 0 ? <>
          <Text style={styles.text}>Optimizing the request with too large request data can improve the response speed, thereby improving the user experience</Text>
          <Text style={styles.hint}>The number on the right is the average uplink traffic size of a single request</Text>
          <View style={styles.tableContainer} wrap={false}>
            <Table data={uploadDataRank}>
              <TableHeader>
                <TableCell weighting={0.8} style={styles.tableHeader}>Url</TableCell>
                <TableCell weighting={0.2} style={styles.tableHeader}>Size</TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell weighting={0.8} style={styles.tableRowLabel} getContent={(r) => formatUrl(r.key)} />
                <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => getReadableSizeString(r.value)} />
              </TableBody>
            </Table>
          </View>
        </> : <Text style={styles.hint}>{noDataDesc}</Text>}

        <Text style={styles.tableTitle}>3.4.6 Downstream Traffic Ranking</Text>
        {uploadDataRank.length > 0 ? <>
          <Text style={styles.text}>Optimizing the request with too large request data can improve the response speed, thereby improving the user experience</Text>
          <Text style={styles.hint}>The number on the right is the average downstream traffic size of a single request</Text>
          <View style={styles.tableContainer} wrap={false}>
            <Table data={downloadDataRank}>
              <TableHeader>
                <TableCell weighting={0.8} style={styles.tableHeader}>Url</TableCell>
                <TableCell weighting={0.2} style={styles.tableHeader}>Size</TableCell>
              </TableHeader>
              <TableBody>
                <DataTableCell weighting={0.8} style={styles.tableRowLabel} getContent={(r) => formatUrl(r.key)} />
                <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => getReadableSizeString(r.value)} />
              </TableBody>
            </Table>
          </View>
        </> : <Text style={styles.hint}>{noDataDesc}</Text>}

      </View>

      <View>
        <Text style={styles.subTitle}>3.4.7 Recommendations for Optimisation</Text>
        <View style={styles.recommendationLayout} wrap={false}>
          {Constants.strings.powerUsage.networkRecommendations.map(e => <Text style={styles.text}>{e}</Text>)}
        </View>
      </View>
    </View>
  )
};

export default NetAbstract;