import Vue from "vue"
import VueRouter from "vue-router"
import find from "../views/find/script/router"
import newRouter from "../views/new/script/router"
import search from "../views/search/script/router"
import collection from "../views/collection/script/router"
import works from "../views/works/script/router"
import footprint from "../views/footprint/script/router"
import picture from "../views/picture/script/router"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "content",
    component: () => import("../views/Content"),
    children: [
      ...find,
      ...newRouter,
      ...search,
      ...collection,
      ...works,
      ...footprint,
      ...picture
    ]
  }
]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
})

export default router
