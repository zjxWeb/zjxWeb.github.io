# go基础学习

## go的相关说明

### 路径说明

+ GOROOT  表示当前所在源码包所在路径
+ GOPATH  开发者go的项目默认路径

![1](./src/1.png)

+ 通过 `go version`来检查是否安装成功，和go的版本号。

### go的优势

1. 极 **简单的部署** 方式
   + 可直接编译成机器码
   + 不依赖其他库
   + 直接运行即可部署
2. 静态类型语言
   + 编译的时候检查出来隐藏的大多数问题
3. 语言层面的**并发**
   + 天生的基因支持
   + 充分的利用多核
4. 强大的标准库
   + runtime 系统调度机制（垃圾回收，平均调度……）
   + 高效的GC垃圾回收
   + 丰富的标准库

### 第一个go程序

![2](./src/2.png)

## 基本语法

### 四种变量的声明方式

```go
// 方法一：声明一个变量，默认值是0
var a int
fmt.Println("a = ",a)
fmt.Printf( "type of a = %T\n", a)

// 方法二：声明一个变量，初始化一个值
var a int = 100

// 方法三：在初始化的时候，可以省去数据类型，通过自动匹配当前的变量的数据类型
var c = 100

// 方法四：（常用的方法）省去var关键字，直接自动匹配
e := 100  // 此方法不能声明全局变量

var(
    vv int = 100
    vv bool = true
)
```

### 常量与iota

```go
// 常量（只读属性）
const length int = 10

// const 来定义枚举类型
const(
    // 可以在const（）添加一个关键字 iota ，每行的iota都会累加1，第一行的iota的默认值是0
    // iota只能配合const（）一起使用，iota只有在const进行累加效果
    BEIJIN = iota // iota = 0
    SHNAGHAI	// iota = 1
    SHENZHEN	// iota = 2
)
```

### 函数

#### 函数多返回值

```go
// 返回多个返回值，匿名的
func foo2(a string,b int) (int,int){
    return 666,777
}
// 返回多个返回值，有形参名称的
func foo3(a string,b int)(r1 int,r2 int){
    //给有名称的返回值变量赋值
    r1 = 100
    r2 = 300
    return 
}

func foo4(a string,b int)(r1,r2 int){
    //给有名称的返回值变量赋值
    r1 = 100
    r2 = 300
    return 
}
```

#### import导包路径问题与init方法调用流程

![3](./src/3.png)

#### import匿名及别名导包方式

![4](./src/4.png)

![5](./src/5.png)

> `.`的这种形式不推荐

### defer 语句的调用顺序

> 在函数结束之前触发，和C++里面的析构函数比较类似

```go
fun main(){
    // 写入defer关键字
    // 按栈的形式入栈，打印的时候是先进后出
    defer fmt.println("main end1")
    defer fmt.println("main end1")
}
```

> defer 和 return——**return先执行，defer后执行**

### 数组和动态数组

> 固定长度数组（值传递）
>
> **属于值拷贝（赋值的时候）**

```go
func main() {// 函数的 { 一定是和 函数名在同一行
	// 固定长度的数组
	var myArray [10]int
	myArray2 := [10]int{1,2,3,4}
	for i := 0; i < 10; i++ {
		fmt.Println(myArray[i])
	}

	for index,value := range myArray2 {
		fmt.Println("index=", index,"value =", value)
	}
	// 查看数组的数据类型
	fmt.Printf("%T\n", myArray)
	fmt.Printf("%T\n", myArray2)
}
```

> 动态数组（引用传递）

```go
func printArry(myArry []int){
	// _表示匿名变量
	for _,value := range myArry {
		fmt.Println(value)
	}

	myArry[0] = 100 // 引用传递可以改变之前的数组的值
}

// main函数
func main() {// 函数的 { 一定是和 函数名在同一行
	myArry := []int{1, 2, 3, 4, 5} //动态数组，切片slice
	printArry(myArry)
	fmt.Println("-------------------")
	for _,value := range myArry {
		fmt.Println(value)
	}
}
```

#### slice的声明方式

```go
func main() {// 函数的 { 一定是和 函数名在同一行
	// 声明slice是一个切片，默认值是1，2，3 长度是3
	slice := []int{1, 2, 3}

	// 声明slice1 是一个切片，但是并没有给slice分配空间
	var slice1 []int
	// 开辟3空间
	slice1 = make([]int, 3)
	slice1[0] = 100

	// 声明slice是一个切片。同时给slice分配空间，3个空间，初始化是0
	var slice2 []int = make([]int, 3)

	// 声明slice是一个切片。同时给slice分配空间，3个空间，初始化是0，通过 ：=  推到slice是一个切片（常用）
	slcie3 := make([]int, 3)

	// 判断一个slice是否为0
	if slice1 == nil {
		fmt.Println("slice1 is nil")
	}
}
```

#### slcie切片追加与截取