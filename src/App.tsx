import { Navigate, Route } from 'react-router-dom'

import { Admin, CustomRoutes, PageLayout } from './lib'

import { Segments } from './Segments'

function App() {
  return (
    <Admin
      // layout={({ children }) => {
      //   return (
      //     <div>
      //       {children}
      //       <h1>123</h1>
      //     </div>
      //   );
      // }}

      layout={({ children }) => {
        return (
          <div>
            <div><h1>头部啊</h1></div>
            { children}
          </div>
        )
      }}
      basename="/"
      domain="https://test-ymsl.kxgcc.com:30195"
      layoutProps={{
        getSidebarIsVisible(pageInfo) {
          console.log(pageInfo, 'pageInfo')
          return true
        },
        getHeadIsVisible: () => {
          return true
        },
      }}
      authingParams={{
        // 手动登录模式
        manual: true,
        redirectUri: window.location.origin,
      }}

      envJsonParams={{}}

    >
      <CustomRoutes noLayout>
        <Route path="/" element={<Navigate to="/home" />} />
      </CustomRoutes>

      <CustomRoutes>
        <Route
          path="/register"
          element={(
            <PageLayout showBreadcrumb={false} label="注册啊">
              register
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
      {/* 自定义路由 */}
      <CustomRoutes>
        <Route path="/home" element={<Segments />} />
      </CustomRoutes>
    </Admin>
  )
}

export default App
