import type { ComponentType, ReactElement, ReactNode } from 'react'
import type { LayoutProps } from './ui-antd/layout'
import type { ResourceList, RouteDataContextProviderProps } from '.'

export interface MoreResourceComponent extends ResourceOptions {
  path: string
  element?: ComponentType<any> | ReactElement
}
export interface ResourceOptions extends RouteDataContextProviderProps {
  element?: ComponentType<any> | ReactElement
}

export interface ResourceProps {
  intent?: 'route' | 'registration'
  name: string
  list?: ResourceOptions
  create?: ResourceOptions
  edit?: ResourceOptions
  detail?: ResourceOptions
  hasCreate?: boolean
  hasEdit?: boolean
  hasDetail?: boolean
  icon?: ComponentType<any>

  options?: ResourceOptions
  children?: ReactNode
  more?: MoreResourceComponent[]
}

export type ResourceElement = ReactElement<ResourceProps>

export type RenderResourcesFunction = (permissions: any) =>
  | ReactNode // (permissions) => <><Resource /><Resource /><Resource /></>
  | Promise<ReactNode> // (permissions) => fetch().then(() => <><Resource /><Resource /><Resource /></>)
  | ResourceElement[] // // (permissions) => [<Resource />, <Resource />, <Resource />]
  | Promise<ResourceElement[]> // (permissions) => fetch().then(() => [<Resource />, <Resource />, <Resource />])
export type AdminChildren =
  | RenderResourcesFunction
  | Iterable<ReactNode | RenderResourcesFunction>
  | ReactNode

export type RecordToStringFunction = (record: any) => string
export interface ResourceDefinition<OptionsType extends ResourceOptions = any> {
  readonly matchMenuItem?: ResourceList | null
  readonly name: string
  readonly options?: OptionsType
  readonly hasList?: boolean
  readonly hasEdit?: boolean
  readonly hasShow?: boolean
  readonly hasCreate?: boolean
  readonly icon?: any
  readonly recordRepresentation?:
    | ReactElement
    | RecordToStringFunction
    | string
}

export interface ResourceWithRegisterFunction {
  registerResource: (
    props: ResourceProps,
    permissions: any
  ) => ResourceDefinition
}

export interface RoutesAndResources {
  customRoutesWithLayout: ReactNode[]
  customRoutesWithoutLayout: ReactNode[]
  resources: (ReactElement & ResourceWithRegisterFunction)[]
}

export type AdminRouterStatus = 'loading' | 'empty' | 'ready'

export interface CoreLayoutProps extends Partial<LayoutProps> {}
export type LayoutComponent = ComponentType<CoreLayoutProps>
export type TitleComponent = string | ReactElement<any>
