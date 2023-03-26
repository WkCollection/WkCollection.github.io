---
title: Nodejs
date: 2022-06-20 19:52:10
tags: 
- Nodejs
categories: 
- Node
---

# Nodejs学习

## Node简介

> Nodejs是一个建立在Chrome的Javascript的V8引擎上的一个Javascript运行时环境。简单的说Nodejs就是运行在服务端的Javascript。其具有1）异步IO，2）事件与回调函数，3）单线程，4）跨平台的特点。

### 异步IO

```javascript
$.post('/url', {title: 'Node.js'}, function (data) {
console.log('收到响应');
});
console.log('发出Ajax结束 ');
```

收到ֽ响应是在发出Ajax结束之后输出的。在使用$.post()后，后续代码是立即被执行的，而收到ֽ响应的执行时间是不被预期的。我们只知道它将在这个异步请求结束后执行但是并不知道具体的时间点。  

### 事件与回调

Node创建一个Web服务器，并监听8080端口。对于服务器，绑定了request事件，对于请求对象，我们绑定了on和end事件。  

```javascript
var http = require('http');
var querystring = require('querystring');
http.createServer(function (req, res) {
    var postData = '';
    req.setEncoding('utf8');
    req.on('data', function (trunk) {
    	postData += trunk;
    });
    req.on('end', function () {
    	res.end(postData);
    });
}).listen(8080);
console.log('服务器启完成');
```

```javascript
$.ajax({
    'url': '/url',
    'method': 'POST',
    'data': {},
    'success': function (data) {
    	// success事件
    }
});
```

### 单线程

Node保持了JavaScript在浏览器中单线程的特点。而且在Node中，JavaScript与其余线程是无法共享任何状态的。单线程的最大好处是不用像多线程编程那样处处在意状态的同步问题,这里没有死锁的存在，也没有线程上下文交换所带来的性能上的开销。

### 跨平台

兼容Windows和*nix平台主要得益于Node在架构层面的改动,它在操作系统与Node上层模块系统之间构建了一层平台层架构,即libuv。目前, libuv已经成为许多系统实现跨平台的基础组件。

### Node应用场景

1. I/O密集型
2. 是否不擅长I/O密集型业务
3. 分布式应用

<!-- more -->

## 模块机制

### CommonJS规范

> CommonJS的提出是希望JS能够在任何地方运行。

CommonJS中涵盖了模块、二进制、Buffer、字符集编码、IO流、进程环境、文件系统、套接字、单元测试、Web服务网关接口、包管理等。

#### CommonJS模块规范

1. 模块引用

   ```javascript
   var math=require('math')
   ```

2. 模块定义

   在模块中，上下文使用require()方法来引入外部模块。对应于引入，exports对象用于导出当前模块的方法或者变量。在模块中还存在一个module对象，他代表模块自身，而exports是module的属性。在Node中，一个文件就是一个模块。

   ```javascript
   //math.js
   exports.add = function () {
       var sum = 0,
       i = 0,
       args = arguments,
       l = args.length;
       while (i < l) {
           sum += args[i++];
       }
       return sum;
   };
   ```

   在另一个文件中，我们通过require()引入模块后，就能使用定义的属性和方法了。

   ```javascript
   // program.js
   var math = require('math');
   exports.increment = function (val) {
   	return math.add(val, 1);
   };
   ```

3. 模块标识

   模块标识就是传递给require()的参数，必须是小驼峰命名的字符串、相对路径或者绝对路径，可以不含后缀js。

## 异步编程



## 内存控制和理解Buffer

## 网络编程

## 构建web

## 实现进程

## 测试与产品化



