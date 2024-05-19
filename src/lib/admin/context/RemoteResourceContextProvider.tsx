import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { get } from 'lodash-es'
import { nanoid } from 'nanoid'
import type {
  MenuApiResponse,
  ResourceList,
  UserPermsResponse,
  UserPermsResponseActionEntitySet,
} from './RemoteResourceContext'
import {
  RemoteResourceContext,
} from './RemoteResourceContext'
import { axiosInstance, useAuthProvider } from '@/lib'

export interface IRemoteResourceContextProviderProps extends PropsWithChildren {
  systemId?: string
}

function treeMap(
  data: ResourceList[],
  callback: (r: ResourceList) => ResourceList,
  {
    depth = 0,
    parentId = '0',
    parentKey = '0',
    parentIds = [],
    parentKeys = [],
  }: {
    parentId?: string
    parentIds?: string[]
    parentKeys?: string[]
    parentKey?: string
    depth?: number
  } = {
    parentId: '0',

    depth: 0,
    parentKey: '0',
    parentIds: [],
    parentKeys: [],
  },
) {
  return data.map((item) => {
    const id = item.id
    let key = item.key || item.component || item.pcPath || `/${nanoid()}`
    if (!key.startsWith('/'))
      key = `/${key}`

    key = key.replace(/\/$/, '')
    // ;
    const newItem = {
      ...item,
      id,
      depth,
      parentIds,
      parentKeys,
      parentId,
      parentKey,
      isShow: item.isShow || true,
      isExt: item.isExt || 'N',
      name: item.name || item.title || '',

      key,
      component: item.component || key,
      iconPath: item.iconPath || item.icon,
      label: item.meta?.title,
      title: item.meta?.title,
      meta: item.meta || {
        icon: item.iconPath || '',
        title: item.name,
      },
    }
    if (item.children && item.children.length > 0) {
      newItem.isLeaf = false
      newItem.children = treeMap(item.children, callback, {
        depth: depth + 1,
        parentIds: parentIds ? parentIds.concat(id) : [id],
        parentKeys: parentKeys ? parentKeys.concat(key) : [key],
        parentId: id,
        parentKey: key,
      })
    }
    else {
      newItem.children = undefined
      newItem.isLeaf = true
    }
    return callback(newItem)
  })
}

export function RemoteResourceContextProvider({
  systemId,
  children,
}: IRemoteResourceContextProviderProps) {
  const { authenticated } = useAuthProvider()
  const enabled = Boolean(systemId && systemId !== '1' && authenticated)
  const { data: resourceGetMenuData, isFetched: resourceGetMenuIsFetched }
    = useQuery({
      queryKey: ['resourceGetMenu', systemId],
      queryFn: () =>
        axiosInstance.get<MenuApiResponse>(
          `/api/uims/v1/resource/getMenu/${systemId}`,
        ),
      enabled,
    })

  const { data: userPermsData, isFetched: userPermsIsFetched } = useQuery({
    queryKey: ['userPerms', systemId],
    queryFn: () =>
      axiosInstance.get<UserPermsResponse>(
        `/api/uims/v1/resource-function/user/${systemId}/perms`,
      ),
    enabled,
  })
  const permissionList: UserPermsResponseActionEntitySet[] = get(
    userPermsData,
    'permissions[0].actionEntitySet',
    [],
  )

  const permissionKeyMapMemo = useMemo(() => {
    return (permissionList || []).reduce<Record<string, boolean>>(
      (total, current) => {
        total[current.action] = true
        return total
      },
      {},
    )
  }, [permissionList])

  const resourceList: ResourceList[] = get(
    resourceGetMenuData,
    'resourceList',
    [],
  )

  const resourceListInjectMemo = useMemo(() => {
    const _inject = treeMap(resourceList || [], (r) => {
      return r
    })
    return _inject
  }, [resourceList])

  const resourceListAllIdKeyMap = useMemo(() => {
    const memo: Record<string, ResourceList> = {}
    treeMap(resourceListInjectMemo || [], (r) => {
      if (r.id) {
        memo[r.id] = {
          ...r,
          // children: undefined,
        }
      }
      if (r.key) {
        memo[r.key] = {
          ...r,
          // children: undefined,
        }
      }
      return r
    })
    return memo
  }, [resourceListInjectMemo])

  const valuepMemo = useMemo(() => {
    return {
      ...(resourceGetMenuData || {}),
      ...(userPermsData || {}),
      resourceList: resourceListInjectMemo,
      permissionList: permissionList || [],
      permissionKeyMap: permissionKeyMapMemo || {},
      resourceListAllIdKeyMap,
    }
  }, [resourceGetMenuData, userPermsData, resourceListInjectMemo, permissionList, permissionKeyMapMemo, resourceListAllIdKeyMap])

  return (
    <RemoteResourceContext.Provider
      value={valuepMemo}
    >
      {enabled && (!resourceGetMenuIsFetched || !userPermsIsFetched)
        ? null
        : (
          <>
            {children}
          </>
          )}
    </RemoteResourceContext.Provider>
  )
}
