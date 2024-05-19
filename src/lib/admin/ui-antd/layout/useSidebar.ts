import { useState } from 'react'

export function useSidebar() {
  const sidebarWidth = 210
  const [openSidebar, setOpenSidebar] = useState(true)
  return {
    sidebarWidth,
    openSidebar,
    setOpenSidebar,
  }
}
