import { useAppLocationContext } from '.'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { useRemoteResourceContext } from '..'
import 'antd/es/breadcrumb/style/index.css'
import { useNavigate } from 'react-router-dom'
import type { ResourceList } from '../context'

function findFirstChild(children?: ResourceList[]) {
  if (children && children.length) {
    if (children[0].isLeaf)
      return children[0]
    else if (children[0].children && children[0].children)
      findFirstChild(children[0].children)
    else
      return null
  }
  else {
    return null
  }
}
export function Breadcrumb() {
  const { resourceListAllIdKeyMap } = useRemoteResourceContext()
  const { matchMenuItem } = useAppLocationContext()
  const breadcrumbIds: string[] = [
    ...(matchMenuItem?.parentIds || []),
    matchMenuItem?.id,
  ].filter(Boolean) as string[]

  const breadcrumbMatchs: ResourceList[] = breadcrumbIds
    .map(id => resourceListAllIdKeyMap[id])
    .filter(Boolean)

  const navigate = useNavigate()

  if (!breadcrumbMatchs.length)
    return null

  return (
    <div>
      <AntdBreadcrumb>
        {breadcrumbMatchs.map((match, index) => {
          return (
            <AntdBreadcrumb.Item
              key={match.id + index}
              onClick={() => {
                if (!match.isLeaf) {
                  const firstChild = findFirstChild(match.children)
                  if (firstChild && firstChild.key)
                    navigate(firstChild.key)
                }
              }}
            >
              {match?.meta?.title}
            </AntdBreadcrumb.Item>
          )
        })}
      </AntdBreadcrumb>
    </div>
  )
}
