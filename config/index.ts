import { defineConfig } from '@tarojs/cli'

export default defineConfig({
  projectName: 'jd-subsidy-zone-demo',
  date: '2026-03-24',
  designWidth: 375,
  deviceRatio: {
    375: 2,
    750: 1,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  framework: 'react',
  compiler: 'vite',
  cache: { enable: false },
  mini: {},
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
  },
})
