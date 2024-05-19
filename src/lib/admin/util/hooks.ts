//

import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { EnvJsonContext } from '../context/EnvJsonContext'
import { RemoteThemeContext } from '../context/RemoteThemeContext'
import { RemoteResourceContext } from '../context/RemoteResourceContext'

export function useSafeSetState<T>(
  initialState?: T | (() => T),
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] {
  const [state, setState] = useState(initialState)

  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])
  const safeSetState = useCallback(
    (args: React.SetStateAction<T | undefined>) => {
      if (mountedRef.current)
        return setState(args)
    },
    [mountedRef, setState],
  )

  return [state, safeSetState]
}

export function useEnvJsonContext() {
  return useContext(EnvJsonContext)
}

export function useRemoteThemeContext() {
  return useContext(RemoteThemeContext)
}

export const useRemoteResourceContext = () => useContext(RemoteResourceContext)
