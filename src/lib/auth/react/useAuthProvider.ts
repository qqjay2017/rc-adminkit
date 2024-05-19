import { useContext } from 'react'

import { AuthContext } from './AuthContext'

export function useAuthProvider() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      'useAuthProvider must be used within a AuthContextProvider',
    )
  }
  return context
}
