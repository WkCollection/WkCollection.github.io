---
title: C++ Primer
date: 2023-02-28 21:13:40
tags:
- C++
categories:
- C++
---

# PrimerCpp学习

> Primer C++作为C++的经典书籍，值得一读！

## C++基础

### 变量、语句、字符串、数组

### 表达式和函数

### 类的初步使用

<!-- more -->

## C++ 标准库

### IO库

#### IO类

> IO类操作其实大同小异，学会一种就可举一反三，所有的带w开头的都表示宽字符版本

- 通常IO操作函数以引用方式传递，且传递和返回的引用不能是const

##### IO操作的条件状态

| 状态            | 功能                                 |
| :-------------- | ------------------------------------ |
| iostate         | 表达条件状态的完整功能               |
| badbit          | 表示流已崩溃（系统级错误，不可恢复） |
| failbit         | 表示IO操作失败了（可恢复的错误）     |
| eofbit          | 表示流已经到达文件结束               |
| goodbit         | 表示流未处于错误状态，此值为0        |
| eof()           | 若eofbit置位，则为true               |
| fail()          | 若failbit或者badbit置位，则为true    |
| bad()           | 若badbit置位，则为true               |
| good()          | 若流有效，则为true                   |
| clear()         | 将流中所有状态位复位，将流设为有效   |
| clear(flags)    | 给对应条件的状态位复位               |
| setstate(flags) | 给对应条件的状态位复位               |
| rdstate()       | 返回流的当前状态                     |

##### iostream

> 读写流

###### istream、wistream

```c++
#include <iostream>
using namespace std;
// 标准输入输出流
int main(int argc, char *argv[])
{
	char ch;
	while(cin>>ch){
		cout<<ch;	
	}
	return 0;
}
```

###### ostream、wostream

```c++
#include <iostream>
using namespace std;
int main(int argc, char *argv[])
{
	cout<<"hello world!"<<endl;
	return 0;
}
```

###### iostream、wiostream

```
#include <iostream>
using namespace std;
int main(int argc, char *argv[])
{
	cout<<"please enter a char:"<<endl;
	char ch;
	cin>>ch;
	cout<<"the char is:"<<ch<<endl;
	return 0;
}
```

##### fstream

> 读写文件，输入输出都是以内存为中心

| mode   | 说明                                   |
| ------ | -------------------------------------- |
| in     | 以读的方式打开                         |
| out    | 以写的方式打开                         |
| app    | 每次写操作前定位到文件尾，即写追加模式 |
| ate    | 打开文件后立即定位到文件末尾           |
| trunc  | 覆盖模式                               |
| binary | 以二进制方式打开                       |

###### ifstream、wifstream

```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	string path="D:\\gitRep\\practice\\cpp\\primer5\\part02\\io\\fstream\\demo08\\demo08.txt";
	ifstream ifs(path);
	if(!ifs.is_open()){
		cerr<<"fail to open demo08.txt!"<<endl;
	}
	while(ifs.peek()!=EOF){
		char ch;
		ifs.get(ch);
		cout<<ch;
	}
	cout<<endl;
    ifs.close();
	return 0;
}
```

`这里有一个eof()问题容易出错，容易将尾部的数据多打印一次。使用peek()函数即可解决！`

###### ofstream、wofstream

```c++
#include <iostream>
#include <fstream>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	string path="D:\\gitRep\\practice\\cpp\\primer5\\part02\\io\\fstream\\demo09\\demo09.txt";
	ofstream ofs(path,ios_base::out|ios_base::binary);
	if(!ofs.is_open()){cerr<<"demo09.txt is not exist!"<<endl;}
	const char content[]="hello world!";
	ofs.write(content,sizeof(content)/sizeof(char)-1);
	ofs.close();
	return 0;
}
```

`此时在写入文本文件时容易多出一个字节'\0'。`

###### fstream、wfstream

```c++
#include <iostream>
#include <fstream>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	string path="D:\\gitRep\\practice\\cpp\\primer5\\part02\\io\\fstream\\demo10\\demo10.txt";
	string path2="D:\\gitRep\\practice\\cpp\\primer5\\part02\\io\\fstream\\demo10\\demo10_backup.txt";
	fstream fst1(path,ios::in|ios::binary);
	fstream fst2(path2,ios::out|ios::binary);
	while(fst1.peek()!=EOF){
		char ch;
		fst1.get(ch);
		fst2.put(ch);
	}
	fst1.close();
	fst2.close();
	return 0;
}
```

###### 使用<<和>>简化输入与输出

```c++
#include <iostream>
#include <fstream>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	string path="D:\\gitRep\\practice\\cpp\\primer5\\part02\\io\\fstream\\demo11\\demo11.txt";
	fstream fst1(path,ios::out|ios::binary);
	fstream fst2(path,ios::in|ios::binary);
	fst1<<"name"<<endl;
	char buff[10];
	fst2>>buff;
	cout<<buff<<endl;
	fst1.close();
	fst2.close();
	return 0;
}
```

##### sstream

> 读写string对象，不管是输入输出都是以string流为中心

###### istringstream、wistringstream

