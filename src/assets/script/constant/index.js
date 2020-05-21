import { MenuEnum } from "../model"
import { mdiHome, mdiSmartCardOutline, mdiLockOutline, mdiApps } from "@mdi/js"

export function menuListConstant() {
  return [
    new MenuEnum("首页", "/", mdiHome),
    new MenuEnum("个人信息", "/new", mdiSmartCardOutline),
    new MenuEnum("安全性", "/security", mdiLockOutline),
    new MenuEnum("应用中心", "/apps", mdiApps)
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
