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

    // 修改默认的 html-webpack-plugin 配置
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'sundusk';  // 这里修改成你想要的标题
        return args;
      });
  },
  // 添加 publicPath，确保正确处理静态资源路径
  publicPath: process.env.NODE_ENV === 'production'
    ? './'  // 使用相对路径
    : '/',  // 在开发环境下使用根路径 '/'
});