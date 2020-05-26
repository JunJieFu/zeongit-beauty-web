export default [
  {
    path: "find/:page?",
    meta: { keepAlive: true },
    component: () => import("../Index")
  }
]
