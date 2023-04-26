// grade calculation logic reference: https://wiredcraft.atlassian.net/browse/MOB-399

const generalMarkMap = (score) => {
  if (score >= 100)
    return "A+"
  if (score >= 90)
    return "A"
  if (score >= 80)
    return "B"
  if (score >= 60)
    return "C"
  else
    return "D"
}

const formatLaunchTimeGrade = (average) => {
  const deduct = 15.946 * Math.log(average) - 95.53
  return 100 - Math.max(Math.min(deduct.toFixed(0), 100), 0)
}

const formatPageLoadTimeGrade = (average) => {
  const deduct = 13.301 * Math.log(average) - 52
  return 100 - Math.max(Math.min(deduct.toFixed(0), 100), 0)
}

const getMemoryLeakMark = (leakCount) => {
  return 100 - Math.min(5 * leakCount, 100);
}

const getFpsMark = (lowRate) => {
  return Math.round((1 - lowRate) * 100)
}

const getBlockMark = (blockData) => {
  let sum = 0
  blockData.forEach((d) => {
    sum += Math.min(Math.max(0.0083 * d.duration - 1.66, 0), 40)
  })
  return 100 - Math.min(sum.toFixed(0), 100);
}

const getNetworkMark = (sucsessRate, slowReqRate) => {
  return Math.round(sucsessRate * 50 + (1 - slowReqRate) * 50)
}

const getSlowRequestRate = (slowRequestCount, summaryRequestCount) => {
  let slowReqRate
  if (summaryRequestCount === 0) {
    if (slowRequestCount > 0) {
      slowReqRate = 1
    } else {
      slowReqRate = 0
    }
  } else {
    slowReqRate = slowRequestCount / summaryRequestCount
  }
  return slowReqRate
}

const getMemoryLeakDataSummaryDescription = (memoryLeakData) => {
  if (memoryLeakData.length <= 0) {
    return [
      { "text": "The memory leak score is mainly based on the number of detected memory leaks. This monitoring found no memory leaks.", "isRich": false },
    ]
  } else {
    return [
      { "text": "The memory leak score is mainly based on the number of detected memory leaks. This test detected ", "isRich": false },
      { "text": memoryLeakData.length, "isRich": true },
      { "text": " memory leaks, and it is recommended to fix them before going live.", "isRich": false },
    ]
  }
}

const getLocationMark = () => {
  return 100; // TODO
}

const getCpuMark = (cpuData) => {
  let sum = 0
  if (!cpuData) return 100
  if (!cpuData.anomalies) return 100

  cpuData.anomalies.forEach((d) => {
    if (d.averageCpuUsageRate > 70) sum += 3
    else if (d.averageCpuUsageRate > 50) sum += 2
    else if (d.averageCpuUsageRate > 30) sum += 1
  })
  return 100 - Math.min(sum, 100);
}

const gradeUtils = {
  generalMarkMap,
  formatLaunchTimeGrade,
  formatPageLoadTimeGrade,
  getMemoryLeakMark,
  getFpsMark,
  getBlockMark,
  getNetworkMark,
  getSlowRequestRate,
  getMemoryLeakDataSummaryDescription,
  getLocationMark,
  getCpuMark,
};

export default gradeUtils;