export default [
  {
    path: "/new/:page?",
    meta: {
      keepLevel: 0
    },
    component: () => import("../Index")
  }
]
