---
title: 深度学习之路：Pytorch
date: 2022-07-08 15:32:02
tags: 
- Python
categories: 
- Python
---

# 深度学习之路：Python配置Pytorch

> 本文为Python配置Pytorch库，利用Anaconda包管理工具

## 查看电脑显卡配置

打开电脑的设备管理器查看显示适配器配置，如果有NVIDIA则可以采用GPU方式，我的电脑没有NVIDIA所以不支持GPU，所以后面只能采用CPU方式（采用CPU方式进行训练会很慢）：

![image-20220708153616262](../img/%E6%98%BE%E5%8D%A1%E9%85%8D%E7%BD%AE.png)

<!-- more -->

## 下载Anaconda

由于使用Pip进行Pytorch库的安装，过程中坑实在太多，根据网上的建议选用Anaconda这个也很优秀的Python第三库的包管理工具。为节省时间可以采用清华源镜像进行下载[Anaconda](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/)选择[Anaconda3-5.3.1-Windows-x86_64.exe](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-5.3.1-Windows-x86_64.exe)进行下载：

![image-20220708154359305](../img/Anaconda.png)

下载完成后进行安装

## 安装Anaconda

![image-20220708162616546](../img/Anaconda01.png)

![image-20220708162651353](../img/Anaconda02.png)

![image-20220708162720875](../img/Anaconda03.png)

![image-20220708162804641](../img/Anaconda04.png)

![image-20220708162905328](../img/Anaconda05.png)

![image-20220708163817016](../img/Anaconda06.png)

![image-20220708163856146](../img/Anaconda07.png)

### Anaconda配置环境变量

将D:\Anaconda;D:\Anaconda\Scripts;D:\Anaconda\Library\bin;加入到环境变量Path中

打开命令行CMD输入`conda --version`

```shell
conda --version
```

![image-20220708164520085](../img/Anaconda08.png)

### Conda虚拟环境配置

在后面的项目我们可能遇见不同的项目需要用到不同环境，此时可以使用虚拟环境：

使用conda创建一个pytorch的环境，指定Python版本为3.7

```shell
conda create -n pytorch python=3.7
```

![image-20220708164713453](../img/Anaconda09.png)

使用下面的命令查看当前环境，带`*`的为当前所处环境

```shell
conda info --envs
```

![image-20220708165032128](../img/Anaconda10.png)

先使用activate激活base环境

```shell
activate
```

再使用`conda activate pytorch`激活pytorch这个环境

```shell
conda activate pytorch
```

![image-20220708165515210](../img/Anaconda11.png)

## 安装CUDA和CUDNN（如无独显则跳过此步）

> 查看CUDA的[官方文档](https://docs.nvidia.com/cuda/cuda-installation-guide-microsoft-windows/index.html)
>
> 查看cuDNN的[官方文档](https://docs.nvidia.com/deeplearning/cudnn/install-guide/index.html)

第一步：首先根据显卡的驱动程序版本找到对应的Cuda Toolkit

![image-20220708225323574](../img/CUDA.png)

![image-20220708225427206](../img/CUDA-1.png)

第二步：找到对应的CUDA，在此处[下载](https://developer.nvidia.com/cuda-toolkit-archive)

第三步：找到对应的cuDNN,在此处[下载](https://developer.nvidia.com/rdp/cudnn-archive)

![image-20220708231139811](../img/cuDNN.png)

第四步：解压cuDNN文件，将bin,include,lib复制到CUDA目录下

第五步：配置CUDA的环境变量，将CUDA下的include,lib,libnvvp配置到Path路径下

第六步：验证是否安装成功，打开CMD，输入nvcc -V查看CUDA版本

## 安装Pytorch

第一步：进入[Pytorch官网](https://pytorch.org)，点击首页Install

![image-20220708161325258](../img/Pytorch%E5%AE%98%E7%BD%91.png)

第二步：找到自己所需配置

![image-20220708161605950](../img/Pytorch%E5%AE%89%E8%A3%85.png)

即打开CMD运行下面的命令进行Pytorch(使用CUDA-10.2)的安装：

```shell
CUDA-10.2 PyTorch builds are no longer available for Windows, please use CUDA-11.6
```

由于我电脑无独立显卡只有核显所以我只能选择CPU方式进行安装：

![image-20220708161704139](../img/Pytorch%E5%AE%89%E8%A3%85-my.png)

即打开CMD运行下面的命令进行Pytorch的安装：

```shell
conda install pytorch torchvision torchaudio cpuonly -c pytorch
```

至此Pytorch配置完毕！！！

## Pytorch入门

