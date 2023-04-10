export function mapToTextColor(score) {
  if (score >= 100)
    return "#2E7D32"
  if (score >= 90)
    return "#9E9D24"
  if (score >= 80)
    return "#F9A825"
  if (score >= 60)
    return "#EF6C00"
  else
    return "#D84315"
}

export function mapToBgColor(score) {
  if (score >= 100)
    return "#A5D6A7"
  if (score >= 90)
    return "#E6EE9C"
  if (score >= 80)
    return "#FFF59D"
  if (score >= 60)
    return "#FFCC80"
  else
    return "#FFAB91"
}

export function getColorStyle(mark) {
  return {
    color: mapToTextColor(mark),
    backgroundColor: mapToBgColor(mark),
    fontSize: 56,
    fontFamily: "FZHeiti",
    padding: 16,
    maxLines: 1,
    textOverflow: 'ellipsis',
    textAlign: 'center',
    margin: 24,
  }
}