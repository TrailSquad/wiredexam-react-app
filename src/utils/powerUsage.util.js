export const getStartTime = (netTimes, locationTimes, cpuTimes) => {
  const netStart = netTimes.length > 0 ? netTimes[0] : 0;
  const locationStart = locationTimes.length > 0 ? locationTimes[0] : 0;
  const cpuStart = cpuTimes.length > 0 ? cpuTimes[0] : 0;
  if (netStart === 0 || locationStart === 0 || cpuStart === 0) return Math.max(netStart, locationStart, cpuStart);
  return Math.round(Math.min(netStart, locationStart, cpuStart))
}

export const getEndTime = (netTimes, locationTimes, cpuTimes) => {
  const netEnd = netTimes.length > 0 ? netTimes[netTimes.length - 1] : 0;
  const locationEnd = locationTimes.length > 0 ? locationTimes[locationTimes.length - 1] : 0;
  const cpuend = cpuTimes.length > 0 ? cpuTimes[cpuTimes.length - 1] : 0;
  return Math.round(Math.max(netEnd, locationEnd, cpuend))
}