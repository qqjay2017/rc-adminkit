import { PageLayout, useAuthProvider } from './lib'

export function PostList() {
  // const navigate = useNavigate()
  const { authing } = useAuthProvider()

  return (
    <PageLayout>
      <div className="  ">
        <div
          onClick={() => {
            authing.loginWithRedirect()
          }}
        >
          去登录
        </div>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
        <h1>111111fdf</h1>
      </div>
    </PageLayout>
  )
}
