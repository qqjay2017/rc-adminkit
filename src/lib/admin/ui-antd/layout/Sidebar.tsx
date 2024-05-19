import type { PropsWithChildren } from 'react'
import { cn } from '../..'

import { ScrollArea, ScrollBar } from '../common/scroll-area/scroll-area'
import { useLayoutContext } from './context/layoutContext'

export interface ISidebarProsp extends PropsWithChildren {}

export function Sidebar({ children }: ISidebarProsp) {
  const {
    sidebarIsVisible,
    sidebarWidth,
    openSidebar,
    headIsVisible,
    headerHeight,
  } = useLayoutContext()
  if (!sidebarIsVisible)
    return null

  return (
    <div
      style={{
        width: sidebarWidth,
        top: headIsVisible ? headerHeight : 0,
      }}
      className={cn(
        'sidebar-container',
        openSidebar ? 'openSidebar' : 'closeSidebar',
        ' fixed   z-[100] left-0 bottom-0  transition-all',
        'h-screen',
        'overflow-hidden',
      )}
    >
      <div className={cn('h-screen relative')}>
        <ScrollArea className={cn('h-screen')}>
          {children}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </div>
  )
}
