export default [
  {
    path: "/user/:targetId?",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/user/:targetId?",
        component: () => import("../Type"),
        children: [
          {
            path: "/user/:targetId?",
            component: () => import("../Detail")
          }
        ]
      }
    ]
  },
  {
    path: "/upload",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/upload",
        component: () => import("../Upload")
      }
    ]
  },
  {
    path: "/collection/:targetId?/:page?",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/collection/:targetId?/:page?",
        component: () => import("../Collection")
      }
    ]
  },
  {
    path: "/works/:targetId?/:page?",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/works/:targetId?/:page?",
        component: () => import("../Works")
      }
    ]
  },
  {
    path: "/footprint/:targetId?/:page?",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/footprint/:targetId?/:page?",
        component: () => import("../Footprint")
      }
    ]
  },
  {
    path: "/follower/:targetId?/:page?",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/follower/:targetId?/:page?",
        component: () => import("../Type"),
        children: [
          {
            path: "/follower/:targetId?/:page?",
            component: () => import("../Follower")
          }
        ]
      }
    ]
  },
  {
    path: "/following/:targetId?/:page?",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/following/:targetId?/:page?",
        component: () => import("../Type"),
        children: [
          {
            path: "/following/:targetId?/:page?",
            component: () => import("../Following")
          }
        ]
      }
    ]
  }
]
