import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { useResourceDefinition, useRouteDataContext } from '@/lib'
import { Breadcrumb } from '@/lib/admin/navigation/Breadcrumb'

interface IPageLayoutprops extends PropsWithChildren {
  label?: string
  showBreadcrumb?: boolean
}

export function PageLayout({
  label,
  children,
  showBreadcrumb = true,
}: IPageLayoutprops) {
  const routeData = useRouteDataContext()
  const definition = useResourceDefinition()
  console.log(definition, routeData, 'definition')

  const metaTitleInjectType = useMemo(() => {
    if (!definition)
      return ''

    const title = definition?.matchMenuItem?.meta?.title
    if (!routeData || !routeData.type)
      return title

    const typeZhMap: any = {
      create: '新建',
      edit: '编辑',
      detail: '详情',
    }
    if (routeData.type === 'detail')
      return `${title}详情`

    return `${typeZhMap[routeData.type] || ''}${title}`
  }, [definition, routeData])

  return (
    <div>
      <div>
        {showBreadcrumb === false
        || routeData?.showBreadcrumb === false
          ? null
          : (
            <Breadcrumb />
            )}

        <h3>{label || routeData?.label || metaTitleInjectType}</h3>
      </div>
      <div>{children}</div>
    </div>
  )
}
