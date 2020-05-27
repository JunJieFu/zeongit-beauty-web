import { MenuEnum } from "../model"
import {
  mdiFileFindOutline,
  mdiAlphaNBoxOutline,
  mdiStarOutline,
  mdiImageOutline,
  mdiShoePrint,
  mdiAccountHeartOutline,
  mdiAccountStarOutline,
  mdiUpload
} from "@mdi/js"

export const MENU_LIST_CONSTANT = [
  new MenuEnum("发现", "/find", mdiFileFindOutline),
  new MenuEnum("最新", "/new", mdiAlphaNBoxOutline),
  new MenuEnum("收藏", "/collection", mdiStarOutline),
  new MenuEnum("作品", "/works", mdiImageOutline),
  new MenuEnum("足迹", "/footprint", mdiShoePrint),
  new MenuEnum("粉丝", "/follower", mdiAccountHeartOutline),
  new MenuEnum("关注", "/following", mdiAccountStarOutline),
  new MenuEnum("上传", "/upload", mdiUpload)
]

export const NOOP = () => {}

export const LIST_GAP = 12
export const LIST_ITEM_WIDTH = 256

export const DETAIL_GAP = 16
export const DETAIL_INFO_WIDTH = 256
export const CONTAINER_PADDING = 12

export const DEFAULT_BTN_HEIGHT = 56
export const SMALL_BTN_HEIGHT = 40
export const CORNER_BUTTONS_GAP = 12

export const MAX_KEEP_ALIVE_PAGE = 15