```cpp
#include <iostream>
#include <sstream>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	string name="tom is a man!";
	istringstream iss(name);
	while(iss.peek()!=EOF){
		char ch;
		iss.get(ch);
		cout<<ch;
	}
	return 0;
}
```

###### ostringstream、wostringstream

```cpp
#include <iostream>
#include <sstream>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	string name="hello";
	ostringstream oss(name,ios::ate);
	oss.put('1');
	cout<<oss.str()<<endl;
	return 0;
}
```

###### stringstream、wstringstream

```cpp
#include <iostream>
#include <sstream>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	string name="zhangsan";
	string name_backup;
	//将name的值拷贝到ss流中
	stringstream ss(name);
	ss>>name_backup;
	cout<<name_backup<<endl;
	return 0;
}
```

### 顺序容器

> 顺序容器有很多公共的操作，但是也有些不同的函数，需要注意区分，并且有不同的使用场景

| 容器名       | 功能                                                         |
| ------------ | ------------------------------------------------------------ |
| array        | 固定大小数组。支持随机访问，不能添加或删除元素。             |
| vector       | 可变数组。支持随机访问，在尾部之外的位置插入或删除元素很慢。 |
| deque        | 双端队列。支持随机访问，头尾处插入删除速度快。               |
| string       | 与vector类似，但是主要用于存储字符，随机访问快，在尾部进行插入、删除速度快。 |
| forward_list | 单链表。支持单向顺序访问。适合在任意位置做插入、删除操作。   |
| list         | 双向链表。支持双向顺序访问。适合在任意位置做插入、删除操作。 |

- 总结：vector、deque和string适合在`尾部`进行插入删除操作。forward_list和list适合在任意位置进行插入删除操作。array不能进行更新操作。array、vector、deque和string都支持随机访问。

#### vector

> 可变数组。支持随机访问，在尾部之外的位置插入或删除元素很慢。

##### vector的初始化、遍历和赋值

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;
int main(int argc, char *argv[])
{
	// 1. 定义一个空容器
	vector<int> numbers;
	// 2. 定义并初始化一个容器
	vector<string> students={"zhangsan","lisi","wangwu","zhaoqi"};
	vector<string> students2{"zhangsan","lisi","wangwu","zhaoqi"};
	//3. 使用拷贝进行初始化
	vector<string> stu=students;
	vector<string> stu2(students);
	//4. 指定容器大小并进行初始化（array不适用）
	vector<int>  num(10);
	vector<int>  num2(10,1);
	// 使用迭代器进行遍历
	for(auto it=students.begin();it!=students.end();it++){
		cout<<*it<<endl;
	}
    // 赋值
	// 1.直接进行赋值或
	vector<int>  num3(9,10);
	num=num3;
	for(auto it=num.begin();it!=num.end();it++){
		cout<<*it<<endl;
	}
	// 2.使用assign进行赋值
	vector<string> students3={"zhangsan","lisi","wangwu","zhaoqi","zhaoqi"};
	vector<string> students4{"zhangsan","lisi","wangwu"};
	students3.assign(students4.cbegin(),students4.cend());
	for(auto it=students3.begin();it!=students3.end();it++){
		cout<<*it<<endl;
	}
	// 10个元素都是hello
	students3.assign(10,"hello");
	for(auto it=students3.begin();it!=students3.end();it++){
		cout<<*it<<endl;
	}
	// 进行swap，比赋值速度快
	vector<int>  num4(10);
	num3.swap(num4);
	for(auto it=num3.begin();it!=num3.end();it++){
		cout<<*it<<endl;
	}
	return 0;
}
```

##### vector的比较、操作和改变容量

- 插入元素`不支持push_front和emplace_front`
- 删除元素`不支持pop_front`
- push_back()方法要调用构造函数和复制构造函数，这也就代表着要先构造一个临时对象，然后把临时的copy构造函数拷贝或者移动到容器最后面。而emplace_back()在实现时，则是直接在容器的尾部创建这个元素，省去了拷贝或移动元素的过程。

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	vector<int> nums={1,3,5,7,9};
	// 1.获取容器内元素的个数
	cout<<"nums has "<<nums.size()<<" elems."<<endl;
	// 2.判断容器内元素是否为空
	cout<<nums.empty()<<endl;
	// 3.比较容器内元素的大小
	vector<int> nums2={1,3,4};
	if(nums<nums2){
		cout<<"nums is bigger"<<endl;
	}else{
		cout<<"nums2 is bigger"<<endl;
	}
	// 4.向容器尾部插入元素
	nums.push_back(5);
	nums.emplace_back(6);
	// 5.向容器头部插入元素
	nums.insert(nums.begin(),10);
	nums.emplace(nums.begin(),11);
	for(auto it=nums.begin();it!=nums.end();it++){
		cout<<*it<<endl;
	}
	// 6.在容器的任意位置插入元素
	nums.insert(nums.begin(),10,1);
	nums.insert(nums.begin(),nums2.begin(),nums2.end());
	nums.insert(nums.begin(),{1,2,3,4,5,6});
	for(auto it=nums.begin();it!=nums.end();it++){
		cout<<*it<<endl;
	}
	// 7.访问元素
	cout<<"the first elem is "<<nums.front()<<endl;
	cout<<"the last elem is "<<nums.back()<<endl;
	cout<<"the third elem is "<<nums[2]<<endl;
	cout<<"the fourth elem is "<<nums[3]<<endl;
	// 8.删除元素
	vector<int> nums3={1,3,5,7,9};
	nums3.pop_back();
	for(auto it=nums3.begin();it!=nums3.end();it++){
		cout<<*it<<endl;
	}
	nums3.erase(nums3.begin());
	for(auto it=nums3.begin();it!=nums3.end();it++){
		cout<<*it<<endl;
	}
	nums3.erase(nums3.begin(),nums3.end()-2);
	for(auto it=nums3.begin();it!=nums3.end();it++){
		cout<<*it<<endl;
	}
	nums3.clear();
	for(auto it=nums3.begin();it!=nums3.end();it++){
		cout<<*it<<endl;
	}
	return 0;
}
```

