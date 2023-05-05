---
title: C语言突破
date: 2022-07-11 21:49:56
tags: 
- C
categories: 
- C
top: true
---

# C

> C语言相关知识点深入理解

## 第一关：C和指针

### 整型

整型分为有符号和无符号。

整型值相互之间的规则是：长整型至少应该和整型一样长，而整型至少应该和短整型一样长。

### 浮点类型

浮点数在缺省情况下都是double类型的，加L或l表示为long double类型的，或者加F或f表示是float类型的值。

### 宽字符常量

如果一个多字节字符常量前面带有一个L，那么他就是宽字符常量。例如：`L‘X’`

### 作用域

#### 代码块作用域

位于一对花括号之间的所有语句都称为一个代码块，任何在代码块的开始位置声明的标识符都具有代码块作用域。

#### 文件作用域

任何在所有代码块之外声明的标识符都具有文件作用域。

#### 原型作用域

原型作用域只适用于在函数原型中声明的参数名。

#### 函数作用域

函数作用域只适用于语句标签，指在函数内声明的所有变量在函数体内始终是可见的,可以在整个函数的范围内使用及复用。

### 枚举类型

枚举类型的实质是以整型形式进行存储的，符号名其实都是整型值。如果某个符号未显式复制那个他的值就比前面的一个符号名的值大1。第一个未命名的初始化为0。

### 可变参数列表

可变参数列表是通过stdarg宏实现的，位于stdarg.h头文件。函数声明了一个var_arg的变量，用于访问参数列表未确定部分，通过调用va_start来初始化，第一个参数是va_list变量的名字，第二个参数是省略号前最后一个有名字的参数。为了访问这个参数，需要使用va_arg这个宏，这个宏接受两个参数，va_list和参数列表中下一个参数的类型。访问完毕后使用va_end函数。

### 字符串常量

K&R C并没有提及一个字符串常量中的字符是否可以被修改，但是其表明具有相同值的不同字符在内存中是分开存储的，因此许多编译器运行程序修改字符串常量。

ANSI C则表明如果对一个字符串常量进行修改，效果是未定义的。他也允许编译器将一个字符串常量存储于一个地方，即使其在一个程序中多次出现。因此许多ANSI C编译器不允许修改字符串常量。

字符串常量在程序中使用会生成一个"指向字符的常量指针"。

```c
char *message = "Hello";
/*等价于
char *message;
message = “Hello”;
*/
```

### 指针与常量

```cpp
int const *p;//可以修改指针的值，无法修改指针指向的值
int * const p1;//指针为常量无法修改，指针指向的值可以修改
int const * const p2;//指针的指向和指针指向的值都不可以改变
```

<!--more-->

### 链接属性

1. ##### external：无论被声明多少次，位于不同源文件的都表示同一个实体

2. ##### internal：在同一个源文件内的所有声明中都指向同一个实体，不同源文件属于不同实体

3. ##### none：总是被当做单独的个体

`关键字extern和static可用来修改链接属性，使用static可以使得链接属性变为internal,但是只对缺省的external有效`

`当extern关键字用于标识符第一次声明，指定有external属性，用于变量第二次或以后的声明则不会更改第一次声明的链接属性`

### 编译和链接

1. 编译一个源文件main.c

   ```shell
   gcc main.c
   ```

   会产生一个a.exe的可执行程序

2. 编译并链接几个C源文件

   ```shell
   gcc main.c hello.c
   ```

3. 编译一个源文件并把其和现存文件链接在一起

   ```shell
   gcc main.o hello.c
   ```

4. 编译单个C源文件，并产生目标文件

   ```shell
   gcc -c main.c
   ```

5. 编译几个C源文件，并为每个文件产生一个目标文件

   ```shell
   gcc -c main.c hello.c
   ```

### 存储类型

凡是存在于任何代码块之外声明的变量总是存储于静态内存中，即存储在全局区中，存在于全局区的变量于程序运行前创建，在程序执行的整个期间始终存在，始终保持原来的值，除非赋新的值。

在代码块内部声明的变量的缺省类型是自动的，存储于堆栈中，`在程序执行到声明的变量时，该变量才被创建，当程序的执行离开代码块时，该变量被销毁`。在代码块内部给声明的变量加上static可以让变量放到全局区内去，但是该变量的作用域依旧不变。

register关键字可以用于自动变量的声明，表示这个变量应该存储于寄存器中而不是内存中，也被称为寄存器变量。通常寄存器变量比内存的变量访问效率更高，但是寄存器不一定会理睬寄存器变量，只会选取前几个实际存储于寄存器中。

### 指向数组的指针

int	(*p)[10]表示声明了一个指向带有10个整型的数组的指针。

### 字符串常用函数

#### 字符串长度

```c
char *msg = "Hello World!";
size_t len = strlen(msg);
printf("msg的长度是:%d\n", len);
```

#### 复制字符串

`strcpy`返回目标函数的一个拷贝

```c
char *msg = "Hello World!";
char copy[20];
strcpy(copy, msg);
printf("copy数组内为:%s\n", copy);
```

#### 连接字符串

```c
char str3[] = "I Love ";
char str4[] = "China";
strcat(str3, str4);
printf("str3为:%s\n", str3);
```

#### 字符串比较

```c
char str[] = "bceg";
char str1[] = "abceg";
int  result = strcmp(str, str1);
if(result > 0) {
	printf("str大于str1\n");
} else if(result < 0) {
	printf("str小于str1\n");
} else {
	printf("str等于str1\n");
}
```

### 内存操作

#### memcpy：`void* memcpy( void *dest, const void *src, size_t count );`

从 `src` 所指向的对象复制 `count` 个字节到 `dest` 所指向的对象。

```c
char msg[13] = "Hello World~";
char msgDst[13];
memcpy(msgDst, msg, 13);
printf("msgDst is %s\n", msgDst);
```

#### memmove：`void* memmove( void* dest, const void* src, size_t count );`

 从 `src` 所指向的对象复制 `count` 个字节到 `dest` 所指向的对象。与memcpy不同的是，memmove的源和目标数可以重叠。也就是说`src`和`dest`可以相同。

```c
char msgSrc[5] = "Hello";
char msgDstTwo[6];
memmove(msgDstTwo, msgSrc, 5);
printf("msgDstTwo is %s\n", msgDstTwo);
```

#### memcmp：`int memcmp( const void* lhs, const void* rhs, size_t count );`

比较 `lhs` 和 `rhs` 所指向对象的首 `count` 个字节。如果`lhs`小于`rhs`则小于0；如果`lhs`大于`rhs`则大于0;如果`lhs`等于`rhs`则等于0。

