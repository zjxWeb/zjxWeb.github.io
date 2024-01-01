# *`CS106X：Programing Abstractions in C++`*

*资料网址：*

> *https://web.stanford.edu/dept/cs_edu/resources/qt/*
>
> *https://web.stanford.edu/class/cs106x/assignments.html*
>
> *https://stanford.edu/class/archive/cs/cs106x/cs106x.1162/lectures.html*
>
> *https://n0eb0mluamf.feishu.cn/docx/BAf1dLjTio7OfaxHzALcEHQonde*

## *Functions;String* 

### *Functions*

+ *值传递：会将其值拷贝过去**，这样会有空间的开销**，但是可以忽略不计。*
+ *引用传递：则不会有额外的空间开销，但是容易 造成滥用。*
  + *有时引用参数甚至会更慢，因为在使用引用参数时，程序还必须创建与之相关的内存指针和别的东西*

*![1](./src/1.png)*



### *String*

*![2](./src/2.png)*

*![3](./src/3.png)*

*![4](./src/4.png)*

*![5](./src/5.png)*

![6](./src/6.png)

![7](./src/7.png)

> 注意：右下角红色的代码会报错。

![8](./src/8.png)

> Istringstream会从string对象读取数据，而不是从文件中读取的

> ifstream对象读取文件中的其中一条line,再使用istringstream对象将该line中文本的word分开

![9](./src/9.png)

![10](./src/10.png)

## spl—collection-grid 

![11](./src/11.png)

> SPL中的 collection 拥有越界检测功能与内存错误检测功能

> 使用其它的来实现二维数组的话，一般不会报错，所以说grid来实现二维数组更容易debugger

> + 在没有输入grid对象中元素值时,matrix中每个元素都是0或与0类似的值,如果grid对象存储的是double,那么元素的默认值就是0.0,如果存储的是bool,那么元素的默认值就是false

![12](./src/12.png)

> Grid不会自动扩容

> + ostr代表负责输出内容的stream,例如cout ofstream或ostringstream,你们可以将grid对象中的内容输出到ostr,它们会将grid对象中的内容以合理的方式输出

> **不使用引用传值**——复制出一整个grid对象的拷贝——降低程序的效率
>
> **引用传值**——grid对象会被其它对象所共享，会存在潜在的危险（需要加入const 来解决） 
>
> ```c++
> intfunction(const Grid<int>& g)
> ```

## spl—vector

![13](./src/13.png)

> 空间是动态的。——list 
>
> 如果你使用array对象时发生了访问越界，那么程序会返回你无用的数据，
>
> 在vector中，则会有错误信息以帮助你debug

![14](./src/14.png)

