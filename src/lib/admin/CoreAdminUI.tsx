import type { PropsWithChildren } from 'react'
import { Route, Routes } from 'react-router-dom'
import type { AuthingParamsType } from '../auth'
import { CoreAdminRoutes } from './routing/CoreAdminRoutes'
import type { LayoutProps } from './ui-antd/layout'
import type { LayoutComponent } from '.'

export interface ICoreAdminUIProps extends PropsWithChildren {
  layout?: LayoutComponent
  layoutProps?: LayoutProps
  authingParams?: Partial<AuthingParamsType>
}
const DefaultLayout = ({ children }: Partial<LayoutProps>) => <>{children}</>

export function CoreAdminUI({
  children,
  layoutProps,
  layout = DefaultLayout,
  ...rest
}: ICoreAdminUIProps) {
  return (
    <Routes>
      <Route
        path="/*"
        element={(
          <CoreAdminRoutes layout={layout} layoutProps={layoutProps} {...rest}>
            {children}
          </CoreAdminRoutes>
        )}
      />
    </Routes>
  )
}
