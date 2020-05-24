export default [
  {
    path: "/works/:targetId?/:page?",
    component: () => import("../../footprint/SignIn"),
    children: [
      {
        path: "/works/:targetId?/:page?",
        component: () => import("../Index")
      }
    ]
  }
]
