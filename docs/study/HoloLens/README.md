# HoloLens浅浅认识一下

### 1. unity  3D项目上传到HoloLens

+ unity中的`Build settings`设置如下图所示

![1](./src/1.png)

+ 这里有个细节注意一下哦（大坑，疼！）——build之后的软件位置一定要选择`c盘下载`的位置。别问为什么，问我也不知道。就是这么神奇！其他文件夹都会报错！离谱到家了！
+ build之后如下图所示的文件

![2](./src/2.png)

+ 然后用`Visual Studio`打开`cdcity.sln`(双击`.sln`文件即可)
+ Visual Studio 下载的配置如下图，参考这来，按自己需求，别一股脑全下载（除非你磁盘很大，算我没说）

![3](./src/3.png)

+ 单个组件也看一下吧！

![4](./src/4.png)
![5](./src/5.png)
![6](./src/6.png)
![7](./src/7.png)

+ 此处还是有点小坑，说一下吧！——图中的要和Visual Studio中的SDK匹配

![8](./src/8.png)

+ 如果报什么 `version`操作，进行如下操作即可
  + 一般是自己Visual Studio安装目录的，磁盘主目录之下，会有一个`Windows Kits`文件。打开并复制里面的文件。如下图
  + ![9](./src/9.png)
  + 复制之后，然后来到这个目录`C:\Program Files (x86)\Windows Kits`,黏贴就ok了。到这里这个报错基本就处理ok了！
+ 在Visual Studio中，项目名称上，右击鼠标，属性。看下图，配置对哦！

![10](./src/10.png)

+ 接下来就是HoloLens的设置了！
+ 找到HoloLens的ip地址`设置-网络-在你连的wifi下有个高级配置-点击-划到最下面就看到了`。
+ 然后在`设置-开发者-配对--会弹出PIN码`，此时在`Visual Studio`下按动`F5`，接着在pc端会弹出一个框框，填上HoloLens上面的PIN码，就ok了，等待，导入，复制就可以了，看你项目的大小时间不固定。

+ 恭喜你，完成了！哦耶！

### 2. unity 打包应用安装到Hololens2设备

+ 下载MRTK包的工具，并导入到项目的unity中。
  + [下载网址](https://github.com/Microsoft/MixedRealityToolkit-Unity/releases)
  + 打开网址下载如下的包就好了。
  + ![11](./src/11.png)
+ 下载好了之后接着就是，将这些包导进去了，看如下操作。
  + 用unity打开你的项目，然后依次在文件夹中点击这些包，就会自动弹出，import导包的界面，这时候选择import就可以了。
+ Build Settings界面配置如下
  + ![12](./src/12.png)
+ 接下来就是mrtk的一系列操作了
  + `Mixed Readlity` -> `ToolKit`->`Utilities`->`Build Windows`
  + ![13](./src/13.png)
+ 接下来就是要配置Hololens了
  + 连接Hololens
    + **确保Hololens和你的电脑处于同一局域网**
    + 然后在你电脑浏览器上输入Hololens的IP就ok了。Hololens的ip怎么找那
      + 设置、网络、wifi的高级属性、往下滑就看到了
    + 此时会弹出一个输入账号和密码的界面，如果不知道，就连续输入错的，然后就会弹出，重置，此时，重置就好了。
    + ![14](./src/14.png)
    + 然后回进入如下图的页面
      + ![15](./src/15.png)
    + 将如下图的文件导入即可哦
      + ![16](./src/16.png)
  + 完成了，只需等待就可以在Hololens中看到了，点击打开就好了。