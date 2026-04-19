---
title: "OpenCV"
published: 2025-11-11
tags: ["计算机视觉", "C++"]
image: /assets/images/yasina.jpg
cover: "/assets/images/cover.webp"
category: '计算机视觉'
description: "关于 OpenCV 的学习笔记"
draft: false
---

以下是 opencv 的常用网站

- OpenCV 官网 https://opencv.org/
- OpenCV 源代码：https://github.com/opencv/opencv
- OpenCV 文档：https://docs.opencv.org/

### OpenCV 简介

OpenCV 是一个功能强大、应用广泛的计算机视觉库，它为开发人员提供了丰富的工具和算法，可以帮助他们快速构建各种视觉应用。

随着计算机视觉技术的不断发展，OpenCV 也将会继续发挥重要的作用。

OpenCV 提供了大量的计算机视觉算法和图像处理工具，广泛应用于图像和视频的处理、分析以及机器学习领域。

### OpenCV 安装

访问 OpenCV 的官方下载页面：https://opencv.org/releases/。

选择适合你操作系统的版本（例如 Windows、Linux、macOS）并下载，例如 OpenCV 4.x 的 Windows 预编译包。 。

### Windows 安装 OpenCV

- **解压下载的 OpenCV 文件：**解压到一个目录，例如 C:\opencv。
- **设置环境变量：**将 OpenCV 的 bin 目录 **C:\opencv\build\x64\vc15\bin（根据你的 Visual Studio 版本选择 vc14 或 vc15）** 添加到系统的 PATH 环境变量中。
- **配置开发环境：**如果使用 Visual Studio，需要在项目中配置 OpenCV 的头文件路径和库文件路径。右键点击” 此电脑” -> “属性” -> “高级系统设置” -> “环境变量” -> 编辑 `Path`，添加上述路径。

### 配置 Visual Studio

**1、打开 Visual Studio，创建一个 C++ 项目。**

**2、配置包含目录**

右键项目 -> “属性” -> “VC++ 目录” -> “包含目录”，添加：

```
C:\opencv\build\include
```

**3、配置库目录**

右键项目 -> “属性” -> “VC++ 目录” -> “库目录”，添加：

```
C:\opencv\build\x64\vc15\lib
```

**4、配置链接器**

右键项目 -> “属性” -> “链接器” -> “输入” -> “附加依赖项”，添加：

```
opencv_world4xx.lib
```

项目配置好之后，建议重启 IDE

### 生成 VS 项目模板

![img](https://blog.shadow743.xyz/wp-content/uploads/2025/10/image.png)

选择导出模板

![img](https://blog.shadow743.xyz/wp-content/uploads/2025/10/image-1.png)

选择模板相关参数，即可生成模板

### 使用模板

![img](https://blog.shadow743.xyz/wp-content/uploads/2025/10/image-2.png)

选择模板并创建项目

## 在 C++ 项目中使用 OpenCV

安装完成后，你可以在 C++ 项目中使用 OpenCV。

以下是一个简单的示例程序，展示如何使用 OpenCV 加载并显示一张图片。

### 1、创建 C++ 项目

创建一个新的 C++ 源文件，例如 `main.cpp`。

编写以下代码：

## 实例

```
#include <opencv2/opencv.hpp>
#include <iostream>
 
int main() {
    // 读取图片
    cv::Mat image = cv::imread("example.jpg");
 
    // 检查图片是否成功加载
    if (image.empty()) {
        std::cout << "无法加载图片！" << std::endl;
        return -1;
    }
 
    // 显示图片
    cv::imshow("Display Image", image);
 
    // 等待按键
    cv::waitKey(0);
 
    return 0;
}
```

运行代码即可