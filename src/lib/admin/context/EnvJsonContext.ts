import { createContext } from 'react'

export type EnvJsonContextValue = Record<string, any>

export const EnvJsonContext = createContext<EnvJsonContextValue>({})
