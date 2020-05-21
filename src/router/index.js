import Vue from "vue"
import VueRouter from "vue-router"
import find from "../views/find/script/router"
import newRouter from "../views/new/script/router"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "content",
    component: () => import("../views/Content"),
    children: [...find, ...newRouter]
  }
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
})

export default router
