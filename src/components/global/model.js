import {
  mdiCloseCircleOutline,
  mdiAlertCircleOutline,
  mdiAlertOutline,
  mdiCheckCircleOutline
} from "@mdi/js"
import { NOOP } from "../../assets/script/constant"

const ICON_MAP = {
  success: mdiCheckCircleOutline,
  info: mdiAlertCircleOutline,
  warning: mdiAlertOutline,
  error: mdiCloseCircleOutline
}

export class NotifyViewModel {
  /**
   * @param params {NotifyViewModel}
   */
  constructor(params) {
    this.id = params?.id
    this.top = params?.top ?? true
    this.right = params?.right ?? true
    this.bottom = params?.bottom ?? false
    this.left = params?.left ?? false
    this.border = params?.border ?? "left"
    this.timeout = params?.timeout ?? 4000
    this.visible = params?.visible ?? false
    this.text = params?.text ?? undefined
    this.color = params?.color ?? "info"
    this.icon = params?.icon ?? ICON_MAP[this.color]
    if (this.timeout) {
      this.timer = setTimeout(() => {
        this.visible = false
      }, this.timeout)
    }
  }
}

export class ConfirmViewModel {
  /**
   * @param params {ConfirmViewModel}
   */
  constructor(params) {
    this.id = params?.id
    this.visible = params?.visible ?? false
    this.title = params?.title ?? "提示"
    this.text = params?.text ?? undefined
    this.closeText = params?.closeText ?? "取消"
    this.confirmText = params?.confirmText ?? "确认"
    this.closeCallback = params?.closeCallback ?? NOOP
    this.confirmCallback = params?.confirmCallback ?? NOOP
  }
}
