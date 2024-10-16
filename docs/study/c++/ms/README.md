##  简历技能点归纳总结

## C++基础知识【const左定向，右定值】

<!-- tabs:start -->

#### **菱形继承**

![56](./src/56.png)

#### **动态库和静态库的区别**

![57](./src/57.png)

#### **Reactor 和 Proactor**

![58](./src/58.png)



#### **多态**

![44](./src/44.png)

#### **类型推导**

![44](./src/45.png)

#### **function，lambda，bind之间的关系**

![](./src/46.png)

#### **如何写线程安全的程序**

![47](./src/47.png)

#### **this指针**

![](./src/48.png)

#### **智能指针**

![49](./src/49.png)

> 循环引用代码

```cpp
class B;
class A {
public:
	~A() {
		cout << "A::~A()" << endl;
	}
	//shared_ptr<B>spb;// 循环引用
	weak_ptr<B>spb;
};
class B {
public:
	~B() {
		cout << "B::~B()" << endl;
	}
	//shared_ptr<A>spa;// 循环引用
	weak_ptr<A>spa;
};
int main() {
	shared_ptr<A>sp1 = make_shared<A>();
	shared_ptr<B>sp2 = make_shared<B>();
	sp1->spb = sp2;
	sp2->spa = sp1;
	cout << "A.use_cout:" << sp1.use_count() << "  "
		<<"B.use_cout:" << sp2.use_count() << endl; // 循环引用 2 2  弱引用 1 1 ~B ~A
}
```

#### **select/poll/epoll**

![60](./src/60.png)

![61](./src/61.png)

![62](./src/62.png)

####  **`malloc,free`和 `new，delete`的区别**

> `malloc`,`free` c语言中库函数，`new`，`delete`是C++操作符

+ `new`是自动计算所需分配内存大小， `malloc`需要手动计算
+ `new` 返回的是**对象类型的指针**， `malloc`返回的是 `void*`之后进行类型转换 

```cpp
Task *ptask = (Task *) malloc(sizeof(*ptask));
```

+ `new` 分配失败会抛出异常，`malloc`分配失败返回的是 `NULL`
+ `new` 实在 `free store`【自由存储区：可能在堆上，也可以自定义】上分配内存，
  + `malloc`分配的是虚拟内存，是在堆上分配的
    + 小于 `128k`通过 `brk`系统调用——在堆上
    + 大于 `128k`是通过 `mmap`系统调用分配的——文件映射区
    + 如果分配的空间比较小，是在内存值当中分配的，内存值没有数据，通过系统调用 `brk`在堆上进行分配
  + `malloc` 调用后是否立即得到物理内存`malloc`最开始是没有初始化的，当前只是有一个具体的虚拟内存，如果映射到物理内存，我们通过缺页中断建立这一个映射关系。
+ `new`的实现过程
  + 首先调用 `operator new`的标准库函数，
  + 申请足够的空间
  + 调用构造函数 ——作用：初始化成员变量
  + 返回指向新分配并构造后的对象的指针
+ `delete`需要对象类型的指针，`free`是 `void*`类型的指针；
  + `delete`实现过程：
    + 先调用析构函数——释放资源
    + 调用 `operate delete`
    + 释放空间
  + `free（p）`怎么知道该释放多大的空间
    + `malloc`分配空间，多分配了 `16字节`的空间
    + 左偏移 `16字节`

##### 被 `free`回收的内存是立即返回还给操作系统吗？

+ 不是的
  + 被 `free`回收的内存会首先被 `ptmalloc`使用双链表保存起来，当用户下一次申请内存的时候，会尝试从这些内存中寻找合适的返回。这样就避免了频繁的系统调用，占用过多的系统资源。同时 `ptmalloc`也会尝试堆小块内存进行合并，避免过多的内存碎片。
+ `malloc`申请的空间小于`128k`，释放内存，不会还给操作系统由`malloc`内部管理起来
+ `malloc`申请的空间大于等于`128k`，释放内存，还给操作系统

#### **`const`和`static`的作用**

+ `static`

  > 不考虑类的情况

  + 隐藏。所有不加 `static`的**全局变量**和函数具有全局可见性。可以在其它文件中使用，加了之后只能在该文件所在的编译模块中使用。
  + 默认初始化为0，包括未初始化的全局静态变量与局部静态变量，都存在全局未初始化区
  + 静态变量在函数内定义，始终存在，且只进行一次初始化，具有**记忆性**，其作用范围与局部变量相同，函数退出后仍然存在，但不能使用。

  > 考虑类的情况

  + `static`成员变量：只与类关联，不与类的对象关联。定义时要分配空间，不能在类声明中初始化，必须在类定义体外部初始化，初始化时不需要标示为 `static`；可以被非 `static`成员函数任意访问；【**类内声明，类外初始化**】
  + `static`成员函数：不具有`this`指针，无法访问类对象的非 `static`成员变量和非`static`成员函数； **不能被声明为`const`、虚函数和 `volatile`**；可以被非`static`成员函数任意访问；

+ `const`

  > 不考虑类的情况

  + `const`常量在定义时必须初始化，之后无法修改
  + `const`形参可以接收`const`和非`const`类型的实参

  > 考虑类的情况

  + `const`成员变量：不能在类定义外部初始化，只能通过构造函数初始化列表进行初始化，并且必须有构造函数；不同类对其`const`数据成员值可以不同，所以不能在类中声明时初始化；

  + ```cpp
    // 类中有一个const成员变量 const int a;
    Time::Time(int tmphour):a(00)// 初始化
    {
    	cout << "调用了Time::Time(int tmphour):a(00)构造函数" << endl;
    }
    ```

  + `const`成员函数： `const`对象不可以调用非`const`成员函数；非`const`对象都可以调用；不可以改变非`mutable`（用该关键字声明变量可以在`const`成员函数中修改）数据的值；

  > 总结：
  > 1、类中的`const`成员会被分配空间
  > 2、类中的`const`成员本质是只读变量
  > 3、类中的`const`成员只能在初始化列表中指定初始值。
  > 4、编译器无法直接得到`const`成员初始值，因此无法进入符号表成为真正意义上的常量
  > 5、类中的`const`成员可以使用`const_cast`去除只读属性后通过指针修改值
  > 6、初始化是对正在创建的对象进行初值设置，赋值是对已经存在的对象进行值设置

#### **重载和重写**

1.定义不同---重载是定义相同的方法名，参数不同;重写是子类重写父类的方法。

2.范围不同---重载是在一个类中，重写是子类与父类之间的。

3.多态不同---重载是编译时的多态性，重写是运行时的多态性。

4.返回不同---重载对返回类型没有要求，而重写要求返回类型必须相同。

5.参数不同---重载的参数个数、参数类型、参数顺序可以不同，而重写父子方法参数必须相同。

6.修饰不同---重载对访问修饰没有特殊要求，重写访问修饰符的限制一定要大于被重写方法的访问修饰符。

#### **联合体 (Union)**

- **联合体的定义：** Union是一种特殊的C语言数据结构，它可以存储多个类型的变量，但任意时刻只有一个成员有效。所有成员共享同一块内存。

- **特点：**

  1. Union 的大小等于最大成员的大小。
  2. 每个成员的值共享同一片内存，因此当你向某一成员赋值时，它会覆盖其他成员。

- **示例：**

  ```cpp
  union Data {
      int i;
      float f;
      char str[20];
  };
  ```

  如果 `i` 被赋值，存储空间被 `i` 占用；如果接着给 `f` 赋值，`i` 的值将被覆盖。

- **now同时赋值问题：** 联合体不允许多个成员同时存储值，只有一个成员有效。如果需要多个成员同时存储值，则需要使用结构体或其他机制。

#### **四种强制类型转换符**

> `static_cast`

+ 特点：

  - 编译时检查，转换在编译时执行，性能开销低。

  - 适用于基本类型之间的转换、类层次结构中的上行转换（从派生类到基类）、非多态类型的转换等。

  - 不涉及运行时检查，如果类型不兼容，编译时就会报错，保证了一定的类型安全性。

  - 不能用于转换没有相关性的类型，例如指针之间的任意转换。

+ 使用场景：

  - **基本类型转换**：如 `int` 转 `double`、`char` 转 `int` 等。

  - **类层次结构的上行转换**：如派生类对象转换为基类指针或引用。

  - **显式调用非隐式转换的构造函数**。

示例：

```cpp
int i = 42;
double d = static_cast<double>(i);  // 将 int 转换为 double

class Base {};
class Derived : public Base {};
Derived d_obj;
Base* b_ptr = static_cast<Base*>(&d_obj);  // 派生类指针转换为基类指针
```

注意：

- `static_cast` 只能用于安全的类型转换，不能转换不相关类型的指针或引用。如果在类层次结构中进行向下转换（基类转换为派生类），这可能导致未定义行为，因为没有运行时类型检查。

> `dynamic_cast`

+ 特点：

  - 运行时类型检查，仅适用于多态类型（即包含虚函数的类）。

  - 用于安全地在类层次结构中进行**向下转换**，将基类指针或引用转换为派生类指针或引用。

  - 如果转换失败，指针会返回 `nullptr`，引用会抛出 `std::bad_cast` 异常。

  - 适合当你不确定基类对象的实际类型时使用，确保类型转换安全。

+ 使用场景：

  - **类层次结构的向下转换**：如将基类指针安全地转换为派生类指针。

  - **检查类型安全性**：需要在运行时判断类型转换是否成功。

示例：

```cpp
class Base {
public:
    virtual ~Base() {}  // 必须有虚函数才能使用 dynamic_cast
};
class Derived : public Base {};
class AnotherClass : public Base {};

Base* base = new Derived();
Derived* derived = dynamic_cast<Derived*>(base);  // 成功：base 实际指向 Derived
AnotherClass* another = dynamic_cast<AnotherClass*>(base);  // 失败，返回 nullptr
if (another == nullptr) {
    std::cout << "Conversion failed" << std::endl;
}
```

注意：

- 只有在多态类中才能使用 `dynamic_cast`，如果类中没有虚函数表，它将无法工作。
- 向下转换时，`dynamic_cast` 比 `static_cast` 更安全，但也带来运行时性能开销。

> `const_cast`

+ 特点：

  - 用于添加或移除对象的 `const` 或 `volatile` 限定符。

  - 只能改变 `const` 或 `volatile` 的性质，不改变对象的底层类型。

  - 经常用于需要绕过 `const` 修饰符来修改数据，但必须确保对象的原始定义不是 `const`，否则修改会导致未定义行为。

+ 使用场景：

  - **修改 `const` 参数**：例如函数参数被声明为 `const`，但需要修改该参数。

  - **将非 `const` 对象传递给需要 `const` 参数的函数**。

示例：

