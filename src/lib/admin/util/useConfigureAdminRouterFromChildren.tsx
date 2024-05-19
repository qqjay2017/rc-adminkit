import type {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
} from 'react'
import React, { Children, Fragment, useCallback, useEffect, useState } from 'react'
import type {
  AdminChildren,
  AdminRouterStatus,
  RenderResourcesFunction,
  ResourceProps,
  ResourceWithRegisterFunction,
  RoutesAndResources,
} from '../types'
import type { CustomRoutesProps } from '../routing/CustomRoutes'
import { useResourceDefinitionContext } from '../context'
import { useSafeSetState } from './hooks'

export function useConfigureAdminRouterFromChildren(children: AdminChildren) {
  //  动态路由等逻辑

  const [routesAndResources, status] = useRoutesAndResourcesFromChildren(
    children,
    null,
    false,
  )

  /**
   * 注册路由
   */
  useRegisterResources(routesAndResources.resources, null)
  return {
    customRoutesWithLayout: routesAndResources.customRoutesWithLayout,
    customRoutesWithoutLayout: routesAndResources.customRoutesWithoutLayout,

    resources: routesAndResources.resources,
    status,
  }
}

/**
 用于从React节点和权限确定路由和资源。动态路由等逻辑
返回一个包含路由和资源的单个对象以及状态的数组。
 * @param children React nodes to inspect
 * @param permissions 接口数组
 * @param isLoading 接口数组是否请求完成
 */
function useRoutesAndResourcesFromChildren(children: AdminChildren, permissions: any, isLoading: boolean): [RoutesAndResources, AdminRouterStatus] {
  /**
   * status    "loading" | "empty" | "ready";
  // 判断路由和资源处理情况
  //
  // 以便在下一步正确初始化状态
   */
  const [routesAndResources, setRoutesAndResources, mergeRoutesAndResources]
    = useRoutesAndResourcesState(getRoutesAndResourceFromNodes(children))

  const [status, setStatus] = useSafeSetState<AdminRouterStatus>(() =>
    getStatus({
      children,
      ...routesAndResources,
    }),
  )
  if (!status)
    throw new Error('Status should be defined')

  /**
   * Effect某些数据,合并更新
   */

  useEffect(() => {
    const resolveChildFunction = async (childFunc: RenderResourcesFunction) => {
      try {
        const childrenFuncResult = childFunc(permissions)
        if ((childrenFuncResult as Promise<ReactNode>)?.then) {
          (childrenFuncResult as Promise<ReactNode>).then(
            (resolvedChildren) => {
              mergeRoutesAndResources(
                getRoutesAndResourceFromNodes(resolvedChildren),
              )
              setStatus('ready')
            },
          )
        }
        else {
          mergeRoutesAndResources(
            getRoutesAndResourceFromNodes(childrenFuncResult as ReactNode),
          )
          setStatus('ready')
        }
      }
      catch (error) {
        console.error(error)
        //   退出登录
        // doLogout();
      }
    }

    const updateFromChildren = async () => {
      const functionChild = getSingleChildFunction(children)
      const newRoutesAndResources = getRoutesAndResourceFromNodes(children)
      setRoutesAndResources(newRoutesAndResources)
      setStatus(
        functionChild
          ? 'loading'
          : newRoutesAndResources.resources.length > 0
          || newRoutesAndResources.customRoutesWithLayout.length > 0
          || newRoutesAndResources.customRoutesWithoutLayout.length > 0
            ? 'ready'
            : 'empty',
      )

      if (functionChild)
        resolveChildFunction(functionChild)
    }
    if (!isLoading)
      updateFromChildren()
  }, [
    children,
    // doLogout,
    isLoading,
    mergeRoutesAndResources,
    permissions,
    setRoutesAndResources,
    setStatus,
  ])

  return [routesAndResources, status]
}

/**
 * 遍历出路由的类别
 * -customRoutesWithLayout：有布局的自定义路由
 * -customRoutesWithoutLayout：没有有布局的自定义路由
 * - resources：常规资源数组
 */
