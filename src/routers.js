import React, { lazy, Suspense } from 'react'

import Main from './views/Main'
import NotFund from './components//notFund'
import LoadingComponent from './components/loading'

const createLazyRoute = (RouteComponent) => {
    return function (props) {
        return (
            <Suspense fallback={<LoadingComponent />}>
                <RouteComponent {...props} />
            </Suspense>
        )
    }
}

const Home = createLazyRoute(
    lazy(() => import('./views/App'))
)

const Login = createLazyRoute(
  lazy(() => import('./views/login'))
)

const RouteConfig =
[
  {
    path: '/',
    name: '首页',
    component: Main,
    indexRoute: { component: Home },
    childRoutes: [
      {
        path: '/login',
        name: '登录',
        component: Login
      }
    ]
  },
  {
      path: '/*',
      component: NotFund
  }
]
    
export default RouteConfig
