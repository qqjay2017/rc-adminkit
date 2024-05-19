import type {
  IAuthContextProviderPorps,
} from './AuthContextProvider'
import {
  AuthContextProvider,
} from './AuthContextProvider'

export interface IAuthenticatedProps extends IAuthContextProviderPorps {}

// TODO 添加children 的渲染判断
export function Authenticated({
  children,
  authingParams,
}: IAuthenticatedProps) {
  return (
    <AuthContextProvider
      authingParams={{
        ...authingParams,
        manual: false,
      }}
    >
      {children}
    </AuthContextProvider>
  )
}
