---
title: Postgresql
date: 2023-04-19 10:27:49
tags:
- Postgresql
categories:
- 数据库
---

# Postgresql源码阅读

> 记录学习Postgresql源码的过程

## Postgresql编译安装

Windows系统下:

首先进入Postgresql的官网下载相应版本的[源码](https://www.postgresql.org/ftp/source/)

Linux系统下:
1. 通过`wget https://ftp.postgresql.org/pub/source/v15.2/postgresql-15.2.tar.gz` 下载postgresql的源码。
2. 解压下载好的源码文件`tar -zxvf postgresql-15.2.tar.gz`
3. 重命名postgresql`mv  postgresql-15.2 postgresql15`
4. 进行configure生成makefile文件*./configure --prefix=/usr/local/psql --enable-debug --enable-thread-safety --enable-cassert CFLAGS='-O0'*
5. 安装所需要的依赖库`sudo apt install libreadline-dev`
6. 然后进行`sudo make -j2&&sudo make install -j2`
<!-- more -->

## 运行postgresql

```shell
cd /usr/local/psql/
sudo adduser pg
mkdir data
chown pg:pg data
su - pg
./bin/initdb -D data/
./bin/pg_ctl -D data start
./bin/createdb test
./bin/psql test
```
