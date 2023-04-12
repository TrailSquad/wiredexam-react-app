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
  if (average <= 400)
    return 100
  if (average <= 800)
    return 95 // TODO Median of this grade, a more linear value is required
  if (average <= 900)
    return 85 // TODO Median of this grade, a more linear value is required
  if (average <= 1000)
    return 70 // TODO Median of this grade, a more linear value is required
  else
    return 30 // TODO Median of this grade, a more linear value is required
}

const formatPageLoadTimeGrade = (average) => {
  if (average <= 50)
    return 100
  if (average <= 100)
    return 95 // TODO Median of this grade, a more linear value is required
  if (average <= 200)
    return 85 // TODO Median of this grade, a more linear value is required
  else
    return 30 // TODO Median of this grade, a more linear value is required
}

const getMemoryLeakMark = (leakCount) => {
  let memoryLeakMark
  if (leakCount <= 0) {
    memoryLeakMark = 100
  } else if (leakCount <= 1) {
    memoryLeakMark = 95 // TODO Median of this grade, a more linear value is required
  } else if (leakCount <= 3) {
    memoryLeakMark = 85 // TODO Median of this grade, a more linear value is required
  } else if (leakCount <= 5) {
    memoryLeakMark = 70 // TODO Median of this grade, a more linear value is required
  } else {
    memoryLeakMark = 30 // TODO Median of this grade, a more linear value is required
  }
  return memoryLeakMark;
}

const getFpsMark = (lowRate) => {
  return Math.round((1 - lowRate) * 100)
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

const gradeUtils = {
  generalMarkMap,
  formatLaunchTimeGrade,
  formatPageLoadTimeGrade,
  getMemoryLeakMark,
  getFpsMark,
  getNetworkMark,
  getSlowRequestRate,
  getMemoryLeakDataSummaryDescription,
  getLocationMark
};

export default gradeUtils;