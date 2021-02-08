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

export function getRoutes () {
    return (
        [
            {
              path: '/',
              name: '首页',
              component: Home
            },
            {
                path: '/*',
                component: NotFund
            }
        ]
    )
}
