import antfu from '@antfu/eslint-config'

export default antfu({
  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },

  // TypeScript and Vue are auto-detected, you can also explicitly enable them:
  typescript: true,
  vue: false,
  react: true,

  // Disable jsonc and yaml support
  jsonc: false,
  yaml: false,
  ignores: [
    './dist',
    'node_modules',
    'build-config',
    'webpack.config.js',
  ],
  rules: {
    "no-console":'warn',
    'jsdoc/require-returns-description': 'off',
    'eslint-comments/no-unlimited-disable': 'warn',
    'eslint-comments/no-unlimited-disable': 'warn',
  },

})