#### deque

> 双端队列。支持随机访问，头尾处插入删除速度快。

```c++
#include <iostream>
#include <deque>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	// 1.容器初始化
	deque<string> name;
	deque<int> nums={1,2,3,4};
	for(auto it=nums.begin();it!=nums.end();++it){
		cout<<*it;
	}
	cout<<endl;
	deque<int> nums2=nums;
	for(auto it=nums2.begin();it!=nums2.end();++it){
		cout<<*it;
	}
	cout<<endl;
	deque<int> nums3(nums2);
	for(auto it=nums3.begin();it!=nums3.end();++it){
		cout<<*it;
	}
	cout<<endl;
	// 2.赋值
	deque<int> nums4(10);
	for(auto it=nums4.begin();it!=nums4.end();++it){
		cout<<*it;
	}
	cout<<endl;
	deque<int> nums5(10,1);
	for(auto it=nums5.begin();it!=nums5.end();++it){
		cout<<*it;
	}
	cout<<endl;
	deque<string> names{"zhangsan","lisi","wangwu","zhaoliu"};
	deque<string> names2;
	names2.assign(names.begin(),names.end());
	for(auto it=names2.begin();it!=names2.end();++it){
		cout<<*it;
	}
	cout<<endl;
	names2.assign(10,"test");
	for(auto it=names2.begin();it!=names2.end();++it){
		cout<<*it;
	}
	cout<<endl;
	// 3. swap
	swap(names,names2);
	for(auto it=names2.begin();it!=names2.end();++it){
		cout<<*it;
	}
	cout<<endl;
	// 4.判断大小和空
	cout<<names.size()<<endl;
	cout<<names.empty()<<endl;
	// 5.插入元素(比vector多了push_front)
	// 5.1向尾部插入元素
	deque<string> names3{"zhangsan","lisi","wangwu","zhaoliu"};
	names3.push_back("liuqi");
	names3.emplace_back("liba");
	for(auto it=names3.begin();it!=names3.end();++it){
		cout<<*it;
	}
	cout<<endl;
	// 5.2向头部插入元素
	names3.push_front("yi");
	names3.emplace_front("er");
	for(auto it=names3.begin();it!=names3.end();++it){
		cout<<*it;
	}
	cout<<endl;
	// 5.3向任意位置插入元素
	names3.insert(names3.begin(),"san");
	names3.emplace(names3.begin(),"si");
	for(auto it=names3.begin();it!=names3.end();++it){
		cout<<*it;
	}
	cout<<endl;
	names3.insert(names3.begin(),{"wu","liu"});
	for(auto it=names3.begin();it!=names3.end();++it){
		cout<<*it;
	}
	cout<<endl;
	// 6.访问元素
	cout<<names3.front()<<endl;
	cout<<names3.back()<<endl;
	cout<<names3[0]<<endl;
	cout<<names3.at(1)<<endl;//会检查是否越界
	// 7.删除元素
	// 7.1删除尾部元素
	names3.pop_back();
	// 7.2删除头部元素
	names3.pop_front();
	for(auto it=names3.begin();it!=names3.end();++it){
		cout<<*it;
	}
	cout<<endl;
	names3.erase(names3.begin());
	for(auto it=names3.begin();it!=names3.end();++it){
		cout<<*it;
	}
	cout<<endl;
	// 7.3清空容器
	names3.clear();
	for(auto it=names3.begin();it!=names3.end();++it){
		cout<<*it;
	}
	return 0;
}
```

#### string

> 与vector类似，但是主要用于存储字符，随机访问快，在尾部进行插入、删除速度快。

- string`不支持emplace_back、emplace_front和push_front`
- string的其他构造方法

| 方法名                 | 功能                                      |
| ---------------------- | ----------------------------------------- |
| string s(cp,n)         | s是cp中前n个字符后的拷贝                  |
| string s(s2,pos2)      | s是从下标pos2开始的对s2的拷贝             |
| string s(s2,pos2,len2) | s是从下标pos2开始的对s2进行长为len2的拷贝 |

- `substr操作`

```c++
#include <iostream>
#include <string>
using namespace std;
void travse(string s);
int main(int argc, char *argv[])
{
	string str="hello world!";
	string sbstr=str.substr(0,5);
	travse(sbstr);
	string sbstr2=str.substr(6);
	travse(sbstr2);
	return 0;
}
void travse(string s){
	for(auto it=s.begin();it!=s.end();it++){
		cout<<*it;
	}
	cout<<endl;
}
```

