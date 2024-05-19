import type React from 'react'
import { createContext, useContext } from 'react'

export interface LayoutContextValue {
  headIsVisible?: boolean
  sidebarIsVisible?: boolean
  headerHeight: number
  sidebarWidth: number
  openSidebar: boolean
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

export const LayoutContext = createContext<LayoutContextValue>({
  sidebarWidth: 0,
  sidebarIsVisible: true,
  headIsVisible: true,
  openSidebar: true,
  setOpenSidebar: () => {},
  headerHeight: 48,
})

export function useLayoutContext() {
  return useContext(LayoutContext)
}
