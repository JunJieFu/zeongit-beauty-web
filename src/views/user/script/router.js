export default [
  {
    path: "/user/:targetId?",
    component: () => import("../SignIn"),
    props: true,
    children: [
      {
        path: "/user/:targetId?",
        component: () => import("../Type"),
        props: true,
        children: [
          {
            path: "/user/:targetId?",
            component: () => import("../Detail"),
            props: true
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
    path: "/followingNew/:targetId?/:page?",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/followingNew/:targetId?/:page?",
        meta: {
          keepAlive: true
        },
        component: () => import("../FollowingNew")
      }
    ]
  },
  {
    path: "/collection/:targetId?/:page?",
    component: () => import("../SignIn"),
    children: [
      {
        path: "/collection/:targetId?/:page?",
        meta: {
          keepAlive: true
        },
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
        meta: {
          keepAlive: true
        },
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
        meta: {
          keepAlive: true
        },
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
