# GDB 调试必会指南

## 1 gdb调试

### 1.1 gdb介绍

+ GDB（GNU Debugger）是GCC的调试工具。其功能强大，描述如下：
+ GDB主要帮助你完成下面四个方面的功能：
  + 启动程序，可以按照你的自定义的要求随心所欲的运行程序
  + 可让调式的程序在你所指定的断点处停住。（断电可以是条件表达式）
  + 当程序被停住时，可以检查此时你的程序中所发生的事
  + 动态的改变你程序的执行环境

### 1.2 生成调试信息

+ 一般来说GDB主要调试的是 C/C++的程序。要调试C/C++的程序，首先在编译时，我们必须要把调试信息加到可执行文件中。
  + **使用编辑器（cc/gcc/g++）的 -g 参数可以做到这一点**
+ 如：
  + `gcc -g -c hello.c `
  + `gcc -o hello hello.o`
  + 如果没有-g，你将看不到程序的函数名，变量名，所代替的全是运行时的内存地址。当你用 -g 把调试信息加入之后，并成功编译目标代码以后，接下来就是如何使用gdb来调试它。

### 1.3 启动gdb

+ 启动`gdb：gdb program`
  + program也就是你的执行文件，一般在当前目录下。
+ 设置运行参数
  + `set args` 可指定运行时参数。（如： `set args 10 20 30 40 50`）
  + `show args`命令可以查看设置号的运行参数。
+ 启动程序
  + `run`  程序开始执行，如果有断点，停在第一个断点处
  + `start` 程序向下执行一行。（**在第一条语句处停止**）

### 1.4 显示源代码

+ GDB可以打印所调试程序的源代码，当然，在程序编译时一定要加上  **-g**  的参数，把源程序信息编译到执行文件中。不然就看不到源程序了。当程序停下来以后，GDB会报告程序停在了那个文件的第几行上。**你可以用list命令来打印程序的源代码**，默认打印10行，list命令的用法如下所示：
  + `list linenum`:打印 第 linenum行的上下文内容
  + `list function` 显示函数名为 function 的函数的源程序
  + `list`  显示当前行后面的源程序
  + `list -` 显示当前文件开始初的源代码
  + `list file:linenum`  显示file文件下第n行
  + `list file:function`  显示file文件的函数名function的函数的源代码
+ 一般时打印当前行的上5行和下5行，如果显示函数是上2行下8行，默认是10行，当然，也可以定制显示范围，使用下面命令可以设置一次显示源代码的行数
  + `set listsize count`  设置一次显示源代码的行数
  + `show listsize`  查看当前listsize的设置

### 1.5 设置断点

#### 简单断点-当前文件

+ break设置断点，可以简写为 **b**
  + **b 10**  设置断点 ，在源程序第10行
  + **b func** 设置断点， 在 func 函数入口处

#### 多文件设置断点-其他文件

+ 在进入指定函数时停住：
  + `b filename:linenum` -- 在源文件 filename 的linenum 行处停住
  + `b filename:function` ---在源文件 filename的function函数的入口停住

#### 查询所有断点

+ `info break`

#### 失效/生效断点

+  `disable m n | m-n`

+ `enavle m n | m-n`

#### 条件断点

+ `b test.c:8  if intValue == 5`

#### 删除断点

+  `delete m n | m-n`
+ `d m n | m-n`
+ `delete` 删除所有断点

### 1.6 调试代码

+ `run`  运行程序，课简写为 `r`
+ `next` 单步跟踪，函数调用当作一条简单语句执行，课简写为 `n`
+ `step` 单步跟踪， 会进入到被调用函数体内，课简写为 `s`
+ `finsh` 退出进入的**函数**， **如果出不去，看一下函数体中的循环是否有断点，如果有删除，或者设置无效**
+ `until` 在一个循环体内单步跟踪时，这个命令可以运行程序直到退出**循环体**，可简写为 `u`
  + **如果出不去，看一下函数体中的循环是否有断点，如果有删除，或者设置无效，**
+ `continue` 继续运行程序，可简写为 `c` （**若有断点则跳到下一个断点处**）

### 1.7 查看变量的值

#### 查看运行时的变量

+ `print` 打印变量、字符串、表达式等的值，可简写为 `p`
  + `p count` -----打印 count 的值

#### 自动显示变量的值

+ 你可以设置一些自动显示的变量，当程序停住时，或是在你单步跟踪时，这些变量会自动显示。相关的GDB命令时display。

  + `display` 变量名

  + `info display`  --- 查看display设置的自动显示的信息

  + `undisplay num`（info display 时显示编号）

  + `delete display dnums...`—删除自动显示，dnums意为所设置好了的自动显示的编号。如果要同时删除几个，编号可以用空格分隔，如果要删除一个范围内的编号，可以用剑豪表示

    + 删除某个自动显示：`undisplay num` 或者 `delete display num`
    + 删除多个：`delete display num1 num2`
    + 删除一个范围的：`delete display m-n`
  + `disable display dnums...`
    + 使一个自动显示无效： `disable display num`
  + `enable disable dnums...`
    + 使其从无效变成有效
  
  #### 查看修改变量的值
  
  + `ptype width` - 查看变量width的类型
    + `type = double`
  + `p width`—打印变量width的值
    + `$4 = 13`
  + 你可以使用set var命令来告诉GDB, width不是你GDB的参数，而是程序的变量名，如:
    `set var width=47/将变量var值设置为47`
  + **在你改变程序变量取值时，最好都使用set var格式的GDB命令**。