- string的其他操作方法`append`和`replace`

```c++
#include <iostream>
#include <string>
using namespace std;
void travse(string s);
int main(int argc, char *argv[])
{
	string str{"hello world!"};
	str.push_back(' ');
	str.append("I am");
	str.replace(12,1,"");
	travse(str);
	return 0;
}
void travse(string s){
	for(auto it=s.begin();it!=s.end();it++){
		cout<<*it;
	}
	cout<<endl;
}
```

- string的搜索和比较

```c++
#include <iostream>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	string str="hello world!";
	auto pos=str.find("hello");
	cout<<pos<<endl;
	auto pos2=str.find_first_of("horld");
	cout<<pos2<<endl;
	string str1="a";
	int res=str.compare(str1);
	cout<<res<<endl;
	return 0;
}
```

- string的数值转换(举例stoi,字符串转整型,其余查阅手册)

```c++
#include <iostream>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	int i=10;
	string s=to_string(i);
	cout<<s<<endl;
	string str="1234";
	int n=stoi(str);
	cout<<n<<endl;
	return 0;
}
```

- string的常用操作

```c++
#include <iostream>
#include <string>
using namespace std;
void travse(string s);
int main(int argc, char *argv[])
{
	//1.初始化	
	string str;
	string str2="hello world!";
	str=str2;
	string str3(str2);
	travse(str3);
	string str4(str3,6);
	travse(str4);
	string str5(str3,0,5);
	travse(str5);
	//2.赋值
	string str6={'h','e','l','l','o'};
	travse(str6);
	string str7{'h','e','l','l','o'};
	travse(str7);
	str7.assign(str2.begin(),str2.end());
	travse(str7);
	str7.assign(5,'h');
	travse(str7);
	//3.swap
	swap(str2,str7);
	travse(str7);
	// 4.大小与判空
	cout<<str7.size()<<endl;
	cout<<str7.empty()<<endl;
	return 0;
}
void travse(string s){
	for(auto it=s.begin();it!=s.end();it++){
		cout<<*it;
	}
	cout<<endl;
}
```

#### array

- array`不支持直接使用初始化列表拷贝和assign函数`
- array不支持添加和删除元素

> 与内置数值类似，array的大小也是类型的一部分。与内置数组不同之处在于，array可以进行拷贝和对象赋值操作。

```c++
#include <iostream>
#include <array>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	// 1.初始化容器
	array<int,10> arr;
	array<int,10> arr2={1,2,3,4,5,6,7,8,9};
	//要求类型和大小都一致
	array<int,10> arr3=arr2;
	// 2.交换
	swap(arr,arr2);
	// 3.容器的大小和判空
	cout<<arr3.size()<<endl;
	cout<<arr3.empty()<<endl;
	cout<<(arr3==arr2)<<endl;
	// 4.访问
	cout<<arr3.front()<<endl;
	cout<<arr3.back()<<endl;
	cout<<arr3[0]<<endl;
	cout<<arr3.at(1)<<endl;
	return 0;
}
```

#### list

> 双向链表。支持双向顺序访问。适合在任意位置做插入、删除操作。

```c++
#include <iostream>
#include <list>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	// 1.初始化容器
	list<string> l;
	list<int> l2={1,2,3,4,5,6};
	list<int> l3=l2;
	// 2.赋值
	list<int> l4(10,1);
	l4.assign(l3.begin(),l3.end());
	l.assign({"zhangsan","lisi","wangwu","zhaoliu"});
	// 3. swap
	swap(l3,l4);
	// 4.大小和判空
	cout<<l.size()<<endl;
	cout<<l.empty()<<endl;
	// 5.插入元素
	// 5.1向尾部插入元素
	l.push_back("yi");
	l.emplace_back("er");
	// 5.2 向首部插入元素
	l.push_front("yi");
	l.emplace_front("er");
	// 5.3 向任意位置插入元素
	l.insert(l.begin(),"san");
	for(auto it=l.begin();it!=l.end();++it){
		cout<<*it;
	}
	cout<<endl;
	// 6.访问元素
	cout<<l.front()<<endl;
	cout<<l.back()<<endl;
	// 7.删除元素
	// 7.1删除尾部元素
	l.pop_back();
	// 7.2删除首部元素
	l.pop_front();
	// 7.3清空表内元素
	l.clear();
	// 7.4删除任意位置元素
	l.erase(l.begin(),l.end());
	return 0;
}
```

#### forward_list

- forward_list`不支持push_back和emplace_back`
- forward_list`不支持size`
- forward_list`不支持下标访问、at和back`
- forward_list`不支持pop_back`

> 单链表。支持单向顺序访问。适合在任意位置做插入、删除操作。

