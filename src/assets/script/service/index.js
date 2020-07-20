import httpUtil from "../util/http"

export const userService = {
  getInfo() {
    return httpUtil.get("/userInfo/get", {})
  },
  getByTargetId(targetId) {
    return httpUtil.get("/userInfo/get", { targetId })
  },
  follow(followingId) {
    return httpUtil.post("/following/focus", { followingId })
  },
  pagingFollower(pageable, targetId) {
    let _ = Object.assign({ targetId }, pageable)
    _.page--
    return httpUtil.get("/follower/paging", _)
  },
  pagingFollowing(pageable, targetId) {
    let _ = Object.assign({ targetId }, pageable)
    _.page--
    return httpUtil.get("/following/paging", _)
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
  },
  hide(id) {
    return httpUtil.post("/picture/hide", { id })
  },
  pagingRecommendById(pageable, id) {
    let _ = Object.assign({ id }, pageable)
    _.page--
    return httpUtil.get("/picture/pagingRecommendById", _)
  },
  pagingByFollowing(pageable, targetId) {
    let _ = Object.assign({ targetId }, pageable)
    _.page--
    return httpUtil.get("/picture/pagingByFollowing", _)
  }
}

export const collectionService = {
  paging(pageable, targetId) {
    let _ = Object.assign({ targetId }, pageable)
    _.page--
    return httpUtil.get("/collection/paging", _)
  },
  focus(pictureId) {
    return httpUtil.post("/collection/focus", { pictureId })
  },
  pagingUser(pageable, pictureId) {
    let _ = Object.assign({ pictureId }, pageable)
    _.page--
    return httpUtil.get("/collection/pagingUser", _)
  }
}

export const worksService = {
  paging(pageable, targetId) {
    let _ = Object.assign({ targetId }, pageable)
    _.page--
    return httpUtil.get("/works/paging", _)
  }
}

export const footprintService = {
  paging(pageable, targetId) {
    let _ = Object.assign({ targetId }, pageable)
    _.page--
    return httpUtil.get("/footprint/paging", _)
  },
  save(pictureId) {
    return httpUtil.post("/footprint/save", { pictureId })
  },
  pagingUser(pageable, pictureId) {
    let _ = Object.assign({ pictureId }, pageable)
    _.page--
    return httpUtil.get("/footprint/pagingUser", _)
  }
}

export const tagService = {
  listTagTop30() {
    return httpUtil.get("/tag/listTagTop30", {})
  },
  listTagFrequencyByUserId(targetId) {
    return httpUtil.get("/tag/listTagFrequencyByUserId", { targetId })
  }
}
