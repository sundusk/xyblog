---
title: "Vue笔记-项目创建"
date: "2024-10-25"
---

### 创建vue项目

1.在配置环境完成之后，在终端运行指令创建项目

`vue create my-project`

2.运行项目，在终端中输入命令行来启动服务器

`npm run serve`

### Vue目录结构

| 目录/文件    | 说明                                                         |
| :----------- | :----------------------------------------------------------- |
| build        | 项目构建(webpack)相关代码                                    |
| config       | 配置目录，包括端口号等。我们初学可以使用默认的。             |
| node_modules | npm 加载的项目依赖模块                                       |
| src          | 这里是我们要开发的目录，基本上要做的事情都在这个目录里。里面包含了几个目录及文件：assets: 放置一些图片，如logo等。components: 目录里面放了一个组件文件，可以不用。App.vue: 项目入口文件，我们也可以直接将组件写这里，而不使用 components 目录。main.js: 项目的核心文件。 |
| static       | 静态资源目录，如图片、字体等。                               |
| test         | 初始测试目录，可删除                                         |
| .xxxx文件    | 这些是一些配置文件，包括语法配置，git配置等。                |
| index.html   | 首页入口文件，你可以添加一些 meta 信息或统计代码啥的。       |
| package.json | 项目配置文件。                                               |
| README.md    | 项目的说明文档，markdown 格式                                |

也就是说，正常开发的时候，在src文件夹中进行新的组件的创建

### 创建基本组件结构

要在新的组件页面编写代码，如下是基本的组件结构

```
<template>
  <div class="hello">
    <!-- 这里是模板内容 -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      // 这里是组件的数据
    }
  },
  methods: {
    // 这里是组件的方法
  }
}
</script>

<style scoped>
.hello {
  /* 这里是组件的样式 */
}
</style>
```

### 项目完成之后

1.构建项目

在项目的根目录下运行以下终端命令行，将vue,js应用构建为静态文件

`npm run build`

2.配置项目（这个是可选的）

如果需要自定义构建配置，可以在vue.config.js文件中进行配置。例如，如果要将应用部署到子路径，可以这样配置：

```
module.exports = {
	publicPath: '/my-app/'
}
```

3.部署到Web服务器
