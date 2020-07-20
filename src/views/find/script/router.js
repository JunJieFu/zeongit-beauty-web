export default [
  {
    path: "find/:page?",
    meta: {
      keepAlive: true
    },
    props: true,
    component: () => import("../Index")
  }
]
