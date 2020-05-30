export default [
  {
    path: "/user/:targetId?",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/user/:targetId?",
        meta: {
          keep: true
        },
        component: () => import("../Type")
      }
    ]
  }
]