```cpp
#include <iostream>
#include <forward_list>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	// 1.容器初始化
	forward_list<string> f;
	forward_list<string> f1={"zhangsan","lisi","liuwu","zhaoliu"};
	f=f1;
	// 2.赋值
	f.assign({"zhangsan","lisi","liuwu"});
	f.assign(10," ");
	// 3.swap
	swap(f,f1);
	// 4.判空
	cout<<f.empty()<<endl;
	// 5.插入元素
	// 5.1向首部插入
	f.push_front("yi");
	f.insert_after(f.begin(),"er");
	// 6.删除元素
	f.pop_front();
    f.clear();
	// 7.访问元素
	cout<<f.front()<<endl;
	return 0;
}
```

#### 容器适配器

##### stack

- 接受除`array和forward_list`外的所有的顺序容器。
- 默认是基于deque实现的，可以通过指定第二个参数进行重载。

```c++
#include <iostream>
#include <deque>
#include <vector>
#include <string>
#include <stack>
using namespace std;
int main(int argc, char *argv[])
{
	// 1.初始化一个空容器
	stack<int> s;
	deque<string> d{"zhangsan","lisi","wangwu","zhaoliu"};
	stack<string> s2(d);
	// 2.栈的大小和判空
	cout<<s2.size()<<endl;
	cout<<s2.empty()<<endl;
	// 3.重载默认的容器类型deque
	vector<string> v1{"zhangsan","lisi","wangwu"};
	stack<string,vector<string>> s3(v1);
	// 4.栈的常用操作
	s3.push("zhaoliu");
	s3.emplace("liuqi");
	s3.pop();
	cout<<s3.top()<<endl;
	return 0;
}
```

##### queue

- 默认由deque实现，也可以由list和vector实现。

```c++
#include <iostream>
#include <deque>
#include <vector>
#include <list>
#include <queue>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	// 1.初始化队列
	queue<int> q;
	deque<int> deq={1,2,3,4,5,6};
	queue<int> q1(deq);
	// 2.队列常用操作
	// 2.1 删除队首元素
	q1.pop();
	// 2.2 返回队首元素
	cout<<q1.front()<<endl;
	// 2.3 返回队尾元素
	cout<<q1.back()<<endl;
	// 3.向队尾插入一个元素
	q1.push(7);
	q1.emplace(8);
	return 0;
}
```

##### priority_queue

- 默认由vector实现，也可以由deque实现。

```c++
#include <iostream>
#include <vector>
#include <queue>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	// 1.初始化容器
	priority_queue<int> p;
	p.push(1);
	// 2.返回顶部元素
	p.pop();
	p.emplace(2);
	cout<<p.top()<<endl;
	// 2.内置元素优先级
	// 3.数字越大优先级越大
	priority_queue<int,vector<int>,less<int>> p2;
	p2.push(20);
	p2.push(1);
	cout<<p2.top()<<endl;
	// 3.数字越小优先级越大
	priority_queue<int,vector<int>,greater<int>> p3;
	p3.push(20);
	p3.push(1);
	cout<<p3.top()<<endl;
	return 0;
}
```

### 泛型算法

