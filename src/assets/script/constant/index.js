import { MenuEnum } from "../model"
import {
  mdiFileFindOutline,
  mdiAlphaNBoxOutline,
  mdiStarOutline,
  mdiImageOutline
} from "@mdi/js"

export function menuListConstant() {
  return [
    new MenuEnum("发现", "/find", mdiFileFindOutline),
    new MenuEnum("最新", "/new", mdiAlphaNBoxOutline),
    new MenuEnum("收藏", "/collection", mdiStarOutline),
    new MenuEnum("作品", "/works", mdiImageOutline),
    new MenuEnum("足迹", "/footprint", mdiImageOutline),
    new MenuEnum("粉丝", "/follower", mdiImageOutline),
    new MenuEnum("关注", "/following", mdiImageOutline),
    new MenuEnum("上传", "/upload", mdiImageOutline)
  ]
}

export const NOOP = () => {}

export function listConstant() {
  const gap = 12
  const width = 256
  return {
    gap,
    width
  }
}
export function detailConstant() {
  const gap = 16
  const infoWidth = 256
  const minWidth = 800
  return {
    gap,
    infoWidth,
    minWidth
  }
}
