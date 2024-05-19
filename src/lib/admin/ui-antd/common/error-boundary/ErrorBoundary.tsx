import type { ErrorInfo, PropsWithChildren } from 'react'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import type { ErrorComponent } from '../../layout'
import { Error } from './Error'

export function ErrorBound({
  errorComponent,
  children,
}: PropsWithChildren<{
  errorComponent?: ErrorComponent
}>) {
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null)
  const handleError = (error: Error, info: ErrorInfo) => {
    console.log(error, info)
    setErrorInfo(info)
  }
  return (
    <ErrorBoundary
      onError={handleError}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Error
          error={error}
          errorComponent={errorComponent}
          errorInfo={errorInfo}
          resetErrorBoundary={resetErrorBoundary}
        />
      )}
    >
      <Suspense fallback={<>loading</>}>{children}</Suspense>
    </ErrorBoundary>
  )
}
