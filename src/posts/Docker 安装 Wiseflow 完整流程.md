---
title: "Docker 安装 Wiseflow 完整流程"
date: "2024-11-11"
---

本篇博客将详细介绍如何使用 Docker 安装并启动 Wiseflow，以便日后学习和参考。

---

## 前提条件

在开始安装 Wiseflow 之前，请确保您已经具备以下条件：

- 已安装 Docker 和 Docker Compose
- 基本的终端使用经验
- 确保有足够的硬盘空间（建议 10GB 以上）

---

## 安装步骤

1. **克隆 Wiseflow 项目**
   首先，在终端中进入您希望存放 Wiseflow 项目的目录，然后使用以下命令克隆项目代码：

   ```bash
   git clone <Wiseflow 仓库的 GitHub 地址>
   cd wiseflow
   ```

2. **配置 Docker 镜像源（推荐使用国内源）**
   如果您遇到下载速度缓慢的问题，可以在 Dockerfile 中将镜像源更改为国内源。编辑 `Dockerfile`：

   ```Dockerfile
   FROM python:3.10-slim
   
   RUN echo "deb http://mirrors.aliyun.com/debian/ bookworm main contrib non-free" > /etc/apt/sources.list && \
       echo "deb http://mirrors.aliyun.com/debian/ bookworm-updates main contrib non-free" >> /etc/apt/sources.list && \
       echo "deb http://mirrors.aliyun.com/debian-security bookworm-security main contrib non-free" >> /etc/apt/sources.list && \
       apt-get update && \
       apt-get install -yq tzdata build-essential unzip && \
       apt-get clean
   ```

   > **注意**：确保 Dockerfile 文件的路径正确。

3. **检查并编辑环境配置文件**
   使用以下命令复制并编辑 `.env` 配置文件：

   ```bash
   cp env_sample .env
   nano .env
   ```

   根据 Wiseflow 项目要求，在 `.env` 文件中填写必要的配置信息，如 API 密钥和数据库连接信息。

4. **构建 Docker 镜像并启动容器**
   在项目根目录（包含 `docker-compose.yml` 文件的目录）中执行以下命令：

   ```bash
   docker-compose up --build
   ```

   该命令将会构建镜像并启动容器。整个过程可能需要几分钟，请耐心等待。

---

## 启动 Wiseflow 容器

1. **停止和启动容器**
   启动完成后，您可以使用以下命令来停止和启动 Wiseflow 容器：

   ```bash
   # 停止容器
   docker-compose down
   
   # 启动容器
   docker-compose up
   ```

   如果不需要重新构建镜像，则可以省略 `--build` 参数。

2. **后台运行**
   如果您希望容器在后台运行，可以使用以下命令：

   ```bash
   docker-compose up -d
   ```

   此命令会使容器在后台运行，您可以通过 `docker-compose down` 停止它。

---

## 验证 Wiseflow 服务

启动成功后，您可以通过以下方式验证 Wiseflow 是否正常运行：

1. **检查日志**
   在终端中查看 Docker 输出日志，确保没有报错信息。成功启动后，您会看到类似以下日志输出：

   ```plaintext
   Uvicorn running on http://0.0.0.0:8077
   Server started at http://0.0.0.0:8090
   REST API: http://0.0.0.0:8090/api/
   Admin UI: http://0.0.0.0:8090/_/
   pocketbase ready authenticated as admin - <您的管理员邮箱>
   Application startup complete.
   ```

2. **访问 Wiseflow 管理界面**
   打开浏览器并访问以下 URL：

   - **管理界面**: [http://127.0.0.1:8090/_/](http://127.0.0.1:8090/_/)
   - **API 接口**: [http://127.0.0.1:8090/api/](http://127.0.0.1:8090/api/)

   在管理界面中，您可以配置管理员账户、设置标签和查看数据。

---

## 后续操作

1. **关闭容器**
   当不再需要 Wiseflow 运行时，可以使用以下命令停止并关闭容器：

   ```bash
   docker-compose down
   ```

2. **删除不需要的容器或网络**
   在 Docker Desktop 中，您可以手动删除不需要的容器或网络，以便节省资源。

3. **下次启动时无需重新部署**
   当您下次使用 Wiseflow 时，只需执行以下命令启动即可：

   ```bash
   docker-compose up
   ```

   Docker 会自动使用上次构建的镜像，无需重新构建。

---

## 总结

通过 Docker 安装 Wiseflow 可以简化部署流程，并且容器化的方式也便于维护和管理。在本教程中，我们介绍了如何下载、配置、构建、启动以及验证 Wiseflow。希望这篇教程能够帮助您快速上手 Wiseflow 的 Docker 部署。
