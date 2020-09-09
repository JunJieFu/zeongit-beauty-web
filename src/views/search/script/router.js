export default [
  {
    path: "/search/:tagList/:page?",
    meta: {
      keepAlive: true
    },
    component: () => import("../Index"),
    props: true
  }
]
