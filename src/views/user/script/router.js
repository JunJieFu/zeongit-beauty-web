export default [
  {
    path: "/user/:targetId?",
    props: true,
    component: () => import("../SignIn"),
    children: [
      {
        path: "/user/:targetId?",
        props: true,
        component: () => import("../Type"),
        children: [
          {
            path: "/user/:targetId?",
            props: true,
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
    path: "/followingNew/:targetId?/:page?",
    props: true,
    component: () => import("../SignIn"),
    children: [
      {
        path: "/followingNew/:targetId?/:page?",
        props: true,
        meta: {
          keepAlive: true
        },
        component: () => import("../FollowingNew")
      }
    ]
  },
  {
    path: "/collection/:targetId?/:page?",
    props: true,
    component: () => import("../SignIn"),
    children: [
      {
        path: "/collection/:targetId?/:page?",
        meta: {
          keepAlive: true
        },
        props: true,
        component: () => import("../Collection")
      }
    ]
  },
  {
    path: "/works/:targetId?/:page?",
    props: true,
    component: () => import("../SignIn"),
    children: [
      {
        path: "/works/:targetId?/:page?",
        meta: {
          keepAlive: true
        },
        props: true,
        component: () => import("../Works")
      }
    ]
  },
  {
    path: "/footprint/:targetId?/:page?",
    props: true,
    component: () => import("../SignIn"),
    children: [
      {
        path: "/footprint/:targetId?/:page?",
        meta: {
          keepAlive: true
        },
        props: true,
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
