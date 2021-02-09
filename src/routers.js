import React, { lazy, Suspense } from 'react'

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

const Main = createLazyRoute(
  lazy(() => import('./views/Main'))
)

const Container = createLazyRoute(
  lazy(() => import('./views/backStage/Container'))
)

const Statistic = createLazyRoute(
  lazy(() => import('./views/backStage/statistic'))
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
        name: '登录页',
        component: Login
      },
      {
        path: '/backStage',
        name: '后台主页',
        component: Container ,
        indexRoute: {
          onEnter: (nextState, replace) =>
              replace('/statistic')
        },
        childRoutes: [
          {
            path: '/statistic',
            name: '数据概览页',
            component: Statistic
          }
        ]
      }
    ]
  },
  {
      path: '/*',
      component: NotFund
  }
]
    
export default RouteConfig