```cpp
void modify(int* p) {
    *p = 10;
}

const int i = 5;
modify(const_cast<int*>(&i));  // 移除 const 属性，但对原始 const 对象的修改会导致未定义行为

void print(const int& i) {
    std::cout << i << std::endl;
}
int j = 5;
print(const_cast<const int&>(j));  // 添加 const 属性，将非 const 对象传递给 const 参数
```

注意：

- **禁止修改真正的常量对象**，例如通过 `const_cast` 修改 `const` 变量将导致未定义行为。
- 通常在操作系统 API 或库接口需要非 `const` 参数时使用。

> `reinterpret_cast`

+ 特点：

  - 最危险、最强大的类型转换，允许几乎任意类型之间的转换。

  - 本质上是**位级别的转换**，直接转换指针、引用、整型等，不关心它们的真实类型。

  - 不进行任何类型检查或数据调整，可能导致未定义行为。

  - 适用于需要在位级别直接控制或访问底层数据的场景，例如低级系统编程或与硬件交互。

+ 使用场景：

  - **指针类型之间的转换**：如将 `int*` 转换为 `char*`，用于操作内存。

  - **指针与整数之间的转换**：例如从 `int` 转换为 `void*`，或将指针转为整数类型。

  - **硬件寄存器访问**：用于操作系统内核编程、驱动程序开发或嵌入式系统。

示例：

```cpp
int i = 42;
void* p = reinterpret_cast<void*>(&i);  // int* 转换为 void*
struct A { int a; };
struct B { int b; };
A a_obj;
B* b_ptr = reinterpret_cast<B*>(&a_obj);  // 将 A* 转换为 B*
```

注意：

- `reinterpret_cast` 仅在知道操作的类型转换是有意义的情况下使用。它跳过所有类型安全性检查，如果类型不兼容，可能导致程序崩溃或其他未定义行为。
- 一般避免在常规应用程序中使用，除非非常明确需要低级别的位操作。

| 类型转换           | 检查类型          | 执行时间 | 使用场景                                          | 是否安全                     |
| ------------------ | ----------------- | -------- | ------------------------------------------------- | ---------------------------- |
| `static_cast`      | 编译时检查        | 编译时   | 基本类型转换、上行转换                            | 类型安全                     |
| `dynamic_cast`     | 运行时类型检查    | 运行时   | 类层次结构中的向下转换，多态对象的类型安全转换    | 类型安全（运行时检查）       |
| `const_cast`       | 移除/添加 `const` | 编译时   | 添加或移除 `const`/`volatile` 限定符              | 需要小心使用                 |
| `reinterpret_cast` | 位级别转换        | 编译时   | 不相关指针/类型之间的转换，硬件编程，底层系统编程 | 不类型安全（可能未定义行为） |

#### **STL的常用容器**

![3](./src/3.png)

+ **容器(`Containers`)**:各种数据结构，如`Vector`,`List`,`Deque`,`Set`,`Map`,用来存放数据，`STL`容器是一种`Class Template`,一句话 ，这货是用来组织数据 ，存放数据的。
+ **算法(`Algorithms`)**:各种常用算法如`Sort,Search,Copy,Erase`,从实现的角度来看，`STL`算法是一种`Function Templates`，一句话，这货是用来对数据进行加工处理的。
+ **迭代器(`Iterators`):**扮演**容器与算法之间的胶合剂**，是所谓的"泛型指针”，共有五种类型，以及其它衍生变化，从实现的角度来看，迭代器是一种将`:0perators*,0perator->,0perator++,Operator-`等相关操作予以重载的`Class Template`。可以把迭代器看成从容器中挖数据的勺子，是一个指针。
+ **仿函数(`Functors`)**:行为类似函数，可作为算法的某种策略(`Policy`),从实现的角度来看，仿函数是一种重载了“小括号”的`Class` 或 `Class Template`。一般函数指针可视为狭义的仿函数。
+ **适配器(配接器)(`Adapters`)**:一种用来修饰容器(`Containers`)或仿函数(`Functors`)或迭代器(`Iterators`)接口的东西，例如:`STL`提供的`Queue`和`Stack`，虽然看似容器，其实只能算是一种容器配接器因为 它们的底部完全借助`Deque`，所有操作有底层的`Deque`供应。改变`Functor`接口者，称为`Function Adapter`;改变`Container`接口者，称为`Container Adapter`;改变`Iterator`接口者，称为`Iterator Adapter`。配接器的实现技术很难一言蔽之，必须逐一分析。
+ **Allocator(分配器)** 负责空间配置与管理，从实现的角度来看，配置器是一个实现了动态空间配置、空间管理、空间释放的Class Template。

| 容器           | 底层数据结构     | 时间复杂度                                                | 有无序 | 可不可重复 | 其它                                                         |
| -------------- | ---------------- | --------------------------------------------------------- | ------ | ---------- | ------------------------------------------------------------ |
| array          | 数组             | 随机读改O(1)                                              | 无序   | 可重复     | 支撑快速随机访问                                             |
| vector         | 动态数组         | 随机读改、尾部插入、尾部删除O(1)、头部插入、头部删除 O(n) | 无序   | 可重复     | 支撑快速随机访问                                             |
| list           | 双向链表         | 插入、删除 O(1)、随机读改 O(n)                            | 无序   | 可重复     | 支撑快速增删                                                 |
| deque          | 双端队列         | 头尾插入、头尾删除 O(1)                                   | 无序   | 可重复     | 一个中央控制器+多个缓冲区，支持首尾快速增删，支持随机访问    |
| stack          | deque /list      | 顶部插入、顶部删除 O(1)                                   | 无序   | 可重复     | deque 或 list 封闭头端开口，不用 vector的原因应该是容量大小有限制，扩容耗时 |
| queue          | deque /list      | 顶部插入、顶部删除 O(1)                                   | 无序   | 可重复     | deque 或 list 封闭头端开口，不用 vector的原因应该是容量大小有限制，扩容耗时 |
| priority_queue | vector +maX-heap | 插入、删除 O(log2n)                                       | 有序   | 可重复     | vector容器+heap处理规则                                      |
| set            | 红黑树           | 插入、删除、查找 O(log2n)                                 | 有序   | 不可重复   |                                                              |
| multiset       | 红黑树           | 插入、删除、查找 O(log2n)                                 | 有序   | 可重复     |                                                              |
| map            | 红黑树           | 插入、删除、查找 O(log2n)                                 | 有序   | 不可重复   |                                                              |
| multimap       | 红黑树           | 插入、删除、查找 O(log2n)                                 | 有序   | 可重复     |                                                              |

> vector

+ **特点**

  - **连续内存分配**：元素在内存中连续存储，有利于快速访问。

  - **动态大小**：根据需要自动扩容，但扩容时可能会导致内存重新分配和元素复制。

  - **随机访问**：支持通过索引直接访问元素，时间复杂度为O(1)。

  - **迭代器**：提供随机访问迭代器，支持STL算法。

+ 原理

  + vector底层是一个动态数组，包含三个迭代器，start和finish之间是已经被使用的空间范围，end_of_storage是整块连续空间包括备用空间的尾部。
  + 当空间不够装下数据（vec.push_back(val)）时，**会自动申请另一片更大的空间（1.5倍或者2倍）**，然后把原来的数据拷贝到新的内存空间，接着释放原来的那片空间【vector内存增长机制】。
  + 当释放或者删除（vec.clear()）里面的数据时，其存储空间不释放，仅仅是清空了里面的数据。
  + 因此，对vector的任何操作一旦引起了空间的重新配置，指向原vector的所有迭代器会都失效了。