```c
char info[] = "Hi,I am Tom";
char infoTwo[] = "hi,I am Tom";
int  result = memcmp(info, infoTwo, 12);
if(result > 0) {
	printf("info大于infoTwo\n");
} else if(result < 0) {
	printf("info小于infoTwo\n");
} else {
	printf("info等于infoTwo\n");
}
```

#### memchr：`void* memchr( const void* ptr, int ch, size_t count );`

从`ptr`的起始位置开始查找`ch`的首次出现的位置，返回一个指向该位置的指针。

```c
char info[] = "Hi,I am Tom";
char *p = memchr(info, 97, 12);
printf("*p is %s\n", p);
```

#### memset：`void *memset( void *dest, int ch, size_t count );`

从 `dest`开始的`count`个字节都设置为`ch` 。

```c
int zero[20];
memset(zero, 0, sizeof(zero));
for(int i = 0; i < sizeof(zero) / sizeof(zero[0]); i++) {
	printf("zero[%d] = %d\n", i, zero[i]);
}
```

### 动态内存分配

动态内存分配两个主要的函数`malloc`和`free`。

`malloc`和`calloc`都用于分配内存，区别在于后者在返回指向内存的指针前会将其初始化为0。

## 第二关：C陷阱与缺陷

### 词法陷阱

#### =不等于==

#### &和|不同于&&和||

&和I常用于位运算，&&和||则常用语进行逻辑运算。

#### 词法分析的贪心法

贪心法就是指如果输入的数据截止到某个字符之前已经被分解为一个个符号，那么下一个符号也将包括从该字符之后可能组成的一个符号的最长字符串。

#### 整型常量

如果整型常量第一个字符是0，那么这个常量被视为八进制数。

#### 字符与字符串

用双引号引起的字符串，代表的是一个指向无名数组起始字符的指针，而单引号引起的字符实际上是一个整数。

## 第三关：C专家编程

### 第一章	穿越时空的迷雾

C语言的诞生历史非常有趣，C语言诞生于一个失败的项目。1969年通用电气、麻省理工和贝尔实验室创立了一个庞大的项目——Multics工程。项目目标是建立一个操作系统，但是最终以失败告终。

#### 根据编译器设计者的思路形成的语言特性

1. 数组下标从0而不是1开始

2. C语言的基本数据类型直接与底层硬件相关

    C语言并不时一开始就支持浮点数的，是因为硬件系统能够支持浮点数后才增加了对浮点数的支持。

3. auto关键字显然是摆设

    auto其实就是缺省的变量内存分配模式。

4. 表达式中的数组可以看作指针

    这样做的好处就是将数组传递给函数时就不用再将数组所有的内容复制一遍。

5. float被自动拓展为double

6. 不允许使用嵌套函数（主要指的是函数的内部包含另一个函数的定义）

7. register关键字

    这个关键字主要是用于程序中那些经常被使用的变量。

1978年，C语言经典著作《The C Programming Language》出版了。这本受到了广泛的赞誉，所以其作者Brian Kernighan和Dennis Ritchie出名了，因此这个版本的C语言被称为K&R C。

1989年12月，C语言标准草案最终呗ANSI委员会接纳，随后ISO也接纳了ANSI C标准。我们常说的标准C其实就是ISO C。

#### 如何写出可移植的代码

1. 只使用已确定的特性
2. 不突破任何由编译器实现的限制
3. 不产生任何依赖由编译器定义的或未确定的或未定义的特性的输出

### 第二章	这不是Bug，而是语言特性

`NUL与NULL的区别`

1. NUL用于表示'\0'
2. NULL用于表示什么也不指向（空指针）

ANSI新特性：

- 相邻的字符串常量被自动合并成一个字符串

`当sizeof的操作数是类型名时。两边必须加上括号，如果操作数是变量则不必加括号`

### 第三章	分析C语言的声明

枚举类型和宏定义相比有一个优点：宏定义一般在编译时会被丢掉但是枚举类型在调试器中是可见的，尽量使用枚举类型。

#### 理解C语言声明的优先级规则

1. 声明从名字开始，然后按照优先级顺序依次读取
2. 优先级从高到低依次为：
   - 声明中被括号括起来的部分
   - 后缀操作符：括号（）表示这是一个函数，而方括号[]表示这是一个数组
   - 前缀操作符：星号*表示“指向...的指针”
3. 如果const和volatie关键字的后面紧跟类型说明符如（int，long等），那么它作用于类型说明符。在其他情况下，const和volatile关键字作用于其左边紧邻的指针星号。

#### typedef和define的区别

1. 可以用其他类型说明符对宏类型进行拓展，但是对于typedef所定义的类型名却不能

   ```C
   #define peach int 
   unsigned peach int;
   typedef int banana;
   //下面的写法错误
   //unsigned banana i;
   ```

2. 在连续的几个变量声明中，用typedef所定义类型能保证声明中所有变量均为同一种类型，define则不行。

   ```c
   #define int_ptr int *
   int_ptr chalk,chese;
   //经过宏拓展
   int *chalk,chese;//两者类型不一致
   ```

   typedef的用法:

   - 数组、指针、结构以及函数的组合类型
   - 可移植类型上

### 第四章	数组和指针并不相同

#### 定义和声明的区别

声明相当于普通的声明：他所说的并非自身，而是描述其他地方的创建的对象

定义相当于特殊的声明：它为对象分配内存

### 第五章	对链接的思考

绝大多数编译器是由多达六七个小程序组成，这些程序都是又一个叫作编译器程序驱动器的控制程序来调用。可以单独从编译器分离出来的单独程序包括：预处理器、语法和语义检查器、代码生成器、汇编程序、优化器、链接器和一个调用这些程序并向各个程序传递正确选项的驱动器程序。

动态链接的主要目的就是把程序与他们所使用的特定函数库版本分离开来，取而代之的是，我们约定由系统向程序提供一个接口，该接口保持稳定，不随时间和操作系统的后续版本发生变化。

#### 动态链接可以从两个方面提高性能

1. 动态连接可执行文件比功能相同的静态链接可执行文件体积小
2. 所有动态链接到某个特定函数库的可执行文件在运行时共享该函数库的一个单独拷贝

#### 函数库链接的5个秘密

1. 动态库文件的拓展名是“.so”,而静态库文件的拓展名“.a”
2. 可以通过-lthread选项链接到libthread.so文件
3. 编译器在期望的确定的目录找到库
4. 通过头文件，确认所使用的函数库
5. 与提取动态库的符号相比，静态库中符号的提取更为严格

`始终将-l函数库选项放在编译命令行的最右边`

### 第六章	运动的诗章，运行时数据结构

#### a.out的由来

