export default [
  {
    path: "/new/:page?",
    meta: {
      keepAlive: true
    },
    component: () => import("../Index")
  }
]
