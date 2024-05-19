import type { ComponentType, PropsWithChildren } from 'react'

import type { Location } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import type { ErrorProps } from '../common/error-boundary/Error'

import './layout.less'
import { ErrorBound } from '../common/error-boundary/ErrorBoundary'
import type { ISidebarProsp } from './Sidebar'
import { Sidebar as DefaultSidebar } from './Sidebar'

import type { IMenuProps } from './Menu'
import { Menu as DefaultMenu } from './Menu'
import { LayoutContextProvider } from './context/layoutContextProvider'
import { useLayoutContext } from './context/layoutContext'
import { Header } from './header/header'
import { ScrollArea, cn } from '@/lib'

export type ErrorComponent = ComponentType<ErrorProps>
export interface LayoutProps extends PropsWithChildren {
  /**
   * 自定义error显示组件
   */
  error?: ErrorComponent
  /**
   *自定义头部组件
   */

  header?: ComponentType<any>
  /**
   * 自定义menu组件
   */
  menu?: ComponentType<IMenuProps>
  /**
   * 自定义sidebar组件
   */
  sidebar?: ComponentType<ISidebarProsp>
  getHeadIsVisible?: (pageInfo: { location: Location<any> }) => boolean
  getSidebarIsVisible?: (pageInfo: { location: Location<any> }) => boolean
}

export function Layout({
  getSidebarIsVisible = () => true,
  getHeadIsVisible = () => true,
  ...rest
}: LayoutProps) {
  const location = useLocation()
  const pageInfo = {
    location,
  }
  const sidebarIsVisible = getSidebarIsVisible(pageInfo)
  const headIsVisible = getHeadIsVisible(pageInfo)

  return (
    <LayoutContextProvider
      sidebarIsVisible={sidebarIsVisible}
      headIsVisible={headIsVisible}
    >
      <LayoutMain {...rest} />
    </LayoutContextProvider>
  )
}

function LayoutMain({
  error: errorComponent,
  header: headerComponent,
  children,
  menu: Menu = DefaultMenu,
  sidebar: Sidebar = DefaultSidebar,
}: LayoutProps) {
  const {
    sidebarIsVisible,
    sidebarWidth,

    headIsVisible,
    headerHeight,
  } = useLayoutContext()

  return (
    <div className={cn('app-wrapper', ' w-full h-full relative')}>
      {sidebarIsVisible && (
        <Sidebar>
          <Menu />
        </Sidebar>
      )}
      <div
        className={cn('main-container', 'relative transition-all min-h-full')}
        style={{
          marginLeft: sidebarIsVisible ? sidebarWidth : 0,
        }}
      >
        {headIsVisible && <Header headerComponent={headerComponent} />}

        <ScrollArea
          className={cn('app-main', 'h-screen')}
          style={{
            minHeight: `calc( 100vh - ${headIsVisible ? `${headerHeight}px` : '0px'} )`,
            paddingTop: headIsVisible ? headerHeight : 0,
          }}
        >
          <ErrorBound errorComponent={errorComponent}>{children}</ErrorBound>
        </ScrollArea>
      </div>
    </div>
  )
}
