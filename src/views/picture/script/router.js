export default [
  {
    path: "/picture/:id",
    props: true,
    component: () => import("../Assert"),
    children: [
      {
        path: "/picture/:id",
        props: true,
        component: () => import("../Detail")
      },
      {
        path: "/picture/:id/:type",
        props: true,
        component: () => import("../Type"),
        children: [
          {
            path: "/picture/:id/complaint/",
            props: true,
            component: () => import("../Complaint")
          },
          {
            path: "/picture/:id/footprint/:page?",
            props: true,
            component: () => import("../Footprint")
          },
          {
            path: "/picture/:id/collection/:page?",
            props: true,
            component: () => import("../Collection")
          }
        ]
      }
    ]
  }
]
