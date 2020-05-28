import Vue from "vue"
import VueRouter from "vue-router"
import find from "../views/find/script/router"
import newRouter from "../views/new/script/router"
import search from "../views/search/script/router"
import picture from "../views/picture/script/router"
import user from "../views/user/script/router"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "content",
    component: () => import("../views/Content"),
    children: [...find, ...newRouter, ...search, ...picture, ...user]
  }
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
})

export default router
