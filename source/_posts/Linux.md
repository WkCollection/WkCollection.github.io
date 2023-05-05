---
title: Linux
date: 2023-03-05 19:47:31
tags:
- Linux
categories:
- Linux
top: true
---

# Linux进阶学习

> 记录学习Linux的路程

## 常用命令

1. 显示时间与日期：`date`

   ```shell
   [root@name ~]# date
   2023年 03月 19日 星期日 11:17:06 CST
   ```

2. 显示日历：`cal`

   ```shell
   [root@name ~]# cal
         三月 2023     
   日 一 二 三 四 五 六
             1  2  3  4
    5  6  7  8  9 10 11
   12 13 14 15 16 17 18
   19 20 21 22 23 24 25
   26 27 28 29 30 31
   ```

3. 使用计算器：`bc`

   ```shell
   [root@name ~]# bc
   bc 1.06.95
   Copyright 1991-1994, 1997, 1998, 2000, 2004, 2006 Free Software Foundation, Inc.
   This is free software with ABSOLUTELY NO WARRANTY.
   For details type `warranty'. 
   1+2
   3
   ```

4. `man`命令和`--help`命令

5. 观察系统的使用状态

   1. 查看谁在线：`who`
   2. 查看网络的联机状态：`netstat -a`
   3. 查看后台执行的程序：`ps -aux`

6. 关机与重启：`shutdown`、`reboot`

7. 将数据同步写入磁盘：`sync`

<!-- more -->

## Linux权限

> 默认情况下，所有系统上的账号和一般身份用户以及root用户的相关信息，都记录在`/etc/passwd`文件内，个人密码则记录在`/etc/shadow`文件内，Linux的所有组名都记录在`/etc/group`中。
