import { useMemo } from 'react'
import { defaults } from 'lodash-es'

import type { ResourceDefinition, ResourceOptions } from '../types'
import { useAppLocationContext } from '..'
import { useResourceDefinitions } from './useResourceDefinitions'
import { useResourceContext } from './useResourceContext'

/**
 * 获取到当前资源的配置
 *
 * @example // Get the current resource definition (based on ResourceContext)
 *
 * const definition = useResourceDefinition();
 * console.log(definition);
 * // {
 * //   name: 'posts',
 * //   hasList: true,
 * //   hasEdit: true,
 * //   hasShow: true,
 * //   hasCreate: true,
 * //   options: {},
 * //   icon: PostIcon,
 * // }
 *
 * @example // Pass a resource prop to check a different resource definition
 *
 * const definition = useResourceDefinition({ resource: 'posts' });
 */
export function useResourceDefinition<
  OptionsType extends ResourceOptions = any,
>(props?: UseResourceDefinitionOptions): ResourceDefinition<OptionsType> {
  const resource = useResourceContext(props)
  const { matchMenuItem } = useAppLocationContext()
  const resourceDefinitions = useResourceDefinitions()
  const { hasCreate, hasEdit, hasList, hasShow, recordRepresentation }
    = props || {}

  const definition = useMemo(() => {
    return defaults(
      {},
      {
        hasCreate,
        hasEdit,
        hasList,
        hasShow,
        recordRepresentation,
      },
      resourceDefinitions && resource ? resourceDefinitions[resource] : {},
    )
  }, [
    resource,
    resourceDefinitions,
    hasCreate,
    hasEdit,
    hasList,
    hasShow,
    recordRepresentation,
  ])
  /**
   * 当前 resource 的name
   */

  return {
    ...definition,
    matchMenuItem,
    name: resource || '',
  }
}

export interface UseResourceDefinitionOptions {
  readonly resource?: string
  readonly hasList?: boolean
  readonly hasEdit?: boolean
  readonly hasShow?: boolean
  readonly hasCreate?: boolean
  readonly recordRepresentation?:
    | string
    | React.ReactElement
    | ((record: any) => string)
}
