const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  },
  // 添加 publicPath，确保正确处理静态资源路径
  publicPath: process.env.NODE_ENV === 'production'
    ? '/my-vue-blog/'  // 这里的 'my-vue-blog' 是你的 GitHub 仓库名
    : '/'
})