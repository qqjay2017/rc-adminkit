import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useRemoteResourceContext } from '..'
import type { ResourceList, ResourceListAllIdKeyMap } from '../context'

/**
 * /purchase/materialStock/create -> /purchase/materialStock -> /purchase
 *  递归变量菜单,匹配当前路由
 * @param resourceListAllIdKeyMap
 * @param pathname
 * @returns
 */
function eachMatch(resourceListAllIdKeyMap: ResourceListAllIdKeyMap, pathname = ''): ResourceList | null {
  if (resourceListAllIdKeyMap[pathname]) {
    return resourceListAllIdKeyMap[pathname]
  }
  else if (!pathname || pathname === '/') {
    return null
  }
  else {
    const pathArr = pathname.split('/').filter(Boolean)
    return eachMatch(
      resourceListAllIdKeyMap,
      `/${pathArr.splice(0, pathArr.length - 1).join('/')}`,
    )
  }
}

/**
 * 根据当前url,匹配到当前路由,对应的接口菜单数据
 * @returns
 */
export function useMatchMenuItem() {
  const { resourceListAllIdKeyMap, resourceList = [] }
    = useRemoteResourceContext()
  const location = useLocation()
  const matchMenuItem = useMemo(() => {
    const pathname = location.pathname.replace(/\/$/, '')
    if (!pathname || pathname === '/')
      return resourceList[0]

    return eachMatch(resourceListAllIdKeyMap, pathname)
  }, [location, resourceList, resourceListAllIdKeyMap])
  return matchMenuItem
}
