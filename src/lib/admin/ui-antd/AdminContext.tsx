import { ConfigProvider } from 'antd'
import locale from 'antd/es/locale/zh_CN'
import type {
  ICoreAdminContextProps,
} from '../context/CoreAdminContext'
import {
  CoreAdminContext,
} from '../context/CoreAdminContext'

export interface IAdminContextProps extends ICoreAdminContextProps {}
export function AdminContext(props: IAdminContextProps) {
  const { children, ...rest } = props
  return (
    <CoreAdminContext {...rest}>
      <ConfigProvider locale={locale}>{children}</ConfigProvider>
    </CoreAdminContext>
  )
}
