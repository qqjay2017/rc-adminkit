import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import type { LayoutContextValue } from './layoutContext'
import { LayoutContext } from './layoutContext'

interface LayoutContextProviderProps
  extends PropsWithChildren,
  Partial<LayoutContextValue> {}

export function LayoutContextProvider({
  headIsVisible,
  sidebarIsVisible,
  children,
}: LayoutContextProviderProps) {
  const sidebarWidth = 210
  const headerHeight = 48
  const [openSidebar, setOpenSidebar] = useState(true)
  return (
    <LayoutContext.Provider
      value={{
        sidebarIsVisible,
        sidebarWidth,
        openSidebar,
        setOpenSidebar,
        headerHeight,
        headIsVisible,
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}
