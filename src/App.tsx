import { Navigate, Route } from 'react-router-dom'

import { Admin, CustomRoutes, PageLayout, Resource } from './lib'

import { Segments } from './Segments'
import { PostList } from './PostList'

function CreatePage() {
  return <div>123</div>
}

function ListPage() {
  return <div>123</div>
}

function DetailPage() {
  return <div>123</div>
}

/**
 *

       domain="https://test-ymsl.kxgcc.com:30195"
         envJsonParams={{}}
 * @returns
 */

function App() {
  return (
    <Admin
      domain="https://test-ymsl.kxgcc.com:30195"
      basename="/"
      layoutProps={{
        getSidebarIsVisible(pageInfo) {
          console.log(pageInfo, 'pageInfo')
          return true
        },
        getHeadIsVisible: (pageInfo) => {
          console.log(pageInfo, 'pageInfo')
          return true
        },
      }}
      authingParams={{
        // 手动登录模式
        manual: true,
        redirectUri: window.location.origin + window.location.pathname,
      }}
    >

      <CustomRoutes noLayout>
        <Route path="/" element={<Navigate to="/register" />} />
      </CustomRoutes>

      <CustomRoutes>

        <Route
          path="/register"
          element={(
            <PageLayout showBreadcrumb={false} label="注册啊">
              register
              <PostList />
            </PageLayout>
          )}
        />
        <Route
          path="/register1"
          element={(
            <div>123</div>
          )}
        />
      </CustomRoutes>
    </Admin>
  )
}

export default App
