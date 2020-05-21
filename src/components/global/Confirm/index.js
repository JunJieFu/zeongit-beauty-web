import Vue from "vue"
import Component from "./Main"

const Constructor = Vue.extend(Component)

export const Confirm = function(option = {}) {
  return new Promise((resolve, reject) => {
    option.closeCallback = (...args) => {
      reject(...args)
    }
    option.confirmCallback = (...args) => {
      resolve(...args)
    }
    const instance = new Constructor({
      data: option
    })
    instance.vm = instance.$mount()
    document.getElementById("app").appendChild(instance.vm.$el)
    setTimeout(() => {
      instance.vm.visible = true
    }, 0)
  })
}
