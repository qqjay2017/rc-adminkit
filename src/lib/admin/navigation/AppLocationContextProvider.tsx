import { type PropsWithChildren, useMemo } from 'react'
import { AppLocationContext } from './AppLocationContext'

import { useMatchMenuItem } from './useMatchMenuItem'

export interface AppLocationContextProviderProps extends PropsWithChildren {}

export function AppLocationContextProvider({
  children,
}: AppLocationContextProviderProps) {
  const matchMenuItem = useMatchMenuItem()

  const propsMemo = useMemo(() => {
    return {
      matchMenuItem,
    }
  }, [matchMenuItem])

  return (
    <AppLocationContext.Provider
      value={propsMemo}
    >
      {children}
    </AppLocationContext.Provider>
  )
}
