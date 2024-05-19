import { useAuthProvider } from '.'

export function useAuthState() {
  const { isLoading, setIsLoading, authenticated, setAuthenticated }
    = useAuthProvider()

  return {
    isLoading,
    setIsLoading,
    authenticated,
    setAuthenticated,
  }
}
