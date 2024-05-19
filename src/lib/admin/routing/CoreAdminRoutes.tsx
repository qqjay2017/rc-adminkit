import type { PropsWithChildren } from 'react'
import { Children, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { useConfigureAdminRouterFromChildren } from '../util/useConfigureAdminRouterFromChildren'
import { useCheckAuth } from '../../auth/react/useCheckAuth'
import type { LayoutComponent } from '..'
import type { LayoutProps } from '../ui-antd/layout'
import type { AuthingParamsType } from '@/lib/auth'

export interface ICoreAdminRoutesProps extends PropsWithChildren {
  layout: LayoutComponent
  layoutProps?: LayoutProps
  authingParams?: Partial<AuthingParamsType>
}

export function CoreAdminRoutes({
  layout: Layout,
  layoutProps,
  children,
  authingParams,
}: ICoreAdminRoutesProps) {
  const requireAuth = authingParams?.manual !== true

  const [canRender, setCanRender] = useState(!requireAuth)
  // 注册路由
  const {
    customRoutesWithLayout,
    customRoutesWithoutLayout,
    status,
    resources,
  } = useConfigureAdminRouterFromChildren(children)
  const checkAuth = useCheckAuth()
  useEffect(() => {
    if (requireAuth) {
      checkAuth()
        .then(() => {
          setCanRender(true)
        })
        .catch(() => {})
    }
  }, [checkAuth, requireAuth])

  if (status === 'loading' || !canRender) {
    return (
      <Routes>
        {customRoutesWithoutLayout}
        <Route
          path="*"
          element={(
            <div style={{ height: '100vh' }}>
              <div>loading....</div>
            </div>
          )}
        />
      </Routes>
    )
  }
  return (
    <Routes>
      {/* 渲染不需要layout的路由 */}
      {customRoutesWithoutLayout}
      <Route
        path="/*"
        element={(
          <Layout {...layoutProps}>
            <Routes>
              {customRoutesWithLayout}

              {Children.map(resources, resource => (
                <Route
                  key={resource.props.name}
                  path={`${resource.props.name}/*`}
                  element={resource}
                />
              ))}

              {/* 根路径重定向到首页 / 第一个路由 */}
              {/* <Route
                path="/"
                element={
                  dashboard ? (
                    <WithPermissions
                      authParams={defaultAuthParams}
                      component={dashboard}
                    />
                  ) : resources.length > 0 ? (
                    <Navigate
                      to={createPath({
                        resource: resources[0].props.name,
                        type: "list",
                      })}
                    />
                  ) : null
                }
              /> */}

              <Route path="*" element={<div>404</div>} />
            </Routes>
          </Layout>
        )}
      >
      </Route>
    </Routes>
  )
}