a.out是`assembler output`的缩写，但其实它不是汇编输出，而是链接器输出！保留这个名字属于历史原因。原来在PDP-7尚并不存在链接器，程序是先将所有的源文件链接在一起，然后进行汇编，汇编所产生的程序输出保存在a.out中。后面为PDP-11编写了链接器后，最后一个环节的输出文件依旧沿用了这个命名习惯。

#### 段

目标文件和可执行文件可以有多种不同的格式，但是这些格式有一个共同的概念，那就是段（Segments）。一个段中包含几个section。

在UNIX中一个段就是表示一个二进制文件相关的内容块，而在Inter X86的内存模型中，段表示一种设计的结果。在这种设计中，地址空间并非一个整体，而是分成一些64K大小的区域，称之为段。当一个可执行文件中运行size命令时，它会告诉你这个文件中的三个段（文本段，数据段和bss段）。BSS段只保存没有值的变量，所以事实上它无需保存这些变量的映像。

## 第四关：数据结构与算法分析

### 第一章	链表、栈和队列

#### 链表


### 第二章	树

### 第三章	散列表

### 第四章	优先队列

### 第五章	排序

### 第六章	不相交集

### 第七章	图

### 第八章	算法设计技巧

### 第九章	摊还分析

### 第十章	高级数据结构

## 第五关：Makefile

### 第一章	什么是makefile？

makefile关系到整个工程的编译规则，makefile定义了一些规则来指定哪些文件需要先进行编译，哪些文件需要后进行编译，哪些文件需要重新进行编译，甚至于进行更加复杂的操作。值得一提的是makefile也可以执行操作系统的命令。makefile带来的好处就是——自动化编译，一旦makefile文件写好，只需要一个make命令就可以完成整个工程的完全自动化编译，可以极大的提高软件开发的效率。make是一个解释makefile文件中指令的命令工具。

### 第二章	程序的编译和链接

一般来说对于编译型语言，首先要做的就是将源文件编译成中间代码文件，对于C，C++,在Windwos下来说也就是.obj文件，这个过程就是编译。然后再把大量编译好的目标文件链接在一起合成一个可执行文件，这个过程就是链接。编译时，编译器只检查程序的语法，变量和函数是否被声明，如果未被声明那么编译器会给出警告，此时可以成功生成目标文件，但是在链接过程中，链接器会在所有的目标文件中查找函数的定义，找不到则会报链接错误。

### 第三章	Makefile简介

#### makefile规则

```makefile
target : prerequisites
	command
```

target：可以是一个目标文件，也可以是一个可执行程序，还可以是一个标签。

prerequisites：指要生成那个target所需要的文件或是目标。

command：是指make需要执行的命令，可以是任意是shell命令。

`总结：如果prerequisites中有一个以上的文件比target的文件要新的话，command所定义的命令就会被执行。`

#### makefile例子

```makefile
edit : main.o kbd.o command.o display.o insert.o search.o files.o utils.o
	gcc -o edit main.o kbd.o command.o display.o insert.o search.o files.o utils.o
main.o : main.c defs.h
	gcc -c main.c
kbd.o : kbd.c defs.h command.h
	gcc -c kbd.c
command.o : command.c defs.h command.h
	gcc -c command.c
display.o : display.c defs.h buffer.h
	gcc -c display.c
insert.o : insert.c defs.h buffer.h
	gcc -c insert.c
search.o : search.c defs.h buffer.h
	gcc -c search.c
files.o : files.c defs.h buffer.h command.h
	gcc -c files.c
utils.o : utils.c defs.h
	gcc -c utils.c
clean :
	rm edit main.o kbd.o command.o display.o insert.o search.o files.o utils.o
```

这里要说明一点的是，clean 不是一个文件，它只不过是一个动作名字，有点像 C 语言中的 lable 一样，其冒号后什么也没有，那么，make 就不会自动去找文件的依赖性，也就不会自动执行其后所定义的命令。要执行其后的命令，就要在 make 命令后明显得指出这个lable 的名字。  

#### make的工作方式

在默认的方式下，也就是我们只输入 make 命令。那么

1. make 会在当前目录下找名字叫“Makefile”或“makefile”的文件。
2. 如果找到，它会找文件中的第一个目标文件（target），在上面的例子中，他会找到“edit”这个文件，并把这个文件作为最终的目标文件。
3.  如果 edit 文件不存在， 或是 edit 所依赖的后面的 .o 文件的文件修改时间要比 edit这个文件新，那么，他就会执行后面所定义的命令来生成 edit 这个文件。
4. 如果 edit 所依赖的.o 文件也存在，那么 make 会在当前文件中找目标为.o 文件的依赖性，如果找到则再根据那一个规则生成.o 文件。 
5.  当然，你的 C 文件和 H 文件是存在的啦， 于是 make 会生成 .o 文件， 然后再用 .o 文件生命 make 的终极任务，也就是执行文件 edit 了。  

#### makefile中使用变量

从上面的例子中可以看到`main.o kbd.o command.o display.o insert.o search.o files.o utils.o`被使用了3次。如果工程很大的话，需要依赖的目标文件很多的话，那么就很容易忘掉需要添加的目标文件，为了makefile便于维护，我们可以使用变量，makefile的变量就类似于C语言中的宏。

所以对于需要使用多次的目标文件，可以对其定义一个变量来表示。即`obj = main.o kbd.o command.o display.o insert.o search.o files.o utils.o`。然后通过`$(obj)`来进行使用。经过修改后那么makefile文件如下：

```makefile
obj = main.o kbd.o command.o display.o insert.o search.o files.o utils.o

edit : $(obj)
	gcc -o edit $(obj)
main.o : main.c defs.h
	gcc -c main.c
kbd.o : kbd.c defs.h command.h
	gcc -c kbd.c
command.o : command.c defs.h command.h
	gcc -c command.c
display.o : display.c defs.h buffer.h
	gcc -c display.c
insert.o : insert.c defs.h buffer.h
	gcc -c insert.c
search.o : search.c defs.h buffer.h
	gcc -c search.c
files.o : files.c defs.h buffer.h command.h
	gcc -c files.c
utils.o : utils.c defs.h
	gcc -c utils.c
clean :
	rm edit $(obj)
```

#### make的自动推导功能

GNU的make很强大，可以自动推导文件及其文件依赖后面的命令。只要make看到一个.o文件，他就会自动的将.c文件加在依赖关系中，并且gcc -c也会被自动推导出来。于是改良版plus的makefile如下：

```makefile
obj = main.o kbd.o command.o display.o insert.o search.o files.o utils.o

edit : $(obj)
	gcc -o edit $(obj)

main.o : defs.h
kbd.o : defs.h command.h
command.o : defs.h command.h
display.o : defs.h buffer.h
insert.o : defs.h buffer.h
search.o : defs.h buffer.h
files.o : defs.h buffer.h command.h
utils.o : defs.h

.PHONY : clean
clean :
	rm edit $(obj)
```

