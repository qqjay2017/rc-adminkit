# Resource

```
1. 读取到当前Resource的状态
 useResourceDefinition();
```

## sso 登录页面流程

1. http://dev-pm.crccit.com:31006/sso.html?redirectUri=https%3A%2F%2Fnext-auth-example.vercel.app%2F

url 参数
[redirectUri] = window.location.origin+'/'

未登录状态时候,点击登录类型按钮进行跳转

2. 登录完成后,回调到 http://dev-pm.crccit.com:31006/sso.html?code=ABGC&auth=github

开始根据 auth 类型解析 code,解析完成后,重定向到第一步的 redirectUri

webpack umd

```
yarn add webpack-merge webpack @babel/core  @babel/preset-env @babel/preset-react  @babel/preset-typescript  babel-loader babel-plugin-transform-runtime  babel-runtime  webpack-cli  webpack-dev-server  webpack-node-externals ts-loader node-polyfill-webpack-plugin  -D
```