+ [**vector** **迭代器失效问题**](https://blog.csdn.net/2301_79551553/article/details/136960113)

  ![6](./src/6.png)

  > 1️⃣：所有可能会引起扩容的操作都可能会导致迭代器失效。如：resize、reserve、insert、assign、push_back等  --------------  **野指针**引起的迭代器失效
  >
  > 2️⃣：指定位置的插入和删除都会都可能会导致迭代器失效。如: insert 、erase -----------------   迭代器指向的位置意义发生改变

  + 迭代器的主要作用就是让算法能够不用关心底层数据结构，其底层实际就是一个指针，或者是对指针进行了封装，比如：vector的迭代器就是原生态指针T* 。因此迭代器失效，**实际就是迭代器底层对应指针所指向的空间被销毁了**，而使用一块已经被释放的空间，造成的后果是程序崩溃(即如果继续使用已经失效的迭代器，程序可能会崩溃)。

> 对于vector可能会导致其迭代器失效的操作有： 

1. 会引起其底层空间改变的操作，都有可能是迭代器失效，比如：`resize、reserve、insert、assign、 push_back`、
2. `erase`删除`pos`位置元素后，`pos`位置之后的元素会往前搬移，没有导致底层空间的改变，理论上讲迭代器不应该会失效，但是：如果`pos`刚好是最后一个元素，删完之后`pos`刚好是`end`的位置，而`end`位置没有元素的，那么`pos`就失效了。因此删除`vector`中任意位置上元素时，`vs`就认为该位置迭代器失效了。
3. 注意：`Linux`下，`g++`编译器对迭代器失效的检测并不是非常严格，处理也没有vs下极端
4. 与`vector`类似，`string`在插入+扩容操作+`erase`之后，迭代器也会失效

> 解决方法

+ ‌**避免在遍历过程中进行插入或删除操作**‌：在进行插入或删除操作后，使用返回的新的迭代器进行遍历，或者及时更新迭代器的位置。
+ ‌**使用‌智能指针管理动态分配的内存**‌：使用智能指针（如`shared_ptr`、`unique_ptr`）可以帮助管理对象的生命周期，确保在迭代器使用期间对象不被提前销毁，从而避免迭代器失效。
+ ‌**使用容器提供的成员函数进行插入和删除操作**‌：使用容器提供的`erase`和`insert`等成员函数可以安全地处理元素的删除和插入操作，并确保迭代器的有效性。
+ ‌**检查迭代器的有效性**‌：在使用迭代器之前，检查其有效性，确保它指向一个合法的位置。如果迭代器失效，可以重新获取新的迭代器或更新迭代器的位置。
+ ‌**固定容器大小**‌：通过固定容器大小来规避迭代器失效的问题。例如，使用固定大小的数组或预分配的容器，避免发生重新分配内存的情况。

+ emplace_back()和push_back()的区别
  + emplace_back() 和 push_back() 的区别，就在于底层实现的机制不同。push_back() 向容器尾部添加元素时，首先会创建这个元素，然后再将这个元素拷贝或者移动到容器中（如果是拷贝的话，事后会自行销毁先前创建的这个元素）；而emplace_back() 在实现时，则是直接在容器尾部创建这个元素，省去了拷贝或移动元素的过程。

> unordered_map

+ std::unordered_map 是一个无序的关联容器。

+ `std:.unordered_map` 的底层实现基于**哈希表**。每个键值对通过哈希函数被映射到一个桶(bucket)中。桶实际上是一个链表，用于处理哈希冲突(即不同键具有相同哈希值的情况)。当插入一个键值对时，首先通过哈希函数计算出键的哈希值，然后定位到对应的桶，最后将这个键值对添加到桶的链表中。查找和删除操作也类似，首先通过哈希函数找到桶，然后在桶的链表中查找或删除相应的键值对。

#### **进程调度方法**

进程调度是操作系统中一项关键任务，负责按照一定的策略和算法从就绪态进程中为当前空闲的CPU选择要运行的进程。以下是几种常见的进程调度方法：

1.  ‌`先来先服务（FCFS）‌`：按照作业到达任务队列的顺序进行调度，这种算法简单直观，但可能导致长作业等待时间过长。它适用于批处理系统，其中作业的到达时间相对固定‌。
2. `短作业优先（SJF）`：将CPU时间片分配给已经运行时间最短的进程。这种算法可以最大程度地减少平均等待时间，但可能会导致长作业被饿死。它优先照顾短作业，适用于实时系统‌。
3.  ‌`轮转调度（RR）‌`：将所有进程按照到达顺序排成一个队列，每个进程执行一个时间片后，将CPU时间片分配给下一个进程。这种算法适用于时间片较短的情况，能够平衡长短作业的执行‌。
4. `优先级调度‌`：为每个进程分配一个优先级，优先级高的进程先获得CPU时间片。这种算法可以根据不同的情况调整优先级，但可能导致低优先级的进程长时间等待‌。
5.  ‌`多级反馈队列调度‌`：将进程分为多个队列，每个队列有不同的优先级和时间片大小。当进程在一个队列中执行完毕，可以进入下一个优先级较高的队列。这种算法能够兼顾不同类型的作业‌。
6. `时间片轮转`：系统将CPU处理时间划分为多个时间片，进程按照到达先后顺序排列。每次调度选择队首的进程，执行完一个时间片后，该进程移动至队尾。这种算法适用于分时系统，能够在规定时间内响应所有用户的请求‌。


#### **线程间的通信方式**

- 使用全局变量
  + 主要由于多个线程可能更改全局变量，因此全局变量最好声明为volatile
- 使用消息实现通信
  + 在Windows程序设计中，每一个线程都可以拥有自己的消息队列（UI线程默认自带消息队列和消息循环，工作线程需要手动实现消息循环），因此可以采用消息进行线程间通信`sendMessage`,`postMessage`。

    ```cpp
    1)定义消息#define WM_THREAD_SENDMSG=WM_USER+20;  
    
    2)添加消息函数声明afx_msg int OnTSendmsg(); 
    
    3)添加消息映射ON_MESSAGE(WM_THREAD_SENDMSG,OnTSM) 
        
    4)添加OnTSM()的实现函数；
        
    5)在线程函数中添加PostMessage消息Post函数
    ```

+ 使用事件CEvent类实现线程间通信
  + Event对象有两种状态：有信号和无信号，线程可以监视处于有信号状态的事件，以便在适当的时候执行对事件的操作。

    ```cpp
    1)创建一个CEvent类的对象：CEvent threadStart;它默认处在未通信状态； 
        
    2)threadStart.SetEvent();使其处于通信状态； 
        
    3)调用WaitForSingleObject()来监视CEvent对象
    ```

#### **线程间的同步方式**

+ 各个线程可以访问进程中的公共变量，资源，所以使用多线程的过程中需要注意的问题是如何防止两个或两个以上的线程同时访问同一个数据，以免破坏数据的完整性。数据之间的相互制约包括

  1. 直接制约关系，即一个线程的处理结果，为另一个线程的输入，因此线程之间直接制约着，这种关系可以称之为同步关系
  2. 间接制约关系，即两个线程需要访问同一资源，该资源在同一时刻只能被一个线程访问，这种关系称之为线程间对资源的互斥访问，某种意义上说互斥是一种制约关系更小的同步

+ 线程间的同步方式有四种

  - 临界区

    + 临界区对应着一个`CriticalSection`对象，当线程需要访问保护数据时，调用`EnterCriticalSection`函数；当对保护数据的操作完成之后，调用`LeaveCriticalSection`函数释放对临界区对象的拥有权，以使另一个线程可以夺取临界区对象并访问受保护的数据。

    > PS:关键段对象会记录拥有该对象的线程句柄即其具有“线程所有权”概念，即进入代码段的线程在leave之前，可以重复进入关键代码区域。所以关键段可以用于线程间的互斥，但不可以用于同步（同步需要在一个线程进入，在另一个线程leave）

  - 互斥量

    + 互斥与临界区很相似，但是使用时相对复杂一些（互斥量为内核对象），不仅可以在同一应用程序的线程间实现同步，还可以在不同的进程间实现同步，从而实现资源的安全共享。

    > PS:1、互斥量由于也有线程所有权的概念，故也只能进行线程间的资源互斥访问，不能由于线程同步；
    > 2、由于互斥量是内核对象，因此其可以进行进程间通信，同时还具有一个很好的特性，就是在进程间通信时完美的解决了"遗弃"问题

  - 信号量

    + 信号量的用法和互斥的用法很相似，不同的是它可以同一时刻允许多个线程访问同一个资源，`PV`操作

    > PS:事件可以完美解决线程间的同步问题，同时信号量也属于内核对象，可用于进程间的通信

  - 事件

    + 事件分为手动置位事件和自动置位事件。事件Event内部它包含一个使用计数（所有内核对象都有），一个布尔值表示是手动置位事件还是自动置位事件，另一个布尔值用来表示事件有无触发。由`SetEvent()`来触发，由`ResetEvent()`来设成未触发。

    > PS:事件是内核对象,可以解决线程间同步问题，因此也能解决互斥问题

#### 进程间通信方式

+ 进程间通信又称`IPC(Inter-Process Communication),`指多个进程之间相互通信，交换信息的方法。根据进程通信时信息量大小的不同,可以将进程通信划分为两大类型:
  + 低级通信,控制信息的通信(主要用于进程之间的同步,互斥,终止和挂起等等控制信息的传递)

  + 高级通信,大批数据信息的通信(主要用于进程间数据块数据的交换和共享,常见的高级通信有管道,消息队列,共享内存等).

+ **管道( `pipe` )**：管道是一种半双工的通信方式，数据只能单向流动，而且只能在具有亲缘关系的进程间使用。进程的亲缘关系通常是指父子进程关系【匿名管道】。
  + `有名管道 (named pipe)` ： 有名管道也是半双工的通信方式，但是它允许无亲缘关系进程间的通信。
  
+ **信号量( `semophore` )** ： 信号量是一个计数器，可以用来控制多个进程对共享资源的访问。不是用于交换大批数据,而用于多线程之间的同步.常作为一种锁机制,防止某进程在访问资源时其它进程也访问该资源。因此，主要作为进程间以及同一进程内不同线程之间的同步手段。

+ **消息队列( `message queu`e )** ： 消息队列是由消息的链表，存放在内核中并由消息队列标识符标识。消息队列克服了信号传递信息少、管道只能承载无格式字节流以及缓冲区大小受限等缺点。

+ **信号 ( `signal` )** ： 信号是一种比较复杂的通信方式，用于通知接收进程某个事件已经发生。

+ **[共享内存( `shared memor`y )]** ：共享内存就是映射一段能被其他进程所访问的内存，这段共享内存由一个进程创建，但多个进程都可以访问。`共享内存是最快的` `IPC` 方式，它是针对其他进程间通信方式运行效率低而专门设计的。它往往与其他通信机制，如信号两，配合使用，来实现进程间的同步和通信。

+ **套接字( `socket` )** ： 套接字也是一种进程间通信机制，与其他通信机制不同的是，它可用于不同机器间的进程通信

#### **排序算法**

<!-- tabs:start -->

#### **概述**

> [912. 排序数组](https://leetcode.cn/problems/sort-an-array/)

![7](./src/7.png)

>注：下面对应方法的时间复杂度均代表平均时间复杂度
>稳定排序：如果 a 原本在 b 前面，且 a == b，排序之后 a 仍然在 b 前面。
>非稳定排序：如果 a 原本在 b 前面，且 a == b，排序之后 a 不一定在 b 前面。
>原地排序 / 非原地排序：区别在于是否 使用额外的数组 辅助排序

#### **冒泡排序**

> （Bubble Sort）（稳定排序）（超出时间限制）

+ 比较相邻元素，如果第一个比第二个大，则交换。

+ 时间复杂度`n^2`，空间复杂度1

代码：

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // bubbleSort
        int n = n  2 1; ++i) {
            bool flag = false;
            for (int j = 0; j < n - 1 - i; ++j) {
                if (nums[j] > nums[j + 1]) {
                    swap(nums[j], nums[j + 1]);
                    flag = true;
                }                 
            }
            if (flag == false) break; //无交换，代表当前序列已经最优 
        }
        return nums;
    }
};
```

#### **选择排序**

>  （Select Sort）（非稳定排序）（超出时间限制）

+ 依次给每个位置选择当前位置及以后最小的元素（交换当前元素与之后最小元素的位置）。

> 不稳定举例：
> 排序前：5, 5*, 1, 7
> 排序后：1, 5*, 5, 7

+ 时间复杂度n^2，空间复杂度1

代码：

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // selectSort 选择排序
        int minIndex;
        int n = nums.size();
        for (int i = 0; i < n - 1; ++i) {
            minIndex = i;
            for (int j = i + 1; j < n; ++j) {
                if (nums[j] < nums[minIndex]) {
                    minIndex = j;
                }
            }
            swap(nums[i], nums[minIndex]);
        }
        return nums;
    }
};
```

#### **插入排序**

> （Insect Sort）（稳定排序）（超出时间限制）
> 在前 0 ~ i - 1 元素有序的情况下，（依次）将第 i 个元素插入前面已经有序的小序列，使其有序。

+ 时间复杂度`n^2`，空间复杂度1

代码：

```c++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // insertSort 插入排序
        int n = nums.size();
        // 第一个元素被认为已经被排序
        for (int i = 1; i < n; ++i) {
            // 两元素递增排序，则直接插入
            if (nums[i] >= nums[i - 1]) continue;
            // nums[i] < nums[i - 1]
            // 二分查找，时间复杂度logn
            int l = 0, r = i - 1;
            while (l <= r) {
                int mid = l + (r - l) / 2;
                // r右侧元素均大于 nums[i]，即 r 及其左侧元素均小于等于nums[i]
                if (nums[i] < nums[mid]) r = mid - 1; 
                else l = mid + 1; 
            }
            int index = r + 1; // 稳定排序，依次排列
            // 将当前 i 元素插入在 index 位置，index ~ i - 1 元素依次后移，时间复杂度n
            int tmp = nums[i];
            for (int k = i; k >= index + 1; --k) {
                nums[k] = nums[k - 1]; // 依次后移一位
            }
            nums[index] = tmp;
        }
        return nums;
    }
};
```

