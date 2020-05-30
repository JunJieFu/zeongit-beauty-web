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
  },
  {
    path: "/upload",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/upload",
        meta: {
          keep: true
        },
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
            meta: {
              keep: true
            },
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
            meta: {
              keep: true
            },
            component: () => import("../Following")
          }
        ]
      }
    ]
  }
]
