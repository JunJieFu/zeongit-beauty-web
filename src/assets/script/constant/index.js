import { MenuEnum } from "@/assets/script/model"
import {
  mdiAccountHeartOutline,
  mdiAccountMultipleOutline,
  mdiAccountOutline,
  mdiAccountStarOutline,
  mdiAlphaNBoxOutline,
  mdiFileFindOutline,
  mdiHomeOutline,
  mdiImageOutline,
  mdiMagnify,
  mdiShoePrint,
  mdiStarOutline,
  mdiUploadOutline,
  mdiEyeOffOutline
} from "@mdi/js"

export const MENU_LIST_CONSTANT = [
  new MenuEnum("$vuetify.menu.home", "/", mdiHomeOutline),
  new MenuEnum("$vuetify.menu.find", "/find", mdiFileFindOutline),
  new MenuEnum("$vuetify.menu.new", "/new", mdiAlphaNBoxOutline),
  new MenuEnum(
    "$vuetify.menu.followingNew",
    "/followingNew",
    mdiAccountMultipleOutline
  ),
  new MenuEnum("$vuetify.menu.collection", "/collection", mdiStarOutline),
  new MenuEnum("$vuetify.menu.works", "/works", mdiImageOutline),
  new MenuEnum("$vuetify.menu.footprint", "/footprint", mdiShoePrint),
  new MenuEnum("$vuetify.menu.follower", "/follower", mdiAccountHeartOutline),
  new MenuEnum("$vuetify.menu.following", "/following", mdiAccountStarOutline),
  new MenuEnum("$vuetify.menu.upload", "/upload", mdiUploadOutline)
]

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
export const BLOCK_DIALOG_MAX_WIDTH = "680"

export const SIGN_IN_TIP_ICON = {
  user: mdiAccountOutline,
  followingNew: mdiAccountMultipleOutline,
  collection: mdiStarOutline,
  works: mdiImageOutline,
  footprint: mdiShoePrint,
  follower: mdiAccountHeartOutline,
  following: mdiAccountStarOutline,
  upload: mdiUploadOutline,
  blackHole: mdiEyeOffOutline
}

export const EMPTY_TIP_ICON = {
  find: mdiFileFindOutline,
  new: mdiAlphaNBoxOutline,
  search: mdiMagnify,
  followingNew: mdiAccountMultipleOutline,
  collection: mdiStarOutline,
  works: mdiImageOutline,
  footprint: mdiShoePrint,
  pictureFootprint: mdiShoePrint,
  pictureCollection: mdiStarOutline,
  follower: mdiAccountHeartOutline,
  following: mdiAccountStarOutline,
  blackHole: mdiEyeOffOutline
}
