import Vue from "vue"
import Component from "./Main"

const Constructor = Vue.extend(Component)

export const Notification = function(option = {}) {
  const instance = new Constructor({
    data: option
  })
  instance.vm = instance.$mount()
  document.getElementById("app").appendChild(instance.vm.$el)
  instance.vm.visible = true
}
