---
title: Hexo教程
date: 2022-10-03 19:24:07
tags:
- Hexo
- 教程
categories:
- Hexo
---

# Hexo使用手册

> 本文用于hexo的常用命令的教学

## Hexo的安装

### 前提条件

1. Node.js (Node.js 版本需不低于 10.13，建议使用 Node.js 12.0 及以上版本)
2. Git 



### 安装Hexo

```shell
npm install -g hexo-cli
```

<!-- more -->

### Hexo常用命令

#### init

新建一个网站。如果没有设置 folder ，Hexo 默认在目前的文件夹建立网站。

hexo初始化

```shell
hexo init [folder]
```

#### new

新建一篇文章。如果没有设置 layout 的话，默认使用 _config.yml 中的 default_layout 参数代替。如果标题包含空格的话，请使用引号括起来。

hexo新建文章

```shell
hexo new [layout] <title>
```

例子：`hexo new "Data Mining and Data Warehouse"`

| 参数              | 描述                                          |
| ----------------- | --------------------------------------------- |
| `-p`, `--path`    | 自定义新文章的路径                            |
| `-r`, `--replace` | 如果存在同名文章，将其替换                    |
| `-s`, `--slug`    | 文章的 Slug，作为新文章的文件名和发布后的 URL |

#### generate

hexo生成静态文件

```shell
hexo generate
```

简写为：`hexo g`

| 选项                  | 描述                                                         |
| :-------------------- | :----------------------------------------------------------- |
| `-d`, `--deploy`      | 文件生成后立即部署网站                                       |
| `-w`, `--watch`       | 监视文件变动                                                 |
| `-b`, `--bail`        | 生成过程中如果发生任何未处理的异常则抛出异常                 |
| `-f`, `--force`       | 强制重新生成文件, Hexo 引入了差分机制，如果 `public` 目录存在，那么 `hexo g` 只会重新生成改动的文件。 使用该参数的效果接近 `hexo clean && hexo generate` |
| `-c`, `--concurrency` | 最大同时生成文件的数量，默认无限制                           |

#### publish

hexo发布草稿

```shell
 hexo publish [layout] <filename>
```

#### server

hexo启动服务器

```shell
 hexo server
```

默认情况下，访问网址为： `http://localhost:4000/`

#### deploy

hexo部署网站

```shell
hexo deploy
```

简写为：`hexo d`

#### render

渲染文件

```shell
hexo render <file1> [file2]
```

#### migrate

```
hexo migrate <type>
```

hexo从其他博客进行内容迁移。

#### clean

hexo清除缓存

```shell
hexo clean
```

清除缓存文件 (`db.json`) 和已生成的静态文件 (`public`)。

#### list

列出网站资料

```shell
hexo list <type>
```

#### version

显示 Hexo 版本

```shell
hexo version
```

### Hexo进行文件上传及部署到github

1. 克隆博客仓库到本地
2. 进入本地仓库的根目录下
3. 使用`hexo new <title>`生成一个新文章
4. 到_post目录下撰写文章
5. 文章撰写完成后，打开Cmd命令行
6. 运行`hexo clean`
7. 运行`hexo g`
8. 运行`hexo d`
9. 最后一步可能会报错，如果出现类似错误`Failed to connect github.com port 443 after XXXms:Time out`，再次重复第8步运行`hexo d`,直到出现`INFO Deploy done:git`则表示上传成功！ 
