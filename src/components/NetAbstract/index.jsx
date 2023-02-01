import { useContext } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableBody } from '@david.kucsai/react-pdf-table'

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
        <Text style={netStyles.networkTitle}>网络监控</Text>
        <Text style={netStyles.abstractTitle}>网络数据摘要:</Text>
        <Table data={tableData}>
          <TableBody>
            <DataTableCell style={netStyles.abstractRow} getContent={(r) => r.categary} />
            <DataTableCell style={netStyles.abstractRow} getContent={(r) => r.value} />
          </TableBody>
        </Table>

        {reqCountRank.length > 1 ? <Text style={netStyles.abstractTitle}>请求次数排行:</Text> : null}
        {reqCountRank.length > 1 ? <Table data={reqCountRank}>
          <TableBody>
            <DataTableCell style={netStyles.abstractRow} getContent={(r) => r.key} />
            <DataTableCell style={netStyles.abstractRow} getContent={(r) => r.value} />
          </TableBody>
        </Table> : null}
      </View>

      <View style={styles.contentContainer}>
        {failReqCountRank.length > 1 ? <Text style={netStyles.abstractTitle}>请求失败次数排行:</Text> : null}
        {failReqCountRank.length > 1 ? <Table data={failReqCountRank}>
          <TableBody>
            <DataTableCell style={netStyles.abstractRow} getContent={(r) => r.key} />
            <DataTableCell style={netStyles.abstractRow} getContent={(r) => r.value} />
          </TableBody>
        </Table> : null}

        {reqTimeRank.length > 1 ? <Text style={netStyles.abstractTitle}>请求时间排行:</Text> : null}
        {reqTimeRank.length > 1 ? <Table data={reqTimeRank}>
          <TableBody>
            <DataTableCell style={netStyles.abstractRow} getContent={(r) => r.key} />
            <DataTableCell style={netStyles.abstractRow} getContent={(r) => r.value} />
          </TableBody>
        </Table> : null}
      </View>

      <View style={styles.contentContainer}>
        {uploadDataRank.length > 1 ? <Text style={netStyles.abstractTitle}>上行流量排行:</Text> : null}
        {uploadDataRank.length > 1 ? <Table data={uploadDataRank}>
          <TableBody>
            <DataTableCell style={netStyles.abstractRow} getContent={(r) => r.key} />
            <DataTableCell style={netStyles.abstractRow} getContent={(r) => r.value} />
          </TableBody>
        </Table> : null}

        {downloadDataRank.length > 1 ? <Text style={netStyles.abstractTitle}>下行流量排行:</Text> : null}
        {downloadDataRank.length > 1 ? <Table data={downloadDataRank}>
          <TableBody>
            <DataTableCell style={netStyles.abstractRow} getContent={(r) => r.key} />
            <DataTableCell style={netStyles.abstractRow} getContent={(r) => r.value} />
          </TableBody>
        </Table> : null}
      </View>
    </View>
  )
};

const netStyles = StyleSheet.create({
  networkTitle: styles.title = {
    textAlign: "left",
    fontSize: 28,
    width: "100%",
    fontWeight: "bold"
  },
  abstractTitle: styles.title = {
    textAlign: "left",
    fontSize: 24,
    width: "100%",
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15
  },
  abstractRow: {
    margin: '8',
    textAlign: "center"
  }
});

export default NetAbstract;