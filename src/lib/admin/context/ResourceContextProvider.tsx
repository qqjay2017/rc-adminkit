import type { ReactNode } from 'react'
import type { ResourceContextValue } from './ResourceContext'
import { ResourceContext } from './ResourceContext'

/**
 * 创建一个包含资源名称的资源上下文
 *
 *一些React Admin组件依赖于上下文中的资源名称。
这个组件提供了资源名称。
如果值为空，则不提供上下文。
 *
 * @param {string} value the resource name
 * @example
 *
 * import { ResourceContextProvider } from 'react-admin';
 *
 * const MyComponent = () => (
 *    <ResourceContextProvider value="posts">
 *       <MyResourceSpecificComponent />
 *   </ResourceContextProvider>
 * );
 */
export function ResourceContextProvider({
  children,
  value,
}: {
  children: ReactNode
  value?: ResourceContextValue
}) {
  return value
    ? (
      <ResourceContext.Provider value={value}>
        {children}
      </ResourceContext.Provider>
      )
    : (
        children
      )
}
