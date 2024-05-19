import { useQuery } from '@tanstack/react-query'
import { type PropsWithChildren, useMemo } from 'react'
import { axiosInstance, useAuthProvider } from '../..'
import type { ThemeInfoApiResponse } from './RemoteThemeContext'
import { RemoteThemeContext } from './RemoteThemeContext'

export interface IRemoteThemeProvider extends PropsWithChildren {
  domain?: string
  enabled?: boolean
}

export function RemoteThemeContextProvider({
  domain = location.origin,
  children,
  enabled = true,
}: IRemoteThemeProvider) {
  const { authenticated } = useAuthProvider()
  const { data: remoteThemeData } = useQuery({
    queryKey: ['remote-theme', authenticated],

    queryFn: () =>
      axiosInstance<ThemeInfoApiResponse>(`/api/uims/v1/company/theme/info`, {
        method: 'post',
        placeholderData: {},
        dataPath: 'data.data',
        //  dataPath: ["data.data", []],
        data: {},
      }),
    enabled: enabled && authenticated,
  })

  const { data: globalConfigJson } = useQuery({
    queryKey: [domain],
    queryFn: () =>
      fetch(`${domain}/public/global/config.json`).then(r => r.json()),
    enabled,
  })

  const remoteThemeContextValue = useMemo(() => {
    return {
      ...remoteThemeData,
      ...globalConfigJson,
      color: remoteThemeData?.color || '#1677FF',
    }
  }, [
    remoteThemeData,
    globalConfigJson,

  ])

  return (
    <RemoteThemeContext.Provider
      value={remoteThemeContextValue}
    >
      {children}
    </RemoteThemeContext.Provider>
  )
}
