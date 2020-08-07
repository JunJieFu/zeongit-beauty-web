import {
  mdiCloseCircleOutline,
  mdiAlertCircleOutline,
  mdiAlertOutline,
  mdiCheckCircleOutline
} from "@mdi/js"
import { NOOP } from "../constant/main"

const ICON_MAP = {
  success: mdiCheckCircleOutline,
  info: mdiAlertCircleOutline,
  warning: mdiAlertOutline,
  error: mdiCloseCircleOutline
}

export class NotifyViewModel {
  /**
   * @param params {NotifyViewModel}
   * @param id {Number}
   */
  constructor(params, id) {
    this.id = id
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

export class AlertViewModel {
  /**
   * @param params {AlertViewModel}
   * @param id {String}
   */
  constructor(params, id) {
    this.id = id
    this.visible = params?.visible ?? false
    this.title = params?.title ?? "提示"
    this.text = params?.text ?? undefined
    this.confirmText = params?.confirmText ?? "确认"
    this.confirmCallback = params?.confirmCallback ?? NOOP
  }
}

export class ConfirmViewModel {
  /**
   * @param params {ConfirmViewModel}
   * @param id {String}
   */
  constructor(params, id) {
    this.id = id
    this.visible = params?.visible ?? false
    this.title = params?.title ?? "提示"
    this.text = params?.text ?? undefined
    this.closeText = params?.closeText ?? "取消"
    this.confirmText = params?.confirmText ?? "确认"
    this.closeCallback = params?.closeCallback ?? NOOP
    this.confirmCallback = params?.confirmCallback ?? NOOP
  }
}

export class PromptViewModel {
  /**
   * @param params {PromptViewModel}
   * @param id {Number}
   */
  constructor(params, id) {
    this.id = id
    this.visible = params?.visible ?? false
    this.title = params?.title ?? "提示"
    this.value = ""
    this.placeholder = params?.placeholder ?? "请输入"
    this.text = params?.text ?? undefined
    this.closeText = params?.closeText ?? "取消"
    this.confirmText = params?.confirmText ?? "确认"
    this.closeCallback = params?.closeCallback ?? NOOP
    this.confirmCallback = params?.confirmCallback ?? NOOP
  }
}
