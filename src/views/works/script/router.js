export default [
  {
    path: "/works/:targetId?/:page?",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/works/:targetId?/:page?",
        component: () => import("../Index")
      }
    ]
  }
]
