export const getStartTime = (netTimes, locationTimes) => {
  const netStart = netTimes.length > 0 ? netTimes[0] : 0;
  const locationStart = locationTimes.length > 0 ? locationTimes[0] : 0;
  if (netStart === 0 || locationStart === 0) return Math.max(netStart, locationStart);
  return Math.round(Math.min(netStart, locationStart))
}

export const getEndTime = (netTimes, locationTimes) => {
  const netEnd = netTimes.length > 0 ? netTimes[netTimes.length - 1] : 0;
  const locationEnd = locationTimes.length > 0 ? locationTimes[locationTimes.length - 1] : 0;
  return Math.round(Math.max(netEnd, locationEnd))
}