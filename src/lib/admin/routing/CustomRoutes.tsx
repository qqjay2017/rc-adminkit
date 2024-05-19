import type { ReactNode } from 'react'

/**
 * 自定义路由
 * src/lib/admin/util/useConfigureAdminRouterFromChildren.tsx  children在这个文件注入
 * @param props The component props
 * @param props.children The custom routes.
 * @param props.noLayout A boolean indicating whether to render the routes outside the Layout. Defaults to false.
 * @returns Nothing. This is a configuration component.
 */
export function CustomRoutes(_props: CustomRoutesProps) {
  return null
}

CustomRoutes.raName = 'CustomRoutes'

export interface CustomRoutesProps {
  children: ReactNode
  noLayout?: boolean
}
