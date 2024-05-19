import type { ComponentType } from 'react'
import { useLayoutContext } from '../context/layoutContext'
import { cn } from '@/lib'

export function Header({
  headerComponent: HeaderComponent,
}: {
  headerComponent?: ComponentType
}) {
  const { headerHeight } = useLayoutContext()

  if (HeaderComponent)
    return <HeaderComponent />

  return (
    <div
      className={cn('fixed-header', 'fixed top-0 left-0 right-0 h-full')}
      style={{
        height: headerHeight,
        border: '1px solid #ccc',
        zIndex: 1001,
      }}
    >
      哦徒步
    </div>
  )
}