#### **希尔排序**

> （Shell Sort）（非稳定排序）
> 改进的插入排序（优化：原数组的一个元素距离正确位置很远的情况）
> 先让间隔 h 的元素有序，在使得间隔为 h / 2，一直缩小，一直到 h = 1（此时数组有序）。

+ 时间复杂度介于nlogn和n^2之间，空间复杂度1

代码：

```c++
class Solution {
    void shellSort(vector<int>&nums, int gap, int i) {
        int j, tmp = nums[i];
        for (j = i - gap; j >= 0 && tmp < nums[j]; j -= gap) {
            // 依次后移
            nums[j + gap] = nums[j];
        }
        nums[j + gap] = tmp;
    }
public:
    vector<int> sortArray(vector<int>& nums) {
        int n = nums.size();
        // 分组，最开始时，间隔 gap 为数组的一半
        for (int gap = n / 2; gap >= 1 ; gap /= 2) {
            // 对各个分组进行插入分组
            for (int i = gap; i < n; ++i) {
                shellSort(nums, gap, i);
            }
        }
        return nums;
    }
};
```

#### **归并排序**

> （Merge Sort）（稳定排序）

+ 将无序数组拆分，排序后再合并成大的有序数组。

+ 时间复杂度nlogn，空间复杂度n

代码：

```C++
class Solution {
    vector<int> tmp;
    void mergeSort (vector<int>& nums, int l, int r) {
        if (l >= r) return; // 不需进行排列
        int mid = l + (r - l) / 2;
        // 自底向上
        mergeSort(nums, l, mid);
        mergeSort(nums, mid + 1, r);
        // 排序当前数组
        int i = l, j = mid + 1, pos = l;
        while (i <= mid && j <= r) {
            if (nums[i] <= nums[j]) {
                tmp[pos] = nums[i];
                ++i;
            } else {
                tmp[pos] = nums[j];
                ++j;
            }
            ++pos;
        }
        for (int k = i; k <= mid; ++k) {
            tmp[pos++] = nums[k];
        }
        for (int k = j; k <= r; ++k) {
            tmp[pos++] = nums[k];
        }
        copy(tmp.begin() + l, tmp.begin() + r + 1, nums.begin() + l);
    }
public:
    vector<int> sortArray(vector<int>& nums) {
        int n = nums.size();
        tmp = nums;
        surgeSort(nums, 0, n - 1);
        return nums;
    }
};

```

#### **快速排序**

> （Quick Sort）（非稳定排序）

+ 随机选取一个数（x = rand() % len + startIndex）作为基准；
+ 把比基准小的数交换到前面，比基准大的数交换到后面；
+ 对左右区间递归重复。

> 时间复杂度nlogn，空间复杂度logn

代码：

```C++
class Solution {
    void quickSort(vector<int>&nums, int startIndex, int endIndex) {
        if (startIndex >= endIndex) return;
        
        int x = rand() % (endIndex - startIndex + 1) + startIndex; // 基于随机的原则
        swap(nums[startIndex], nums[x]);
        int firstNum = nums[startIndex];
        
        int l = startIndex, r = endIndex;
        while (l < r) {
            // 从后往前走，将比第一个小的移到前面
            while (l < r && nums[r] >= firstNum) --r;
            if (l < r) {
                nums[l] = nums[r];
            }
            // 从前往后走，将比第一个大的移到后面
            while (l < r && nums[l] <= firstNum) ++l;
            if (l < r) {
                nums[r] = nums[l];
            }
        }
        nums[l] = firstNum;
        // 自顶向下
        quickSort(nums, startIndex, l - 1);
        quickSort(nums, l + 1, endIndex);
    }

public:
    vector<int> sortArray(vector<int>& nums) {
        int n = nums.size();
        quickSort(nums, 0, n - 1);
        return nums;
    }
};

```

#### **堆排序**

> （Heap Sort）（非稳定排序）

+ 先在原先数组的基础上构造大根堆（时间复杂度nlogn）；
+ 再依次弹出最大元素（每次弹出的时间复杂度为logk，k为当前大根堆中元素数目）。

>  时间复杂度nlogn，空间复杂度1

代码：

```C++
class Solution {
    void buildMaxHeap(vector<int>& nums) {
        int n = nums.size();
        for (int i = (n - 1) / 2; i >= 0; --i) {
            maxHeapify(nums, i, n);
        }
    }

    void maxHeapify(vector<int>& nums, int i, int n) {
        while (i * 2 + 1 < n) {
            // 代表当前 i 节点的左右儿子；
            // 超出数组大小则代表当前 i 节点为叶子节点，不需要移位
            int lSon = 2 * i + 1;
            int rSon = 2 * i + 2;
            int large = i;
            if (lSon < n && nums[lSon] > nums[i]) large = lSon;
            if (rSon < n && nums[rSon] > nums[large]) large = rSon;

            if (large != i) {
                swap(nums[i], nums[large]);
                // 迭代判断对应子节点及其儿子节点的大小关系
                i = large;
            } else {
                break;
            }
        }
    }

public:
    vector<int> sortArray(vector<int>& nums) {
        // heapSort 堆排序
        int n = nums.size();
        // 将数组整理成大根堆
        buildMaxHeap(nums);
        for (int i = n - 1; i >= 1; --i) {
            // 依次弹出最大元素，放到数组最后，当前排序对应数组大小 - 1
            swap(nums[0], nums[i]);
            --n;
            maxHeapify(nums, 0, n);
        }
        return nums;
    }
};
```

#### **计数排序**

> （Count Sort）（稳定排序）
>
> 创建数组 counts，用于统计原数组 nums 中各元素值的出现次数；
> 再依次将元素值赋值到 nums 中对应位置。

+ 计数排序，时间复杂度n + k，空间复杂度k（k = maxNum - minNum + 1）

代码：

```C++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // CountSort 计数排序
        int n = nums.size();
        int minNum = INT_MAX, maxNum = INT_MIN;
        // 找到数组中的最小和最大元素
        for (int i = 0; i < n; ++i) {
            if (nums[i] < minNum) minNum = nums[i];
            if (nums[i] > maxNum) maxNum = nums[i];
        }
        // 构造计数数组
        vector<int> counts(maxNum - minNum + 1, 0);
        for (int i = 0; i < n; ++i) {
            ++counts[nums[i] - minNum];
        }
        // 计数排序
        int index = 0;
        for (int i = 0; i < counts.size(); ++i) {
            while (counts[i] != 0) {
                nums[index++] = i + minNum;
                counts[i]--;
            }
        }
        return nums;
    }
};
```

#### **桶排序**

> （Bucket Sort）（稳定排序）

+ 将原数组的元素分到有限数量的桶里（大编号桶里的所有元素均大于小编号桶里的任意元素）；
+ 分别对每个桶进行排序；
+ 依次合并。

>  时间复杂度n + k，空间复杂度n + k（k为桶的数量）

代码：

```C++
class Solution {
public:
    vector<int> sortArray(vector<int>& nums) {
        // BucketSort 桶排序
        int n = nums.size();
        // 获取数组的最小值和最大值
        int maxNum = nums[0], minNum = nums[0];
        for (int i = 1; i < n; ++i) {
            if (nums[i] > maxNum) maxNum = nums[i];
            if (nums[i] < minNum) minNum = nums[i];
        }
        // 初始化桶
        int bucketNum = 5, bucketSize = (maxNum - minNum) / bucketNum + 1;
        vector<vector<int>> buckets(bucketNum, vector<int>(0));
        // 小至大分桶
        for (int num : nums) {
            int bucketIndex = (num - minNum) / bucketSize;
            buckets[bucketIndex].emplace_back(num);
        }
        // 桶内排序
        for (int i = 0; i < buckets.size(); ++i) {
            sort(buckets[i].begin(), buckets[i].end());
        }
        // 从桶中依次取数
        int index = 0;
        for (auto& bucket : buckets) {
            for (int num : bucket) {
                nums[index++] = num;
            }
        }

        return nums;
    }
};
```

#### **基数排序**

> （Radix Sort）（稳定排序）

+ 对数组中所有数依次按由低到高的位数进行多次排序；
+ 每次排序都基于上次排序的结果。
+ （相对位置顺序保持不变）

```tex
例：原始数组 1，23，21，11，32
第一次排序后 1，21，11，32，23
第二次排序后 1，11，21，23，32
```

>  时间复杂度n x k，空间复杂度k（k为最大元素的位数）

代码：

```C++
class Solution {
    vector<int> counts;
    void radixSort(vector<int>& nums, vector<int>& tmp, int divisor) {
        int n = nums.size();
        counts = vector<int>(10, 0);
        // 统计个、十、百、千、万上对应 0 ~ 9 的出现次数
        for (int i = 0; i < n; ++i) {
            int x = (nums[i] / divisor) % 10;
            if (x != 9) ++counts[x + 1];
        }
        // 前缀和
        for (int i = 1; i <= 9; ++i) {
            counts[i] += counts[i - 1];
        }
        // 从前向后赋值
        for (int i = 0; i < n; ++i) {
            int x = (nums[i] / divisor) % 10;
            tmp[counts[x]++] = nums[i];  
        }
    }

public:
    vector<int> sortArray(vector<int>& nums) {
        // RadixSort 基数排序
        int n = nums.size();
        // 预处理，让所有的数都大于等于0
        for (int i = 0; i < n; ++i) {
            nums[i] += 50000; // 50000为最小可能的数组大小
        }
        // 找出最大的数字，并获得其最大位数
        int maxNum = nums[0];
        for (int i = 0; i < n; ++i) {
            if (nums[i] > maxNum) {
                maxNum = nums[i];
            }
        }
        int num = maxNum, maxLen = 0;
        while (num) {
            ++maxLen;
            num /= 10;
        }
        // 基数排序，低位优先
        int divisor = 1;
        vector<int> tmp(n, 0);
        for (int i = 0; i < maxLen; ++i) {
            radixSort(nums, tmp, divisor);
            swap(tmp, nums);
            divisor *= 10;
        }
        // 减去预处理量
        for (int i = 0; i < n; ++i) {
            nums[i] -= 50000;
        }
        return nums;
    }
};
```

<!-- tabs:end -->

#### **三次握手四次挥手**

### 三次握手

![1](./src/1.png)

### 四次挥手

![2](./src/2.png)

#### **TCP如何保证可靠性**

![56](./src/59.png)

#### **Redis**

<!-- tabs:start -->

#### **持久化机制**

![54](./src/54.png)

#### **内存淘汰策略**

![55](./src/55.png)

<!-- tabs:end -->

<!-- tabs:end -->

