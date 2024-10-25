---
title: "Vue笔记-注册路由跳转"
date: "2024-10-25"
---

### 项目结构

```
src/
  components/
    HelloWorld.vue
    NewOneComponent.vue
  router/
    index.js
  App.vue
  main.js
```

### 一、安装Vue Router

首先，确保项目中已安装 Vue Router。如果没有安装，可以使用以下命令安装：

```终端
npm install vue-router@next
```

### 二、创建路由配置文件

在 src 目录下创建一个 router 文件夹，并在其中创建一个 index.js 文件，定义路由配置：

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import NewOneComponent from '../components/NewOneComponent.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/NewOneComponent', component: NewOneComponent }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

### 三、在 main.js 中引入并使用路由

在 main.js 文件中引入并使用路由：

```javascript
// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
```

### 四、配置主组件以支持路由视图

在 App.vue 文件中添加 <router-view> 标签，用于显示匹配的路由组件：

```javascript
<!-- src/App.vue -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

### 五、配置要跳转的组件

在 HelloWorld.vue 组件中添加按钮和点击事件，以实现页面跳转：

```javascript
<template>
  <div>
    这是新的初始页面
    <button @click="goToNewPage">跳转到 NewOne 页面</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    goToNewPage() {
      this.$router.push('/NewOneComponent');
    }
  }
}
</script>
```

### 六、确保跳转目标组件存在并正确配置

```javascript
<!-- src/components/NewOneComponent.vue -->
<template>
  <div>
    这是个网页哦
  </div>
</template>

<script>
export default {
  name: 'NewOneComponent'
}
</script>
```

配置完成后，开启本地服务器运行项目，查看是否正常
