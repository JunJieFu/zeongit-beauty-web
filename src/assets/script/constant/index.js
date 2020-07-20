import { EmptyTipDetail, MenuEnum, SignInTipDetail } from "../model"
import {
  mdiHomeOutline,
  mdiFileFindOutline,
  mdiAlphaNBoxOutline,
  mdiAccountMultipleOutline,
  mdiStarOutline,
  mdiImageOutline,
  mdiShoePrint,
  mdiAccountHeartOutline,
  mdiAccountStarOutline,
  mdiUploadOutline,
  mdiAccountOutline,
  mdiMagnify
} from "@mdi/js"

export const MENU_LIST_CONSTANT = [
  new MenuEnum("首页", "/", mdiHomeOutline),
  new MenuEnum("猜你喜欢", "/find", mdiFileFindOutline),
  new MenuEnum("本站最新", "/new", mdiAlphaNBoxOutline),
  new MenuEnum("关注最新", "/followingNew", mdiAccountMultipleOutline),
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

export const MENU_LIST_WIDTH = "160"
export const SETTINGS_DIALOG_MAX_WIDTH = "280"

export const SIGN_IN_TIP_DETAIL_LIST = {
  user: new SignInTipDetail(
    mdiAccountOutline,
    "HOME_PAGE_SIGN_IN_TITLE",
    "HOME_PAGE_SIGN_IN_TEXT"
  ),
  followingNew: new SignInTipDetail(
    mdiAccountMultipleOutline,
    "FOLLOWING_NEW_PAGE_SIGN_IN_TITLE",
    "FOLLOWING_NEW_PAGE_SIGN_IN_TEXT"
  ),
  collection: new SignInTipDetail(
    mdiStarOutline,
    "COLLECT_PAGE_SIGN_IN_TITLE",
    "COLLECT_PAGE_SIGN_IN_TEXT"
  ),
  works: new SignInTipDetail(
    mdiImageOutline,
    "WORKS_PAGE_SIGN_IN_TITLE",
    "WORKS_PAGE_SIGN_IN_TEXT"
  ),
  footprint: new SignInTipDetail(
    mdiShoePrint,
    "FOOTPRINT_PAGE_SIGN_IN_TITLE",
    "FOOTPRINT_PAGE_SIGN_IN_TEXT"
  ),
  follower: new SignInTipDetail(
    mdiAccountHeartOutline,
    "FOLLOWER_PAGE_SIGN_IN_TITLE",
    "FOLLOWER_PAGE_SIGN_IN_TEXT"
  ),
  following: new SignInTipDetail(
    mdiAccountStarOutline,
    "FOLLOWING_PAGE_SIGN_IN_TITLE",
    "FOLLOWING_PAGE_SIGN_IN_TEXT"
  ),
  upload: new SignInTipDetail(
    mdiUploadOutline,
    "UPLOAD_PAGE_SIGN_IN_TITLE",
    "UPLOAD_PAGE_SIGN_IN_TEXT"
  )
}

export const EMPTY_TIP_DETAIL_LIST = {
  find: new EmptyTipDetail(
    mdiFileFindOutline,
    "FIND_EMPTY_TITLE",
    "FIND_EMPTY_TEXT",
    "FIND_EMPTY_BTN_DESC",
    "/feedback"
  ),
  new: new EmptyTipDetail(
    mdiAlphaNBoxOutline,
    "NEW_EMPTY_TITLE",
    "NEW_EMPTY_TEXT",
    "NEW_EMPTY_BTN_DESC",
    "/feedback"
  ),
  search: new EmptyTipDetail(
    mdiMagnify,
    "SEARCH_EMPTY_TITLE",
    "SEARCH_EMPTY_TEXT"
  ),
  followingNew: new EmptyTipDetail(
    mdiAccountMultipleOutline,
    "FOLLOWING_NEW_EMPTY_TITLE",
    "FOLLOWING_NEW_EMPTY_TEXT",
    "FOLLOWING_NEW_EMPTY_BTN_DESC",
    "/find"
  ),
  collection: new EmptyTipDetail(
    mdiStarOutline,
    "COLLECTION_EMPTY_TITLE",
    "COLLECTION_EMPTY_TEXT",
    "COLLECTION_EMPTY_BTN_DESC",
    "/find"
  ),
  works: new EmptyTipDetail(
    mdiImageOutline,
    "WORKS_EMPTY_TITLE",
    "WORKS_EMPTY_TEXT",
    "WORKS_EMPTY_BTN_DESC",
    "/upload"
  ),
  footprint: new EmptyTipDetail(
    mdiShoePrint,
    "FOOTPRINT_EMPTY_TITLE",
    "FOOTPRINT_EMPTY_TEXT",
    "FOOTPRINT_EMPTY_BTN_DESC",
    "/find"
  ),
  pictureFootprint: new EmptyTipDetail(
    mdiShoePrint,
    "PICTURE_FOOTPRINT_EMPTY_TITLE",
    "PICTURE_FOOTPRINT_EMPTY_TEXT",
    "PICTURE_FOOTPRINT_EMPTY_BTN_DESC",
    "/picture/"
  ),
  pictureCollection: new EmptyTipDetail(
    mdiStarOutline,
    "PICTURE_COLLECTION_EMPTY_TITLE",
    "PICTURE_COLLECTION_EMPTY_TEXT",
    "PICTURE_COLLECTION_EMPTY_BTN_DESC",
    "/picture/"
  ),
  follower: new EmptyTipDetail(mdiAccountHeartOutline, "FOLLOWER_EMPTY_TITLE"),
  following: new EmptyTipDetail(mdiAccountStarOutline, "FOLLOWING_EMPTY_TITLE")
}
