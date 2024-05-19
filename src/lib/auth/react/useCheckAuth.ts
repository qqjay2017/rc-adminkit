import { sessionKeyMap } from '../core'
import { useAuthProvider } from './useAuthProvider'

export function useCheckAuth() {
  const { authing } = useAuthProvider()
  const checkAuth = async () => {
    if (
      sessionStorage.getItem(sessionKeyMap.access_token)
      && sessionStorage.getItem(sessionKeyMap.user_info)
    )
      return true

    sessionStorage.setItem(
      'redirectUri',
      encodeURIComponent(window.location.href),
    )
    authing.loginWithRedirect()
    return false
  }
  return checkAuth
}
