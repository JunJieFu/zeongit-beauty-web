import dateUtil from "../util/date"
export default {
  date(date, formatString) {
    return dateUtil.format(date, formatString)
  },
  toFixed(number, fractionDigits = 2, showNaN) {
    let _number = number * 1
    if (typeof _number === "number") {
      return _number.toFixed(fractionDigits)
    } else if (showNaN) {
      return "NaN"
    } else {
      _number = 0
      return _number.toFixed(fractionDigits)
    }
  },
  toMore(number, threshold = 100) {
    if (number > threshold) {
      return threshold - 1
    }
    return number
  },
  ago(date) {
    return dateUtil.ago(date)
  }
}