> 泛型算法实现了一些经典算法的公共接口

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <iterator>
#include <string>
using namespace std;
bool isShorter(const string &s1,const string &s2);
int main(int argc, char *argv[])
{
    // 使用算法库
	vector<int> v{1,2,3,4,5,6,7,8,9};
	auto result=find(v.begin(),v.end(),9);
	cout<<*result<<endl;
    // 使用数值算法库
	int sum=accumulate(v.begin(),v.end(),0);
	cout<<sum<<endl;
	fill(v.begin(),v.end(),9);
	int sum2=accumulate(v.begin(),v.end(),0);
	cout<<sum2<<endl;
    // 使用back_inserter插入空容器
	vector<int> v2;
	fill_n(back_inserter(v2),10,0);
	int a1[10]={0,1,2,3,4,5,6,7,8,9};
	int a2[10];
	copy(begin(a1),end(a1),a2);
    //定制函数
	vector<string> v3{"zhangsan","lisi","wangwu"};
	sort(v3.begin(),v3.end(),isShorter);
	return 0;
}
bool isShorter(const string &s1,const string &s2){
	return s1.size()<s2.size();
}
```

#### Lambda表达式

- 可以忽略参数列表和返回类型
- lambda不能有默认参数
- 若lambda的函数体中包含任何单一return之外的内容，且未指定返回值，则返回void
- 一个lambda只有在其捕获列表中捕获一个它所在函数的局部变量，才能在函数体中使用该变量
- 捕获列表只用于局部非静态变量，lambda可以直接使用static变量和它所在函数之声明的部分
- 我们还可以进行隐式捕获，`&`代表采用捕获引用方式，`=`表示采用值捕获方式。采用混合方式时第一个必须时&或者=
- 如果希望改变捕获变量的值，可以在参数列表前加mutable
- 一个引用捕获变量是否可以修改，依赖于其引用的是const还是非const

> 一个lamnda表达式表示一个可调用的代码单元。

```c++
#include <iostream>
#include <algorithm>
#include <string>
using namespace std;
int sum2(const int &num,const int &num2);
int sum3(const int &num,const int &num2);
void f();
int main(int argc, char *argv[])
{
	// 不使用捕获列表
	auto sum=[](const int &a,const int &b){return a+b;};
	cout<<sum(10,20)<<endl;
	// 使用捕获列表
	cout<<sum2(11,22)<<endl;
	cout<<sum3(12,23)<<endl;
	// 可变lambda
	f();
	return 0;
}
int sum2(const int &num,const int &num2){
	auto f=[num](const int &num2){return num+num2;};
	return f(num2);
}
int sum3(const int &num,const int &num2){
	auto f=[&](const int &num2){return num+num2;};
	return f(num2);
}
void f(){
	size_t v1=42;
	auto f2=[&v1]{return ++v1;};
	v1=0;
	auto d=f2();
	cout<<d<<endl;
}
```

#### 参数绑定

- 如果希望传递给bind一个对象而不是拷贝，则需要使用`ref`函数或者`cref`函数

使用bind函数可以解决一个关于函数参数长度的问题。bind函数可以看作一个通用的函数适配器。

> auto *newCallable*=bind(*callable*,*arg_list*);

*arg_list*可能包含_n的名字，n为一个整数，这些参数为"占位符"。

#### 迭代器深入

> 共有插入迭代器、流迭代器、反向迭代器和移动迭代器四种，这里只介绍两种

##### 插入迭代器

> 被绑定到一个·容器上，可以用来向容器内插入元素。

1. back_inserter：创建一个使用push_back的迭代器
2. front_inserter：创建一个使用push_front的迭代器
3. inserter：创建一个使用insert的迭代器。第二个参数必须是一个指定容器的迭代器。元素被插入到指定迭代器所表示的元素之前。

##### 流迭代器

> 被绑定到一个输入或输出流上，可以用来遍历所有关联的IO流

- istream_iterator

  ```c++
  #include <iostream>
  #include <iterator>
  using namespace std;
  int main(int argc, char *argv[])
  {
      //eof表示尾后迭代器
  	istream_iterator<int> it(cin),eof;
  	while(it!=eof){
  		cout<<*it++<<endl;
  	}
  	return 0;
  }
  ```

- ostream_iterator

  > 无尾后迭代器

  ```c++
  #include <iostream>
  #include <string>
  #include <iterator>
  using namespace std;
  int main(int argc, char *argv[])
  {
  	string str="hello";
  	ostream_iterator<char> out(cout," ");
  	for(auto e:str){
  		*out++=e;
  	}
  	cout<<endl;
  	return 0;
  }
  
  ```

### 关联容器

- `不支持push_back和push_front`

> 共有8个关联容器，1）要么是set，要么是map。2)要么要求不重复关键字，要么允许重复的关键字。3）要么按顺序存储，要么无序存储。`允许重复关键字的容器的名字中都带有multi,不保持关键字顺序的容器都以unordered开头。`

#### map

```cpp
#include <iostream>
#include <map>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
    //map进行初始化
    map<string,size_t> words={{"zhangsan",1},{"lisi",1},{"wangwu",1}};
	map<string,size_t> word_count;
	string word;
	while(cin>>word){
		++word_count[word];	
	}
	for(auto const &v:word_count){
		cout<<v.first<<" occurs "<<v.second<<(v.second>1?" times":" time")<<endl;
	}
	return 0;
}
```

#### set

```c++
#include <iostream>
#include <map>
#include <set>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	map<string,size_t> word_count;
	set<string> exclude={"the","The","a"};
	string word;
	while(cin>>word){
		if(exclude.find(word)==exclude.end()){
			++word_count[word];	
		}
	}
	for(auto const &v:word_count){
		cout<<v.first<<" occurs "<<v.second<<(v.second>1?" times":" time")<<endl;
	}
	return 0;
}
```

#### pair

> 头文件`utility`

```cpp
#include <iostream>
#include <utility>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	pair<string,string> p;
	pair<string,string> p1={"hello","I am"};
	pair<string,string> p2{"hello","I am"};
	return 0;
}
```

### 动态内存与智能指针

- 位于`memory`头文件种

> 智能指针的出现是为了保证动态对象被正确释放，当一个对象被释放时，指向它的智能指针可以确保自动释放它。

#### shared_ptr

> 允许多个指针指向同一个对象

每个shared_ptr都有一个引用计数，无论何时拷贝shared_ptr，计数器都会递增。当给shared_ptr赋予一个新值或者shared_ptr被销毁，计数器就会递减。

```c++
#include <iostream>
#include <memory>
#include <string>
using namespace std;
int main(int argc, char *argv[])
{
	//1.shared_ptr的初始化
	string str;
	shared_ptr<string> s=make_shared<string>(str);
	if(s&&s->empty()){
		*s="hi";
	}
	cout<<*s<<endl;
	//2.shared_ptr的拷贝和赋值
	auto p=make_shared<string>(str);
	s=p;
	return 0;
}
```

#### unique_ptr

> 独占所指的对象

- 不支持普通的拷贝或赋值
- 可以拷贝或赋值一个将要销毁的unique_ptr

```c++
#include <iostream>
#include <memory>
using namespace std;
int main(int argc, char *argv[])
{
	unique_ptr<int> p;
	unique_ptr<int> p2(new int(20));
	return 0;
}
```

#### weak_ptr

> 弱引用，指向shared_ptr所管理的对象

```c++
#include <iostream>
#include <memory>
using namespace std;
int main(int argc, char *argv[])
{
	auto p=make_shared<int>(42);
	weak_ptr<int> w(p);//弱共享p
	if(auto np=w.lock()){
		cout<<*np<<endl;
	}
	return 0;
}
```

## 面向对象

### 拷贝控制

#### 拷贝、赋值与销毁

##### 默认拷贝构造函数

> 如果没有为一个类定义拷贝构造函数，编译器会默认为我们定义一个。和默认的构造函数不同，即使我们定义了其他拷贝构造函数，编译器也会为我们定义一个默认的拷贝构造函数。

- 如果一个类有一个移动构造函数，则拷贝初始化有时会使用移动构造函数而非拷贝构造函数。
- 拷贝构造函数发生的情况：1）将一个对象作为实参传递给一个非引用类型形参。2）从一个返回类型为非引用类型的函数返回一个对象。3）用花括号列表初始化一个数组中的元素或一个聚合类中的成员。

```cpp
#include <iostream>
#include <string>
using namespace std;
class Sales_data
{
	public:
		Sales_data(const Sales_data&);
	private:
		string bookNo;
		int units_sold=0;
		double revenue=0.0;
};
int main(int argc, char *argv[])
{
	return 0;
}
Sales_data::Sales_data(const Sales_data&org):bookNo(org.bookNo),units_sold(org.units_sold),revenue(org.revenue){}
```

##### 拷贝赋值运算符

> 与处理拷贝构造函数一样，如果一个类未定义自己的拷贝赋值运算符，编译器会为它生成一个合成拷贝赋值运算符。

##### 析构函数
- 析构函数的调用时机：1）变量在离开其作用域时被销毁。2）当一个对象被销毁时，其成员被销毁。3）容器被销毁时，其元素被销毁。4）对于动态分配的对象，当对他的指针应用delete运算符时被销毁。5）对于临时对象，当创建它的表达式结束时被销毁。
> 当一个类未定义自己的析构函数时，编译器会为它定义一个默认的析构函数

##### 三五法则

> 1. 需要析构函数的类也需要拷贝和赋值操作。
> 2. 需要拷贝操作的类也需要赋值操作

- 可以使用=default来显示要求编译器生成默认的构造函数、析构函数。如果不希望合成的成员是内联函数，则应该只对成员的类外定义使用=default。
- 可以通过将`拷贝构造函数`和`赋值运算符`使用=delete来阻止拷贝，可以对任何函数指定delete，但是只能对编译器可以合成的默认构造函数或拷贝控制成员使用=default。
- 析构函数一般不能定义为删除的成员，如果析构函数被定义为删除函数，那么就无法删除该类型的对象。
- 如果一个类有数据成员不能默认构造、拷贝、复制或销毁，则对应的成员函数被定义为删除的。一个成员有删除的或不可访问的析构函数会导致合成的默认和拷贝构造函数被定义为删除的。对于具有引用成员无法默认构造的const成员的类，编译器不会为其和成默认构造函数。

### 运算符重载

#### 输入输出运算符重载

> 必须为全局函数重载

```C++
#include <iostream>
#include <string>
using namespace std;
class Person
{
	friend ostream &operator<<(ostream &os,const Person &p);
	friend istream &operator>>(istream &is,Person &p);
public:	
	Person(){}
	Person(string name,int age){
		this->name=name;
		this->age=age;
	}
private:
   string name;  
   int age;
};
//全局函数输出运算符<<重载
ostream &operator<<(ostream &os,const Person &p){
		os<<"name:"<<p.name<<" age:"<<p.age;
		return os;		
}
//全局函数输入运算符>>重载
istream &operator>>(istream &is,Person &p){
	is>>p.name>>p.age;
	return is;
}
int main(int argc, char *argv[])
{
	Person p("zhangsan",18);
	cout<<p<<endl;
	Person p2;
	cin>>p2;
	cout<<p2<<endl;
	return 0;
}
```


#### 相等运算符和关系运算符重载

> 此处只列举`==`运算符重载，其余关系运算符也类似。

```c++
#include <iostream>
#include <string>
using namespace std;
class Person
{
	friend bool operator==(const Person &p,const Person &p2);
public:
	Person(){}
	Person(string name,int age){
		this->name=name;
		this->age=age;
	}
	// 成员函数进行==运算符重载
	/**bool operator==(const Person &p)
	{
		if(p.name==this->name&&p.age==this->age){
			return true;
		}
		return false;
	}**/
private:
	string name;
	int age;
};
//全局函数进行==运算符重载
bool operator==(const Person &p,const Person &p2){
	return p.name==p2.name&&p.age==p2.age;
}
int main(int argc, char *argv[])
{
	Person p("zhangsan",18);
	Person p2("zhangsan",18);
	if(p==p2){
		cout<<"=="<<endl;
	}
	return 0;
}
```

#### 赋值运算符重载

```c++
#include <iostream>
#include <string>
using namespace std;
class Person
{
friend ostream &operator<<(ostream &os,const Person &p);
public:
	Person(){}
	Person(string name,int age){
		this->name=name;
		this->age=age;
	}
	// 成员函数进行=运算符重载
	Person& operator=(const Person &p)
	{
		this->name=p.name;
		this->age=p.age;
		return *this;
	}
private:
	string name;
	int age;
};
//全局函数输出运算符<<重载
ostream &operator<<(ostream &os,const Person &p){
		os<<"name:"<<p.name<<" age:"<<p.age;
		return os;		
}
int main(int argc, char *argv[])
{
	Person p("zhangsan",18);
	Person p2;
	Person p3;
	p3=p2=p;
	cout<<p2<<p3<<endl;
	return 0;
}
```


```c++
#include <iostream>
#include <string>
using namespace std;
class People {
	public:
		People(int age) {
			p_age=new int(age);
		}
		~People() {
			if(p_age!=NULL) {
				delete p_age;
				p_age=NULL;
			}
		}
//		=运算符重载
		People& operator=(People &p) {
//			如果自身有内存先释放干净
			if(p_age!=NULL) {
				delete p_age;
				p_age=NULL;
			}
			this->p_age= new int(*p.p_age);
			return *this;
		}
		int *p_age;
};
int main(int argc, char** argv) {
	People p1(10);
	People p2(18);
	p2=p1;
	cout<<"age:"<<*p2.p_age<<endl;
	return 0;
}
```

#### 下标运算符重载

>下标运算符必须是成员函数

```c++
#include <iostream>
#include <string>
using namespace std;
class MyStr
{
public:
	MyStr(){}
	MyStr(size_t length=0){
		if(length == 0){
			elems = NULL;
		}else{
			elems = new string[length];
		}
	}
	~MyStr(){
		if(this->elems!=nullptr){
			delete[] elems;
			elems=nullptr;
		}
	}
	string& operator[](size_t n){
		return elems[n];
	}
	const string& operator[](size_t n) const{
		return elems[n];
	}
private:
	string *elems;
};
int main(int argc, char *argv[])
{
	MyStr str(3);
	for(int i=0;i<3;i++){
		string s;
		cin>>s;
		str[i]=s;
	}
	cout<<str[0]<<endl;
	return 0;
}
```

#### 递增运算符重载

```c++
#include <iostream>
#include <string>
using namespace std;
class Number {
		friend ostream& operator<<(ostream &cout,Number n);
	public :
		Number() {

		}
		Number(int num) {
			this->num=num;
		}
//		前置++重载
		Number& operator++() {
			++num;
			return *this;
		}
//		后置 ++重载
		Number operator++(int) {
			Number temp=*this;
			num++;
			return temp;
		}
		int num;
};
ostream& operator<<(ostream &cout,Number n) {
	cout<<n.num;
	return cout;
}
int main(int argc, char** argv) {
	Number n(10);
	cout<<++n<<endl;
	return 0;
}
```


#### 成员访问运算符重载

```c++
#include <iostream>
#include <vector>
using namespace std;
 
