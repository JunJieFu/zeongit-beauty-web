export default [
  {
    path: "/search/:keyword/:page?",
    meta: {
      keepAlive: true
    },
    component: () => import("../Index")
  }
]
