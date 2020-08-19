export default {
  required(label) {
    return (value) => {
      if (value === null || value === undefined || value === "") {
        return "请输入" + label
      }
      return true
    }
  }
}