## 数据库

<!-- tabs:start -->

#### **锁**

<!-- tabs:start -->

#### **概述**

+ 介绍
  + 锁是计算机协调多个进程或线程并发访问某一资源的机制。在数据库中除传统的计算资源(CPU、RAM、I/O）的争用以外，数据也是一种供许多用户共享的资源。如何保证**数据并发访问的一致性、有效性**是所有数据库必须解决的一个问题，**锁冲突也是影响数据库并发访问性能的一个重要因素**。从这个角度来说，锁对数据库而言显得尤其重要，也更加复杂。

+ 分类
  + `MySQL`中的锁，按照锁的粒度分，分为以下三类:
    1. 全局锁:锁定数据库中的所有表。
    2. 表级锁:每次操作锁住整张表。
    3. 行级锁:每次操作锁住对应的行数据。

#### **全局锁**

> 全局锁就是对整个数据库实例加锁，加锁后整个实例就处于只读状态，后续的`DML`的写语句，`DDL`语句，已经更新操作的事务提交语句都将被阻塞。

> 其典型的使用场景是做全库的逻辑备份，对所有的表进行锁定，从而获取一致性视图，保证数据的完整性。

+ 未加锁

![16](./src/16.png)

+ 加锁

![17](./src/17.png)

![18](./src/18.png)

+ 特点

  + 数据库中加全局锁，是一个比较重的操作，存在以下问题:

  1. 如果在主库上备份，那么在备份期间都不能执行更新，业务基本上就得停摆。
  2. 如果在从库上备份，那么在备份期间从库不能执行主库同步过来的二进制日志(`binlog`)，会导致主从延迟。

  > 在`InnoDB`引擎中，我们可以在备份时加上参数`--single-transaction`参数来完成不加锁的一致性数据备份。
  >
  > ```sql
  > mysqldump --single-transaction -uroot -p123456 itcast > itcast.sql
  > ```

#### **表锁-表级锁**

+ 介绍
  + 表级锁，每次操作锁住整张表。锁定粒度大，发生锁冲突的概率最高，并发度最低。应用在`MyISAM`、`InnoDB`、`BDB`等存储引擎中。
  + 对于表级锁，主要分为以下三类:
    1. 表锁元
    2. 数据锁`( meta data lock,MDL)`
    3. 意向锁
+ 表锁
  + 对于表锁，分为两类:
    1. 表共享读锁( read lock )
    2. 表独占写锁（write lock)
+ 语法:
  1. 加锁:`lock tables 表名... read/write`。
  2. 释放锁:`unlock tables / 客户端断开连接`。
+ 读锁

![19](./src/19.png)

+ 写锁

![20](./src/20.png)

> `读锁不会阻塞其他客户端的读，但是会阻塞写。写锁既会阻塞其他客户端的读，又会阻塞其他客户端的写。`



#### **表锁-元数据锁`( meta data lock,MDL)`**

+ `MDL`加锁过程是系统自动控制，无需显式使用，在访问一张表的时候会自动加上。`MDL`锁主要作用是维护表元数据的数据一致性，在表上有活动事务的时候，不可以对元数据进行写入操作。`为了避免DML与DDL冲突，保证读写的正确性。`
+ 在`MySQL5.5`中引入了`MDL`，当对一张表进行增删改查的时候，加`MDL`读锁(共享);当对表结构进行变更操作的时候，加`MDL`写锁(排他)。

|                    对应`SQL`                     |                 锁类型                  |                       说明                       |
| :----------------------------------------------: | :-------------------------------------: | :----------------------------------------------: |
|          `lock tables xxx read / write`          | SHARED READ_ONLY / SHARED_NO_READ_WRITE |                                                  |
|    `select 、 select ... lock in share mode`     |               SHARED_READ               | 与SHARED_READ、SHARED_WRITE兼容，与EXCLUSIVE互斥 |
| `insert . update、delete、select ... for update` |              SHARED_WRITE               | 与SHARED READ、SHARED WRITE兼容，与EXCLUSIVE互斥 |
|                 `alter table...`                 |           EXCLUSIVE（排他锁）           | 与SHARED READ、SHARED WRITE兼容，与EXCLUSIVE互斥 |

查看元数据锁：

```sql
select object_type,object_schema,object_name,lock_type,lock_duration from performance_schema.metadata_locks;
```

![21](./src/21.png)



#### **表锁-意向锁**

+ 为了避免`DML`在执行时，加的行锁与表锁的冲突，在`InnoDB`中引入了意向锁，使得表锁不用检查每行数据是否加锁，使用意向锁来减少表锁的检查。

![22](./src/22.png)

1. 意向共享锁（`lS`):由语句`select ... lock in share mode`添加。
2. 意向排他锁（`lIX`)∶由`insert、update、delete、select ... for update`添加。

+ 兼容性
  1. 意向共享锁（`IS`)∶与表锁共享锁(`read`）兼容，与表锁排它锁(`write`）互斥。
  2. 意向排他锁（`IX`)︰与表锁共享锁（`read`)及排它锁（`write`）都互斥。意向锁之间不会互斥。
+ 可以通过以下SQL，查看意向锁及行锁的加锁情况:

```sql
select object_schema,object_name,index_name,lock_type,lock_mode,lock_data from performance_schema.data_locks;
```

> 意向共享锁

![23](./src/23.png)

> 意向排他锁

![24](./src/24.png)



#### **行级锁**

> `InnoDB`实现了以下两种类型的行锁：

1. 共享锁（S）：运行一个事务去读一行，阻止其他事务获得相同数据集的排它锁。
2. 排他锁（X）：运行获取排他锁的事务更新数据，组织其他事务获得相同数据集的共享锁合排他锁。

![25](./src/25.png)

+ 行锁

| SQL                       |     行锁类型     | 说明                                     |
| :------------------------ | :--------------: | :--------------------------------------- |
| INSERT…                   |      排他锁      | 自动加锁                                 |
| UPDATE…                   |      排他锁      | 自动加锁                                 |
| DELETE…                   |      排他锁      | 自动加锁                                 |
| SELECT（正常）            | ***不加任何锁*** |                                          |
| SELECT…LOCK IN SHARE MODE |      共享锁      | 需要手动在SELECT之后加LOCK IN SHARE MODE |
| SELECT…FOR UPDATE         |      排他锁      | 需要手动在SELECT之后加FOR UPDATE         |

+ 案列：

> 默认情况下，`InnoDB`在`REPEATABLE READ`事务隔离级别运行，`InnoDB`使用`next-key`锁进行搜索和索引扫描，以防止幻读。

1. 针对唯一索引进行检索时，对已存在的记录进行等值匹配时，将会自动优化为行锁。
2. `InnoDB`的行锁是**针对于索引加的锁**，不通过索引条件检索数据，那么`InnoDB`将对表中的所有记录加锁，此时***就会升级为表锁***。

+ 可以通过以下SQL，查看意向锁及行锁的加锁情况:

```sql
select object_schema,object_name,index_name,lock_type,LOCK_MODE,lock_data from performance_schema.data_locks;
```

+ 间隙锁/临键锁-演示

> 默认情况下，`InnoDB`在REPEATABLEREAD事务隔离级别运行，`InnoDB`使用`next-key`锁进行搜索和索引扫描，以防止幻读。

1. 索引上的等值查询(唯一索引)，给不存在的记录加锁时,优化为间隙锁(GAP)。
2. 索引上的等值查询(普通索引)，向右遍历时最后一个值不满足查询需求时，`next-key lock`退化为间隙锁。
3. 索引上的范围查询(唯一索引)--会访问到不满足条件的第一个值为止。

> 注意:间隙锁唯一目的是防止其他事务插入间隙。间隙锁可以共存，一个事务采用的间隙锁不会阻止另一个事务在同一间隙上采用间隙锁。

+ 临键锁: 既会包含当前对应的数据记录，也会锁定该数据记录之前的间隙。
+ 间隙锁：锁的是间隙不包含对应的数据记录。

<!-- tabs:end -->

#### **索引**

<!-- tabs:start -->

#### **说明**

索引是帮助 MySQL **高效获取数据**的**数据结构（有序）**。在数据之外，数据库系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式引用（指向）数据，这样就可以在这些数据结构上实现高级查询算法，这种数据结构就是索引。

优缺点：

优点：

- 提高数据检索效率，降低数据库的IO成本
- 通过索引列对数据进行排序，降低数据排序的成本，降低CPU的消耗

缺点：

- 索引列也是要占用空间的
- 索引大大提高了查询效率，但降低了更新的速度，比如 INSERT、UPDATE、DELETE

#### **索引结构**

| 索引结构            | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| B+Tree              | 最常见的索引类型，大部分引擎都支持B+树索引                   |
| Hash                | 底层数据结构是用哈希表实现，只有精确匹配索引列的查询才有效，不支持范围查询 |
| R-Tree(空间索引)    | 空间索引是 MyISAM 引擎的一个特殊索引类型，主要用于地理空间数据类型，通常使用较少 |
| Full-Text(全文索引) | 是一种通过建立倒排索引，快速匹配文档的方式，类似于 Lucene, Solr, ES |

| 索引       | InnoDB        | MyISAM | Memory |
| ---------- | ------------- | ------ | ------ |
| B+Tree索引 | 支持          | 支持   | 支持   |
| Hash索引   | 不支持        | 不支持 | 支持   |
| R-Tree索引 | 不支持        | 支持   | 不支持 |
| Full-text  | 5.6版本后支持 | 支持   | 不支持 |

>  **B-Tree**

![4](./src/4.png)

二叉树的缺点可以用红黑树来解决：
![红黑树](./src/5.png)

+ 红黑树也存在大数据量情况下，层级较深，检索速度慢的问题。

+ 为了解决上述问题，可以使用 B-Tree 结构。

  > B-Tree (多路平衡查找树) 以一棵最大度数（max-degree，指一个节点的子节点个数）为5（5阶）的 b-tree 为例（每个节点最多存储4个key，5个指针）

![B-Tree结构](./src/8.png)

> + B-Tree 的数据插入过程动画参照：https://www.bilibili.com/video/BV1Kr4y1i7ru?p=68
>
> 
>
> + 演示地址：https://www.cs.usfca.edu/~galles/visualization/BTree.html

>  B+Tree

结构图：

![B+Tree结构图](./src/9.png)

> 演示地址：https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html

> 与 B-Tree 的区别：

- 所有的数据都会出现在叶子节点
- 叶子节点形成一个单向链表

MySQL 索引数据结构对经典的 B+Tree 进行了优化。在原 B+Tree 的基础上，增加一个指向相邻叶子节点的链表指针，就形成了带有顺序指针的 B+Tree，提高区间访问的性能。

![MySQL B+Tree 结构图](./src/10.png)

#### **Hash**

