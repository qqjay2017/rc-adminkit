import type { PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import type { CustomRoutesProps } from '..'

export const RouteDataContext = createContext<RouteDataContextProviderProps>({
  type: '',
  label: '',
  showBreadcrumb: true,
})

export interface RouteDataContextProviderProps
  extends PropsWithChildren,
  Omit<CustomRoutesProps, 'children'> {
  label?: string
  type?: string
  showBreadcrumb?: boolean
}

export function useRouteDataContext() {
  return useContext<RouteDataContextProviderProps>(RouteDataContext)
}

export function RouteDataContextProvider({
  label,
  type,
  children,
  showBreadcrumb,
}: RouteDataContextProviderProps) {
  return (
    <RouteDataContext.Provider
      value={{
        type,
        label,
        showBreadcrumb,
      }}
    >
      {children}
    </RouteDataContext.Provider>
  )
}
