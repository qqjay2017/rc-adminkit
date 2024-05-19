import { createContext } from 'react'

interface SystemNameMap {
  SCM: string
  PSI: string
  KXGC: string
}

interface SystemMap {
  KXGC: KXGC
  LABOR: KXGC
  OSS: KXGC
  GOV: KXGC
  SCM: KXGC
  PSI: KXGC
  GROUP: KXGC
  COMPANY: KXGC
  BANK: KXGC
}

interface KXGC {
  devUrl: string
  testUrl: string
  name: string
}

interface Theme {
  primaryColor: string
  tableHoverColor: string
  opacity: number[]
}
export interface GlobalConfigJsonResponse {
  theme: Theme
  systemMap: SystemMap
  defaultSystem: string
  systemNameMap: SystemNameMap
  isShowAi: boolean
  isShowService: boolean
}

export interface ThemeInfoApiResponse {
  color: string
  menuNavigate?: number
  systemNavigate?: number
}
export interface RemoteThemeContextValue
  extends ThemeInfoApiResponse,
  Partial<GlobalConfigJsonResponse> {}

export const RemoteThemeContext = createContext<RemoteThemeContextValue>({
  color: '#1677FF',
})
