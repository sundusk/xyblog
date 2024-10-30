---
title: "JavaScript后端使用-创建API"
date: "2024-10-30"
---

一、项目创建与环境配置

1. 初始化Node.js项目
   后端的基础是Node.js，而Express则是一个轻量级的Web框架，可以快速构建API接口。下面是我创建一个Node.js项目的基本步骤：

2. 安装Node.js： 如果你还没有安装Node.js，可以去 Node.js官网 下载并安装。

3. 创建项目文件夹并初始化项目：
   首先，进入项目文件夹并使用 npm init 初始化项目，生成 package.json 文件：

   ```
   mkdir blog-backend
   cd blog-backend
   npm init -y
   ```

   其中，`-y` 参数可以跳过一系列手动配置，快速生成 `package.json`。

4. 安装必要依赖：
   接下来，我安装了后端所需的依赖，包括 `express`（用于构建Web服务器）和 `cors`（用于解决跨域问题）：

   ```
   npm install express cors
   ```

5. 创建基础Express服务器

完成环境配置后，我开始编写最基本的Express服务器代码。这是我的 `server.js` 文件内容：

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // 允许跨域请求

// 定义一个简单的API返回动态标题
app.get('/api/title', (req, res) => {
  const title = '强风吹拂，聚散流云';
  res.json({ title });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Express框架： 用于快速创建一个可以处理HTTP请求的Web服务器。
CORS中间件： 用来解决前后端不同源之间的跨域问题。
基本API： 我定义了 /api/title 路由，向前端返回一个简单的标题，接下来会通过前端Axios请求这个数据并展示出来。

3. 启动服务器
   通过以下命令来启动Express服务器：

```
node server.js
```

服务器启动后，控制台会输出 `Server running on http://localhost:3000`，表示后端服务已经准备好。

---

二、前后端的联动

1. 用Axios从后端获取数据

为了将后端的数据展示在前端，我使用了 `axios` 库。Axios可以很方便地向后端API发送请求，并获取返回的数据。以下是我如何在前端通过Axios获取后端提供的标题，并在页面中展示的代码：

```javascript
loadTitle() {
  axios.get('http://localhost:3000/api/title')
    .then(response => {
      this.pageTitle = response.data.title;
    })
    .catch(error => {
      console.error('获取标题时出错:', error);
    });
}
```

Axios请求： 请求 `/api/title` 路由，获取标题数据并将其赋值给前端的 `pageTitle`。
错误处理： 如果请求失败，将在控制台输出错误信息。

2. 实现动态背景图

接下来，我实现了从后端获取背景图片的功能。为了更好地管理图片，我将图片上传到了GitHub仓库，然后通过后端API将图片URL返回给前端，动态设置背景图。

后端API代码：

```javascript
app.get('/api/background', (req, res) => {
  const backgroundImageUrl = 'https://raw.githubusercontent.com/sundusk/blogBackImage/main/one.png';
  res.json({ backgroundImage: backgroundImageUrl });
});
```

前端通过Axios获取背景图URL，并将其设置为页面背景：

```javascript
loadBackgroundImage() {
  axios.get('http://localhost:3000/api/background')
    .then(response => {
      document.querySelector('.rounded-bg').style.backgroundImage = `url(${response.data.backgroundImage})`;
    })
    .catch(error => {
      console.error('获取背景图时出错:', error);
    });
}
```

这样，前端的背景图片可以动态地从后端获取，增强了项目的灵活性。

---

三、优化开发流程

1. 引入Nodemon自动重启

在开发过程中，我发现每次修改后端代码都需要手动重启服务器，这非常影响开发效率。于是，我引入了 `nodemon` 这个工具，它可以在检测到代码变动时自动重启服务器。

使用以下命令安装 `nodemon`：

```bash
sudo npm install -g nodemon
```

安装成功后，我用以下命令启动服务器，代替原来的 `node` 命令：

```bash
nodemon server.js
```

Nodemon会监控项目中的文件变化，自动重启服务器，大大提高了开发效率。

2. GitHub作为资源管理器

在全栈开发中，图片资源的管理是非常重要的。为此，我将图片资源上传至GitHub仓库，并通过GitHub的外链进行管理。在后端API中直接返回图片的URL，这不仅解决了存储问题，还提升了加载效率。

---

四、项目架构与代码结构的思考

在项目开发过程中，我也逐渐意识到代码组织的重要性。随着项目的不断增大，代码的清晰性和可维护性变得越来越重要。因此，我开始尝试将项目模块化，遵循RESTful设计原则，将不同功能的API拆分到各自的路由模块中。

1. 将路由拆分
   我将不同的功能模块分开管理，创建不同的路由文件。例如，专门创建 `titleRouter.js` 和 `backgroundRouter.js` 来处理不同的API请求：

`titleRouter.js`：

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const title = '强风吹拂，聚散流云';
  res.json({ title });
});

module.exports = router;
```

`backgroundRouter.js`：

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const backgroundImageUrl = 'https://raw.githubusercontent.com/sundusk/blogBackImage/main/one.png';
  res.json({ backgroundImage: backgroundImageUrl });
});

module.exports = router;
```

这样做有助于让代码更加清晰、易于维护，同时也方便日后扩展更多的API功能。