import type { PropsWithChildren } from 'react'

import type { QueryClient } from '@tanstack/react-query'

import type { IAdminRouterProps } from '../routing/AdminRouter'
import { AdminRouter } from '../routing/AdminRouter'
import type {
  IAuthContextProviderPorps,
} from '../..'
import {
  AppLocationContextProvider,
  AuthContextProvider,
} from '../..'
import { ResourceDefinitionContextProvider } from './ResourceDefinitionContext'
import type {
  IEnvJsonContextProviderProps,
} from './EnvJsonContextProvider'
import {
  EnvJsonContextProvider,
} from './EnvJsonContextProvider'
import { RemoteThemeContextProvider } from './RemoteThemeContextProvider'
import { RemoteResourceContextProvider } from './RemoteResourceContextProvider'
import { StompContextProvider } from './StompContext'

export interface ICoreAdminContextOtherProps {
  /**
   * The react-query client
   *
   *
   * @example
   * import { Admin } from 'react-admin';
   * import { QueryClient } from '@tanstack/react-query';
   *
   * const queryClient = new QueryClient({
   *     defaultOptions: {
   *         queries: {
   *             retry: false,
   *             structuralSharing: false,
   *         },
   *         mutations: {
   *             retryDelay: 10000,
   *         },
   *     },
   * });
   *
   * const App = () => (
   *     <Admin queryClient={queryClient} dataProvider={...}>
   *         ...
   *     </Admin>
   * );
   */
  queryClient?: QueryClient
}
export interface ICoreAdminContextProps
  extends PropsWithChildren,
  IAuthContextProviderPorps,
  ICoreAdminContextOtherProps,
  IAdminRouterProps {
  domain?: string
  envJsonParams?: IEnvJsonContextProviderProps
  systemId?: string
  remoteThemeProps?: {
    enabled?: boolean
  }
  websocketParams?: {
    enabled?: boolean
    domain?: string
  }
}

export function CoreAdminContext({
  domain,
  basename,
  systemId,
  children,

  authingParams,
  envJsonParams,
  remoteThemeProps,
  websocketParams,
}: ICoreAdminContextProps) {
  return (

    <EnvJsonContextProvider
      {...envJsonParams}
      manual={authingParams.manual}
      domain={envJsonParams?.domain || domain}
    >
      <AuthContextProvider
        authingParams={{
          ...authingParams,
          domain: authingParams?.domain || domain,
        }}
      >
        <StompContextProvider domain={websocketParams?.domain || domain || authingParams?.domain} {...websocketParams}>
          <RemoteResourceContextProvider systemId={systemId}>
            <RemoteThemeContextProvider domain={domain} enabled={remoteThemeProps?.enabled}>
              <AdminRouter basename={basename}>
                <AppLocationContextProvider>
                  <ResourceDefinitionContextProvider>
                    {children}
                  </ResourceDefinitionContextProvider>
                </AppLocationContextProvider>
              </AdminRouter>
            </RemoteThemeContextProvider>
          </RemoteResourceContextProvider>
        </StompContextProvider>
      </AuthContextProvider>
    </EnvJsonContextProvider>

  )
}