// 假设一个实际的类
class Obj {
   static int i, j;
public:
   void f() const { cout << i++ << endl; }
   void g() const { cout << j++ << endl; }
};
 
// 静态成员定义
int Obj::i = 10;
int Obj::j = 12;
 
// 为上面的类实现一个容器
class ObjContainer {
   vector<Obj*> a;
public:
   void add(Obj* obj)
   { 
      a.push_back(obj);  // 调用向量的标准方法
   }
   friend class SmartPointer;
};
 
// 实现智能指针，用于访问类 Obj 的成员
class SmartPointer {
   ObjContainer oc;
   int index;
public:
   SmartPointer(ObjContainer& objc)
   { 
       oc = objc;
       index = 0;
   }
   // 返回值表示列表结束
   bool operator++() // 前缀版本
   { 
     if(index >= oc.a.size() - 1) return false;
     if(oc.a[++index] == 0) return false;
     return true;
   }
   bool operator++(int) // 后缀版本
   { 
      return operator++();
   }
   // 重载运算符 ->
   Obj* operator->() const 
   {
     if(!oc.a[index])
     {
        cout << "Zero value";
        return (Obj*)0;
     }
     return oc.a[index];
   }
};
 
int main() {
   const int sz = 10;
   Obj o[sz];
   ObjContainer oc;
   for(int i = 0; i < sz; i++)
   {
       oc.add(&o[i]);
   }
   SmartPointer sp(oc); // 创建一个迭代器
   do {
      sp->f(); // 智能指针调用
      sp->g();
   } while(sp++);
   return 0;
}
```

##### 函数运算符重载

```cpp
#include <iostream>
#include <string>
using namespace std;
class Print {
	public:
		Print() {
		}
		void operator()(string valueString) {
			cout<<valueString<<endl;
		}
};
int main(int argc, char** argv) {
	Print print;
	print("hello world!");
	return 0;
}
```

### OOP

#### 继承

- 动态绑定：函数的运行版本由实参决定，即在运行时选择函数的版本，又称为运行时绑定。
- 使用基类的引用或指针调用一个虚函数时将发生动态绑定。

> 继承可以联系在一起的类构成一种层次关系，基类希望其派生类各自定义适合自身的版本，则可以使用虚函数



#### 多态

> 

### 模板与泛型

#### 函数模板

#### 类模板

#### 成员模板

#### 模板实参推断

#### 可变参数模板

## C++高级

### 常用标准库函数

### 异常处理、多继承与虚继承



