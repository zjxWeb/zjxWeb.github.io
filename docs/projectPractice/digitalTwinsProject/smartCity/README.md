# 数字孪生实例

## 1. 项目软件及环境配置

### 1. gis数据处理相关软件

   - QGIS 
     - [QGIS下载地址](https://www.osgeo.cn/qgis/site/forusers/download.html)
   - Blender
     - 	[blender下载地址](https://www.blender.org/download/)
     - Blender的gis插件在素材文件夹中。
   - 后续大家下载C4D和unity就可以了
     - 对于unity的下载在官网即可，有一下注意点
       1. 先下载unityHub用来管理unity的版本
       2. 下载对应的unity的版本，项目中使用的2019
       3. 获取证书（个人证书）

### 2. web端和服务端软件

   - 安装NodeJS

     - [NodeJS下载地址](https://nodejs.org/en)
       - 注意下载稳定版
     - [nodeJS配置](https://blog.csdn.net/he_xin2009/article/details/124626268)

   - Vue及其脚手架的安装

     - ```
       npm install vue -g
       ```

     - ```
       npm install -g @vue/cli
       ```

     - 在CMD终端中输入`vue ui`,出现如下界面,就说明安装成功即可创建新的项目。

       - ![1](./img/1.png)

   - 小皮面板

     - 如果以及安装了MySQL即可省略这一步
     - 此处有点小坑，就是有的数据库安装之后可能会报`#1045`的错误，处理，可以参考我的博客
       - [数据库连接报#1045的错误](https://blog.csdn.net/qq_44891434/article/details/108920040)

   - 数据库可视化工具

     - 用户做数据调试
       - 在素材文件夹

### 3. 硬件环境配置

   - 硬件板子及其配件

     - NodeMCU开发版

       ![NodeMCU开发板](./img/NodeMcu开发板.png)

     - 还请购买一个继电器，或者发光二极管即可，课程中以继电器为例

   - 开发软件配置

     - Arduino IDE下载
     - [Arduino IDE下载地址](https://apps.microsoft.com/store/detail/arduino-ide/9NBLGGH4RSD8?hl=en-us&gl=us)


   1. 第1步需要做的就是下载相应的驱动 。比较简单的方法就是先在电脑下载一个**驱动精灵**类似的驱动软件 ，然后使用数据线将板子连接到电脑上 ，接着使用**驱动精灵**自动检测并安装所需要的驱动，然后进入设备管理器，查看是否安装完成，安装成功的话，结果类似如下所示：
      
        - ![2](./img/2.png)
          
          2. 依次点击**文件|首选项**， 然后跳转到如下界面，将下面的附加开发版管理器网址设置为http://arduino.esp8266.com/stable/package_esp8266com_index.json：
        
        - ![3](./img/3.png)
          
          3. 随后点击按钮“**好”**即可。再接着点击工具|开发板|开发板管理器，跳转到如下界面：
        
        - ![4](./img/4.png)
        - 然后找到如上所示的包， 再点击安装即可，因为我已安装，所以它显示已安装， 如果找不到这个开发包，那就试着检查一下地址有没有弄错，或者 重启Arduino并重新按照上面的步骤添加**附加开发版 管理器地址**。
        - 在下载过程中，如果非常缓慢的话，可以将我提供的这个包替换你的对应路径里面的Arduino15文件，如下所示，Karry是对应我自己的用户名，在替换的时候记得对应的找到你自己的路径。
        - ![5](./img/5.png)
        - 替换成功后，不出意料的话， 你就可以在开发版中选择NodeMcu了，如下所示
        - ![6](./img/6.png)
          
          4. 找一个例子跑一下，激动吧！开心吧！
          
        1. 串口通信
           
           - 主要功能是定时在串口打印信息。
           
           - ```c
             void setup() {
               // put your setup code here, to run once:
               Serial.begin(115200);
               delay(10);
               Serial.println();
               Serial.println();
               Serial.print("Connecting to ");
             }
             
             void loop() {
               // put your main code here, to run repeatedly:
               Serial.println("WiFi connected");
               delay(1000);
             }
             ```
           
           - Arduino的相关功能区如下， 下面将对其一一介绍：
           
           - ![7](./img/7.png)
           
           - 标题
           
             - 验证： 类似于c语言中的编译；
             - 上传： 类似于c语言中的编译+运行；
             - 后面三个功能按钮就比较容易理解了，就不讲了。
             - 把以上代码直接复制到Ardunio中，点击**验证**，如果如下图所示，则成功上传到硬件：
           
           - ![8](./img/8.png)
           
           - 按照如下操作即可看到打印的信息：
           
           - ![9](./img/9.gif)

### 4. postman工具

+ [postman下载地址](https://www.postman.com/downloads/?utm_source=postman-home)

## 2. 项目创建
1. ### unity项目创建

   + 打开我们的unityhub
   + 点击新项目-选择3D-填写项目名称-确认
   + 注意点：记得选择2019的版本

2. ### vue项目

   + win+r 输入cmd
   + 再cmd中输入vue ui
   + 创建新项目
   + 具体步骤参考视频
   + 安装element-ui和axios后面会用到的

3. ### NodeJS项目创建

   + express.js的框架

   + 使用npm安装express

     + `npm install express `

   + 执行

     + `npm init`

   + 创建index.js

   + 测试案例(index.js)

     + ```js
       
       const express = require('express')
       const app = express()
       const port = 3000
       
       app.get('/', (req, res) => {
         res.send('Hello World!')
       })
       
       app.listen(port, () => {
         console.log(`Example app listening on port ${port}`)
       })
       ```

   + 用postman测试我们的接口是否正确，返回我们理想的值

## 3. QGIS和Blender

+ QGIS处理和修建我们的gis模型
+ Blender的话我们调整建筑的高度和路网的宽度

## 4. 项目上线

### 1. 购买云服务器

+ 阿里云、腾讯云、亚马逊云
+ 买最低配的就可以了
+ 服务器的系统的话我们选择Centos、Ubuntu

### 2. 宝塔界面

+ [宝塔面板官网](https://www.bt.cn/new/download.html)

+ **Centos安装脚本**
  + yum install -y wget && wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec
  
+ **Ubuntu/Deepin安装脚本**
  + wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec

+ **Debian安装脚本**
  + wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && bash install.sh ed8484bec

+ **万能安装脚本**
  + if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install_panel.sh;else wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh;fi;bash install_panel.sh ed8484bec

+ **国产龙芯架构安装脚本****（其他CPU请勿使用）**
  + wget -O install_panel.sh https://download.bt.cn/install/0/loongarch64/loongarch64_install_panel.sh && bash install_panel.sh ed8484bec

### 3.配置服务器

+  设置我们的root密码
  + 在控制台右上角点击终端
  + 输入以下命令
    + `sudo passwd root`
+ 软件安装
  + Nginx 1.22.1
  + MySQL 5.7.41
  + PHP-8.1.13
  + nodejs版本管理
  + phpMyAdmin 
  + tomcat 8.5
  + PM2管理器
  + node版本14

### 4. 流程

+ 数据库配置
  + 添加数据库，信息应该和代码 `db.js`中的信息相对应，不要填错哦！小小一点啦！
  + 小细节
    + 就是有的小伙伴可能会遇见一个 `#1045` 的报错
    + [数据库报1045的error](https://blog.csdn.net/qq_44891434/article/details/108920040)
+ 建站
  + 点击添加网站
    + 域名——ip
    + 备注——按自己喜好，自己发挥
    + 根目录就是我们项目打包上传的目录——一定要写对哦（但是后期也是可以修改的）
    + FTP、数据库不要修改
    + **PHP版本——纯静态**
    + 网站分类——默认
  + 输入 `ip:80` ，如果出现建站成功，则表示我们胜利啦
    + 否则回顾我们的操作
+ WEBGL的部署过程
  + 第一种方法
    + 使用npm安装http-server
      + `npm install -g http-server`
  + 第二种方法
    + 使用小皮面板
    + 第一步解决80端口占用问题
      + 执行命令 `net stop w3svc`
    + 第二步，建站
      + 具体操作可以参考在宝塔界面的建站过程。  **大家这么聪明，必须拿下！**
  + **其他方法，只提供思路**
    + tomcat如何完成那
    + 在服务端如何搞定那
  
### 5. 前端项目打包上线
+ 修改相关代码

  + 修改IP

    + 改成自己的公网IP

  + 修改路由

    + **hash模式**  —— 开发环境

      + vue-router默认的是hash模式.
      + hash模式,是指url尾巴后的**#号**以及后面的字符.hash也被称为锚点,本身是用来做页面定位的.
      + hash虽然出现在url中,但不会被包括在http请求中,对后端完全没有影响,因此改变hash值不会重新加载页面.
      + hash值的变化不会导致浏览器向服务器发出请求,而hash改变会触发`hashchange`事件(只改变#后面的url片段);hash发生变化url都会被浏览器记录下来,从而可以使用浏览器的前进和后退
      + 对于hash模式会创建hashHistory对象,在访问不同的路由的时候,会发生两件事:
        + *HashHistory.push()将新的路由添加到浏览器访问的历史的栈顶,和HasHistory.replace()替换到当前栈顶的路由*

    + ### history模式——一般的生产环境

      + history模主要是通过`history` Api的`pushState()`和`replaceState()`两个方法来实现的.`pushState()`可以改变url地址且不会发送请求,`replaceState()`可以读取历史记录栈,还可以对浏览器记录进行修改

    + ##### history和hash的差异

      - history和hash都是利用浏览器的两种特性实现前端路由，history是利用浏览历史记录栈的API实现，hash是监听location对象hash值变化事件来实现
      - history的url没有’#'号，hash反之
      - history修改的url可以是同域的任意url，hash是同文档的url
      - 相同的url，history会触发添加到浏览器历史记录栈中，hash不会触发。

    + history和hash的优点和缺点
      - history比hash的url美观（没有’#'号）
      - history修改的url可以是同域的任意url，hash则只能是同文档的url
      - history模式往往需要后端支持，如果后端nginx没有覆盖路由地址，就会返回404，hash因为是同文档的url，即使后端没有覆盖路由地址，也不会返回404
      - hash模式下，如果把url作为参数传后端，那么后端会直接从’#‘号截断，只处理’#'号前的url，因此会存在#后的参数内容丢失的问题，不过这个问题hash模式下也有解决的方法

+ 使用 `npm run build` 打包项目

+ 上传打包好文件到建站的根目录两种方法

  + 拖动上传
  + 使用FTP工具上传

+ 测试

  + 浏览器属于  `公网IP` 
  
+ nginx配置文件

  + ```nginx
    
    server
        {
            listen 888;
            server_name phpmyadmin;
            index index.html index.htm index.php;
            root  /www/server/phpmyadmin;
    
            #error_page   404   /404.html;
            include enable-php.conf;
    
            location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
            {
                expires      30d;
            }
    
            location ~ .*\.(js|css)?$
            {
                expires      12h;
            }
           location / {
          		try_files $uri $uri/ @router;
          		index index.html;
            }
            location @router {
            		rewrite ^.*$ /index.html last;
            } 
            location ~ /\.
            {
                deny all;
            }
    
            access_log  /www/wwwlogs/access.log;
        }
    ```


### 6. 服务端上线

+ 修改数据库相关的信息

+ 上传服务端代码文件两种方法

  + 拖动上传
  + 使用FTP工具上传

+ **先测试后用pm2包进行部署**

  + `在根目录下面执行node index.js 启动后端，进行测试`

  + **一定要等到没有任何报错信息再去部署**

+ 使用pm2包进行部署

  + 注意：如果[pm2](https://so.csdn.net/so/search?q=pm2&spm=1001.2101.3001.7020)服务偶尔崩溃，尝试以下方式：

    1、使用cluster集群模式，不用fork模式

    2、设置自动保存，如下：【此方式待验证】

    `pm2 set pm2:autodump true`

  + `pm2 ls   # 列表 PM2 启动的所有的应用程序`

  + `pm2 start bin/www     # 启动bin/www应用程序`

  + `pm2 start bin/www --watch   # 当文件变化时自动重启应用`

  > 注意：这个--watch一定要在第一次启动服务的时候指定才会有效！！！如果服务A已经启动了，但是第一次启动时没有监听，就算stop服务，再start服务并加上--watch，监听是不会生效的。此时最好先stop，再delete掉该A服务，然后重新start服务并加上--watch

  + **使用watch后，最好再设置一下自动保存：pm2 set pm2:autodump true**
  + `pm2 start bin/www --name="test" # 启动应用程序并命名为 "test"`
  + `pm2 start bin/www -i 4     # cluster mode 模式启动4个bin/www的应用实例。4个应用程序会自动进行负载均衡`
    + **注意：-i 0 不是启动0个示例的意思，而是表示当前电脑有几核就启动几个示例**
  + `pm2 scale www 3       # 把名字叫www的应用扩展到3个实例`
    + 注意：如果扩展前是fork模式，那么扩展后的所有也是fork模式，不会变成cluster模式
  + `pm2 show [app-name或者id]      # 显示应用程序的所有信息`
  + `pm2 monit   # 显示每个应用程序的CPU和内存占用情况.按键盘上下键切换`
  + `pm2 logs           # 显示所有应用程序的日志 `
  + `pm2 logs [app-name或id]      # 显示指定应用程序的日志`
  + `pm2 flush    #清空logs`
  + `pm2 save           # 保存当前应用列表`
  + `pm2 resurrect         # 重新加载保存的应用列表`
  + `pm2 update          # Save processes, kill PM2 and restore processes`
  + `pm2 serve 【path】【port】  #pm2搭建静态文件服务器`(**重点说一下**)
    +  path可用相对路径: . 或者 ./  。也可以指定绝对路径

+ 测试

## 5. C4D做模型材质填充和UV处理

C4D安装后打不开

**此目录下面D:\c4d\resource\libs\win64**

	删除mesa文件夹即可
	
	**解决安装完成之后不能打开软件的错误**

```tex
C4D软件中文插件素材C4D R23 22 21 支持WIN/MAC远程安装技术服务1.针对以前的版本：Ryzen现在暂不支持mesa所致。
简单说下解决方法，删除下面目录内的mesa文件夹即可（以防万一最好备份一下）
C:\Program Files\MAXON\CINEMA 4D R18\resource\libs\win64
R19之前才会有mesa文件夹。。所以装R21这个办法不适用！
2.尽量默认盘安装，安装路径要是全英文的。
```

+ 导入我们的模型
  + 直接拖进去就可以了l
+ 由于我们的模型比较大，所有要做如下调整：
  + **在工程设置、视图修剪——选择极大**
+ 将模型整合到一块（进行cv操作就可以了）
+ 新建材质球（建筑、水系、路网、绿地）
+ 材质旋转
  + **要打开纹理模式**，才会材质旋转哦！
  + 在导航栏左侧
+ 建筑渐变色
  + 材质-纹理-渐变
    + 选择-二维V
    + 标签-投射-柱状

## 6. unity对模型做进一步处理

+ [unity官方手册网址](https://docs.unity.cn/cn/2021.3/Manual/UnityManual.html)
+ [UnityWebRequest](https://docs.unity.cn/cn/2021.3/Manual/UnityWebRequest.html)
  + [UnityWebRequest_API](https://docs.unity.cn/cn/2021.3/ScriptReference/Networking.UnityWebRequest.html)
  + 后续做数据交互的根本
+ [unity其他版本下载网址](https://unity.cn/releases/lts/2018)
  + 建议大家选择 `LTS` 长期支持的稳定版本，不太建议选择 `beta` 版本