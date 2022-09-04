---
title: Git学习
date: 2022-06-19 19:43:08
tags:
- 版本控制
- git
categories:
- Git
---
# Git学习


> 学习git这一种主流的版本控制系统

## 什么是"版本控制"？

版本控制是一种记录一个或若干文件内容变化，以便将来查阅特定版本修订情况的系统。
<!-- more -->

## git的三种状态

### 已提交：commited

已提交表示数据已经安全的保存在本地数据库中。

### 已修改：modified

已修改表示修改了文件，但还没保存到数据库中。

### 已暂存：staged

已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。

## git的三个工作区

![git的三个工作区](https://s1.ax1x.com/2022/06/19/XjBi0x.png)

### git仓库

Git 仓库目录是 Git 用来保存项目的元数据和对象数据库的地方。这是 Git 中最重要的部分，其它计算机克隆仓库时，拷贝的就是这里的数据。

### 工作目录

工作目录是对项目的某个版本独立提取出来的内容。这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改。

### 暂存区域

暂存区域是一个文件，保存了下次将提交的文件列表信息，一般在 Git 仓库目录中。有时候也被称作"索引"，不过一般说法还是叫暂存区域。

### 基本的 Git 工作流程

1. 在工作目录中修改文件。

2. 暂存文件，将文件的快照放入暂存区域。

3. 提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录。 

## git的安装

### Linux上安装

以Fedora 上为例：

```shell
 sudo yum install git
```

如果你在基于 Debian 的发行版上：

```shell
 sudo apt-get install git
```

### Mac上安装

最简单的方法是安装 Xcode或者[git官网](https://git-scm.com/) 下载二进制文件安装

### Windows上安装

在 Windows 上安装 Git 也有几种安装方法。官方版本可以在 Git 官方网站下载。

### 从源代码安装

如果你想从源码安装 Git，需要安装 Git 依赖的库：curl、zlib、openssl、expat，还有libiconv。

如果你的系统上有 yum （如 Fedora）或者 apt-get（如基于 Debian 的系统），可以使用以下命令之一来安装最小化的依赖包来编译和安装Git的二进制版：

```shell
sudo yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
sudo apt-get install libcurl4-gnutls-dev libexpat1-dev gettext  libz-dev libssl-dev
```

为了能够添加更多格式的文档（如 doc, html, info），你需要安装以下的依赖包：

```shell
 sudo yum install asciidoc xmlto docbook2x
 sudo apt-get install asciidoc xmlto docbook2x
```

从 GitHub 网站上的镜像来获得最新发布版本的 tar 包

```shell
 tar -zxf git-2.0.0.tar.gz
 cd git-2.0.0
 make configure
 ./configure --prefix=/usr
 make all doc info
 sudo make install install-doc install-html install-info
```

## git的配置

### 初次启动（配置环境变量）

对于Linux系统，Git 自带一个 git config 的工具来帮助设置控制 Git 外观和行为的配置变量。这些变量存储在三个不同的位置：

1. **/etc/gitconfig** 文件: 包含系统上每一个用户及他们仓库的通用配置。 如果使用带有 --system 选项的git config 时，它会从此文件读写配置变量。
2. ~/.gitconfig 或 ~/.config/git/config 文件：只针对当前用户。 可以传递 --global 选项让 Git读写此文件。
3. 当前使用仓库的 Git 目录中的 config 文件（就是 .git/config）：针对该仓库。

每一个级别覆盖上一级别的配置，所以 .git/config 的配置变量会覆盖 /etc/gitconfig 中的配置变量。

对于windows系统，Git 会查找 $HOME$ 目录下（一般情况下是 C:\Users\\$USER$）的 .gitconfig 文件。

### 设置用户信息

每一次 Git 的提交都会使用这些信息，并且它会写入到你的每一次提交中，不可更改：

```shell
 git config --global user.name "Mr.W"	#配置用户名
 git config --global user.email xxxxxxxx@qq.com	#配置邮箱
```

使用--global代表全局设置，该命令只需要运行一次，之后无论你在该系统上做任何事情， Git 都会使用这些信息。

当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行不带 --global 选项的命令来配置。

### 指定文本编辑器

Git 会使用操作系统默认的文本编辑器，通常是 Vim。如果你想使用不同的文本编辑器，例如 Emacs，可以这样做：

```shell
git config --global core.editor emacs
```

### 检查配置信息

如果想要检查你的配置，可以使用 git config --list 命令来列出所有 Git 当时能找到的配置。

```shell
 git config --list
```

可以通过输入 git config  <key>： 来检查 Git 的某一项配置：

```shell
git config user.name
```

### 获取帮助手册

```shell
git help <verb> #方式一
git <verb> --help #方式二
man git-<verb> #在linux上可以方式三
```

## git基础

### 获取git仓库

1. 在现有项目或目录下导入所有文件到 Git 中
2. 从一个服务器克隆一个现有的 Git 仓库

### 初始化仓库

进入该项目目录并输入：

```shell
git init
```

该命令将创建一个名为 .git 的子目录，这个子目录含有你初始化的 Git 仓库中所有的必须文件，这些文件是Git 仓库的核心。

如果你是在一个已经存在文件的文件夹（而不是空文件夹）中初始化 Git 仓库来进行版本控制的话，你应该开始跟踪这些文件并提交。你可通过 git add 命令来实现对指定文件的跟踪，然后执行 git commit 提交：

```shell
 git add *.c
 git add LICENSE
 git commit -m 'initial project version'
```

### 克隆仓库

如果你想获得一份已经存在了的 Git 仓库的拷贝，比如说，你想为某个开源项目贡献自己的一份力，这时就要用到 git clone 命令。当执行 git clone 命令的时候，默认配置下远程 Git 仓库中的每一个文件的每一个版本都将被拉取下来。

```shell
git clone [url]
```

如果你想在克隆远程仓库的时候，自定义本地仓库的名字，你可以使用如下命令：

```shell
git clone [url] 本地仓库的名字
```

经常报错: `OpenSSL SSL_read: Connection was reset, errno 10054`解决方法如下：

```shell
git config --global http.sslVerify "false"
```

Git 支持多种数据传输协议。上面的例子使用的是 https:// 协议，不过你也可以使用 git:// 协议或者使用SSH 传输协议，比如 user@server:path/to/repo.git 

### 记录每次更新到仓库

工作目录下的每一个文件都不外乎这两种状态：已跟踪或未跟踪。**已跟踪的文件**是指那些被纳入了版本控制的文件，在上一次快照中有它们的记录，在工作一段时间后，它们的状态可能处于未修改，已修改或已放 入暂存区。工作目录中除已跟踪文件以外的所有其它文件都属于**未跟踪文件**，它们既不存在于上次快照的记录中，也没有放入暂存区。初次克隆某个仓库的时候，工作目录中的所有文件都属于已跟踪文件，并处于未修改状态。

编辑过某些文件之后，由于自上次提交后你对它们做了修改，Git 将它们标记为已修改文件。我们逐步将这些修改过的文件放入暂存区，然后提交所有暂存了的修改，如此反复。使用 Git 时文件的生命周期如下：

![记录每次更新到仓库](https://s1.ax1x.com/2022/06/19/XjBF76.png)

### 检查当前文件状态

要查看哪些文件处于什么状态，可以用 git status 命令

```shell
git status
```

如果在克隆仓库后立即使用此命令，会看到类似这样的输出：

```shell
On branch master
nothing to commit, working directory clean
```

这说明你现在的工作目录相当干净。换句话说，所有已跟踪文件在上次提交后都未被更改过。此外，上面的信息 还表明，当前目录下没有出现任何处于未跟踪状态的新文件，否则 Git 会在这里列出来。最后，该命令还显示了当前所在分支，并告诉你这个分支同远程服务器上对应的分支没有偏离。现在，分支名是 “master”,这是默认的分支名。

### 跟踪新文件

使用命令 git add 开始跟踪一个文件。所以，要跟踪 `README` 文件，运行：

```shell
git add README
```

此时再运行 git status 命令，会看到 `README` 文件已被跟踪，并处于暂存状态：

```shell
git status

On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
    new file: README
```

只要在 Changes to be committed 这行下面的，就说明是已暂存状态。如果此时提交，那么该文件此时此刻的版本将被留存在历史记录中。

### 暂存已修改文件

现在我们来修改一个已被跟踪的文件。如果你修改了一个名为 Git.md 的已被跟踪的文件，然后运行 git status 命令，会看到下面内容：

```shell
On branch master
No commits yet
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   Git.md
        new file:   README
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   Git.md
```

文件 `Git.md` 出现在 Changes not staged for commit 这行下面，说明已跟踪文件的内容发生了变化，但还没有放到暂存区。

要暂存这次更新，需要运行 git add 命令。这是个多功能命令：可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等。将这个命令理解为“添加内容到下一次提交中”而不是“将一个文件添加到项目中”要更加合适。

```shell
git add Git.md
git status

On branch master
No commits yet
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   Git.md
        new file:   README
```

现在两个文件都已暂存，下次提交时就会一并记录到仓库。假设此时，你想要在 CONTRIBUTING.md 里再加条注释，重新编辑存盘后，准备好提交。不过且慢，再运行 git status 看看：

```shell
On branch master
No commits yet
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   Git.md
        new file:   README
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   Git.md
```

现在 `Git.md` 文件同时出现在暂存区和非暂存区。实际上 Git 只不过暂存了你运行 git add 命令时的版本，如果你现在提交，`Git.md` 的版本是你最后一次运行git add 命令时的那个版本，而不是你运行 git commit 时，在工作目录中的当前版本。所以，运行了 git add 之后又作了修订的文件，需要重新运行 git add 把最新版本重新暂存起来：

```shell
 git add Git.md
 git status 

 On branch master
 No commits yet
 Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   Git.md
        new file:   README
```

### 状态简览

git status 命令的输出十分详细，但其用语有些繁琐。如果你使用 git status -s 命令或 git status --short 命令，你将得到一种更为紧凑的格式输出。

```sh
git status -s

 M README
MM Rakefile
A lib/git.rb
M lib/simplegit.rb
?? LICENSE.txt
```

新添加的未跟踪文件前面有 ?? 标记，新添加到暂存区中的文件前面有 A 标记，修改过的文件前面有 M 标记。你可能注意到了 M 有两个可以出现的位置，出现在右边的 M 表示该文件被修改了但是还没放入暂存区，出现在靠左边的 M 表示该文件被修改了并放入了暂存区。例如，上面的状态报告显示： `README` 文件在工作区被修改了但是还没有将修改后的文件放入暂存区,`lib/simplegit.rb` 文件被修改了并将修改后的文件放入了暂存区。而`Rakefile` 在工作区被修改并提交到暂存区后又在工作区中被修改了，所以在暂存区和工作区都有该文件被修改了的记录。

### 忽略文件(`.gitignore`)

一般我们总会有些文件无需纳入 Git 的管理，也不希望它们总出现在未跟踪文件列表。通常都是些自动生成的文 件，比如日志文件，或者编译过程中创建的临时文件等。在这种情况下，我们可以创建一个名为 `.gitignore`的文件，列出要忽略的文件模式。来看一个实际的例子：

```shell
cat .gitignore

*.[oa]
*~
```

文件 `.gitignore` 的格式规范如下： 

- 所有空行或者以 `＃` 开头的行都会被 Git 忽略。 
- 可以使用标准的 glob 模式匹配。 
- 匹配模式可以以`/`开头防止递归。 
-  匹配模式可以以`/`结尾指定目录。 
-  要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。

所谓的 glob 模式是指 shell 所使用的简化了的正则表达式。星号`*`匹配零个或多个任意字符；`[abc]` 匹配任 何一个列在方括号中的字符（这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c）；问号`?`只匹配一个任意字符；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配（比如 `[0-9]` 表示匹配所有 0 到 9 的数字）。使用两个星号`**` 表示匹配任意中间目录，比如`a/**/z` 可以匹配 `a/z`,`a/b/z` 或 `a/b/c/z`等。

### 查看已暂存和未暂存的修改

如果 git status 命令的输出对于你来说过于模糊，你想知道具体修改了什么地方，可以用 git diff 命令。git diff 将通过文件补丁的格式显示具体哪些行发生了改变。

```shell
git diff

warning: LF will be replaced by CRLF in Git.md.
The file will have its original line endings in your working directory
diff --git a/Git.md b/Git.md
index b49f414..661e036 100644
--- a/Git.md
+++ b/Git.md
@@ -1,3 +1,4 @@
 Git Test
 Modified
 Second Modified
+Third Modified
```

此命令比较的是工作目录中当前文件和暂存区域快照之间的差异，也就是修改之后还没有暂存起来的变化内容。

若要查看已暂存的将要添加到下次提交里的内容，可以使用 git diff --staged

### 提交更新

现在的暂存区域已经准备妥当可以提交了。在此之前，请一定要确认还有什么修改过的或新建的文件还没有 git add 过，否则提交的时候不会记录这些还没暂存起来的变化。所以，每次准备提交前，先用 git status 看下，是不是都已暂存起来了，然后再运行提交命令 git commit：

```shell
git commit
```

默认的提交消息包含最后一次运行 git status 的输出，放在注释行里，另外开头还有一空行，供你输入提交说明。如果想要更详细的对修改了哪些内容的提示，可以用 -v 选项，这会将你所做的改变的 diff 输出放到编辑器中从而使你知道本次提交具体做了哪些修改。

另外，你也可以在 commit 命令后添加 -m 选项，将提交信息与命令放在同一行：

```shell
git commit -m "git second commit"
```

#### 跳过使用暂存区域

尽管使用暂存区域的方式可以精心准备要提交的细节，但有时候这么做略显繁琐。Git 提供了一个跳过使用暂存区域的方式，只要在提交的时候，给 git commit 加上 -a 选项，Git 就会自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 git add 步骤：

```sh
git commit -a -m "git third commit"
```

### 移除文件

要从 Git 中移除某个文件，就必须要从已跟踪文件清单中移除（确切地说，是从暂存区域移除），然后提交。`可以用 git rm 命令完成此项工作，并连带从工作目录中删除指定的文件`，这样以后就不会出现在未跟踪文件清单了。

如果只是简单地从工作目录中手工删除文件，运行 git status 时就会在 “Changes not staged for commit” 部分（也就是未暂存清单）看到：

```shell
git rm README
git status

On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        deleted:    README
```

下一次提交时，该文件就不再纳入版本管理了。如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 `-f`。这是一种安全特性，用于防止误删还没有添加到快照的数据，`这样的数据不能被 git 恢复`。

另外一种情况是，`我们想把文件从 Git 仓库中删除（亦即从暂存区域移除），但仍然希望保留在当前工作目录中`。

```shell
 git rm --cached test.txt
 git status
 
 On branch master
 Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        deleted:    test.txt
 Untracked files:
  (use "git add <file>..." to include in what will be committed)
        test.txt
```

### 移动文件

```shell
git mv Git.md git.md
git status

On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        renamed:    Git.md -> git.md
        deleted:    test.txt
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        test.txt
```

其实，运行 git mv 就相当于运行了下面三条命令：

```shell
mv README.md README
git rm README.md
git add README
```

### 查看提交历史

在提交了若干更新，又或者克隆了某个项目之后，你也许想回顾下提交历史.完成这个任务最简单而又有效的工具是 git log 命令。

```shell
git log
```

默认不用任何参数的话，git log 会按提交时间列出所有的更新，最近的更新排在最上面。

git log 有许多选项可以帮助你搜寻你所要找的提交，接下来我们介绍些最常用的。一个常用的选项是 -p，用来显示每次提交的内容差异。你也可以加上 -2 来仅显示最近两次提交：

```shell
git log -p -2
```

你也可以为 git log 附带一系列的总结性选项。比如说，如果你想看到每次提交的简略的统计信息，你可以使用 --stat 选项：

```shell
git log --stat
```

另外一个常用的选项是 --pretty。这个选项可以指定使用不同于默认格式的方式展示提交历史。这个选项有一些内建的子选项供你使用。比如用 oneline 将每个提交放在一行显示，查看的提交数很大时非常有用。另外还有short，full 和 fuller 可以用，展示的信息或多或少有些不同。

```shell
 git log --pretty=oneline
```

有用的是 format，可以定制要显示的记录格式。

```shell
git log --pretty=format:"%h - %an, %ar : %s"
```

git log --pretty=format 常用的选项 列出了常用的格式占位符写法及其代表的意义。

![git log](https://s1.ax1x.com/2022/06/19/XjBEtO.png)

当 oneline 或 format 与另一个 log 选项 --graph 结合使用时尤其有用。这个选项添加了一些ASCII字符串来形象地展示你的分支、合并历史：

```shell
 git log --pretty=format:"%h %s" --graph
```

git log 的常用选项:

![git log 的常用选项](https://s1.ax1x.com/2022/06/19/XjBVhD.png)

#### 限制输出长度

除了定制输出格式的选项之外，git log 还有许多非常实用的限制输出长度的选项，也就是只输出部分提交信息。之前你已经看到过 -2 了，它只显示最近的两条提交，实际上，这是 -<n> 选项的写法，其中的 n 可以是任何整数，表示仅显示最近的若干条提交。不过实践中我们是不太用这个选项的，Git 在输出所有提交时会自动调 用分页程序，所以你一次只会看到一页的内容。

另外还有按照时间作限制的选项，比如 --since 和 --until 也很有用。例如，下面的命令列出所有最近两周内的提交：

```shell
git log --since=2.weeks
```

另一个非常有用的筛选选项是 -S，可以列出那些添加或移除了某些字符串的提交。比如说，你想找出添加或移除了某一个特定函数的引用的提交，你可以这样使用：

```sh
git log -SModified
```

 限制 git log 输出的选项:

![限制 git log 输出的选项](https://s1.ax1x.com/2022/06/19/XjBAAK.png)

### 撤消操作

在任何一个阶段，你都有可能想要撤消某些操作。这里，我们将会学习几个撤消你所做修改的基本工具。

有时候我们提交完了才发现漏掉了几个文件没有添加，或者提交信息写错了。此时，可以运行带有 --amend 选项的提交命令尝试重新提交，这个命令会将暂存区中的文件提交。：

```shell
git commit --amend
```

如果自上次提交以来你还未做任何修改（例如，在上次提交后马上执行了此命令），那么快照会保持不变，而你所修改的只是提交信息。

#### 取消暂存的文件

例如，你已经修改了两个文件并且想要将它们作为两次独立的修改提交，但是却意外地输入了git add * 暂存了它们两个。如何只取消暂存两个中的一个呢？

```shell
 git reset HEAD CONTRIBUTING.md
```

#### 撤消对文件的修改

如果你并不想保留对 CONTRIBUTING.md 文件的修改怎么办？你该如何方便地撤消修改 - 将它还原成上次提交时的样子（或者刚克隆完的样子，或者刚把它放入工作目录时的样子）？

```shell
 git checkout -- CONTRIBUTING.md
```

## git远程仓库

>远程仓库是指托管在因特网或其他网络中的你的项目的版本库。

### 查看远程仓库

如果想查看你已经配置的远程仓库服务器，可以运行 git remote 命令。它会列出你指定的每一个远程服务器的简写。如果你已经克隆了自己的仓库，那么至少应该能看到 origin - 这是 Git 给你克隆的仓库服务器的默认名字：

```shell
git remote
```

你也可以指定选项 -v，会显示需要读写远程仓库使用的 Git 保存的简写与其对应的 URL。

```shell
git remote -v
```

### 添加远程仓库

首先在github上创建一个仓库，然后clone到本地，再然后运行git remote add <shortname> <url> 添加一个新的远程 Git 仓库，同时指定一个你可以轻松引用的简写：

```shell
git remote add gs https://github.com/mygit-WK/gStudy.git
```

现在你可以在命令行中使用字符串 gs来代替整个 URL。例如，如果你想拉取 Paul 的仓库中有但你没有的信息，可以运行 git fetch gs：

```shell
git fetch gs
```

### 从远程仓库中抓取与拉取

从远程仓库中获得数据，可以执行：

```sh
git fetch [remote-name]
```

这个命令会访问远程仓库，从中拉取所有你还没有的数据。执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。 

如果你使用 clone 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写。所以git fetch origin 会抓取克隆（或上一次抓取）后新推送的所有工作。必须注意 git fetch 命令会将数据拉取到你的本地仓库它并不会自动合并或修改你当前的工作。

如果你有一个分支设置为跟踪一个远程分支，可以使用 git pull 命令来自动的抓取然后合并远程分支到当前分支。默认情况下，git clone 命令会自动设置本地 master 分支跟踪克隆的远程仓库的 master 分支（或不管是什么名字的默认分支）。运行 git pull 通常会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支。

### 推送到远程仓库

当你想分享你的项目时，必须将其推送到上游。这个命令很简单：git push [remote-name] [branch-name]。当你想要将 master 分支推送到 origin 服务器时（再次说明，克隆时通常会自动帮你设置好那两个名字），那么运行这个命令就可以将你所做的备份到服务器：

```shell
 git push origin master
```

只有当你有所克隆服务器的写入权限，并且之前没有人推送过时，这条命令才能生效。当你和其他人在同一时间克隆，他们先推送到上游然后你再推送到上游，你的推送就会毫无疑问地被拒绝。你必须先将他们的工作拉取下来并将其合并进你的工作后才能推送。

### 查看远程仓库

如果想要查看某一个远程仓库的更多信息，可以使用 git remote show [remote-name] 命令。如果想以一个特定的缩写名运行这个命令，例如 origin，会得到像下面类似的信息：

```sh
git remote show origin
```

### 远程仓库的移除与重命名

如果想要重命名引用的名字可以运行 git remote rename 去修改一个远程仓库的简写名。

```shell
 git remote rename gs gitstudy
```

可以使用 git remote rm 来移除远程仓库：

```sh
 git remote rm gitstudy
```

## git标签

### 列出标签

```sh
 git tag
```

### 创建标签

Git 使用两种主要类型的标签：轻量标签（lightweight）与附注标签（annotated）

在 Git 中创建一个附注标签是很简单的。最简单的方式是当你在运行 tag 命令时指定 -a 选项，-m 选项指定了一条将会存储在标签中的信息。如果没有为附注标签指定一条信息，Git 会运行编辑器要求你输入信息：

```sh
 git tag -a v1.0 -m 'my version 1.0'
```

通过使用 git show 命令可以看到标签信息与对应的提交信息：

```sh
 git show v1.0
```

另一种给提交打标签的方式是使用轻量标签。轻量标签本质上是将提交校验和存储到一个文件中,没有保存任何其他信息。创建轻量标签，不需要使用 -a、-s 或 -m 选项，只需要提供标签名字：

```sh
 git tag v1.0-lw
```

### 后期打标签

你也可以对过去的提交打标签。现在，假设在 v1.2 时你忘记给项目打标签，也就是在 “updated rakefile” 提交。你可以在之后补上标签。要在那个提交上打标签，你需要在命令的末尾指定提交的校验和（或部分校验和）:

```shell
 git tag -a v1.2 9fceb02
```

### 共享标签

默认情况下，git push 命令并不会传送标签到远程仓库服务器上。在创建完标签后你必须显式地推送标签到共享服务器上。这个过程就像共享远程分支一样 - 你可以运行 git push origin [tagname]。

```shell
git push origin v1.5
```

如果想要一次性推送很多标签，也可以使用带有 --tags 选项的 git push 命令。这将会把所有不在远程仓库服务器上的标签全部传送到那里。

```sh
 git push origin --tags
```

### 检出标签

在 Git 中你并不能真的检出一个标签，因为它们并不能像分支一样来回移动。如果你想要工作目录与仓库中特定的标签版本完全一样，可以使用 git checkout -b [branchname] [tagname] 在特定的标签上创建一个新分支：

```shell
git checkout -b version2 v2.0.0
```

### Git 别名

Git 并不会在你输入部分命令时自动推断出你想要的命令。如果不想每次都输入完整的 Git 命令，可以通过 gitconfig 文件来轻松地为每一个命令设置一个别名。这里有一些例子你可以试试：

```shell
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
```

这意味着，当要输入 git commit`时，只需要输入 `git ci。

可以向 Git 中 添加你自己的取消暂存别名：

```shell
git config --global alias.unstage 'reset HEAD --'
```

等价于：

```shell
git unstage fileA
git reset HEAD -- fileA
```

通常也会添加一个 last 命令，可以轻松地看到最后一次提交：

```sh
git config --global alias.last 'log -1 HEAD'
```

