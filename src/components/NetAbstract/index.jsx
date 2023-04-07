import { useContext } from 'react';
import { Text, View } from '@react-pdf/renderer';
import styles from 'src/pdfStyles';
import Context from 'src/context';
import { Table, DataTableCell, TableCell, TableHeader, TableBody } from '@david.kucsai/react-pdf-table'
import Strings from 'src/constants/strings';
import { formatNumber, getReadableSizeString, formatUrl } from "../../utils/netAbstract.util"


const TableSection = ({title, description, hint, data=[], tableHeaders=[], tableData=[]}) => {
  return (
    <>
      <Text style={styles.tableTitle}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
      <Text style={styles.hint}>{hint}</Text>
      <View style={styles.tableContainer} wrap={false}>
        <Table data={data}>
          <TableHeader>
            { tableHeaders.map(header => <TableCell key={header.span} weighting={header.span} style={styles.tableHeader}>{header.value}</TableCell> ) }
          </TableHeader>
          <TableBody>
            { tableData.map(v => <DataTableCell key={v.span} weighting={v.span} style={v.style} getContent={v.value} /> ) }
          </TableBody>
        </Table>
      </View>
    </>
  )
}

const NetAbstract = () => {
  const performanceData = useContext(Context);
  const { network } = performanceData;
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
  const netRankings = [
    {
      title: "3.4.2 Ranking of Requests",
      description: "Failed requests tell us there is a problem with the backend. Discover them and solve them.",
      hint: "The number on the right is the number of requests",
      data: reqCountRank,
      tableHeaders: [{value: "Url", span: 0.8}, {value: "Count", span: 0.2}],
      tableData: [{value: (r) => formatUrl(r.key), span: 0.8, style: styles.tableRowLabel}, {value: (r) => r.value, span: 0.2, style: styles.tableRowValue}]
    },{
      title: "3.4.3 Ranking of Failed Requests",
      description: "Too many requests may be unnecessary and can be optimized. Here is a list of the most frequently requested items in the collected data.",
      hint: "The number on the right is the number of requests",
      data: failReqCountRank,
      tableHeaders: [{value: "Url", span: 0.8}, {value: "Count", span: 0.2}],
      tableData: [{value: (r) => formatUrl(r.key), span: 0.8, style: styles.tableRowLabel}, {value: (r) => r.value, span: 0.2, style: styles.tableRowValue}]
    },{
      title: "3.4.4 Request Time Ranking",
      description: "Excessive request time means that it can be optimized to improve response speed and improve user experience.",
      hint: "The number on the right is the number of requests",
      data: reqTimeRank,
      tableHeaders: [{value: "Url", span: 0.8}, {value: "Times", span: 0.2}],
      tableData: [{value: (r) => formatUrl(r.key), span: 0.8, style: styles.tableRowLabel}, {value: (r) => formatNumber(r.value), span: 0.2, style: styles.tableRowValue}]
    },{
      title: "3.4.5 Uplink Traffic Ranking",
      description: "Optimizing the request with too large request data can improve the response speed, thereby improving the user experience.",
      hint: "The number on the right is the number of requests",
      data: uploadDataRank,
      tableHeaders: [{value: "Url", span: 0.8}, {value: "Size", span: 0.2}],
      tableData: [{value: (r) => formatUrl(r.key), span: 0.8, style: styles.tableRowLabel}, {value: (r) => formatNumber(r.value), span: 0.2, style: styles.tableRowValue}]
    },{
      title: "3.4.6 Downstream Traffic Ranking",
      description: "Optimizing the request with too large request data can improve the response speed, thereby improving the user experience",
      hint: "The number on the right is the number of requests",
      data: downloadDataRank,
      tableHeaders: [{value: "Url", span: 0.8}, {value: "Size", span: 0.2}],
      tableData: [{value: (r) => formatUrl(r.key), span: 0.8, style: styles.tableRowLabel}, {value: (r) => formatNumber(r.value), span: 0.2, style: styles.tableRowValue}]
    },
  ]

  if (!performanceData || !network) {
    return null;
  }

  return (
    <View bookmark={{ title: "3.4 Network Monitoring", fit: true }}>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionsSubTitle} id='link_network'>3.4 Network Monitoring</Text>
        <Text style={styles.text}>{Strings.network.sectionDescription}</Text>
        <Text style={styles.tableTitle}>3.4.1 Network Data Summary</Text>
        <View style={styles.tableContainer} wrap={false}>
          <Table data={tableData}>
            <TableHeader>
              <TableCell weighting={0.5} style={styles.tableHeader}>Item</TableCell>
              <TableCell weighting={0.5} style={styles.tableHeader}>Value</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell weighting={0.5} style={styles.tableRowLabel} getContent={(r) => r.categary} />
              <DataTableCell weighting={0.5} style={styles.tableRowValue} getContent={(r) => r.value} />
            </TableBody>
          </Table>
        </View>
        { netRankings.map(rank => rank.data.length > 0 ? <TableSection key={rank.title} {...rank} /> : null ) }
      </View>

      <View>
        <Text style={styles.subTitle}>3.4.7 Recommendations for Optimisation</Text>
        <View style={styles.recommendationLayout} wrap={false}>
          {Strings.network.recommendation.map(e => <Text style={styles.text}>{e}</Text>)}
        </View>
      </View>
    </View>
  )
};

export default NetAbstract;