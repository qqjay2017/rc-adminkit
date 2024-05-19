import { createContext, useContext } from 'react'
import type { ResourceList } from '../context'

export interface AppLocationContextValue {
  matchMenuItem: ResourceList | null
}

export const AppLocationContext = createContext<AppLocationContextValue>({
  matchMenuItem: null,
})

export const useAppLocationContext = () => useContext(AppLocationContext)
