import { createContext } from 'react'

export interface ResourceList {
  id: string
  parentId: string
  name: string
  component: string
  key: string
  code: string
  functionCode: string
  isShow: boolean
  isLeaf?: boolean
  isExt: string
  openType: number
  pcPath?: string
  iconPath?: string
  title?: string
  icon?: string
  label?: string

  parentIds: string[]
  parentKeys: string[]
  parentKey: string
  depth: number
  meta?: {
    icon: string
    title: string
  }
  children?: ResourceList[]
}
export interface MenuApiResponse {
  systemId?: string
  systemName?: string
  iconPath?: string
  resourceList?: ResourceList[]
}

export interface UserPermsResponseActionEntitySet {
  action: string
  describe: string
}
export interface UserPermsResponsePermission {
  permissionId: string
  permissionName: string
  actionEntitySet: UserPermsResponseActionEntitySet[]
}

export interface UserPermsResponse {
  id?: string
  name?: string
  systemId?: string
  systemName?: string
  code?: string
  permissions?: UserPermsResponsePermission[]
}

export type ResourceListAllIdKeyMap = Record<string, ResourceList>

export interface RemoteResourceContextValue
  extends MenuApiResponse,
  UserPermsResponse {
  permissionKeyMap: Record<string, boolean>
  permissionList: UserPermsResponseActionEntitySet[]
  resourceListAllIdKeyMap: ResourceListAllIdKeyMap
}

export const RemoteResourceContext = createContext<RemoteResourceContextValue>({
  permissionKeyMap: {},
  permissionList: [],
  resourceListAllIdKeyMap: {},
})
