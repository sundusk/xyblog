---
title: "ComfyUI在Mac环境上部署"
date: "2024-11-21"
---

# ComfyUI 安装过程总结

以下是 **MacBook Pro M1 Max** 上安装 **ComfyUI** 的完整过程总结，供参考。

---

## **1. 安装前置工具**

确保系统具备以下工具：

- **Homebrew**: 用于安装依赖软件。
- **Python 3.10 以上版本**: 推荐使用 Python 3.10 或更高版本。
- **Git**: 用于克隆代码仓库。
- **ffmpeg**: 用于音频和视频处理。

### 安装命令：

```bash
# 安装 Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 更新 Homebrew
brew update

# 安装 Python 3.10
brew install python@3.10

# 安装 Git
brew install git

# 安装 ffmpeg
brew install ffmpeg
```

---

## **2. 下载 ComfyUI 源代码**

使用 Git 克隆 ComfyUI 项目：

```bash
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI
```

---

## **3. 配置虚拟环境**

为 ComfyUI 创建虚拟环境并安装依赖：

```bash
# 创建虚拟环境
python3 -m venv venv

# 激活虚拟环境
source venv/bin/activate

# 更新 pip
pip install --upgrade pip

# 安装项目依赖
pip install -r requirements.txt
```

---

## **4. 启用 Metal 加速**

在启动 ComfyUI 之前，启用 Metal 加速以支持 Apple Silicon：

```bash
export PYTORCH_ENABLE_MPS_FALLBACK=1
```

---

## **5. 安装中文翻译插件**

如果需要中文界面，可以安装 **AIGODLIKE-ComfyUI-Translation** 插件：

```bash
# 进入 custom_nodes 文件夹
cd ~/Desktop/ComfyUI/custom_nodes

# 克隆中文翻译插件
git clone https://github.com/AIGODLIKE/AIGODLIKE-COMFYUI-TRANSLATION.git
```

---

## **6. 启动 ComfyUI**

运行以下命令启动 ComfyUI：

```bash
# 返回项目主目录
cd ~/Desktop/ComfyUI

# 激活虚拟环境
source venv/bin/activate

# 启动 ComfyUI
python main.py
```

打开浏览器访问以下地址查看界面：

```
http://127.0.0.1:8188
```

---

## **7. 创建快捷启动脚本（可选）**

为了简化启动过程，可以创建一个快捷脚本：

```bash
# 创建脚本文件
touch start_comfyui.sh
chmod +x start_comfyui.sh

# 编辑脚本内容
nano start_comfyui.sh
```

添加以下内容：

```bash
#!/bin/bash
cd ~/Desktop/ComfyUI
source venv/bin/activate
python main.py
```

以后运行以下命令即可启动：

```bash
./start_comfyui.sh
```

---

## **常见问题**

1. **NumPy 版本冲突**：  
   如果提示 NumPy 版本问题，可以降级 NumPy：

   ```bash
   pip install numpy<2
   ```

2. **插件未生效**：  
   检查插件是否正确安装，并查看启动日志确认加载成功。

---

通过以上步骤，你就可以成功安装和运行 **ComfyUI**，并支持中文界面！