`.PHONY` 表示clean是一个伪目标文件。

#### makefile的另一种风格

这种风格就是将相同的.h和.o文件进行收拢。没有上一种情况可以那么清楚的显示依赖关系。

```makefile
obj = main.o kbd.o command.o display.o insert.o search.o files.o utils.o

edit : $(obj)
	gcc -o edit $(obj)

$(obj) : defs.h
kbd.o command.o files.o : command.h
display.o insert.o search.o files.o : buffer.h

.PHONY : clean
clean :
	rm edit $(obj)
```

#### 清空目标文件的makefile最佳规则

一般的风格都是：

```makefile
clean:
	rm edit $(objects)  
```

更为稳健的做法是：

```makefile
.PHONY : clean
clean :
	-rm edit $(objects) 
```

 在 rm 命令前面加了一个小减号的意思就是，也许某些文件出现问题，但不要管，继续做后面的事。当然，clean 的规则不要放在文件的开头，不然，这就会变成 make 的默认目标。 

###  第四章	Makefile全貌

#### makefile的内容

1. 显式规则

   显式规则说明了，如何生成一个或多的的目标文件。这是由 Makefile 的书写者明显指
   出，要生成的文件，文件的依赖文件，生成的命令。  

2. 隐式规则

   由于我们的 make 有自动推导的功能，所以隐晦的规则可以让我们比较粗糙地简略地书
   写 Makefile，这是由 make 所支持的。  

3. 变量

   在 Makefile 中我们要定义一系列的变量，变量一般都是字符串，这个有点类似C 语言中
   的宏，当 Makefile 被执行时，其中的变量都会被扩展到相应的引用位置上。  

4. 文件引用

   一个是在一个makefile文件中包含另一个makefile,类似C的include一样，另一种情况则是根据某些情况指定makefile的有效部分，类似于C语言的#if一样，还有就是定义一个多行的命令。

5. 注释

   makefile中只有行注释，注释是使用`#`号，需要使用到#号的地方可以进行转义。

`makefile中的命令必须以Tab键开头进行缩进。`

#### makefile的文件名

默认情况下，make会寻找文件名为"GNUmakefile","makefile","Makefile"这三个文件。GNUmakefile只支持GNU，大多数都支持："makefile","Makefile"。

如果想要使用别的文件名来书写makefile,可以使用`make -f  文件名`或者`make --file 文件名`来指定特定的文件。

#### 引用其他的makefile文件

在 Makefile 使用 include 关键字可以把别的 Makefile 包含进来，这很像 C 语言的\#include，被包含的文件会原模原样的放在当前文件的包含位置。include 的语法是：

```makefile
include <filename>
```

filename 可以是当前操作系统 Shell 的文件模式（可以保含路径和通配符） 在 include前面可以有一些空字符，但是绝不能是[Tab]键开始。include 和<filename>可以用一个或多个空格隔开。  

如果文件都没有指定绝对路径或是相对路径的话，make 会在当前目录下首先寻找，如果当前目录下没有找到，那么，make 还会在下面的几个目录下找：  

1. 如果 make 执行时，有`-I`或`--include-dir`参数，那么 make 就会在这个参数所指定的目录下去寻找 。
2. 如果目录<prefix>/include（一般是：/usr/local/bin 或/usr/include）存在的话，make 也会去找。如果有文件没有找到的话，make 会生成一条警告信息，但不会马上出现致命错误。它会继续载入其它的文件，一旦完成 makefile 的读取，make 会再重试这些没有找到，或是不能读取的文件，如果还是不行，make 才会出现一条致命信息。如果你想让 make不理那些无法读取的文件，而继续执行，你可以在 include 前加一个减号“-”。  

#### 环境变量 MAKEFILES

如果你的当前环境中定义了环境变量 MAKEFILES，那么，make 会把这个变量中的值做一个类似include 的动作。这个变量中的值是其它的 Makefile，用空格分隔。只是， 它和 include不同的是，从这个环境变中引入的 Makefile 的“目标”不会起作用，如果环境变量中定义的文件发现错误，make 也会不理。

#### make 的工作方式 

GNU 的 make 工作时的执行步骤入下： 

1. 读入所有的 Makefile。
2. 读入被 include 的其它 Makefile。
3. 初始化文件中的变量。
4. 推导隐晦规则，并分析所有规则。
5. 为所有的目标文件创建依赖关系链。
6. 根据依赖关系，决定哪些目标要重新生成。
7. 执行生成命令。

### 第五章	书写规则

在 Makefile 中，规则的顺序是很重要的，因为，Makefile 中只应该有一个最终目标，其它的目标都是被这个目标所连带出来的，所以一定要让 make 知道你的最终目标是什么。一般来说，定义在 Makefile 中的目标可能会有很多，但是第一条规则中的目标将被确立为最终的目标。 

#### 规则语法

第一种写法：

```makefile
targets : prerequisites
	command 
```

 第二种写法：

```makefile
targets : prerequisites ; command
```

如果命令太长，你可以使用反斜框（‘\’）作为换行符。

####   在规则中使用通配符  

make 支持三种通配符： `*`，`?`和`[]`。 波浪号（“~”）字符在文件名中也有比较特殊的用途。如果是“~/test”，这就表示当前用户的$HOME 目录下的 test 目录。而“~hchen/test”则表示用户 hchen 的宿主目录下的 test 目录。 在 Windows 下则指的是环境变量“HOME”  。

```makefile
objects = *.o
```

此时objects的值就是*.o，如果需要objects的值是所有.o文件的集合，那么需要用到`wildcard`关键字，即 `objects := $(wildcard *.o)`。

#### 文件搜寻

在一些大的工程中，有大量的源文件，我们通常的做法是把这许多的源文件分类，并存放在不同的目录中。所以，当 make 需要去找寻文件的依赖关系时，你可以在文件前加上路径，但最好的方法是把一个路径告诉 make，让 make 在自动去找。  

Makefile 文件中的特殊变量“VPATH”就是完成这个功能的，如果没有指明这个变量，make 只会在当前的目录中去找寻依赖文件和目标文件。如果定义了这个变量，那么，make就会在当当前目录找不到的情况下，到所指定的目录中去找寻文件了。 

```makefile
VPATH = src:../headers
```

另一个设置文件搜索路径的方法是使用 make 的“vpath”关键字 ，它的用法有三种：

1. `vpath <pattern> <directories>`

   为符合模式<pattern>的文件指定搜索目录<directories>。  

2.   `vpath <pattern>  `

   清除符合模式<pattern>的文件的搜索目录。  

3. `vpath  `

   清除所有已被设置好了的文件搜索目录。  

