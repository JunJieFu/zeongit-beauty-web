export default [
  {
    path: "/footprint/:targetId?/:page?",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/footprint/:targetId?/:page?",
        component: () => import("../Index")
      }
    ]
  }
]
