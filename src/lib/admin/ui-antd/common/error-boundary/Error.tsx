import type { ComponentType, ErrorInfo, HtmlHTMLAttributes } from 'react'
import { Fragment } from 'react'
import type { FallbackProps } from 'react-error-boundary'
import type { TitleComponent } from '@/lib'

interface InternalErrorProps
  extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'title'>,
  FallbackProps {
  className?: string
  errorInfo?: ErrorInfo | null
}
export interface ErrorProps extends Pick<FallbackProps, 'error'> {
  errorInfo?: ErrorInfo | null
  title?: TitleComponent
}

export function Error(props: InternalErrorProps & {
  errorComponent?: ComponentType<ErrorProps>
}) {
  const {
    error,
    errorComponent: ErrorComponent,
    errorInfo,
    resetErrorBoundary,
    className,
    ...rest
  } = props

  if (ErrorComponent)
    return <ErrorComponent error={error} errorInfo={errorInfo} title="" />

  return (
    <Fragment>
      <div className={className} {...rest}>
        {JSON.stringify(error)}
      </div>
    </Fragment>
  )
}
