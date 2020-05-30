export default [
  {
    path: "find/:page?",
    meta: {
      keepLevel: 0
    },
    component: () => import("../Index")
  }
]