哈希索引就是采用一定的hash算法，将键值换算成新的hash值，映射到对应的槽位上，然后存储在hash表中。
如果两个（或多个）键值，映射到一个相同的槽位上，他们就产生了hash冲突（也称为hash碰撞），可以通过链表来解决。

![Hash索引原理图](./src/11.png)

特点：

- Hash索引只能用于对等比较（=、in），不支持范围查询（betwwn、>、<、...）
- 无法利用索引完成排序操作
- 查询效率高，通常只需要一次检索就可以了，效率通常要高于 B+Tree 索引

存储引擎支持：

- Memory
- InnoDB: 具有自适应hash功能，hash索引是存储引擎根据 B+Tree 索引在指定条件下自动构建的

#### **面试题**

1. 为什么 InnoDB 存储引擎选择使用 B+Tree 索引结构？

- 相对于二叉树，层级更少，搜索效率高
- 对于 B-Tree，无论是叶子节点还是非叶子节点，都会保存数据，这样导致一页中存储的键值减少，指针也跟着减少，要同样保存大量数据，只能增加树的高度，导致性能降低
- 相对于 Hash 索引，B+Tree 支持范围匹配及排序操作

#### **索引分类**

| 分类     | 含义                                                 | 特点                     | 关键字   |
| -------- | ---------------------------------------------------- | ------------------------ | -------- |
| 主键索引 | 针对于表中主键创建的索引                             | 默认自动创建，只能有一个 | PRIMARY  |
| 唯一索引 | 避免同一个表中某数据列中的值重复                     | 可以有多个               | UNIQUE   |
| 常规索引 | 快速定位特定数据                                     | 可以有多个               |          |
| 全文索引 | 全文索引查找的是文本中的关键词，而不是比较索引中的值 | 可以有多个               | FULLTEXT |

在 InnoDB 存储引擎中，根据索引的存储形式，又可以分为以下两种：

| 分类                      | 含义                                                       | 特点                 |
| ------------------------- | ---------------------------------------------------------- | -------------------- |
| 聚集索引(Clustered Index) | 将数据存储与索引放一块，索引结构的叶子节点保存了行数据     | 必须有，而且只有一个 |
| 二级索引(Secondary Index) | 将数据与索引分开存储，索引结构的叶子节点关联的是对应的主键 | 可以存在多个         |

演示图：

![大致原理](./src/12.png)
![演示图](./src/13.png)

聚集索引选取规则：

- 如果存在主键，主键索引就是聚集索引
- 如果不存在主键，将使用第一个唯一(UNIQUE)索引作为聚集索引
- 如果表没有主键或没有合适的唯一索引，则 InnoDB 会自动生成一个 rowid 作为隐藏的聚集索引

#### **思考题**

1\. 以下 SQL 语句，哪个执行效率高？为什么？

```mysql
select * from user where id = 10;
select * from user where name = 'Arm';
-- 备注：id为主键，name字段创建的有索引
```

>  答：第一条语句，因为第二条需要回表查询，相当于两个步骤。

2\. InnoDB 主键索引的 B+Tree 高度为多少？

> 答：假设一行数据大小为1k，一页中可以存储16行这样的数据。InnoDB 的指针占用6个字节的空间，主键假设为bigint，占用字节数为8.
> 可得公式：`n * 8 + (n + 1) * 6 = 16 * 1024`，其中 8 表示 bigint 占用的字节数，n 表示当前节点存储的key的数量，(n + 1) 表示指针数量（比key多一个）。算出n约为1170。

+ 如果树的高度为2，那么他能存储的数据量大概为：`1171 * 16 = 18736`；
+ 如果树的高度为3，那么他能存储的数据量大概为：`1171 * 1171 * 16 = 21939856`。

> 另外，如果有成千上万的数据，那么就要考虑分表，涉及运维篇知识。

#### **语法**

+ 创建索引：
  + `CREATE [ UNIQUE | FULLTEXT ] INDEX index_name ON table_name (index_col_name, ...);`
  + 如果不加 CREATE 后面不加索引类型参数，则创建的是常规索引

+ 查看索引：
  + `SHOW INDEX FROM table_name;`

+ 删除索引：
  + `DROP INDEX index_name ON table_name;`

+ 案例：

```mysql
-- name字段为姓名字段，该字段的值可能会重复，为该字段创建索引
create index idx_user_name on tb_user(name);
-- phone手机号字段的值非空，且唯一，为该字段创建唯一索引
create unique index idx_user_phone on tb_user (phone);
-- 为profession, age, status创建联合索引
create index idx_user_pro_age_stat on tb_user(profession, age, status);
-- 为email建立合适的索引来提升查询效率
create index idx_user_email on tb_user(email);

-- 删除索引
drop index idx_user_email on tb_user;
```

#### **使用规则**

> 最左前缀法则

+ 如果索引关联了多列（联合索引），要遵守最左前缀法则，最左前缀法则指的是查询从索引的最左列开始，并且不跳过索引中的列。

+ 如果跳跃某一列，**索引将部分失效（后面的字段索引失效）。**

+ 联合索引中，出现范围查询（<, >），**范围查询右侧的列索引失效**。

  + 可以用>=或者<=来规避索引失效问题。

  


> 索引失效情况

1. **在索引列上进行运算操作，索引将失效。如：**

   + `explain select * from tb_user where substring(phone, 10, 2) = '15'\G;`
     + `\G`行显示格式好看一点。

2. **字符串类型字段使用时，不加引号，索引将失效。如：**

   + `explain select * from tb_user where phone = 17799990015;`，此处phone的值没有加引号

3. **模糊查询中，如果仅仅是尾部模糊匹配，索引不会是失效；如果是头部模糊匹配，索引失效。如：**

   + `explain select * from tb_user where profession like '%工程';`，前后都有 % 也会失效。

     

4. **用 or 分割开的条件，如果 or 其中一个条件的列没有索引，那么涉及的索引都不会被用到。**

   

5. **如果 `MySQL` 评估使用索引比全表更慢，则不使用索引。**



> SQL 提示

+ 是优化数据库的一个重要手段，简单来说，就是在SQL语句中加入一些人为的提示来达到优化操作的目的。

+ 例如，使用索引：
  + `explain select * from tb_user use index(idx_user_pro) where profession="软件工程";`
+ 不使用哪个索引：
  + `explain select * from tb_user ignore index(idx_user_pro) where profession="软件工程";`
+ 必须使用哪个索引：
  + `explain select * from tb_user force index(idx_user_pro) where profession="软件工程";`

- use 是建议，实际使用哪个索引 MySQL 还会自己权衡运行速度去更改，force就是无论如何都强制使用该索引。



> 覆盖索引&回表查询

+ 尽量使用覆盖索引（查询使用了索引，并且需要返回的列，在该索引中已经全部能找到），减少 `select *`。

+ explain 中 extra 字段含义：

  + `using index condition`：查找使用了索引，但是需要回表查询数据（**性能低**）
  + `using where; using index;`：查找使用了索引，但是需要的数据都在索引列中能找到，所以不需要回表查询（**性能高**）

+ 如果在聚集索引中直接能找到对应的行，则直接返回行数据，只需要一次查询，哪怕是select \*；如果在辅助索引中找聚集索引，如`select id, name from xxx where name='xxx';`，也只需要通过辅助索引(name)查找到对应的id，返回name和name索引对应的id即可，只需要一次查询；如果是通过辅助索引查找其他字段，则需要回表查询，如`select id, name, gender from xxx where name='xxx';`

+ 所以尽量不要用`select *`，容易出现回表查询，降低效率，除非有联合索引包含了所有字段

+ 面试题：一张表，有四个字段（id, username, password, status），由于数据量大，需要对以下SQL语句进行优化，该如何进行才是最优方案：
  `select id, username, password from tb_user where username='itcast';`

  + 解：给username和password字段建立联合索引，则不需要回表查询，直接覆盖索引

  

> 前缀索引

+ 当字段类型为字符串（varchar, text等）时，有时候需要索引很长的字符串，这会让索引变得很大，查询时，浪费大量的磁盘IO，影响查询效率，此时可以只降字符串的一部分前缀，建立索引，这样可以大大节约索引空间，从而提高索引效率。

+ 语法：`create index idx_xxxx on table_name(columnn(n));`
  + `n`的值不同则截取字符不同——截取前n个字符作为索引

+ 前缀长度：可以根据索引的选择性来决定，而选择性是指不重复的索引值（基数）和数据表的记录总数的比值，索引选择性越高则查询效率越高，唯一索引的选择性是1，这是最好的索引选择性，性能也是最好的。
+ **求选择性公式：**

```mysql
select count(distinct email) / count(*) from tb_user;
select count(distinct substring(email, 1, 5)) / count(*) from tb_user;
```

+ show index 里面的sub_part可以看到接取的长度



> 单列索引&联合索引

+ 单列索引：即一个索引只包含单个列
+ 联合索引：即一个索引包含了多个列
+ 在业务场景中，如果存在多个查询条件，考虑针对于查询字段建立索引时，建议建立联合索引，而非单列索引。

+ 单列索引情况：
  + `explain select id, phone, name from tb_user where phone = '17799990010' and name = '韩信';`
  + 这句只会用到phone索引字段

> 注意事项

- 多条件联合查询时，MySQL优化器会评估哪个字段的索引效率更高，会选择该索引完成本次查询

#### **设计原则**

1. 针对于**数据量较大（超百万），且查询比较频繁的表建立索引**
2. 针对于常作为**查询条件（where）、排序（order by）、分组（group by）操作的字段建立索引**
3. 尽量选择**区分度高的列作为索引**，**尽量建立唯一索引**，**区分度越高，使用索引的效率越高**
4. 如果是**字符串类型的字段，字段长度较长，可以针对于字段的特点，建立前缀索引**
5. 尽量使**用联合索引，减少单列索引**，查询时，联合索引很多时候可以覆盖索引，节省存储空间，避免回表，提高查询效率
6. 要控制索引的数量，索引并不是多多益善，索引越多，维护索引结构的代价就越大，会影响增删改的效率
7. 如果**索引列不能存储NULL值，请在创建表时使用NOT NULL约束它。**当优化器知道每列是否包含NULL值时，它可以更好地确定哪个索引最有效地用于查询

<!-- tabs:end -->

#### **SQL 优化**

<!-- tabs:start -->

#### **插入数据**

+ 普通插入：

1. 采用批量插入（一次插入的数据不建议超过1000条）
2. 手动提交事务
3. 主键顺序插入

+ 大批量插入：

> 如果一次性需要插入大批量数据 ，使用insert语句插入性能较低，此时可以使用MySQL数据库提供的load指令插入。

