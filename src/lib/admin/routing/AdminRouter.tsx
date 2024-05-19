import type { ReactNode } from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  useInRouterContext,
} from 'react-router-dom'
import type {
  IBasenameContextProvider,
} from '../context/BasenameContextProvider'
import {
  BasenameContextProvider,
} from '../context/BasenameContextProvider'

export interface IAdminRouterProps extends IBasenameContextProvider {}

export function AdminRouter({ basename = '', children }: IAdminRouterProps) {
  const isInRouter = useInRouterContext()
  const Router = isInRouter ? DummyRouter : InternalRouter

  return (
    <BasenameContextProvider basename={isInRouter ? basename : ''}>
      <Router basename={basename}>{children}</Router>
    </BasenameContextProvider>
  )
}

function DummyRouter({
  children,
}: {
  children: ReactNode
  basename?: string
}) {
  return <>{children}</>
}

function InternalRouter({
  children,
  basename,
}: {
  children: ReactNode
  basename?: string
}) {
  const router = createBrowserRouter(
    [{ path: '*', element: <>{children}</> }],
    {
      basename,
    },
  )
  return <RouterProvider router={router} />
}