vapth 使用方法中的<pattern>需要包含“%”字符。“%”的意思是匹配零或若干字符，例如，“%.h”表示所有以“.h”结尾的文件。<pattern>指定了要搜索的文件集，而<directories>则指定了<pattern>的文件集的搜索的目录。  

```makefile
vpath %.h ../headers
```

该语句表示，要求 make 在“../headers”目录下搜索所有以“.h”结尾的文件。（如果某文件在当前目录没有找到的话）  

#### 伪目标

伪目标一般没有依赖的文件。但是，我们也可以为伪目标指定所依赖的文件。伪目标同样可以作为“默认目标”，只要将其放在第一个。一个示例就是，如果你的 Makefile 需要一口气生成若干个可执行文件，但你只想简单地敲一个 make 完事，并且，所有的目标文件都写在一个 Makefile 中，那么你可以使用“伪目标”这个特性：  

```makefile
all : prog1 prog2 prog3
.PHONY : all
prog1 : prog1.o utils.o
	cc -o prog1 prog1.o utils.o
prog2 : prog2.o
	cc -o prog2 prog2.o
prog3 : prog3.o sort.o utils.o
	cc -o prog3 prog3.o sort.o utils.o
```

伪目标同样也可成为依赖。看下面的例子：  

```makefile
.PHONY: cleanall cleanobj cleandiff
cleanall : cleanobj cleandiff
	rm program
cleanobj :
	rm *.o
cleandiff :
	rm *.diff
```

我们可以输入“make cleanall”和“make cleanobj”和“make cleandiff”命令来达到清除不同种类文件的目的。  

#### 多目标

Makefile 的规则中的目标可以不止一个，其支持多目标，有可能我们的多个目标同时依赖于一个文件，并且其生成的命令大体类似。于是我们就能把其合并起来。当然，多个目标的生成规则的执行命令是同一个，这可能会可我们带来麻烦，不过好在我们的可以使用一个自动化变量“$@”  ，这个变量表示着目前规则中所有的目标的集合。

```makefile
bigoutput littleoutput : text.g
generate text.g -$(subst output,$@) > $@
```

  等价于：

```makefile
bigoutput : text.g
generate text.g -big > bigoutput
littleoutput : text.g
generate text.g -little > littleoutput
```

其中，-$(subst output,$@)中的“$”表示执行一个 Makefile 的函数，函数名为 subst，后面的为参数。 这里的这个函数是截取字符串的意思，“$@”表示目标的集合，就像一个数组，“$@”依次取出目标，并执于命令。   

#### 静态模式

静态模式可以更加容易地定义多目标的规则，可以让我们的规则变得更加的有弹性和灵活 。

语法：

```makefile
<targets ...> : <target-pattern>: <prereq-patterns ...>
	<commands>
```

targets 定义了一系列的目标文件，可以有通配符。是目标的一个集合。

target-parrtern 是指明了 targets 的模式，也就是的目标集模式。

prereq-parrterns 是目标的依赖模式，它对 target-parrtern 形成的模式再进行一次依赖目标的定义。  

看一个例子：  

```makefile
objects = foo.o bar.o
all: $(objects)
$(objects): %.o: %.c
$(CC) -c $(CFLAGS) $< -o $@
```

上面的例子中，指明了我们的目标从$object 中获取，“%.o”表明要所有以“.o”结尾的目标，也就是“foo.o bar.o”，也就是变量$object 集合的模式，而依赖模式“%.c”则取模式“%.o”的“%”，也就是“foo bar”，并为其加下“.c”的后缀，于是，我们的依赖目标就是“foo.c bar.c”。而命令中的“$<”和“$@”则是自动化变量，`$<`表示所有的依赖目标集（也就是“foo.c bar.c”）， `$@`表示目标集（也就是“foo.o bar.o”）。于是，上面的规则展开后等价于下面的规则：  

```makefile
foo.o : foo.c
$(CC) -c $(CFLAGS) foo.c -o foo.o
bar.o : bar.c
$(CC) -c $(CFLAGS) bar.c -o bar.o
```

如果我们的“%.o”有几百个，那种我们只要用这种很简单的“静态模式规则”就可以写完一堆规则，实在是太有效率了。“静态模式规则”的用法很灵活，如果用得好，那会一个很强大的功能。再看一个例子：  

```makefile
files = foo.elc bar.o lose.o
$(filter %.o,$(files)): %.o: %.c
$(CC) -c $(CFLAGS) $< -o $@
$(filter %.elc,$(files)): %.elc: %.el
emacs -f batch-byte-compile $<
```

#### 自动生成依赖

如果是一个比较大型的工程，你必需清楚哪些 C 文件包含了哪些头文件，并且，你在加入或删除头文件时，也需要小心地修改 Makefile，这是一个很没有维护性的工作。为了避免这种繁重而又容易出错的事情，我们可以使用 C/C++编译的一个功能。大多数的C/C++编译器都支持一个“-M”的选项，即自动找寻源文件中包含的头文件，并生成一个依赖关系。 

 `如果你使用 GNU 的 C/C++编译器，你得用“-MM”参数，不然，“-M”参数会把一些标准库的头文件也包含进来。  `

GNU 组织建议把编译器为每一个源 文件的自动生成的依赖关系放到一个文件中，为每一个“name.c”的文件都生成一个“name.d”的 Makefile 文件，[.d]文件中就存放对应[.c]文件的依赖关系。于是，我们可以写出[.c]文件和[.d]文件的依赖关系，并让 make 自动更新或自成[.d]文件，并把其包含在我们的Makefile 中，这样，我们就可以自动化地生成每个文件的依赖关系了。这里，我们给出了一个模式规则来产生[.d]文件：  

```makefile
%.d: %.c
@set -e; rm -f $@; \
$(CC) -M $(CPPFLAGS) $< > $@.$$$$; \
sed 's,\($*\)\.o[ :]*,\1.o $@ : ,g' < $@.$$$$ > $@; \
rm -f $@.$$$$
```

这个规则的意思是，所有的[.d]文件依赖于[.c]文件，“rm -f $@”的意思是删除所有的目标，也就是[.d]文件，第二行的意思是，为每个依赖文件“$<”，也就是[.c]文件生成依赖文件，“$@”表示模式“ %.d” 文件，如果有一个 C 文件是 name.c，那么“%”就是“name”，“$$$$”意为一个随机编号，第二行生成的文件有可能是“name.d.12345”，第三行使用 sed 命令做了一个替换。第四行就是删除临时文件。  

总而言之，这个模式要做的事就是在编译器生成的依赖关系中加入[.d]文件的依赖，即把依赖关系：  

`main.o : main.c defs.h`转成：`main.o main.d : main.c defs.h  `。