```mysql
# 客户端连接服务端时，加上参数 --local-infile（这一行在bash/cmd界面输入）
mysql --local-infile -u root -p
# 设置全局参数local_infile为1，开启从本地加载文件导入数据的开关
set global local_infile = 1;
select @@local_infile;
# 执行load指令将准备好的数据，加载到表结构中
load data local infile '/root/sql1.log' into table 'tb_user' fields terminated by ',' lines terminated by '\n';
```

####   **主键优化**

+ 数据组织方式：在`InnoDB`存储引擎中，表数据都是根据主键顺序组织存放的，这种存储方式的表称为索引组织表（Index organized table, IOT）

+ 页分裂(主键分裂)：页可以为空，也可以填充一般，也可以填充100%，每个页包含了2-N行数据（如果一行数据过大，会行溢出），根据主键排列。
+ 页合并：当删除一行记录时，实际上记录并没有被物理删除，只是记录被标记（`flaged`）为删除并且它的空间变得允许被其他记录声明使用。当页中删除的记录到达 MERGE_THRESHOLD（默认为页的50%），`InnoDB`会开始寻找最靠近的页（前后）看看是否可以将这两个页合并以优化空间使用。

MERGE_THRESHOLD：合并页的阈值，可以自己设置，在创建表或创建索引时指定

> 文字说明不够清晰明了，具体可以看视频里的PPT演示过程：https://www.bilibili.com/video/BV1Kr4y1i7ru?p=90

主键设计原则：

- 满足业务需求的情况下，尽量降低主键的长度
- 插入数据时，尽量选择顺序插入，选择使用 `AUTO_INCREMENT 自增主键`
- 尽量不要使用 `UUID` 做主键或者是其他的自然主键，如身份证号
- 业务操作时，避免对主键的修改

#### **order by优化**

1. `Using filesort`：通过表的索引或全表扫描，读取满足条件的数据行，然后在排序缓冲区 `sort buffer` 中完成排序操作，所有不是通过索引直接返回排序结果的排序都叫 `FileSort` 排序
2. `Using index`：通过有序索引顺序扫描直接返回有序数据，这种情况即为 `using index`，不需要额外排序，操作效率高

+ 如果`order by`字段全部使用升序排序或者降序排序，则都会走索引，但是如果一个字段升序排序，另一个字段降序排序，则不会走索引，explain的extra信息显示的是`Using index, Using filesort`，如果要优化掉`Using filesort`，则需要另外再创建一个索引，如：`create index idx_user_age_phone_ad on tb_user(age asc, phone desc);`，此时使用`select id, age, phone from tb_user order by age asc, phone desc;`会全部走索引

总结：

- 根据排序字段建立合适的索引，多字段排序时，也遵循最左前缀法则
- 尽量使用覆盖索引
- 多字段排序，一个升序一个降序，此时需要注意联合索引在创建时的规则`（ASC/DESC）`
- 如果不可避免出现`filesort`，大数据量排序时，可以适当增大排序缓冲区大小 sort_buffer_size（默认`256k`）

#### **group  by优化**

- 在分组操作时，可以通过索引来提高效率
- 分组操作时，索引的使用`也是满足最左前缀法则的`

如索引为`idx_user_pro_age_stat`，则句式可以是`select ... where profession order by age`，这样也符合最左前缀法则

#### **limit优化**

+ 常见的问题如`limit 2000000, 10`，此时需要 MySQL 排序前2000000条记录，但仅仅返回2000000 - 2000010的记录，其他记录丢弃，查询排序的代价非常大。
+ 优化方案：一般分页查询时，通过创建覆盖索引能够比较好地提高性能，可以通过`覆盖索引加子查询形式进行优化`

例如：

```mysql
-- 此语句耗时很长
select * from tb_sku limit 9000000, 10;
-- 通过覆盖索引加快速度，直接通过主键索引进行排序及查询
select id from tb_sku order by id limit 9000000, 10;
-- 下面的语句是错误的，因为 MySQL 不支持 in 里面使用 limit
-- select * from tb_sku where id in (select id from tb_sku order by id limit 9000000, 10);
-- 通过连表查询即可实现第一句的效果，并且能达到第二句的速度
select * from tb_sku as s, (select id from tb_sku order by id limit 9000000, 10) as a where s.id = a.id;
```

#### **count优化**

> `MyISAM` 引擎把一个表的总行数存在了磁盘上，因此执行 count(\*) 的时候会直接返回这个数，效率很高（前提是不适用where）；
>
> `InnoDB` 在执行 count(\*) 时，需要把数据一行一行地从引擎里面读出来，然后累计计数。
>
> 优化方案：自己计数，如创建key-value表存储在内存或硬盘，或者是用redis

count的几种用法：

- 如果count函数的参数（count里面写的那个字段）不是NULL（字段值不为NULL），累计值就加一，最后返回累计值
- 用法：`count(\*)、count(主键)、count(字段)、count(1)`
- count(主键)跟count(\*)一样，因为主键不能为空；count(字段)只计算字段值不为NULL的行；count(1)引擎会为每行添加一个1，然后就count这个1，返回结果也跟count(\*)一样；count(null)返回0

各种用法的性能：

- `count(主键)：`
  - `InnoDB`引擎会遍历整张表，把每行的主键id值都取出来，返回给服务层，服务层拿到主键后，直接按行进行累加（主键不可能为空）

- `count(字段)：`
  - 没有not null约束的话，`InnoDB`引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，服务层判断是否为null，不为null，计数累加；
  - 有not null约束的话，`InnoDB`引擎会遍历整张表把每一行的字段值都取出来，返回给服务层，直接按行进行累加

- `count(1)：`
  - `InnoDB` 引擎遍历整张表，但不取值。服务层对于返回的每一层，放一个数字 1 进去，直接按行进行累加

- `count(*)：`
  - `InnoDB` 引擎并不会把全部字段取出来，而是专门做了优化，不取值，服务层直接按行进行累加


> 按效率排序：count(字段) < count(主键) < count(1) < count(\*)，所以尽量使用 count(\*)

#### **update优化（避免行锁升级为表锁）**

+ `InnoDB` 的行锁是针对索引加的锁，不是针对记录加的锁，并且该索引不能失效，否则会从行锁升级为表锁。

+ 如以下两条语句：
  + `update student set no = '123' where id = 1;`，这句由于id有主键索引，所以只会锁这一行；
  + `update student set no = '123' where name = 'test';`，这句由于name没有索引，所以会把整张表都锁住进行数据更新，解决方法是给name字段添加索引

<!-- tabs:end -->

#### **InnoDB引擎**

#### 逻辑存储结构

![26](./src/26.png)

#### 架构

>  MySQL5.5版本开始，默认使用`InnoDB`存储引擎，它擅长事务处理，具有崩溃恢复特性，在日常开发中使用非常广泛。下面是`InnoDB`架构图，左侧为内存结构,右侧为磁盘结构。

![27](./src/27.png)

<!-- tabs:start -->

#### **内存架构**

![28](./src/28.png)

![29](./src/29.png)

![30](./src/30.png)

```sql
show variables like '%hash_index%';
```

![31](./src/31.png)

```sql
show variables like '%log_buffer_size%';
show variables like '%flush_log%';
```

#### **磁盘结构**

![32](./src/32.png)

![33](./src/33.png)

```sql
create tablespace zjx_idb add datafile 'myzjx.ibd' engine = innodb;
use zjxweb;
create table a(id int  primary key auto_increment,name varchar(10)) engine = innodb tablespace zjx_idb;
```

![34](./src/34.png)


#### **后台线程**

![35](./src/35.png)

```sql
 show engine innodb status;
```

<!-- tabs:end -->

#### **事务原理**

<!-- tabs:start -->

#### **概述**

> 事务:是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。

![36](./src/36.png)

#### **说明**

+ `事务`是一组操作的集合，事务会把所有操作作为一个整体一起向系统提交或撤销操作请求，即这些操作`要么同时成功，要么同时失败。`
+ **默认`MySQL`的事务是自动提交的，也就是说，当执行一条`DML`语句，`MySQL`会以及隐式的提交事务**

基本操作：

```mysql
-- 1. 查询张三账户余额
select * from account where name = '张三';
-- 2. 将张三账户余额-1000
update account set money = money - 1000 where name = '张三';
-- 此语句出错后张三钱减少但是李四钱没有增加
模拟sql语句错误
-- 3. 将李四账户余额+1000
update account set money = money + 1000 where name = '李四';

-- 查看事务提交方式
SELECT @@AUTOCOMMIT;
-- 设置事务提交方式，1为自动提交，0为手动提交，该设置只对当前会话有效
SET @@AUTOCOMMIT = 0;
-- 提交事务
COMMIT;
-- 回滚事务
ROLLBACK;

-- 设置手动提交后上面代码改为：
select * from account where name = '张三';
update account set money = money - 1000 where name = '张三';
update account set money = money + 1000 where name = '李四';
commit;
```

操作方式二：

+ 开启事务：
+ `START TRANSACTION 或 BEGIN TRANSACTION;`
+ 提交事务：
+ `COMMIT;`
+ 回滚事务：
+ `ROLLBACK;`

操作实例：

```mysql
start transaction;
select * from account where name = '张三';
update account set money = money - 1000 where name = '张三';
update account set money = money + 1000 where name = '李四';
commit;
```

#### **四大特性ACID**

- `原子性(Atomicity)`：事务是不可分割的最小操作但愿，要么全部成功，要么全部失败
- `一致性(Consistency)`：事务完成时，必须使所有数据都保持一致状态
- `隔离性(Isolation)`：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行
- `持久性(Durability)`：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的

#### **并发事务**

| 问题       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| 脏读       | 一个事务读到另一个事务还没提交的数据                         |
| 不可重复读 | 一个事务先后读取同一条记录，但两次读取的数据不同             |
| 幻读       | 一个事务按照条件查询数据时，没有对应的数据行，但是再插入数据时，又发现这行数据已经存在 |

![脏读](./src/50.png)

![不可重复读](./src/51.png)

![幻读](./src/53.png)

+ 并发事务隔离级别：

| 隔离级别                            | 脏读 | 不可重复读 | 幻读 |
| ----------------------------------- | ---- | ---------- | ---- |
| `Read uncommitted`(读未提交)        | √    | √          | √    |
| `Read committed`（读已提交）        | ×    | √          | √    |
| `Repeatable Read(默认)`（可重复读） | ×    | ×          | √    |
| `Serializable`（串行化）            | ×    | ×          | ×    |

>  **√表示在当前隔离级别下该问题会出现**

- `Serializable` 性能最低；`Read uncommitted` 性能最高，数据安全性最差

> + 查看事务隔离级别：
>
>   + `SELECT @@TRANSACTION_ISOLATION;`
>
> + 设置事务隔离级别：
>
>   + `SET [ SESSION | GLOBAL ] TRANSACTION ISOLATION LEVEL {READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE };`
>   + SESSION 是会话级别，表示只针对当前会话有效，GLOBAL 表示对所有会话有效
>
>   ```sql
>   SELECT @@TRANSACTION_ISOLATION;
>               
>   set session transaction isolation level read uncommitted ;
>               
>   set session transaction isolation level repeatable read ;
>   ```



