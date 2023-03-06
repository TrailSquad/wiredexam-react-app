import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody } from '@david.kucsai/react-pdf-table'

function formatNumber(number){
    if(typeof number === 'number')
        return number.toFixed(2)
    else
        return number
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
        <Text style={styles.sectionsTitle}>3 网络监控</Text>
        <Text style={styles.text}>A very important and basic link in network management is network traffic monitoring, which monitors network traffic through continuous collection of network data. </Text>
        <Text style={styles.text}>The performance indicators of the network and its important components are also obtained from the statistics and calculation of network traffic data. Network administrators can perform performance management.</Text>
        <Text style={styles.tableTitle}>3.1 网络数据摘要:</Text>
        <Table data={tableData}>
          <TableBody>
            <DataTableCell weighting={0.5} style={styles.tableRowLabel} getContent={(r) => r.categary} />
            <DataTableCell weighting={0.5} style={styles.tableRowValue} getContent={(r) => formatNumber(r.value)} />
          </TableBody>
        </Table>

        {reqCountRank.length > 1 ? <Text style={styles.tableTitle}>3.2 请求次数排行:</Text> : null}
        {reqCountRank.length > 1 ? <Table data={reqCountRank}>
          <TableBody>
            <DataTableCell weighting={0.8} style={styles.tableRowLabel} getContent={(r) => r.key} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.value} />
          </TableBody>
        </Table> : null}
      </View>

      <View style={styles.contentContainer}>
        {failReqCountRank.length > 1 ? <Text style={styles.tableTitle}>3.3 请求失败次数排行:</Text> : null}
        {failReqCountRank.length > 1 ? <Text style={styles.text}>A very important and basic link in network management is network traffic monitoring, which monitors network traffic through continuous collection of network data. </Text> : null}
        {failReqCountRank.length > 1 ? <Table data={failReqCountRank}>
          <TableBody>
            <DataTableCell weighting={0.8} style={styles.tableRowLabel} getContent={(r) => r.key} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => r.value} />
          </TableBody>
        </Table> : null}

        {reqTimeRank.length > 1 ? <Text style={styles.tableTitle}>3.4 请求时间排行:</Text> : null}
        {reqTimeRank.length > 1 ? <Text style={styles.text}>A very important and basic link in network management is network traffic monitoring, which monitors network traffic through continuous collection of network data. </Text> : null}
        {reqTimeRank.length > 1 ? <Table data={reqTimeRank}>
          <TableBody>
            <DataTableCell weighting={0.8} style={styles.tableRowLabel} getContent={(r) => r.key} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => formatNumber(r.value)} />
          </TableBody>
        </Table> : null}
      </View>

      <View style={styles.contentContainer}>
        {uploadDataRank.length > 1 ? <Text style={styles.tableTitle}>3.5 上行流量排行:</Text> : null}
        {uploadDataRank.length > 1 ? <Text style={styles.text}>A very important and basic link in network management is network traffic monitoring, which monitors network traffic through continuous collection of network data. </Text> : null}
        {uploadDataRank.length > 1 ? <Table data={uploadDataRank}>
          <TableBody>
            <DataTableCell weighting={0.8} style={styles.tableRowLabel} getContent={(r) => r.key} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => formatNumber(r.value)} />
          </TableBody>
        </Table> : null}

        {downloadDataRank.length > 1 ? <Text style={styles.tableTitle}>3.6 下行流量排行:</Text> : null}
        {downloadDataRank.length > 1 ? <Text style={styles.text}>A very important and basic link in network management is network traffic monitoring, which monitors network traffic through continuous collection of network data. </Text> : null}
        {downloadDataRank.length > 1 ? <Table data={downloadDataRank}>
          <TableBody>
            <DataTableCell weighting={0.8} style={styles.tableRowLabel} getContent={(r) => r.key} />
            <DataTableCell weighting={0.2} style={styles.tableRowValue} getContent={(r) => formatNumber(r.value)} />
          </TableBody>
        </Table> : null}
      </View>
    </View>
  )
};

export default NetAbstract;