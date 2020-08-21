export default {
  required(label) {
    return (value) => {
      if (value === null || value === undefined || value === "") {
        return "请输入" + label
      }
      return true
    }
  },
  email(label) {
    return (value) => {
      console.log(value)
      if (value === null || value === undefined || value === "") {
        return true
      } else if (/^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(value)) {
        return true
      }
      return label + "格式不正确"
    }
  }
}
