export default [
  {
    path: "/search/:keyword/:page?",
    component: () => import("../Index")
  }
]
