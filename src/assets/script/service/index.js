import httpUtil from "@/plugins/zg/script/util/http"

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
    return httpUtil.get("/follower/paging", _)
  },
  pagingFollowing(pageable, targetId) {
    let _ = Object.assign({ targetId }, pageable)
    return httpUtil.get("/following/paging", _)
  }
}

export const pictureService = {
  pagingByRecommend(pageable) {
    let _ = Object.assign({}, pageable)
    return httpUtil.get("/picture/pagingByRecommend", _)
  },
  paging(pageable, tagList, query) {
    try {
      tagList = JSON.parse(tagList)
    } catch (e) {
      tagList = [tagList]
    }
    let _ = Object.assign({ tagList }, pageable, query)
    return httpUtil.get("/picture/paging", _)
  },
  get(id) {
    return httpUtil.get("/picture/get", { id })
  },
  hide(id) {
    return httpUtil.post("/picture/hide", { id })
  },
  update(picture) {
    return httpUtil.post("/picture/update", picture)
  },
  pagingRecommendById(pageable, id) {
    let _ = Object.assign({ id }, pageable)
    return httpUtil.get("/picture/pagingRecommendById", _)
  },
  pagingByFollowing(pageable, targetId) {
    let _ = Object.assign({ targetId }, pageable)
    return httpUtil.get("/picture/pagingByFollowing", _)
  }
}

export const collectionService = {
  paging(pageable, targetId) {
    let _ = Object.assign({ targetId }, pageable)
    return httpUtil.get("/collection/paging", _)
  },
  focus(pictureId) {
    return httpUtil.post("/collection/focus", { pictureId })
  },
  pagingUser(pageable, pictureId) {
    let _ = Object.assign({ pictureId }, pageable)
    return httpUtil.get("/collection/pagingUser", _)
  }
}

export const worksService = {
  paging(pageable, targetId) {
    let _ = Object.assign({ targetId }, pageable)
    return httpUtil.get("/works/paging", _)
  }
}

export const footprintService = {
  paging(pageable, targetId) {
    let _ = Object.assign({ targetId }, pageable)
    return httpUtil.get("/footprint/paging", _)
  },
  save(pictureId) {
    return httpUtil.post("/footprint/save", { pictureId })
  },
  pagingUser(pageable, pictureId) {
    let _ = Object.assign({ pictureId }, pageable)
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

export const feedbackService = {
  save(body) {
    return httpUtil.post("/feedback/save", body)
  }
}

export const complaintService = {
  save(body) {
    return httpUtil.post("/complaint/save", body)
  }
}

export const userBlackHoleService = {
  block(targetId) {
    return httpUtil.post("/userBlackHole/block", { targetId })
  },
  get(targetId) {
    return httpUtil.get("/userBlackHole/get", { targetId })
  },
  paging(pageable) {
    let _ = Object.assign({}, pageable)
    return httpUtil.get("/userBlackHole/paging", _)
  }
}

export const pictureBlackHoleService = {
  block(targetId) {
    return httpUtil.post("/pictureBlackHole/block", { targetId })
  },
  get(targetId) {
    return httpUtil.get("/pictureBlackHole/get", { targetId })
  },
  paging(pageable) {
    let _ = Object.assign({}, pageable)
    return httpUtil.get("/pictureBlackHole/paging", _)
  }
}

export const tagBlackHoleService = {
  block(tag) {
    return httpUtil.post("/tagBlackHole/block", { tag })
  },
  paging(pageable) {
    let _ = Object.assign({}, pageable)
    return httpUtil.get("/tagBlackHole/paging", _)
  }
}
