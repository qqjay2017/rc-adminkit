import type { PropsWithChildren } from 'react'
import { createContext, useMemo, useRef } from 'react'
import CryptoJS from 'crypto-js'
import SockJS from 'sockjs-client';
import {
  StompSessionProvider,
  useSubscription,

} from 'react-stomp-hooks'
import { v1 as uuidv1 } from 'uuid'
import { delToken, useAuthProvider } from '@/lib/auth'
import { axiosInstance } from '@/lib/axios';
import { closeWindow } from '../util/closeWindow';
import { Modal } from 'antd';

export interface IStompContextValue {

}
const serverPort = '8000'
export const StompContext = createContext<IStompContextValue | null>(null)

export interface IStompContextProviderProps extends PropsWithChildren {
  enabled?: boolean
  domain?: string;
}

export function StompContextProvider({ children, enabled = true,domain =''}: IStompContextProviderProps) {
  const sesseionId = useRef(uuidv1())
  const { authenticated, userInfoFromSession } = useAuthProvider()
  const urlMemo = useMemo(() => {
    if (!enabled || !userInfoFromSession.id)
      return ''

    return urlEncryption(userInfoFromSession.id, null,sesseionId.current)
  }, [userInfoFromSession.id, enabled,sesseionId.current])

  if (!enabled || !authenticated || !urlMemo)
    return <>{ children}</>
   const pt = sessionStorage.getItem('pt') || 1
  return (
    <StompSessionProvider
      url={`${domain}${urlMemo}`}
      heartbeatOutgoing={20000}
      heartbeatIncoming={20000}
      reconnectDelay={3000}
      connectHeaders={{
          'user-name': `${userInfoFromSession.id}_${pt}`,
      }}
      webSocketFactory={() => { 
        return  new SockJS(`${domain}${urlMemo}`, null, {
    server: serverPort,
    sessionId:()=> sesseionId.current,
  })
      }}
    >
       <SubscribingComponent />
      { children}
    </StompSessionProvider>
  )
}

export function urlEncryption(userId: string, otherParams?: Record<string, any>,sesseionId='') {

  const appId = '55cHKgNTOJWhODaJ1m9678' // 应用id
  const appSecret = 'gNTOJWhODaJ1m9678PD0LWHK2KTic' // 应用密钥
  const d = new Date()
  const time = d.getTime()
  const nonce = uuidv1()
  
  const pt = sessionStorage.getItem('pt') || 1
  // socket的连接地址
  const socketUrl = `/openapi/messageopen/wsendpoint`
  // let socketParams = `?userId=${userId}&type=pc`;
  const socketParams = [
    `userId=${userId}`,
    'type=pc',
    `_r=${nonce}`,
    `_t=${time}`,
  ]
  let havePtFlag = false
  if (otherParams) {
    const keys = Object.keys(otherParams)
    if (keys?.length > 0) {
      keys.forEach((itemKey) => {
        if (itemKey === 'pt')
          havePtFlag = true

        socketParams.push(`${itemKey}=${otherParams[itemKey]}`)
      })
    }
  }
  if (!havePtFlag) {
    // 默认拼上pt
    socketParams.push(`pt=${pt}`)
  }
  // 参数排序
  socketParams.sort()
  // 构造指定的sockjs-client组件自带的地址
  const stompUrl = `/${serverPort}/${sesseionId}/websocket`
  // 签名串拼接
  const stringToSign = `GET\n{}\n\n${time}\nx-wisdaas-request-id:${nonce}\n${socketUrl}${stompUrl}?${socketParams.join(
    '&',
  )}`
  const hash = CryptoJS.HmacSHA256(stringToSign, appSecret)

  const b64 = CryptoJS.enc.Base64.stringify(hash)

  const sign = `WISDAAS-V2 ${appId}:${b64}`

  // 参数date、nonce必传,query参数后_t、_r
  // 将sign加到query参数:_s,必段加到最后一个参数,必须先编码
  const s = encodeURIComponent(sign)
  socketParams.push(`_s=${s}`)
  return `${socketUrl}?${socketParams.join('&')}`
}

function SubscribingComponent() { 
  const pt = sessionStorage.getItem('pt') || 1;
  const { authing,userInfoFromSession } = useAuthProvider()
  const fp = localStorage.getItem(
          'fp',
  )
  
  const warningAndLogout = (message='') => { 
 Modal.warning({
          title: '提示',
          content: message,
          okText: '确定',
         onOk: () => {
          
            authing.logoutWithRedirect()

          },
        });
  }
  // 踢出
  useSubscription([
     `/wstopic/push/${pt}/${userInfoFromSession.id}/${fp}/kickout`,
     
  ], async (message) => { 
       console.log(message,message.body,'message1')
    delToken()
    await axiosInstance.get(`${this.params.domain}/auth/logout?ct=1&userId${userInfoFromSession.id}&fp=${fp}&type=app&msg=1`)

    if (window.opener && window.opener != null) {
      closeWindow();
    } else { 
      warningAndLogout(message.body)
    }
  });

   useSubscription([
    
     `/wstopic/push/${userInfoFromSession.id}/logout`
  ], async(message) => { 
     console.log(message, message.body, 'message2')
     try {
       const dataJSON = JSON.parse(message.body || '{}');
       console.log(dataJSON,'dataJSON')
       if (dataJSON.type == 2) {
          if (window.opener && window.opener != null) {
          closeWindow();
          } else {
            warningAndLogout( dataJSON?.message)
         
        }
       } else {
         
         if (dataJSON?.fp == fp && dataJSON?.pt == pt) { 
           
           closeWindow();
            authing.logoutWithRedirect()
         }
        }
     } catch (error) {
      console.log(error,'error')
     }
     
  });



  return null
}

export { 
  useSubscription
}