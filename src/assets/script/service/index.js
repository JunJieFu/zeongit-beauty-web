import httpUtil from "../util/http"

export const userService = {
  getInfo() {
    return httpUtil.get("/userInfo/get", {})
  }
}

export const pictureService = {
  pagingByRecommend(pageable) {
    let _ = Object.assign({}, pageable)
    _.page--
    return httpUtil.get("/picture/pagingByRecommend", _)
  },
  paging(pageable, tagList) {
    let _ = Object.assign({ tagList }, pageable)
    _.page--
    return httpUtil.get("/picture/paging", _)
  },
  get(id) {
    return httpUtil.get("/picture/get", { id })
  }
}

export const tagService = {
  listTagTop30() {
    return httpUtil.get("/tag/listTagTop30", {})
  }
}
