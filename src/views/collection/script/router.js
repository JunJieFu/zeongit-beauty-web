export default [
  {
    path: "/collection/:targetId?/:page?",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/collection/:targetId?/:page?",
        component: () => import("../Index")
      }
    ]
  }
]
