import { useContext } from 'react'

import { ResourceDefinitionContext } from './ResourceDefinitionContext'

export function useResourceDefinitionContext() {
  return useContext(ResourceDefinitionContext)
}
