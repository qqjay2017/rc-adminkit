import { createContext, useCallback, useMemo, useState } from 'react'

import { isEqual } from 'lodash-es'
import type { AdminChildren, ResourceDefinition, ResourceOptions } from '../types'

export interface ResourceDefinitions<OptionsType extends ResourceOptions = any> {
  [name: string]: ResourceDefinition<OptionsType>
}

export interface ResourceDefinitionContextValue {
  definitions: ResourceDefinitions
  register: (config: ResourceDefinition) => void
  unregister: (config: ResourceDefinition) => void
}

export const ResourceDefinitionContext
  = createContext<ResourceDefinitionContextValue>({
    definitions: {},
    register: () => {},
    unregister: () => {},
  })

/**
 * 全局的resource Context
 * useResourceDefinition()
 *
 * @example
 *
 * import { useResourceDefinition, useTranslate } from 'ra-core';
 *
 * const PostMenuItem = () => {
 *     const { name, icon } = useResourceDefinition({ resource: 'posts' });
 *
 *     return (
 *          <MenuItem>
 *              <ListItemIcon>{icon}</ListItemIcon>
 *              {name}
 *          </MenuItem>
 *     );
 * };
 */
export function ResourceDefinitionContextProvider({
  definitions: defaultDefinitions = {},
  children,
}: {
  definitions?: ResourceDefinitions
  children: AdminChildren
}) {
  const [definitions, setState]
    = useState<ResourceDefinitions>(defaultDefinitions)

  // 往definitions 里面加一个
  const register = useCallback((config: ResourceDefinition) => {
    setState(prev =>
      isEqual(prev[config.name], config)
        ? prev
        : {
            ...prev,
            [config.name]: config,
          },
    )
  }, [])
  // 移除一个
  const unregister = useCallback((config: ResourceDefinition) => {
    setState((prev) => {
      const { [config.name]: _, ...rest } = prev
      return rest
    })
  }, [])

  const contextValue = useMemo(
    () => ({ definitions, register, unregister }),
    [definitions], // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <ResourceDefinitionContext.Provider value={contextValue}>
      {/* 在这里需要进行类型转换，因为Provider只接受ReactNode类型，但我们可能会有一个渲染函数。 */}
      {children as React.ReactNode}
    </ResourceDefinitionContext.Provider>
  )
}
