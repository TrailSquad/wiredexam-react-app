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
  if (average <= 0.6)
    return 100
  if (average <= 0.8)
    return 95 // TODO Median of this grade, a more linear value is required
  if (average <= 0.9)
    return 85 // TODO Median of this grade, a more linear value is required
  if (average <= 1)
    return 70 // TODO Median of this grade, a more linear value is required
  else
    return 30 // TODO Median of this grade, a more linear value is required
}

const getMemoryLeakMark = (leakCount) => {
  var memoryLeakMark
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

const getLocationMark = () => {
  return 100; // TODO
}

const gradeUtils = {
  generalMarkMap,
  formatLaunchTimeGrade,
  getMemoryLeakMark,
  getFpsMark,
  getNetworkMark,
  getLocationMark
};

export default gradeUtils;