import { type PropsWithChildren, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loading } from '../ui-antd'
import { EnvJsonContext } from './EnvJsonContext'
import { Authing } from '@/lib/auth'

export interface IEnvJsonContextProviderProps extends PropsWithChildren {
  domain?: string
  href?: string
  manual?: boolean
}

export function EnvJsonContextProvider({
  manual = false,
  domain = location.origin,
  href = '/component-shared-center/env.json',
  children,
}: IEnvJsonContextProviderProps) {
  const { data: envData = {}, isFetched } = useQuery({
    queryKey: [domain, href],
    queryFn: () => fetch(`${domain}${href}`).then(r => r.json()),
  })

  const canRender = useMemo(() => {
    if (Authing.isRedirectCallback()) {
      if (isFetched)
        return true

      else
        return false
    }
    else if (manual) {
      return true
    }
    else if (isFetched) {
      return true
    }
    else {
      return false
    }
  }, [isFetched, manual])

  return (
    <EnvJsonContext.Provider value={envData}>
      {canRender
        ? (
          <>
            {children}
          </>
          )
        : <Loading />}
    </EnvJsonContext.Provider>
  )
}
