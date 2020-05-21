import { MenuEnum } from "../model"
import {
  mdiFileFindOutline,
  mdiAlphaNBoxOutline,
  mdiStarOutline,
  mdiImageOutline
} from "@mdi/js"

export function menuListConstant() {
  return [
    new MenuEnum("发现", "/", mdiFileFindOutline),
    new MenuEnum("最新", "/new", mdiAlphaNBoxOutline),
    new MenuEnum("收藏", "/collection", mdiStarOutline),
    new MenuEnum("作品", "/works", mdiImageOutline)
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
