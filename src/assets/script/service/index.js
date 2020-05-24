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
  paging(pageable, tagList, targetId) {
    let _ = Object.assign({ tagList, targetId }, pageable)
    _.page--
    return httpUtil.get("/picture/paging", _)
  },
  get(id) {
    return httpUtil.get("/picture/get", { id })
  },
  pagingCollection(pageable, targetId) {
    let _ = Object.assign({ targetId }, pageable)
    _.page--
    return httpUtil.get("/collection/paging", _)
  },
  pagingFootprint(pageable, targetId) {
    let _ = Object.assign({ targetId }, pageable)
    _.page--
    return httpUtil.get("/footprint/paging", _)
  }
}

export const tagService = {
  listTagTop30() {
    return httpUtil.get("/tag/listTagTop30", {})
  }
}
