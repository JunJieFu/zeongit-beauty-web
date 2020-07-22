import {
  mdiCloseCircleOutline,
  mdiAlertCircleOutline,
  mdiAlertOutline,
  mdiCheckCircleOutline
} from "@mdi/js"

const ICON_MAP = {
  success: mdiCheckCircleOutline,
  info: mdiAlertCircleOutline,
  warning: mdiAlertOutline,
  error: mdiCloseCircleOutline
}

export class NotifyViewModel {
  /**
   *
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
