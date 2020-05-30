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
        component: () => import("../Footprint"),
        meta: {
          level: 1
        }
      },
      {
        path: "/picture/:id/collection/:page?",
        meta: {
          level: 1
        },
        component: () => import("../Collection")
      }
    ]
  }
]