function getRoutesAndResourceFromNodes(children: AdminChildren): RoutesAndResources {
  const customRoutesWithLayout: ReactNode[] = []
  const customRoutesWithoutLayout: ReactNode[] = []
  const resources: (ReactElement & ResourceWithRegisterFunction)[] = []

  if (typeof children === 'function') {
    return {
      customRoutesWithLayout: [],
      customRoutesWithoutLayout: [],
      resources: [],
    }
  }
  // @ts-expect-error
  Children.forEach(children, (element) => {
    if (!React.isValidElement(element))
      return

    if (element.type === Fragment) {
      // Fragment进递归,一直找
      const customRoutesFromFragment = getRoutesAndResourceFromNodes(
        (element as any).props.children as AdminChildren,
      )
      customRoutesWithLayout.push(
        ...customRoutesFromFragment.customRoutesWithLayout,
      )
      customRoutesWithoutLayout.push(
        ...customRoutesFromFragment.customRoutesWithoutLayout,
      )
      resources.push(...customRoutesFromFragment.resources)
    }

    if ((element.type as any).raName === 'CustomRoutes') {
      const customRoutesElement = element as ReactElement<CustomRoutesProps>

      if (customRoutesElement.props.noLayout)
        customRoutesWithoutLayout.push(customRoutesElement.props.children)
      else
        customRoutesWithLayout.push(customRoutesElement.props.children)
    }
    else if ((element.type as any).raName === 'Resource') {
      resources.push(element as ReactElement & ResourceWithRegisterFunction)
    }
  })

  return {
    customRoutesWithLayout,
    customRoutesWithoutLayout,
    resources,
  }
}

/*
 * 一个类似于setState ,额外加一个mergeRoutesAndResources方法,用来合并数据

 */
function useRoutesAndResourcesState(initialState: RoutesAndResources): [
  RoutesAndResources,
  Dispatch<SetStateAction<RoutesAndResources>>,
  (newRoutesAndResources: RoutesAndResources) => void,
] {
  const [routesAndResources, setRoutesAndResources] = useState(initialState)

  const mergeRoutesAndResources = useCallback(
    (newRoutesAndResources: RoutesAndResources) => {
      setRoutesAndResources(previous => ({
        customRoutesWithLayout: previous.customRoutesWithLayout.concat(
          newRoutesAndResources.customRoutesWithLayout,
        ),
        customRoutesWithoutLayout: previous.customRoutesWithoutLayout.concat(
          newRoutesAndResources.customRoutesWithoutLayout,
        ),
        resources: previous.resources.concat(newRoutesAndResources.resources),
      }))
    },
    [],
  )

  return [routesAndResources, setRoutesAndResources, mergeRoutesAndResources]
}

function getStatus({
  children,
  resources,
  customRoutesWithLayout,
  customRoutesWithoutLayout,
}: {
  children: AdminChildren
  resources: ReactNode[]
  customRoutesWithLayout: ReactNode[]
  customRoutesWithoutLayout: ReactNode[]
}): AdminRouterStatus {
  return getSingleChildFunction(children)
    ? 'loading'
    : resources.length > 0
    || customRoutesWithLayout.length > 0
    || customRoutesWithoutLayout.length > 0
      ? 'ready'
      : 'empty'
}

/**
 * 检查CoreAdminRouter的子元素，看看它们是否是函数。
 * 如果有多个函数子元素，则抛出错误。
 *如果提供了函数子元素，则返回该函数子元素，否则返回null。
 */
function getSingleChildFunction(children: AdminChildren): RenderResourcesFunction | null {
  const childrenArray = Array.isArray(children) ? children : [children]

  const functionChildren = childrenArray.filter(
    child => typeof child === 'function',
  )

  if (functionChildren.length > 1)
    throw new Error('You can only provide one function child to AdminRouter')

  if (functionChildren.length === 0)
    return null

  return functionChildren[0] as RenderResourcesFunction
}

/**
 * 注册路由资源到全局
 * @param resources: An array of Resource elements
 * @param permissions: The permissions
 */
function useRegisterResources(resources: (ReactElement<ResourceProps> & ResourceWithRegisterFunction)[], permissions: any) {
  const { register, unregister } = useResourceDefinitionContext()
  /**
   * 发生变化后,都重新全量注册
   */
  useEffect(() => {
    resources.forEach((resource) => {
      if (
        typeof (resource.type as unknown as ResourceWithRegisterFunction)
          .registerResource === 'function'
      ) {
        const definition = (
          resource.type as unknown as ResourceWithRegisterFunction
        ).registerResource(resource.props, permissions)
        register(definition)
      }
      else {
        throw new TypeError(
          'When using a custom Resource element, it must have a static registerResource method accepting its props and returning a ResourceDefinition',
        )
      }
    })
    return () => {
      resources.forEach((resource) => {
        if (
          typeof (resource.type as unknown as ResourceWithRegisterFunction)
            .registerResource === 'function'
        ) {
          const definition = (
            resource.type as unknown as ResourceWithRegisterFunction
          ).registerResource(resource.props, permissions)
          unregister(definition)
        }
        else {
          throw new TypeError(
            'When using a custom Resource element, it must have a static registerResource method accepting its props and returning a ResourceDefinition',
          )
        }
      })
    }
  }, [permissions, register, resources, unregister])
}
