import { useNavigate } from 'react-router-dom'
import { PageLayout } from './lib'

export function PostList() {
  const navigate = useNavigate()

  return (
    <PageLayout>
      <div className="  ">
        <div
          onClick={() => {
            navigate('create')
          }}
        >
          到新建
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
