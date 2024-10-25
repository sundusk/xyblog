---
title: "Python简单的开发流程"
date: "2024-10-25"
---

### 一切建立在Mac环境配置完成之后，使用VSCode  
#### 1.创建项目名.py
```
mkdir MyPythonProject
cd MyPythonProject
```
#### 2.创建虚拟环境
之所以要创建虚拟环境，是因为各个项目的环境配置是不一样的，为了避免之后的新建项目的环境冲突，方便管理项目的依赖
创建虚拟环境命令行
```
python3 -m venv venv
```
激活虚拟环境命令行
```
source venv/bin/activate
```

#### 3.安装依赖
使用pip安装所需第三方库
例如
```
pip install requests 
```


#### 4.编写代码
#### 5.运行代码
```
python newOne.py
```
#### 6.创建可执行文件（Mac应用程序）
如果希望生成一个Mac应用程序包（.app），可以使用以下命令：
```
pyinstaller --onefile --windowed newOne.py
```

#### 7.清理并关闭虚拟环境
在完成开发后，激活的虚拟环境是需要关闭的
```
deactivate
```
