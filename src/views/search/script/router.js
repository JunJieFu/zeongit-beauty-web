export default [
  {
    path: "/search/:keyword/:page?",
    meta: {
      keepLevel: 0
    },
    component: () => import("../Index")
  }
]
