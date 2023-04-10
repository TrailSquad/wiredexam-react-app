export function formatNumber(number) {
  if (typeof number === 'number')
    return number.toFixed(2)
  else
    return number
}

export function getReadableSizeString(sizeInBytes) {
  var i = -1;
  var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
  do {
    sizeInBytes /= 1024;
    i++;
  } while (sizeInBytes > 1024);

  return Math.max(sizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

export function formatUrl(url) {
  const targetString = url.replace(" ", ":")
  const stringArr = targetString.split("")
  return stringArr.length > 70 ? stringArr.splice(0,70).join("") + "..." : targetString
}