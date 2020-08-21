export default [
  {
    path: "/blackHole",
    props: true,
    component: () => import("../SignIn"),
    children: [
      {
        path: "/blackHole",
        props: true,
        component: () => import("../Type"),
        redirect: "/blackHole/user",
        children: [
          {
            path: "/blackHole/user/:page?",
            props: true,
            component: () => import("../User")
          },
          {
            path: "/blackHole/tag/:page?",
            props: true,
            component: () => import("../Tag")
          }
        ]
      }
    ]
  }
]
