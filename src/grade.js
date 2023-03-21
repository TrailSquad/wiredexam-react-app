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

export default generalMarkMap;