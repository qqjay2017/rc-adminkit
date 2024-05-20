import type { PropsWithChildren } from 'react'

import { useEffect, useMemo, useState } from 'react'
import type { IAuthingParams } from '../core/Authing/interface'
import { Authing } from '..'
import { AuthContext } from '.'
import { useEnvJsonContext } from '@/lib/admin/util/hooks'
import { Loading } from '@/lib/admin/ui-antd/common/Loading'

export type AuthingParamsType = Partial<IAuthingParams>
export interface IAuthContextProviderPorps extends PropsWithChildren {
  /**
   * 登录组件的属性
   *
   */
  authingParams?: AuthingParamsType
}

export function AuthContextProvider({
  children,
  authingParams,
}: IAuthContextProviderPorps) {
  const manual = authingParams?.manual || false
  const envJson = useEnvJsonContext()

  const authing = useMemo(() => {
    if(!envJson?.PUBK){
      return null
    }
    return new Authing({
      domain: location.origin,
      //   redirectUri: window.location.origin,
      redirectUri: location.origin,
      PUBK: envJson?.PUBK,
      ...authingParams,
    })
  }, [authingParams, envJson?.PUBK])

  const [isLoading, setIsLoading] = useState(!Authing.getLoginState())
  const [authenticated, setAuthenticated] = useState(Authing.getLoginState())
  const [userInfoFromSession, setUserInfoFromSession] = useState(JSON.parse(sessionStorage.getItem('USER_INFO')||'{}'))

  useEffect(() => {
  
    if(!authing){
      return 
    }
    
    if (Authing.isRedirectCallback() || (!manual && !Authing.getLoginState())) {
     
      authing.handleRedirectCallback().then((userInfo) => {
        console.log(userInfo, 'userInfo')
        debugger
        setIsLoading(!Authing.getLoginState())
        setAuthenticated(Authing.getLoginState())
        userInfo &&userInfo.id && setUserInfoFromSession(userInfo)
      })
    }
  }, [manual, authing,Authing,setUserInfoFromSession])

  return (
    <AuthContext.Provider
      value={{
        authing,
        isLoading,
        setIsLoading,
        authenticated,
        setAuthenticated,
        userInfoFromSession
        ,setUserInfoFromSession
      }}
    >
      {Authing.isRedirectCallback() || !manual && isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}
