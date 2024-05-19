import { useContext } from 'react'
import type { ResourceContextValue } from '.'
import { ResourceContext } from '.'

/**
 *  获取到当前 Resouce组件的name
 *
 * Must be used within a <ResourceContextProvider>
 *
 * @example
 *
 * const ResourceName = (props) => {
 *   const resource = useResourceContext(props);
 *   const getResourceLabel = useGetResourceLabel();
 *   return <>{getResourceLabel(resource, 1)}</>;
 * }
 *
 * // use it in a resource context
 * const MyComponent = () => (
 *   <ResourceContextProvider value="posts">
 *     <ResourceName />
 *     ...
 *   </ResourceContextProvider>
 * );
 *
 * // override resource via props
 * const MyComponent = () => (
 *   <>
 *     <ResourceName resource="posts"/>
 *     ...
 *   </>
 * );
 *
 * @returns {ResourceContextValue} The resource name, e.g. 'posts'
 */

export function useResourceContext<
  ResourceInformationsType extends Partial<{ resource: string }>,
>(props?: ResourceInformationsType): ResourceContextValue {
  const context = useContext(ResourceContext)
  return (props && props.resource) || context
}
