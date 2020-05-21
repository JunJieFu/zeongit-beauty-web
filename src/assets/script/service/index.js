import httpUtil from "../util/http"

export const userService = {
  getInfo() {
    return httpUtil.get("/userInfo/get", {})
  }
}

export const pictureService = {
  pagingByRecommend(pageable) {
    return httpUtil.get("/picture/pagingByRecommend", pageable)
  },
  paging(pageable) {
    return httpUtil.get("/picture/paging", pageable)
  }
}
