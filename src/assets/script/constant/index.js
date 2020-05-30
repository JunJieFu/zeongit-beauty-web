import { MenuEnum, SignInTipDetail } from "../model"
import {
  mdiHomeOutline,
  mdiFileFindOutline,
  mdiAlphaNBoxOutline,
  mdiStarOutline,
  mdiImageOutline,
  mdiShoePrint,
  mdiAccountHeartOutline,
  mdiAccountStarOutline,
  mdiUploadOutline,
  mdiAccountOutline
} from "@mdi/js"

export const MENU_LIST_CONSTANT = [
  new MenuEnum("首页", "/", mdiHomeOutline),
  new MenuEnum("发现", "/find", mdiFileFindOutline),
  new MenuEnum("最新", "/new", mdiAlphaNBoxOutline),
  new MenuEnum("收藏", "/collection", mdiStarOutline),
  new MenuEnum("作品", "/works", mdiImageOutline),
  new MenuEnum("足迹", "/footprint", mdiShoePrint),
  new MenuEnum("粉丝", "/follower", mdiAccountHeartOutline),
  new MenuEnum("关注", "/following", mdiAccountStarOutline),
  new MenuEnum("上传", "/upload", mdiUploadOutline)
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

export const SIGN_IN_TIP_DETAIL_LIST = {
  user: new SignInTipDetail(
    mdiAccountOutline,
    "您的Zeongit Beauty主页",
    "请先登录，才能进入您的Zeongit Beauty主页。"
  ),
  collection: new SignInTipDetail(
    mdiStarOutline,
    "您喜爱的作品",
    "请先登录，才能查看到您收藏的作品。"
  ),
  works: new SignInTipDetail(
    mdiImageOutline,
    "您发表过的点点滴滴",
    "请先登录，才能查看到您上传的作品。"
  ),
  footprint: new SignInTipDetail(
    mdiShoePrint,
    "追寻您查走过的足迹",
    "请先登录，才能查看到您走过的足迹。"
  ),
  follower: new SignInTipDetail(
    mdiAccountHeartOutline,
    "喜欢您的作品的人",
    "请先登录，才能查看到您的粉丝。"
  ),
  following: new SignInTipDetail(
    mdiAccountStarOutline,
    "ta的作品吸引了你",
    "请先登录，才能查看到您的关注。"
  ),
  upload: new SignInTipDetail(
    mdiUploadOutline,
    "您有新的作品",
    "请先登录，才能让别人欣赏到你的新作品。"
  )
}
