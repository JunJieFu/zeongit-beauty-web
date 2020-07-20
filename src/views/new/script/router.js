export default [
  {
    path: "/new/:page?",
    meta: {
      keepAlive: true
    },
    props: true,
    component: () => import("../Index")
  }
]