于是，我们的[.d]文件也会自动更新了，并会自动生成了，当然，你还可以在这个[.d]文件中加入的不只是依赖关系，包括生成的命令也可一并加入，让每个[.d]文件都包含一个完赖的规则。一旦我们完成这个工作，接下来，我们就要把这些自动生成的规则放进我们的主 Makefile 中。 我们可以使用Makefile 的“include”命令，来引入别的 Makefile 文件，例如：

```makefile
sources = foo.c bar.c
include $(sources:.c=.d)
```

上述语句中的“$(sources:.c=.d)”中的“.c=.d”的意思是做一个替换，把变量$(sources)所有[.c]的字串都替换成[.d]。当然，你得注意次序，因为 include 是按次来载入文件，最先载入的[.d]文件中的目标会成为默认目标。    

### 第六章	常用命令

#### 显示提示的命令

通常，make 会把其要执行的命令行在命令执行前输出到屏幕上。当我们用“@”字符在命令行前，那么，这个命令将不被 make 显示出来，最具代表性的例子是，我们用这个功能来向屏幕显示一些信息。如：  

```makefile
@echo 正在编译 XXX 模块......
```

当 make 执行时，会输出“正在编译 XXX 模块......”字串，但不会输出命令，如果没有“@”，那么，make 将输出：

```shell
echo 正在编译 XXX 模块......

正在编译 XXX 模块......  
```

如果 make 执行时，带入 make 参数“-n”或“--just-print”，那么其只是显示命令，但不会执行命令，这个功能很有利于我们调试我们的 Makefile，看看我们书写的命令是执行起来是什么样子的或是什么顺序的。  而 make 参数“-s”或“--slient”则是全面禁止命令的显示。  

#### 执行命令

当依赖目标新于目标时，也就是当规则的目标需要被更新时，make 会一条一条的执行其后的命令。需要注意的是，如果你要让上一条命令的结果应用在下一条命令时，你应该使用分号分隔这两条命令。比如你的第一条命令是 cd 命令，你希望第二条命令得在 cd 之后的基础上运行，那么你就不能把这两条命令写在两行上，而应该把这两条命令写在一行上，用分号分隔。  如：

```shell
# 示例一：
exec:
cd /home/hchen
pwd
# 示例二：
exec:
cd /home/hchen; pwd
```

当我们执行“make exec”时，第一个例子中的 cd 没有作用，pwd 会打印出当前的Makefile 目录，而第二个例子中，cd 就起作用了，pwd 会打印出“/home/hchen”。  

#### 命令出错

每当命令运行完后，make 会检测每个命令的返回码，如果命令返回成功，那么 make 会执行下一条命令，当规则中所有的命令成功返回后，这个规则就算是成功完成了。如果一个规则中的某个命令出错了（命令退出码非零），那么 make 就会终止执行当前规则，这将有可能终止所有规则的执行。 

 有些时候，命令的出错并不表示就是错误的。  为了忽略命令的出错，我们可以在 Makefile 的命令行前加一个减号“-”（在 Tab 键之后），标记为不管命令出不出错都认为是成功的。还有一个全局的办是，给 make 加上“-i”或是“ --ignore-errors”参数，那么，Makefile 中所有命令都会忽略错误。 而如果一个规则是以“.IGNORE”作为目标的，那么这个规则中的所有命令将会忽略错误。还有一个要提一下的 make 的参数的是“-k”或是“--keep-going”，这个参数的意思是，如果某规则中的命令出错了，那么就终止该规则的执行，但继续执行其它规则。

#### 嵌套执行make

在一些大的工程中，我们会把我们不同模块或是不同功能的源文件放在不同的目录中，我们可以在每个目录中都书写一个该目录的 Makefile，这有利于让我们的 Makefile 变得更加地简洁，而不至于把所有的东西全部写在一个 Makefile 中，这样会很难维护我们的Makefile，这个技术对于我们模块编译和分段编译有着非常大的好处。  

例如，我们有一个子目录叫 subdir，这个目录下有个 Makefile 文件，来指明了这个目录下文件的编译规则。那么我们总控的 Makefile 可以这样书写：  

```makefile
subsystem:
	cd subdir && $(MAKE)
```

等价于：

```makefile
subsystem:
	$(MAKE) -C subdir
```

如果你要传递变量到下级 Makefile 中，那么你可以使用这样的声明：`export <variable ...>`

如果你不想让某些变量传递到下级 Makefile 中，那么可以这样声明：`unexport <variable ...>  `

需要注意的是，有两个变量，一个是 SHELL，一个是 MAKEFLAGS，这两个变量不管你是否 export，其总是要传递到下层 Makefile 中，特别是 MAKEFILES 变量，其中包含了 make的参数信息，如果我们执行“总控 Makefile”时有 make 参数或是在上层 Makefile 中定义了这个变量，那么 MAKEFILES 变量将会是这些参数，并会传递到下层 Makefile 中，这是一个系统级的环境变量 。但是 make 命令中的有几个参数并不往下传递，它们是“-C”,“-f”,“-h”“-o”和“-W”  ,如果你不想往下层传递参数，那么，你可以这样来：

```makefile
subsystem:
	cd subdir && $(MAKE) MAKEFLAGS= 
```

####  命令包

如果 Makefile 中出现一些相同命令序列，那么我们可以为这些相同的命令序列定义一个变量。定义这种命令序列的语法以“define”开始，以“endef”结束，如：  

```makefile
define run-yacc
yacc $(firstword $^)
mv y.tab.c $@
endef
```

这里，“ run-yacc”是这个命令包的名字，其不要和 Makefile 中的变量重名。在“define”和“endef”中的两行就是命令序列。这个命令包中的第一个命令是运行 Yacc程序，因为 Yacc 程序总是生成“y.tab.c”的文件，所以第二行的命令就是把这个文件改改名字。 

###  第七章	变量

>变量是大小写敏感的  

#### 变量的嵌套使用

第一种方式，也就是简单的使用“=”号，在“=”左侧是变量，右侧是变量的值，右侧变量的值可以定义在文件的任何一处，也就是说，右侧中的变量不一定非要是已定义好的值，其也可以使用后面定义的值。  

```makefile
foo = $(bar)
bar = $(ugh)
ugh = Huh?
all:
	echo $(foo)
```

第二种方式，使用:=操作符，如：

```makefile
x := foo
y := $(x) bar
x := later
其等价于：
y := foo bar
x := later
```

还有一个比较有用的操作符是“?=”  ,如：

```makefile
FOO ?= bar
```

其含义是，如果 FOO 没有被定义过，那么变量 FOO 的值就是“bar”，如果 FOO 先前被定义过，那么这条语将什么也不做。  

#### 变量的高级用法

第一种是变量值的替换。  如：