> `redo log`    持久性

+ 重做日志，记录的是事务提交时数据页的物理修改，是用来实现事务的持久性。
+ 该日志文件由两部分组成:重做日志缓冲 (`redo log buffer`)以及重做日志文件(`redo log file)`,前者是在内存中，后者在磁盘中。当事务提交之后会把所有修改信息都存到该日志文件中,用于在刷新脏页到磁盘,发生错误时，进行数据恢复使用。

![37](./src/37.png)

> `undo log`  原子性

+ 回滚日志，用于记录数据被修改前的信息，作用包含两个： **提供回滚 和  MVCC（多版本并发控制）**；
+ `undo log`和 `redo log`记录物理日志不一样，它是**逻辑日志**。可以认为当`delete` 一条记录时， `undo  log`中会记录一条对应的 `insert`记录，反之依然，当 `update`一条记录时，它记录一条对应相反的 `update`记录。当执行 `rollback`时，就可以从 `undo log`中的逻辑记录读取到对应的内容并进行回滚。
+ `undo log销毁`： `undo log`在事务执行时产生，事务提交时，并不会立即删除 `undo log`，因为这些日志可能还可用于 `MVCC`。
+ `undo log存储`： `undo log`采用**段的方式进行管理和记录**，存放在前面介绍的 `rollback segment`回滚段中，内部包含 `1024个undo log segment`。

> 一致性 undo log + redo log

> 隔离性  锁+`MVCC`

<!-- tabs:end -->

#### **`MVCC`（多版本并发控制）**

<!-- tabs:start -->

#### **基本概念**

+ 当前读
  + **读取的是记录的最新版本**，读取时还要保证其他并发事务不能修改当前记录，会对读取的记录进行加锁。对于我们日常的操作，如:`select ...lock in share mode`(共享锁)， `select... for update、update、insert、delete`(排他锁)都是一种当前读。
+ 快照读

> 简单的`select`(不加锁)就是快照读，快照读，读取的是记录数据的可见版本，有可能是历史数据，不加锁，是非阻塞读。

+ `Read Committed`: 每次`select`，都生成一个快照读。
+ `Repeatable Read`:开启事务后第一个`select`语句才是快照读的地方
+ `Serializable`: 快照读会退化为当前读

![43](./src/43.png)

♥ `MVCC`

+ 全称`Mult-Version Concurrency Control`，多版本并发控制。指维护一个数据的多个版本，使得读写操作没有冲突，快照读为`MySQL`实现`MVCC`提供了一个非阻塞读功能。`MVCC`的具体实现，还需要依赖于数据库记录中的`三个隐式字段`、`undo log日志`、`readView`。

#### **实现原理-隐藏字段**

>  记录中的隐藏字段

![38](./src/38.png)

| 隐藏字段    | 含义                                                         |
| ----------- | ------------------------------------------------------------ |
| DB_TRX_ID   | 最近修改事务ID，记录插入这条记录或最后一次修改该记录的`事务ID` |
| DB_ROLL_PTR | `回滚指针`，指向这条记录的上一个版本，用于配合undo log，指向上一个版本。 |
| DB_ROW_ID   | `隐藏主键`，如果表结构没有指定主键，将会生成该隐藏字段       |

```shell
# 查看表空间文件
ibd2sdi student.ibd
```

#### **实现原理-undo log**

> `undo log`

👉 回滚日志，在`insert、update、delete`的时候产生的便于数据回滚的日志。

👉 当insert的时候，产生的`undo log`日志只在回滚时需要，在事务提交后，可被立即删除。

👉 而update、delete的时候，产生的`undo log`日志不仅在回滚时需要在快照读时也需要，不会立即被删除。

> `undo log版本链`

![39](./src/39.png)

+ 不同事务或相同事务对同一条记录进行修改，会导致该记录的`undo log`生成一条记录版本链表，链表的头部是最新的旧记录，链表尾部是最早的旧记录。

#### **实现原理-`readview`**

> `ReadView`(读视图)是`快照读`SQL执行时MVCC提取数据的依据，记录并维护系统当前活跃的事务（未提交的) id。

+ `ReadView`中包含四个核心字段：

| 字段             | 含义                                                 |
| ---------------- | ---------------------------------------------------- |
| `m_ids`          | 当前活跃的事务ID集合                                 |
| `min_trx_id`     | 最小活跃事务ID                                       |
| `max_trx_id`     | 预分配事务ID，当前最大事务ID+1（因为事务ID是自增的） |
| `creator_trx_id` | `ReadView`创建者的事务ID                             |

![40](./src/40.png)

+ 不同的隔离级别，生成`ReadView`的时机不同

  👉 `READ COMMITTED：` 在事务中每一次执行快照读时生成`ReadView`。

  👉 `REPEATABLE READ:`仅在事务中第一次执行快照读时生成`ReadView`，后续复用该`ReadView`。

♥ **RC隔离级别下，在事务中每一次执行快照读时生成`ReadView`.**

![41](./src/41.png)

♥ **RR隔离级别下，仅在事务中第一次执行快照读时生成`ReadView`，后续复用该`ReadView`.**

![42](./src/42.png)

<!-- tabs:end -->

<!-- tabs:end -->

## 算法

<!-- tabs:start -->

#### **memmove**

> `memmove`和`memcpy`一样都是C语言自带的函数，可实现内存数据的移动，不同的是，`memcpy`在使用时有可能会出现内存重叠现象，导致数据移动错误，而`memmove`就是为了解决内存重叠而存在的。

```cpp
#include <stdio.h>
#include <assert.h>
//memmove模拟实现

void * my_memmove(void* dest,const void * src,size_t num){
    assert(dest && src);
    if (dest < src){
        while (num--){
            *(char *)dest = *(char *)src;
            dest = (char*)dest + 1;
            src = (char*)src + 1;
        }

    }
    else{
        while (num--){
            *((char *)dest + num) = *((char *)src + num);
        }

    }
}

int main(){
    int arr1[] = {1,2,3,4,5,6,7,8,9};
    my_memmove(arr1+2,arr1,20);
    int i = 0;
    for (i = 0; i < 9;i++){
        printf("%d ",arr1[i]);
    }
    system("pause");
    return 0;
}

```

#### **memcpy**

```cpp
//模拟实现memcpy()函数 字节拷贝
#include <stdio.h>
#include <assert.h>
void * my_memcpy(void* dest,const void* src,size_t n){
    while (n--)
    {
        *(char*)dest = *(char *)src;
        dest = (char *)dest + 1;
        src = (char *)src + 1;
    }
}
int main(){
    int arr1[10] = {0};
    int arr2[10] = { 1, 2, 3, 4, 5, 6 };
    my_memcpy(arr1,arr2,12);
    int i = 0;
    for (i = 0; i < 10;i++){
        printf("%d ",arr1[i]);
    }
    system("pause");
    return 0;
}
```

#### **手撕-strcpy**

```cpp
#include <stdio.h>
#include <assert.h>
char* self_strcpy(char* dest, const char* src) {
  assert(dest != nullptr && src != nullptr);
  char* res = dest;
  while ((*res++ = *src++) != '\0');
  return res;
}
```

#### **层次排序**

```cpp
class Node {
public:
    int val;
    vector<Node*> children;
    Node() {}
    Node(int _val) {
        val = _val;
    }
    Node(int _val, vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};
class Solution {
public:
    vector<vector<int>> levelOrder(Node *root) {
        if (root == nullptr) return {};
        vector<vector<int>> ans;
        queue<Node*> q;
        q.push(root);
        while (!q.empty()) {
            vector<int> vals;
            for (int n = q.size(); n--;) {
                auto node = q.front();
                q.pop();
                vals.push_back(node->val);
                for (auto c : node->children) {
                    q.push(c);
                }
            }
            ans.emplace_back(vals);
        }
        return ans;
    }
};
```

#### **前中后排序**

```cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode* left, TreeNode* right) : val(x), left(left), right(right) {}
};

//// 前序遍历迭代
//class Solution {
//public:
//    vector<int> preorderTraversal(TreeNode* root) {
//        stack<TreeNode*>sta;
//        vector<int>res;
//        if (root == NULL) return res;
//        sta.push(root);
//        while (!sta.empty()) {
//            TreeNode* node = sta.top();
//            sta.pop();
//            res.push_back(node->val);
//            if (node->right) sta.push(node->right);
//            if (node->left) sta.push(node->left);
//        }
//        return res;
//    }
//};

// 中序遍历迭代
//class Solution {
//public:
//    vector<int> preorderTraversal(TreeNode* root) {
//        stack<TreeNode*>sta;
//        vector<int>res;
//        TreeNode* cur = root;
//        while (cur != NULL || !sta.empty()) {
//            if (cur != NULL) {
//                sta.push(cur);
//                cur = cur->left;
//            }
//            else
//            {
//                cur = sta.top();
//                sta.pop();
//                res.push_back(cur->val);
//                cur = cur->right;
//            }
//        }
//        return res;
//    }
//};

// 后序遍历(迭代)
class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        stack<TreeNode*>sta;
        vector<int>res;
        if (root == NULL) return res;
        sta.push(root);
        while (!sta.empty()) {
            TreeNode* node = sta.top();
            sta.pop();
            res.push_back(node->val);
            if (node->left) sta.push(node->left); // 相对于前序遍历，这更改一下入栈顺序 （空节点不入栈）
            if (node->right) sta.push(node->right); // 空节点不入栈
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

#### **快速排序**

```cpp
class Solution {
    void quickSort(vector<int>&nums, int startIndex, int endIndex) {
        if (startIndex >= endIndex) return;
        
        int x = rand() % (endIndex - startIndex + 1) + startIndex; // 基于随机的原则
        swap(nums[startIndex], nums[x]);
        int firstNum = nums[startIndex];
        
        int l = startIndex, r = endIndex;
        while (l < r) {
            // 从后往前走，将比第一个小的移到前面
            while (l < r && nums[r] >= firstNum) --r;
            if (l < r) {
                nums[l] = nums[r];
            }
            // 从前往后走，将比第一个大的移到后面
            while (l < r && nums[l] <= firstNum) ++l;
            if (l < r) {
                nums[r] = nums[l];
            }
        }
        nums[l] = firstNum;
        // 自顶向下
        quickSort(nums, startIndex, l - 1);
        quickSort(nums, l + 1, endIndex);
    }

public:
    vector<int> sortArray(vector<int>& nums) {
        int n = nums.size();
        quickSort(nums, 0, n - 1);
        return nums;
    }
};
```

<!-- tabs:end -->
