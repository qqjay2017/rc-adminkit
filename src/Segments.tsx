import { PageLayout, useAuthProvider } from './lib'

export function Segments() {
  const { authing } = useAuthProvider()
  return (
    <PageLayout>
      Segments
      <div onClick={() => {
        authing.handleRedirectCallback()
      }}
      >
        登录
      </div>
    </PageLayout>
  )
}
