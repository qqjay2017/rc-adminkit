import { type PropsWithChildren, useMemo } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ICoreAdminContextProps } from './context/CoreAdminContext'
import { AdminContext } from './ui-antd/AdminContext'
import type { IAdminUIProps } from '.'
import { AdminUI } from '.'

export interface IAdminProps
  extends PropsWithChildren,
  ICoreAdminContextProps,
  IAdminUIProps {}

export function Admin({
  layout,
  children,
  layoutProps,
  authingParams,
  remoteThemeProps,
  queryClient,
  ...rest
}: IAdminProps) {
  const finalQueryClient = useMemo(
    () => queryClient || new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    }),
    [queryClient],
  )

  return (
    <QueryClientProvider client={finalQueryClient}>
      <AdminContext {...rest} authingParams={authingParams} remoteThemeProps={remoteThemeProps}>
        <AdminUI
          layout={layout}
          layoutProps={layoutProps}
          authingParams={authingParams}
        >
          {children}
        </AdminUI>
      </AdminContext>
    </QueryClientProvider>
  )
}
