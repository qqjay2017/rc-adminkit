import {
  treeMapBase,
  useAppLocationContext,
  useRemoteResourceContext,
} from '@/lib'
import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import { Menu as AntdMenu } from 'antd'
import './menu.less'
import { useNavigate } from 'react-router-dom'
import 'antd/es/menu/style/index.less'

export interface IMenuProps extends PropsWithChildren {
  className?: string
  [key: string]: any
}
// : IMenuProps
export function Menu() {
  const { matchMenuItem } = useAppLocationContext()
  const navigate = useNavigate()
  const { resourceList, resourceListAllIdKeyMap } = useRemoteResourceContext()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKey, setSelectedKey] = useState<string>('')

  useEffect(() => {
    if (matchMenuItem && matchMenuItem.parentIds)
      setOpenKeys(keys => [...keys, ...matchMenuItem.parentIds])

    if (matchMenuItem && matchMenuItem.id)
      setSelectedKey(matchMenuItem.id)
  }, [matchMenuItem, setOpenKeys])
  // const { } = useSidebar()
  return (
    <AntdMenu
      className="shared-sider-menu"
      openKeys={openKeys}
      onOpenChange={(keys: string[]) => {
        setOpenKeys(keys)
      }}
      selectedKeys={selectedKey ? [selectedKey] : []}
      onSelect={(e) => {
        setSelectedKey(e.key || '')
        const menuItem = resourceListAllIdKeyMap[e.key]
        if (menuItem && menuItem.key)
          navigate(menuItem.key)
      }}
      style={{ borderRight: 0 }}
      inlineIndent={14}
      theme="light"
      mode="inline"
      items={treeMapBase(resourceList || [], (resouce) => {
        return {
          // ...resouce,
          key: resouce.id,
          children: resouce.children,
          label: resouce.meta?.title,
          title: resouce.meta?.title,
        }
      })}
    />
  )
}