```makefile
foo := a.o b.o c.o
bar := $(foo:.o=.c)
```

这个示例中，我们先定义了一个“$(foo)”变量，而第二行的意思是把“$(foo)”中所有以“.o”字串“结尾”全部替换成“.c”，所以我们的“$(bar)”的值就是“a.c b.c c.c”。 

另外一种变量替换的技术是以“静态模式”  ，如：

```makefile
foo := a.o b.o c.o
bar := $(foo:%.o=%.c)
```

第二种高级用法是——“把变量的值再当成变量”。  如：

```makefile
x = y
y = z
a := $($(x))
```

#### 追加变量值

我们可以使用“+=”操作符给变量追加值，  如：

```makefile
objects = main.o foo.o bar.o utils.o
objects += another.o
```

#### override 指示符  

如果有变量是通常 make 的命令行参数设置的，那么 Makefile 中对这个变量的赋值会被忽略。如果你想在 Makefile 中设置这类参数的值，那么，你可以使用“override”指示符。其语法是：

```makefile
override <variable> = <value>
override <variable> := <value>  
```

#### 多行变量

还有一种设置变量值的方法是使用 define 关键字。 使用 define 关键字设置变量的值可以有换行，这有利于定义一系列的命令 。

define 指示符后面跟的是变量的名字，而重起一行定义变量的值，定义是以 endef 关键字结束。其工作方式和“=”操作符一样。变量的值可以包含函数、命令、文字，或是其它变量。 因为命令需要以[Tab]键开头， 所以如果你用 define 定义的命令变量中没有以[Tab]键开头，那么 make 就不会把其认为是命令。  

#### 目标变量

目标变量的作用范围只在这条规则以及连带规则中。语法是：
`<target ...> : <variable-assignment>
<target ...> : overide <variable-assignment>`

  如：

```makefile
prog : CFLAGS = -g
prog : prog.o foo.o bar.o
	$(CC) $(CFLAGS) prog.o foo.o bar.o
prog.o : prog.c
	$(CC) $(CFLAGS) prog.c
foo.o : foo.c
	$(CC) $(CFLAGS) foo.c
bar.o : bar.c
	$(CC) $(CFLAGS) bar.c
```

#### 模式变量

通过上面的目标变量中，我们知道，变量可以定义在某个目标上。模式变量的好处就是，我们可以给定一种“模式”，可以把变量定义在符合这种模式的所有目标上。  如：给所有以[.o]结尾的目标定义目标变量 。

```makefile
%.o : CFLAGS = -O
```

### 第八章	条件判断

```makefile
libs_for_gcc = -lgnu
normal_libs =
foo: $(objects)
ifeq ($(CC),gcc)
	$(CC) -o foo $(objects) $(libs_for_gcc)
else
	$(CC) -o foo $(objects) $(normal_libs)
endif
```

特别注意的是，make 是在读取 Makefile 时就计算条件表达式的值，并根据条件表达式的值来选择语句，所以，你最好不要把自动化变量（如“$@”等）放入条件表达式中，因为自动化变量是在运行时才有的。  

### 第九章	函数

语法：`$(<function> <arguments>)  `或者是`${<function> <arguments>}  `。

#### foreach函数

语法：`$(foreach <var>,<list>,<text>)  `。如：

```makefile
names := a b c d
files := $(foreach n,$(names),$(n).o)
```

#### if函数

语法：`$(if <condition>,<then-part>)  `或者是`$(if <condition>,<then-part>,<else-part>)  `

#### call函数

call 函数是唯一一个可以用来创建新的参数化的函数。

语法：`$(call <expression>,<parm1>,<parm2>,<parm3>...)  `

#### origin 函数  

origin 函数不像其它的函数，他并不操作变量的值，他只是告诉你你的这个变量是哪里来的。

1.  undefined  ：未定义的
2. default：默认的  
3. file：表示定义在makefile中
4. command line：定义在命令行中
5. override：表示是被override重写的
6. automatic：表示是自动化变量

#### Shell函数

操作系统 Shell 的命令 。如：

```makefile
contents := $(shell cat foo)
files := $(shell echo *.c)
```

#### 控制make的函数

make 提供了一些函数来控制 make 的运行。通常，你需要检测一些运行 Makefile 时的运行时信息，并且根据这些信息来决定，你是让 make 继续执行，还是停止。  

1. error  

   ```makefile
   ifdef ERROR_001
   $(error error is $(ERROR_001))
   endif
   ```

2. warning

   ```makefile
   ifdef WARNING_001
   $(warning warning is $(WARNING_001))
   endif
   ```

### 第十章	make的运行

#### make的退出码

make 命令执行后有三个退出码：

0 - 表示成功执行。

1 - 如果 make 运行时出现任何错误，其返回 1。

2 - 如果你使用了 make 的“-q”选项，并且 make 使得一些目标不需要更新，那么返回 2。  

#### 指定目标

一般来说，make 的最终目标是 makefile 中的第一个目标，而其它目标一般是由这个目标连带出来的。这是 make 的默认行为。当然，一般来说，你的 makefile 中的第一个目标是由许多个目标组成，你可以指示 make，让其完成你所指定的目标。要达到这一目的很简单，需在 make 命令后直接跟目标的名字就可以完成 。如：`make clean`。

有一个 make 的环境变量叫“MAKECMDGOALS”，这个变量中会存放你所指定的终极目标的列表，如果在命令行上，你没有指定目标，那么，这个变量是空值。  如：

```makefile
sources = foo.c bar.c
ifneq ( $(MAKECMDGOALS),clean)
include $(sources:.c=.d)
endif
```

## 第六关：CMake

### CMake安装

