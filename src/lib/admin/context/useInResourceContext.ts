import { useContext } from 'react'
import { ResourceContext } from '.'

export function useInResourceContext() {
  return useContext(ResourceContext) != null
}
