---
title: "macOS下本地 MongoDB 安装、启动及项目集成指南"
date: "2024-10-31"
---

本文详细介绍了如何在 macOS 上使用 Homebrew 安装 MongoDB 社区版，启动本地 MongoDB 服务，并通过 Node.js 项目进行数据库集成。

## 一、安装 MongoDB 社区版

1. **更新 Homebrew：**

   ```bash
   brew update
   ```

2. **添加 MongoDB 官方 Tap：**

   ```bash
   brew tap mongodb/brew
   ```

3. **安装 MongoDB 社区版：**

   ```bash
   brew install mongodb/brew/mongodb-community@7.0
   ```

## 二、启动 MongoDB 服务

- 启动 MongoDB 服务：

  ```bash
  brew services start mongodb/brew/mongodb-community@7.0
  ```

- 检查服务状态，确保 MongoDB 已成功启动：

  ```bash
  brew services list
  ```

### 连接到 MongoDB Shell

使用以下命令进入 MongoDB Shell 进行交互：

```bash
mongo
```

### 停止 MongoDB 服务

如需停止服务，可使用以下命令：

```bash
brew services stop mongodb/brew/mongodb-community@7.0
```

## 三、Node.js 项目中的 MongoDB 集成

1. **安装 Mongoose：**
   在 Node.js 项目中，使用 Mongoose 库连接 MongoDB。

   ```bash
   npm install mongoose
   ```

2. **配置数据库连接**
   在项目的 `server.js` 中配置 Mongoose 连接：

   ```javascript
   const mongoose = require('mongoose');
   mongoose.connect('mongodb://localhost:27017/myBlog', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'MongoDB 连接错误:'));
   db.once('open', () => {
     console.log('成功连接到 MongoDB');
   });
   ```

3. **创建数据模型**
   在项目中定义博客文章的 Schema，例如在 `models/Blog.js` 文件中：

   ```javascript
   const mongoose = require('mongoose');
   const blogSchema = new mongoose.Schema({
     title: { type: String, required: true },
     content: { type: String, required: true },
     date: { type: Date, default: Date.now },
   });
   const Blog = mongoose.model('Blog', blogSchema);
   module.exports = Blog;
   ```

## 四、设置 API 路由

在 Express 项目中创建和获取博客文章的 API 路由：

```javascript
const express = require('express');
const Blog = require('./models/Blog');
const app = express();
app.use(express.json());

// 创建新的博客文章
app.post('/api/blog', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.json({ message: '博客文章创建成功' });
  } catch (error) {
    res.status(500).json({ error: '创建博客文章时出错' });
  }
});

// 获取所有博客文章
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: '获取博客列表时出错' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

## 五、常见问题及排查

1. **`req.body` 是 undefined**  
   - 解决：确保 `app.use(express.json())` 在路由之前添加，并在请求时选择 `Content-Type` 为 `application/json`。

2. **连接 MongoDB 时报错**  
   - 解决：确保 MongoDB 服务已启动，可通过 `brew services list` 查看。

通过以上步骤，您已成功在 macOS 上安装并配置 MongoDB，并将其集成到 Node.js 项目中。