对于Windows操作系统进入到CMake的官网下载[CMake](https://github.com/Kitware/CMake/releases/download/v3.24.1/cmake-3.24.1-windows-x86_64.msi)。下载完毕后直接进行安装即可

### 第一个CMake项目

1. 进入项目目录，新建一个build文件夹，因为CMake会产生很多中间文件
2. 执行`cmake ../`就会在build目录下产生项目文件，windows默认生成VS项目
3. 要产生其他编译器的makefile，就需要使用-G命令进行指定`cmkae -G "MinGW Makefiles" ../`
4. 可以使用`cmake --help`来查看使用编译器的名字
5. 生成项目工程文件或者makefile后，就可以使用相应的编译器来编译项目

### CMake命令选项设置

1. 指定构建系统：`-G`：可以使用该命令指定编译器
2.  CMakeCache.txt文件
   - 当cmake第一次运行一个空构建时，就会创建一个CMakeCache.txt文件，文件里存放了一些可以用来制定工程的设置
   - 对于同一个变量，如果CMakeCache.txt里有设置，那么CMakeLists.txt会优先使用Cacahe文件里的同名变量。
   - CMakeLists.txt里要是设置了一个Cache里没有的变量，那么就将这个变量的值写入到Cache里面
3. 添加到Cache文件中：-D：`cmake  -DCMAKE_BUILD_TYPE:STRING=Debug`
4. 从Cache中删除变量：-U：支持使用*和/
5. CMake命令行模式：-E
6. 打印每一行CMake：使用`--trace`或者`--trace-source='filename'`
7. 设置编译参数
   - add_definitions	(-DENABLED)，当CMake添加这一段定义时，如果代码里定义了#ifdef ENABLED #endif，这一段代码就会生效
   - //add_definitions( “-Wall -ansi –pedantic –g”) 
8. 设置默认命令：option:`option(MY-MESSAGE "this is my message" ON) `

### CMake基本知识

1. 每一个CMake.txt的第一行都会写：`cmake_minimum_required(VERSION 3.1)`，该命令指定了CMake的最低版本是3.1
2. 设置生成项目名称：`project（MyProject）` ,使用该指令之后系统会自动创建两个变量:<projectname>_BINARY_DIR:二进 制文件保存路径、<projectname>_SOURCE_DIR：源代码路径 
3. 生成可执行文件 :`add_executable(exename srcname) `
4. 获取文件路径中的所有源文件：`aux_sourcr_directory(<dir> <variable>) `
5. 生成lib库：`add_library(libname [SHARED|STATIC|MODULE] [EXCLUDE_FROM_ALL] source1 source2 ... sourceN) `
6. 添加头文件目录：`target_include_directories(<target>[SYSTEM][BEFORE]<INTERFACE|PUBLIC|PRIVATE>[items1...]<INTERFACE|PUBLIC|PRIVATE>[ [items2...] ...]))`或者`include_directories([AFTER|BEFORE] [SYSTEM] dir1 [dir2 …])  `
7. 添加需要链接的库文件：`target_link_libraries(<target> [item1 [item2 [...]]]
   [[debug|optimized|general] <item>] ...)  `或者`link_libraries() `
8. 添加需要链接的库文件目录：`link_directories（添加需要链接的库文件目录）  `

### 控制目标属性

如果需要单独的设置target的属性，需要使用命令：

`set_target_properties(target1 target2 ...
PROPERTIES
属性名称1 值
属性名称2 值
...
)`

控制编译选项的属性是：COMPILE_FLAGS

控制链接选项的属性是：LINK_FLAGS

控制输出路径的属性：EXECUTABLE_OUTPUT_PATH（exe的输出路径）、LIBRARY_OUTPUT_PATH（库文件的输出路径）  

### 变量和缓存

#### 局部变量  

设置变量：`set(MY_VARIABLE "value")  `

访问变量：`${MY_VARIABLE}  `

#### 缓存变量  

缓存变量就是cache变量，相当于全局变量，都是在第一个执行的CMakeLists.txt里面被设置的，不过在子项目的CMakeLists.txt文件里面也是可以修改这个变量的，此时会影响父目录CMakeLists.txt，这些变量用来配置整个工程，配置好之后对整个工程使用。  

设置缓存变量：`set(MY_CACHE_VALUE "cache_value" CACHE INTERNAL "THIS IS MY CACHE VALUE")  `

#### 环境变量  

设置环境变量：`set(ENV{variable_name} value)  `

获取环境变量：`$ENV{variable_name}  `

#### 内置变量  

1. CMAKE_C_COMPILER：指定C编译器  
2. CMAKE_CXX_COMPILER：指定C++编译器  
3. EXECUTABLE_OUTPUT_PATH：指定可执行文件的存放路径  
4. LIBRARY_OUTPUT_PATH：指定库文件的放置路径  
5. CMAKE_CURRENT_SOURCE_DIR：当前处理的CMakeLists.txt所在的路径
6. CMAKE_BUILD_TYPE：控制构建的时候是Debug还是Release
7. CMAKE_SOURCR_DIR：无论外部构建还是内部构建，都指的是工程的顶层目录
8. CMAKE_BINARY_DIR：内部构建指的是工程顶层目录，外部构建指的是工程发生编译的目录（参考project命令执行之后，生成的_BINARY_DIR以及CMake预定义的变量PROJECT_BINARY_DIR）
9. CMAKE_CURRENT_LIST_LINE：输出这个内置变量所在的行  

### CMake基本控制语法

#### IF

`if (expression)
COMMAND1(ARGS ...)
COMMAND2(ARGS ...)
...
else (expression)
COMMAND1(ARGS ...)
COMMAND2(ARGS ...)
...
endif (expression)`
注意：ENDIF要和IF对应  

#### While

`WHILE(condition)
COMMAND1(ARGS ...)
COMMAND2(ARGS ...)
...
ENDWHILE(condition)  `

##### foreach

列表循环

`FOREACH(loop_var arg1 arg2 ...)
COMMAND1(ARGS ...)
COMMAND2(ARGS ...)
...
ENDFOREACH(loop_var)  `

范围循环

`FOREACH(loop_var RANGE total)
COMMAND1(ARGS ...)
COMMAND2(ARGS ...)
...
ENDFOREACH(loop_var)  `

范围步进循环

`FOREACH(loop_var RANGE start stop [step])
COMMAND1(ARGS ...)
COMMAND2(ARGS ...)
...
ENDFOREACH(loop_var)  `

### 项目构建规范以及属性

- `target_include_directories(<target> [SYSTEM] [BEFORE]<INTERFACE|PUBLIC|PRIVATE> [items1...] [<INTERFACE|PUBLIC|PRIVATE>[items2...] ...])  `
- `target_compile_definitions(<target> <INTERFACE|PUBLIC|PRIVATE>[items1...][ [items2...] ...])  `
- `target_compile_options(<target> [BEFORE]<INTERFACE|PUBLIC|PRIVATE> [items1...] [<INTERFACE|PUBLIC|PRIVATE>[items2...] ...]  `

以上的额三个命令会生成INCLUDE_DIRECTORIES, COMPILE_DEFINITIONS, COMPILE_OPTIONS变量的
值,或者INTERFACE_INCLUDE_DIRECTORIES,INTERFACE_COMPILE_DEFINITIONS,INTERFACE_COMPILE_OPTIONS的值.  

### 宏和函数

CMake里面可以定义自己的函数（function）和宏（macro）  

##### 宏

`macro( [arg1 [arg2 [arg3 ...]]])
COMMAND1(ARGS ...)
COMMAND2(ARGS ...)
...
endmacro()  `

##### 函数

`function( [arg1 [arg2 [arg3 ...]]])
COMMAND1(ARGS ...)
COMMAND2(ARGS ...)`

`endfunction()`  



