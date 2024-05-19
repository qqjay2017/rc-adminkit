import type { ResourceOptions } from '../types'
import type { ResourceDefinitions } from './ResourceDefinitionContext'
import { useResourceDefinitionContext } from './useResourceDefinitionContext'

/**
 *返回路由 definitions
 *
 * @example
 *
 * const definitions = useResourceDefinitions();
 * console.log(definitions.posts);
 * // {
 * //   name: 'posts',
 * //   hasList: true,
 * //   hasEdit: true,
 * //   hasShow: true,
 * //   hasCreate: true,
 * //   options: {},
 * //   icon: PostIcon,
 * //   recordRepresentation: 'title',
 * // }
 */
export function useResourceDefinitions<
  OptionsType extends ResourceOptions = any,
>(): ResourceDefinitions<OptionsType> {
  return useResourceDefinitionContext().definitions
}
