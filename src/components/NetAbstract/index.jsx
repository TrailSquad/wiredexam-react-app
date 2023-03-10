import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableCell, TableHeader, TableBody } from '@david.kucsai/react-pdf-table'

function formatNumber(number){
    if(typeof number === 'number')
        return number.toFixed(2)
    else
        return number
}

function formatUrl(url) {
    return url.replace(" ", ":")
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
    requestSucsessRate,  // 请求成功率
    slowRequestCount,  // 慢请求次数（请求时长大于1秒）
    reqCountRank,  // 请求次数排行
    failReqCountRank,  // 失败次数排行
    reqTimeRank,  // 请求时间排行榜
    uploadDataRank,  // 上行流量排行榜
    downloadDataRank  // 下行流量排行榜
  } = network;

  const tableData = [
    {
      "categary": "请求总次数",
      "value": summaryRequestCount,
    },
    {
      "categary": "请求总时长",
      "value": summaryRequestTime,
    },
    {
      "categary": "数据上传流量",
      "value": summaryRequestUploadFlow,
    },
    {
      "categary": "数据下载流量",
      "value": summaryRequestDownFlow,
    },
    {
      "categary": "平均请求时长",
      "value": requestAverageTime,
    },
    {
      "categary": "请求成功率",
      "value": requestSucsessRate,
    },
    {
      "categary": "慢请求次数",
      "value": slowRequestCount,
    }
  ]

  return (
    <View>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsSubTitle} id='link_network'>2.1 Network Monitoring</Text>
        <Text style={styles.text}>Network traffic monitoring is to monitor network traffic through continuous collection of network data. By monitoring network traffic, we can find potential problems with too many or too large requests in the application.</Text>
        <Text style={styles.tableTitle}>2.1.1 Network Data Summary:</Text>
        <View style={styles.tableContainer} wrap={false}><Table data={tableData}>
          <TableHeader>
            <TableCell weighting={0.5} style={styles.tableHeader}>Item</TableCell>
            <TableCell weighting={0.5} style={styles.tableHeader}>Value</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.5} style={styles.tableRowLabel} getContent={(r) => r.categary} />
            <DataTableCell weighting={0.5} style={styles.tableRowValue} getContent={(r) => formatNumber(r.value)} />
          </TableBody>
        </Table></View>

        {reqCountRank.length > 1 ? <Text style={styles.tableTitle}>2.1.2 Ranking of requests:</Text> : null}
        {reqCountRank.length > 1 ? <Text style={styles.text}>Too many requests may be unnecessary and can be optimized. Here is a list of the most frequently requested items in the collected data.</Text> : null}
        {reqCountRank.length > 1 ? <Text style={styles.hint}>The number on the right is the number of requests</Text> : null}
        {reqCountRank.length > 1 ? <View style={styles.tableContainer} wrap={false}><Table data={reqCountRank}>
          <TableHeader>
            <TableCell weighting={0.8} style={styles.tableHeader}>Url</TableCell>
            <TableCell weighting={0.2} style={styles.tableHeader}>Count</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell  weighting={0.8} getContent={(r) => (<Text style={styles.tableRowLabel}>{formatUrl(r.key)}</Text>)} />
            <DataTableCell  weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.value} />
          </TableBody>
        </Table></View> : null}
      </View>

      <View style={styles.contentContainer}>
        {failReqCountRank.length > 1 ? <Text style={styles.tableTitle}>2.1.3 Ranking of failed requests:</Text> : null}
        {failReqCountRank.length > 1 ? <Text style={styles.text}>Failed requests tell us there is a problem with the backend. Discover them and solve them.</Text> : null}
        {failReqCountRank.length > 1 ? <Text style={styles.hint}>The number on the right is the number of requests</Text> : null}
        {failReqCountRank.length > 1 ? <View style={styles.tableContainer} wrap={false}><Table data={failReqCountRank}>
          <TableHeader>
            <TableCell weighting={0.8} style={styles.tableHeader}>Url</TableCell>
            <TableCell weighting={0.2} style={styles.tableHeader}>Count</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.8} getContent={(r) => (<Text style={styles.tableRowLabel}>{formatUrl(r.key)}</Text>)} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.value} />
          </TableBody>
        </Table></View> : null}

        {reqTimeRank.length > 1 ? <Text style={styles.tableTitle}>2.1.4 Request time ranking:</Text> : null}
        {reqTimeRank.length > 1 ? <Text style={styles.text}>Excessive request time means that it can be optimized to improve response speed and improve user experience.</Text> : null}
        {reqTimeRank.length > 1 ? <Text style={styles.hint}>The number on the right is the average request time of a single request</Text> : null}
        {reqTimeRank.length > 1 ? <View style={styles.tableContainer} wrap={false}><Table data={reqTimeRank}>
          <TableHeader>
            <TableCell weighting={0.8} style={styles.tableHeader}>Url</TableCell>
            <TableCell weighting={0.2} style={styles.tableHeader}>Times</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.8} getContent={(r) => (<Text style={styles.tableRowLabel}>{formatUrl(r.key)}</Text>)} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => formatNumber(r.value)} />
          </TableBody>
        </Table></View> : null}
      </View>

      <View style={styles.contentContainer}>
        {uploadDataRank.length > 1 ? <Text style={styles.tableTitle}>2.1.5 Uplink Traffic Ranking:</Text> : null}
        {uploadDataRank.length > 1 ? <Text style={styles.text}>Optimizing the request with too large request data can improve the response speed, thereby improving the user experience</Text> : null}
        {uploadDataRank.length > 1 ? <Text style={styles.hint}>The number on the right is the average uplink traffic size of a single request</Text> : null}
        {uploadDataRank.length > 1 ? <View style={styles.tableContainer} wrap={false}><Table data={uploadDataRank}>
          <TableHeader>
            <TableCell weighting={0.8} style={styles.tableHeader}>Url</TableCell>
            <TableCell weighting={0.2} style={styles.tableHeader}>Size</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.8} getContent={(r) => (<Text style={styles.tableRowLabel}>{formatUrl(r.key)}</Text>)} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => formatNumber(r.value)} />
          </TableBody>
        </Table></View> : null}

        {downloadDataRank.length > 1 ? <Text style={styles.tableTitle}>2.1.6 Downstream Traffic Ranking:</Text> : null}
        {downloadDataRank.length > 1 ? <Text style={styles.text}>Optimizing the request with too large request data can improve the response speed, thereby improving the user experience</Text> : null}
        {downloadDataRank.length > 1 ? <Text style={styles.hint}>The number on the right is the average downstream traffic size of a single request</Text> : null}
        {downloadDataRank.length > 1 ? <View style={styles.tableContainer} wrap={false}><Table data={downloadDataRank}>
          <TableHeader>
            <TableCell weighting={0.8} style={styles.tableHeader}>Url</TableCell>
            <TableCell weighting={0.2} style={styles.tableHeader}>Size</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell weighting={0.8} getContent={(r) => (<Text style={styles.tableRowLabel}>{formatUrl(r.key)}</Text>)} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => formatNumber(r.value)} />
          </TableBody>
        </Table></View> : null}
      </View>
    </View>
  )
};

export default NetAbstract;