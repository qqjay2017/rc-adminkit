import type { ICoreAdminUIProps } from '../CoreAdminUI'
import { CoreAdminUI } from '../CoreAdminUI'
import type { LayoutProps } from './layout'

// import { Layout as DefaultLayout } from "./layout";

const DefaultLayout = ({ children }: Partial<LayoutProps>) => <>{children}</>

export function AdminUI({
  layoutProps,
  layout = DefaultLayout,
  ...props
}: IAdminUIProps) {
  return <CoreAdminUI layout={layout} layoutProps={layoutProps} {...props} />
}

export interface IAdminUIProps extends ICoreAdminUIProps {}
