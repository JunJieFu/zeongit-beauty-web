export default [
  {
    path: "/picture/:id",
    component: () => import("../Detail")
  },
  {
    path: "/picture/:id/:type",
    component: () => import("../Type"),
    children: [
      {
        path: "/picture/:id/footprint/:page?",
        component: () => import("../Footprint")
      },
      {
        path: "/picture/:id/collection/:page?",
        component: () => import("../Collection")
      }
    ]
  }
]
