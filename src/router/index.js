import Vue from "vue"
import VueRouter from "vue-router"
import home from "../views/home/script/router"
import find from "../views/find/script/router"
import newRouter from "../views/new/script/router"
import search from "../views/search/script/router"
import picture from "../views/picture/script/router"
import user from "../views/user/script/router"
import feedback from "../views/feedback/script/router"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "content",
    component: () => import("../views/Content"),
    children: [
      ...home,
      ...find,
      ...newRouter,
      ...search,
      ...picture,
      ...user,
      ...feedback
    ]
  }
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
})

export default router
