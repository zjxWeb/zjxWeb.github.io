# **自动化测试工具**

![3](./src/3.png)

## 项目架构

<img src="./src/1.jpg" alt="1" style="zoom:150%;" />

<img src="./src/8.png" alt="8" style="zoom: 200%;" />

> 平台部分的框图
>
> +  测试平台对用户下发的任务进行分解、决策、细化为设备任务，分配给不同设备进行“消费”，设备端服 务对上层下发的任务进行任务甄别、作并行化处理，提高效率。双方通过http通信。

## objective流程

<img src="./src/objective流程.png" alt="objective流程" style="zoom:150%;" />

![12](./src/12.png)

## 一、环境配置

### 1. 安装`wsl2`
+ 安装过程比较简单
    + [安装教程](https://learn.microsoft.com/zh-cn/windows/wsl/install)
    
+ 安装完之后可能会报错

    - 解决方法
      ![1](./src/1.png)
    
      
    
#### 1.1 切换存储盘

  1）导出到D盘

  2）从C盘中注销原始的`ubuntu`系统

  3）从D盘中重新导入

  ```
  wsl --export Ubuntu-20.04 d://wslubuntu2004//ubuntu-20.04.tar
  wsl --unregister Ubuntu
  wsl --import Ubuntu-20.04 d://wslubuntu2004 d://wslubuntu2004//ubuntu-20.04.tar
  ```
> 说明和下面步骤按行对应，第二步骤的注销是通过 wsl -l -v 命令来判断当前系统存在那些子系统

### 2. 安装`vscoe`连接`wsl2`

```shell
sudo apt-get update
sudo apt-get install wget ca-certificates
code .
```

+ 报错处理

  + 报错信息：

  ```error
  /mnt/c/Users/zjx9083/AppData/Local/Programs/Microsoft VS Code/bin/code: 61: /mnt/c/Users/zjx9083/AppData/Local/Programs/Microsoft VS Code/Code.exe: Exec format error
  ```

  + [解决方式：](https://github.com/microsoft/WSL/issues/8952#issuecomment-1568212651)

  ```shell
  sudo sh -c 'echo :WSLInterop:M::MZ::/init:PF > /usr/lib/binfmt.d/WSLInterop.conf'
  sudo systemctl restart systemd-binfmt
  ```

### 3. `RabbitMQ` `Windows` 安装

+ `RabbitMQ`安装参考：
  + https://juejin.cn/post/6992383077435572260
  + https://developer.aliyun.com/article/1134566
+ 错误处理
  + 报错信息
    + `Error: unable to perform an operation on node 'rabbit@zjx9083-01945'. Please see diagnostics information and suggestions below.`
    + https://itecnote.com/tecnote/unable-to-perform-an-operation-on-node-rabbitmq/
  + 报错： `弹窗`
    + ![2](./src/2.png)

### 4. `samba`安装

+ 安装参考文献
  + https://zhuanlan.zhihu.com/p/375925918
+ 报错：`Unit nmb.service not found`
  + https://bbs.archlinux.org/viewtopic.php?id=194468

## 二、项目启动

1. 将交叉编译文件拷贝到 `ubuntu` 的   `code-space` 路径下进行解压。

> 注意： `main_service`和`main_i30service`是主线任务，其它的为测试任务。
>
> + 所在路径为：`/home/zjx/board_sdk_service/src/target/o_main_service`

2. 在 `focus.py`对应的目录下执行(编译不通过)

   ```shell
   python3 focus.py -b main_service  # 不带o_
   ```

3. 刚开始的时候可以先注释掉 `focus.py` 参考下图，并按下图修改 `CMakeList.txt`(主目录下的)

   + `focus.py`

   <img src="./src/4.png" alt="4" style="zoom: 67%;" />

   + `CMakeList.txt`

   <img src="./src/5.png" alt="5" style="zoom: 50%;" />

   4. 在 `focus.py`对应的目录下执行(编译不通过)

         ```shell
         python3 focus.py -b main_i30service
         cd build
         make
         ```

   5. 成功生成out目录和对应的文件。

      + 此时如果没有生成此目录 `/home/zjx/code-space/QNX/qnx-sdk-project-20220228/FOR-PUBLIC/FOR_GTEST`
      + 可以手动生成，并将之前的修改的，复原回来。**思考一下，其实可以在刚开始的时候，根据自己的需求进行修改。**

   6. 如果编译 `main_service` 失败，可以查看自己留下的注释 ，注释规则 `zjx new：行为`

   7. `error`：`aarch64-unknown-nto-qnx7.0.0-g++-5.4.0: fatal error: error: environment variables QNX_HOST and QNX_TARGET not defined`

      + 处理方式：**仔细对照根目录的 `CMakeLists.txt`文件 和  `/src/target/o_main_service` 目录下的  `CMakeLists.txt`文件**

   8. `main_service`文件执行过程，**不要make**

      ```shell
      python3 focus.py -b main_service
      # 执行成功之后在out文件夹中有对应的可执行文件生成（此处的可执行文件是要导入到开发板中执行，在ubuntu不能执行）
      ```

   9. 开发板252连接

      + 远程连接开发板软件：`MobaXterm`
      + 连接`IP`询问即可
      + 工具连接参考下图

      <img src="./src/6.png" alt="6" style="zoom:50%;" />

      + 将生成好的可执行程序拖到开发板中（当时是拖到连接工具啦！）

      <img src="./src/7.png" alt="7" style="zoom:50%;" />

      + 执行： `./执行程序的name`

      + **此时处于监听状态**

## 三、自动化测试脚本

### 1. 相关描述

#### 1.1 环境描述

+ 语言：python
+ 库： requests
+ 运行环境： windows

#### 1.2 目录描述

![10](./src/10.png)

### 2. 项目搭建

> 注意：本项目在搭建的时候采用的是 `虚拟环境` 来配置项目所需要的依赖

+ 虚拟环境配置可以参考：https://flask.palletsprojects.com/en/2.3.x/installation/#virtual-environments

### 3. 项目开发

+ `index.py` 主文件（也是入口文件）
+ `url.py`  请求的各种`url`路径
+ `params.py`  每个请求对应的参数
+ `response.py` 将每一个请求封装成函数，方便后面逻辑调用
+ `startExe.py` 启动远程可程序程序，已经封装成函数，可直接调用

  + ```python
    import startExe as start
    startStatus = start.startExt() #启动程序测试
    print("启动成功：",startStatus) # 返回——启动成功：success
    ```

#### 3.1 重定向输出脚本

> 这里会给出代码流程，需要修改的地方有注释，参考注释 `new zjx`

+ 修改路径 `/board_sdk_service/src/target/o_main_i30service/main.cpp`

```c++

#include "main.h"

int main(int argc, char* argv[])
{
    // new zjx:输出重定向到output.txt  6-11
    const char* fileName = "output.txt";
    FILE *outFile = freopen(fileName, "w", stdout);  // 重定向stdout到文件并使用追加模式
    if (outFile == NULL) {
        std::cerr << "Failed to open file" << std::endl;
        return 1;
    }
    // setvbuf(stdout, NULL, _IONBF, 0);
    if (argc > 1) {
        return commond_line_test(argc, argv);
    }

    signal(SIGINT, signal_handler);
    ws_start();
    Singleton<TManager>::Instance();
    Singleton<TManager>::GetInstance().launch_backend();

    while (1)
    {
        if(s_signo!=0){
            ws_stop();
            Singleton<TManager>::Destruct();
            std::this_thread::sleep_for(std::chrono::seconds(1));
            break;
        }
        std::this_thread::sleep_for(std::chrono::seconds(3));
    }
    fclose(outFile); // new zjx:输出重定向到output.txt
    return 0;
}
```

+ 修改路径 `/board_sdk_service/src/target/o_main_i30service/main.cpp`

```cpp
#ifndef JF_MAIN_HPP_
#define JF_MAIN_HPP_
#include "HttpMain.h"
#include "HttpServer.h"
#include "TestBedManager.h"
#include "MyEasyLog.hpp"
#include "component-all.hpp"
#include "compile_info.h"
// new zjx:header输出重定向 10-12
#include <cstdio>
#include <chrono>
#include <thread>

int32_t LOG_LEVEL_MASK = EROR | VEBO | PRINT | INFO | DBUG | COLOR | EXTR;
char MYLOG_PATH[200] = "./my_log.txt";

#define OPEN_TESTBED_MANAGER 0

static int s_signo;
static void signal_handler(int signo) {
    s_signo = signo;
}

static int commond_line_test(int argc, char* argv[]) {
    if ((argc == 2) && (strcmp(argv[1], "--compile_info"))) {
        LOG_EXTR("compile info:%s", BUILD_DATE);
        return 0;
    }
    if (1 == argc) {
        return 0;
    }
    if (argc == 2) {
        std::vector<std::string> out_vec;
        extract_dir_name(argv[1], out_vec);
    }
    else if (argc == 3) {
        HttpClientManage::download_file(argv[1], argv[2]);
        return 0;
    }
    else if (argc == 4) {
        HttpClientManage::upload_file(argv[1], argv[2], std::stoi(argv[3]));
        return 0;
    }
    return 0;
}

#endif JF_MAIN_HPP_
```


### 4. i30任务代码实现（逻辑代码部分）

> 后续可优化，进行拆分，整理

```python
import time 
import json
import startExe as startExe
import src.response as response # 请求函数粉装
import updateExecutable as update

with open("./configuration.json") as conf:
    data = json.load(conf)
loop = 0
times = 5
taskStatus = 0 #任务状态
testBed = 0  # testbed 更新状态
deviceStatus = 0 # 设备状态
reboot = 0
# 根据配置文件，看是否需要更新可执行程序，isUpdate为true更新
if data['isUpdate']:
    update.updateExeMain()
else:
    startExe.startExt()

while (loop * times ) < 10000 :
    try:
        # 获取设备的状态，当状态为free执行以下操作
        deviceStatus = response.deviceStatusResponse()
        if (deviceStatus  == 1):
            print("--------------------------------------------")
            testBed = response.testbedMetiralResponse()
            print("testBed------------------>",testBed)
            print("-------------------更新testbed--------------------")
            while  True:
                deviceStatus = response.deviceStatusResponse()
                if deviceStatus  == 1 or deviceStatus  == 25 and testBed == 0 and taskStatus != 6:
                    # testBed 更新成功就执行重启
                    try:
                        reboot = response.deviceRebootResponse()
                    except KeyboardInterrupt:           
                        print("quit")           
                    except Exception as ex:            
                        print("出现如下异常%s"%ex)
                    print("-------------------重启--------------------")
                time.sleep(10)
                while True:
                    deviceStatus = response.deviceStatusResponse()
                    if deviceStatus  == 1 : 
                        # 运行任务
                        response.taskRunResponse()
                        time.sleep(5)
                        # 当任务状态不是"ACCEPTED RUNNING "
                        taskStatus = response.taskStatusResponse()
                        print("taskStatusResponse--------->", taskStatus)
                        while taskStatus == 6 :
                            print("-------------------ACCEPTED RUNNING-------------------")
                            taskStatus = response.taskStatusResponse()
                            time.sleep(10)
                            if taskStatus != 6:
                                break
                    else:
                        break
                    time.sleep(10)  
                time.sleep(10)  
    except Exception as ex: 
        response.taskTerminateResponse()           
        print("出现如下异常%s"%ex)
    if response.sdkVersionResponse() == -5 or \
        response.deviceInfoResponse() == -5:
        response.taskTerminateResponse()  
    time.sleep(times)
    loop += 1
    print("loop-------------------->",loop)
else:
    # 循环退出执行
    print("请重新启动程序")


import time 
import json
import startExe as startExe
import src.response as response # 请求函数粉装
import updateExecutable as update

with open("./configuration.json") as conf:
    data = json.load(conf)
loop = 0
times = 5
taskStatus = 0 #任务状态
testBed = 0  # testbed 更新状态
deviceStatus = 0 # 设备状态
reboot = 0
# 根据配置文件，看是否需要更新可执行程序，isUpdate为true更新
if data['isUpdate']:
    update.updateExeMain()
else:
    startExe.startExt()

while (loop * times ) < 10000 :
    try:
        # 获取设备的状态，当状态为free执行以下操作
        deviceStatus = response.deviceStatusResponse()
        if (deviceStatus  == 1):
            print("--------------------------------------------")
            testBed = response.testbedMetiralResponse()
            print("testBed------------------>",testBed)
            print("-------------------更新testbed--------------------")
            while  True:
                deviceStatus = response.deviceStatusResponse()
                if deviceStatus  == 1 or deviceStatus  == 25 and testBed == 0 and taskStatus != 6:
                    # testBed 更新成功就执行重启
                    try:
                        reboot = response.deviceRebootResponse()
                    except KeyboardInterrupt:           
                        print("quit")           
                    except Exception as ex:            
                        print("出现如下异常%s"%ex)
                    print("-------------------重启--------------------")
                time.sleep(10)
                while True:
                    deviceStatus = response.deviceStatusResponse()
                    if deviceStatus  == 1 : 
                        # 运行任务
                        response.taskRunResponse()
                        time.sleep(5)
                        # 当任务状态不是"ACCEPTED RUNNING "
                        taskStatus = response.taskStatusResponse()
                        print("taskStatusResponse--------->", taskStatus)
                        while taskStatus == 6 :
                            print("-------------------ACCEPTED RUNNING-------------------")
                            taskStatus = response.taskStatusResponse()
                            time.sleep(10)
                            if taskStatus != 6:
                                break
                    else:
                        break
                    time.sleep(10)  
                time.sleep(10)  
    except Exception as ex: 
        response.taskTerminateResponse()           
        print("出现如下异常%s"%ex)
    if response.sdkVersionResponse() == -5 or \
        response.deviceInfoResponse() == -5:
        response.taskTerminateResponse()  
    time.sleep(times)
    loop += 1
    print("loop-------------------->",loop)
else:
    # 循环退出执行
    print("请重新启动程序")
```

### 5. 代码执行

> 在主代码  `path`：`D:\work\automatedTestRequest` 中执行 `python3 index.py`

## 四、`rabbitMQ` 测试启动

> **自己当时遇到的大坑-**----- 在公司电脑 windows ,我的电脑管理员将我们的域防火墙进行了控制,我们无法关闭,这也是我们个个人电脑最大的区别,所以这里我们需要手动添加 端口规则 **将`rabbitmq`的端口`5672`手动打开**
>
> + 防火墙设置  --->  添加新规则  ------>  端口
> + 参考博客:https://www.zhang3.xyz/article/readArticleLong?pk=Zq4Gw78Wc2IoFnk5mzHJVnyIeV6B4F2rLla%2BX4YBwLY%3D

其余操作同上.

### python 的测试案列

> 为什么要写这个测试案列：因为源代码的测试案列，每次都要打包生成可执行程序，比较麻烦，所以这里可以采用python写一个写demo进行测试，方便排查虚错误和看到错误信息。
>
> + 安装对应的库
>
>   + ```
>     pip install pika
>     ```

+ 源代码

```python
import pika

# 建立socket连接
credentials = pika.PlainCredentials("123", "123")
connection = pika.BlockingConnection(pika.ConnectionParameters("172.17.186.57",5672,'/', credentials=credentials))
# 建立rabbitMQ协议的通道
channel = connection.channel()
# 声明队列：通过通道申明队列
channel.queue_declare(queue="abc")
# 发送、发布消息：routing_key--队列名称，body--消息
channel.basic_publish(exchange="",
                      routing_key="abc",
                      body="this is a message.")
print ("[x] sent a message.")
# 关闭socket连接
connection.close()
```

+ 结果打印

```txt
[x] sent a message.
```

## 五、`i30`任务`API`

### 1. i30流程

![i30流程图](./src/i30流程.png)

![i30](./src/i30.png)



### 2. 获取设备状态

+ ```
  url:http://172.17.185.252:7000/device_service/device/status
  ```

+ 请求参数

  + ```json
    {
        "task_id": 0,
        "reboot":0  // 为 1 的时候重启
    }
    ```

+ 响应信息

  + ```json
    {
    	"code" : 0,
    	"data" : 
    	[
    		{
                 "device_status" : 1,				// 66
    			"device_status_msg" : "FREE ",  //"BUSY REBOOTING"
    			"task_id" : 0
    		}
    	],
    	"msg" : "success"
    }
    ```

### 3. testbedMetiral

+ ```
  url:http://172.17.185.252:7000/device_service/update/testbed_metiral
  ```

+ 请求参数

  + ```json
    {
        "task_id":0,
        "testbed_pkg_path":"http://172.17.11.202//cabin_data//testbed/1222/%2322011-1_D03_TESTBED_I30_20230619_AUTOBUILD_120.zip",
        "metiral_pkg_path":"http://172.17.11.202//cabin_data//data_set/113/D03_I30_testpics_autobuild.zip",
        "testbed_type":"0",
        "license_file_url":"http://172.17.11.202//cabin_data//license/35/license.dat"
    }
    ```

+ 响应信息

  + ```json
    {
    	"code" : 0,
    	"data" : 
    	[
    		{
    			"task_id" : 0
    		}
    	],
    	"msg" : "success"
    }
    ```

> 更新完 testbed 根据后端

###  4. `taskRun`运行任务

+ ```
  url:http://172.17.185.252:7000/device_service/task/run
  ```

+ 请求参数

  + ```json
    {
        "task_id":0,
        // "upload_result_dir_path":"172.17.187.12",
        "upload_result_dir_path":"172.17.11.202",
        "testbed_type":"0"
    }
    ```
  
+ 响应信息

  + ```json
    {
    	"code" : 0,
    	"data" : 
    	[
    		{
    			"task_id" : 0
    		}
    	],
    	"msg" : "success"
    }
    ```

### 5. `taskStatus`任务状态

+ ```
  url:http://172.17.185.252:7000/device_service/task/status
  ```

+ 请求参数

  + ```json
    {
        "task_id":0
    }
    ```

+ 响应信息

  + ```json
    {
    	"code" : 0,
    	"data" : 
    	[
    		{
    			"task_id" : 0,
    			"task_status" : 6,
    			"task_status_msg" : "ACCEPTED RUNNING "
    		}
    	],
    	"msg" : "success"
    }
    ```

### 6. `sdkVersion`获取`SDK`版本(终止任务之后执行，否则会报错)

+ ```
  url:http://172.17.185.252:7000/device_service/sdk/version
  ```

+ 请求参数

  + ```json
    {
        "task_id":0,
        "testbed_type":"0"
    }
    ```
  
+ 响应信息

  + ```json
    {
    	"code" : 0,
    	"data" : 
    	[
    		{
    			"sdk_version" : "ARCSOFT_ARCALG_3.8.400235194.7_SDK_GREATWALL_20230506_normal_AUTOBUILD_D03_outer_b3",
    			"task_id" : 0,
    			"testbed_version" : ""
    		}
    	],
    	"msg" : "success"
    }
    ```

### 7. 终止任务

+ ```
  url:http://172.17.185.252:7000/device_service/task/terminate
  ```

+ 请求参数

  + ```json
    {
        "task_id":0,
        "task_type":"2"
    }
    ```
  
+ 响应信息

  + ```json
    {
    	"code" : 0,
    	"data" : 
    	[
    		{
    			"task_id" : 0
    		}
    	],
    	"msg" : "success"
    }
    ```

### 8. `deviceInfo`获取设备信息

+ ```
  url:http://172.17.185.252:7000/device_service/device/info
  ```

+ 请求参数

  + ```json
    {
        "task_id":0
    }
    ```
  
+ 响应信息

  + ```json
    {
    	"code" : 0,
    	"data" : 
    	[
    		{
    			"device_info" : "QNX localhost 7.0.X 2021/02/24-23:57:01EST SA8155_ADP_Star_v1.0.0_UFS_NORMAL aarch64le\n",
    			"task_id" : 0
    		}
    	],
    	"msg" : "success"
    }
    ```

## 六、qnx 常用操作

+ ```shell
  # 查看对应的进程
  pidin | grep SERVE_EXE_qnx
  # kill掉该进程
  kill 进程pid
  # 持续打印日志
  tail -f 文件名
  ```

## 七、更新可执行文件到开发板

> 环境： windows
>
> 首先检测该可执行程序是否执行，执行的话先kill掉然后在更新

### `updateExecutable.py`

> 里面涉及到的配置项，都在 `configuration.json` 文件中

```py
import os
import json
import paramiko
import shutil
import startExe as startExe
from scp import SCPClient


with open('./configuration.json') as conf:
	data = json.load(conf)
# 可执行程序在服务器上的路径
source_executable_path = data['source_executable_path']
source_path = data['source_path'] # 本地的文件要上传开发板的路径

# 目标开发板上存放可执行程序的路径
target_executable_path = data['target_executable_path']

# 建立SSH连接到另一台服务器
source_ssh = paramiko.SSHClient()
source_ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
directory_name = data['directory_name'] # 替换成您想要创建的文件夹名称

# 删除文件夹下的内容
def dir_delete(dir):
    files=os.listdir(dir)
    os.chdir(dir)#进入指定目录
    #删除目录下的文件
    for file in files:
        os.remove(file)
        print(file,"删除成功")
    os.chdir("..")#切换到外部目录
    shutil.rmtree(dir)
    print(dir,"删除成功")

# 创建文件夹
def create_directory_in_project_root(directory_name):
    # 获取项目根目录
    project_root = os.path.dirname(os.path.abspath(__file__))
    
    # 创建目标文件夹路径
    target_directory_path = os.path.join(project_root, directory_name)
    
    # 检查目录是否已存在
    if not os.path.exists(target_directory_path):
        os.makedirs(target_directory_path)
        print(f"Directory '{directory_name}' created in the project root.")
    else:
        print(f"Directory '{directory_name}' already exists in the project root.")

def sourchSshConnect():
    try:
        source_ssh.connect(data['source']['source_ssh_host'], 
                        data['source']['source_ssh_port'], 
                        data['source']['source_ssh_username'], 
                        data['source']['source_ssh_password'])
        print("souce")
        create_directory_in_project_root(directory_name)
        # 使用SCP从服务器复制可执行程序到本地
        with SCPClient(source_ssh.get_transport()) as scp:
            scp.get(source_executable_path,source_path)  # 保存到本地当前目录下的executable_file
    finally:
        source_ssh.close()



def targetSshConnect():
     # 建立SSH连接到目标开发板
    target_ssh = paramiko.SSHClient()
    target_ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    try:
        target_ssh.connect( data['target'][0]['target_ssh_host'], 
                            data['target'][0]['target_ssh_port'],
                            data['target'][0]['target_ssh_username'], 
                            data['target'][0]['target_ssh_password'])
        
        print("target_ssh")


        # 构造获取程序PID的命令
        pid_command = f'pidin | grep {data["exeFileName"]}'  # 使用pidin命令获取进程信息

        # 执行获取PID命令
        stdin, stdout, stderr = target_ssh.exec_command(pid_command)
        process_info = stdout.read().decode().strip()
        print("process_info",process_info)
        # 提取PID
        if process_info:
            pid = process_info.split()[5]
            print("当前程序的pid",pid)
            killPid = f'kill {pid}'
            target_ssh.exec_command(killPid)
            sftpTrasExe(target_ssh)
            startExe.startExt()
        else:
            sftpTrasExe(target_ssh)
            startExe.startExt()
    finally:
        target_ssh.close()

# sftp文件长传文件路径
def sftpTrasExe(target_ssh):
    # 创建SFTP对象
    sftp = target_ssh.open_sftp()
    
    # 上传本地文件到目标开发板的当前目录
    sftp.put(source_path, target_executable_path)
    command = f'chmod +x {target_executable_path}'
    target_ssh.exec_command(command)
    
    print('Executable transferred successfully.')
    # 调用更新成功删除目录的函数
    dir_delete(directory_name)


# 更新可执行文件主函数
def updateExeMain():
    # 可执行代码生成主机Ubuntu连接
    sourchSshConnect()
    # 开发板主机连接，及更新目标文件
    targetSshConnect()
# updateExeMain()  当需要单个执行的时候放开注释，嵌入到其它放开注释就好
```

### 配置项`configuration.json`

```json
{
    "target": [ // 目标开发板的配置选项
        {
            "target_ssh_host": "172.17.185.252",
            "target_ssh_port": 22,
            "target_ssh_username": "root",
            "target_ssh_password": ""
        }
    ],
    "source": { // 编译可秩序程序Ubuntu主机（也就是产生开发板要用的可执行程序的主机）
        "source_ssh_host": "172.28.155.6",
        "source_ssh_port": 22,
        "source_ssh_username": "root",
        "source_ssh_password": "0716"
    },
    "source_executable_path": "/home/zjx/board_sdk_service/out/SERVE_EXE_qnx/SERVE_EXE_qnx",//source主机可执行程序的位置
    "source_path": "./SERVE_EXE_qnx/SERVE_EXE_qnx", //windows下的，要保存可执行程序的文件夹和文件名
    "target_executable_path": "/var/zjx9083/SERVE_EXE_qnx", // target 主机  要保存可执行程序的文件夹和文件名
    "directory_name": "SERVE_EXE_qnx",  // 本地要创建的文件夹名称
    "exeFileName":"SERVE_EXE_qnx",
    "isUpdate":false,  // 是否要向target主机更新可执行程序
    "uploadLocalPath":"./file", // 上传文件夹——本地windows需要上传的文件夹
    "uploadRomatePath":"/var/zjx9083/key/" // 开发板中要保存的路径
}
```

### 代码执行

#### 单独执行

1. 放开代码最后一行的注释 `eg`：`updateExeMain()  当需要单个执行的时候放开注释，嵌入到其它放开注释就好`
2. 执行  `python3  updateExecutable.py`

#### 整合到任务脚本执行

1. 将代码最后一行加上注释  `eg`：`# updateExeMain()  当需要单个执行的时候放开注释，嵌入到其它放开注释就好`
2. 修改 配置文件`configuration.json`中  `isUpdate`的值
   + 值为`true`则表示需要更新
   + 值为`false`则表示不需要更新
3. 在主代码  `path`：`D:\work\automatedTestRequest` 中执行 `python3 index.py`

## 八、 从本地上传文件夹到远程开发板

### 目录结构

![9](./src/9.png)

### 代码 `index.py`

> 里面涉及到配置项都在 `configuration.json`

```python
import paramiko
import os
import json
import time
import sys, math, select

with open('../configuration.json') as conf:
	data = json.load(conf)

def get_all_files_in_local_dir(local_dir):
    """递归获取当前目录下所有文件目录"""
    all_files = []
    # 获取当前指定目录下的所有目录及文件，包含属性值
    files = os.listdir(local_dir)
    for x in files:
        # local_dir目录中每一个文件或目录的完整路径
        filename = os.path.join(local_dir, x)
        # 如果是目录，则递归处理该目录
        if os.path.isdir(filename):
            all_files.extend(get_all_files_in_local_dir(filename))
        else:
            all_files.append(filename)
    return all_files


def progressbar(cur, total):
    percent = '{:.2%}'.format(cur / total)
    sys.stdout.write('\r')
    sys.stdout.write('[%-50s] %s' % ('=' * int(math.floor(cur * 50 / total)), percent))
    sys.stdout.flush()
    if cur == total:
        sys.stdout.write('\n')


class Dossh():

    def __init__(self, ip, port, uname, passwd):
        self.ip = ip
        self.port = port
        self.uname = uname
        self.passwd = passwd
        self.sshclt = paramiko.SSHClient()
        self.sshclt.load_system_host_keys()
        self.sshclt.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        self.sshclt.connect(hostname=self.ip, port=self.port, username=self.uname, password=self.passwd,
                            allow_agent=False, look_for_keys=False)
        self.t = paramiko.Transport((self.ip, self.port))
        self.t.connect(username=self.uname, password=self.passwd)
        self.sftp = paramiko.SFTPClient.from_transport(self.t)

    def getssh(self):
        return self.sshclt

    def close_ssh(self):
        self.sshclt.close()
        self.sftp.close()

    def uploadfile_path(self, local_path, remote_path):
        """
        :param local_path:待上传文件夹路径
        :param remote_path:远程路径
        :return:
        """
        # 待上传目录名
        local_pathname = os.path.split(local_path)[-1]
        # 上传远程后的目录名
        real_remote_Path = remote_path + '/' + local_pathname
        ##判断是否存在，不存在则创建
        try:
            self.sftp.stat(remote_path)
        except Exception as e:
            self.sshclt.exec_command("mkdir -p %s" % remote_path)
        self.sshclt.exec_command("mkdir -p %s" % real_remote_Path)
        # 获取本地文件夹下所有文件路径
        all_files = get_all_files_in_local_dir(local_path)
        # 依次判断远程路径是否存在，不存在则创建，然后上传文件
        for file_path in all_files:
            # 统一win和linux 路径分隔符
            file_path = file_path.replace("\\", "/")
            # 用本地根文件夹名分隔本地文件路径，取得相对的文件路径
            # 必须加变量1，仅切割一次，否则会将二级目录下与一级目录名相同的文件上传错误
            off_path_name = file_path.split(local_pathname, 1)[-1]
            # 取得本地存在的嵌套文件夹层级
            abs_path = os.path.split(off_path_name)[0]
            # 生产期望的远程文件夹路径
            reward_remote_path = real_remote_Path + abs_path
            # 判断期望的远程目录是否存在，不存在则创建
            try:
                self.sftp.stat(reward_remote_path)
            except Exception as e:
                self.sshclt.exec_command("mkdir -p %s" % reward_remote_path)
            # 待上传的文件名
            abs_file = os.path.split(file_path)[1]
            # 上传后的远端路径，文件名不变
            to_remote = reward_remote_path + '/' + abs_file
            time.sleep(0.1)
            #  callback=progressbar，添加文件上传进度条
            self.sftp.put(file_path, to_remote, callback=progressbar)
            print(file_path, to_remote)

    def execute_cmd(self, cmd):
        current_cmd = "bash --login -c '%s'" % cmd
        stdin, stdout, stderr = self.sshclt.exec_command(current_cmd, get_pty=True, bufsize=1024 * 1024 * 100)
        res, err = stdout.read(), stderr.read()

        result = res if res else err
        return result.decode('utf-8')
    
    def linesplit(self, socket):
        buffer_bytes = socket.recv(4048)
        buffer_string = buffer_bytes.decode('utf-8', 'ignore')
        done = False
        while not done:
            if "\n" in buffer_string:
                (line, buffer_string) = buffer_string.split("\n", 1)
                yield line + "\n"
            else:
                more = socket.recv(4048)
                if not more:
                    done = True
                else:
                    buffer_string = buffer_string + more.decode('utf-8', 'ignore')
        if buffer_string:
            yield buffer_string


if __name__ == "__main__":
    
    print("==========2. 开始连接服务器==========")
    sshclent = Dossh(data['target'][0]['target_ssh_host'], 
                    data['target'][0]['target_ssh_port'],
                    data['target'][0]['target_ssh_username'], 
                    data['target'][0]['target_ssh_password'])
    print("==========3. 服务器连接成功==========")
    print("==========4. 开始从本地上传文件到106服务器==========")
    try:
        # 上传package包（jar+lib）
        # 本地目录，建议使用相对路径，如:'./test'
        # linux服务器目录，绝对路径，如：'/home/'
        # 会本地test目录下所有文件上传到linux服务器的/home/test
        # a、目录存在则仅覆盖文件
        # b、目录不存在则先创建目录，再上传目录下的文件
        sshclent.uploadfile_path(data["uploadLocalPath"],data["uploadRomatePath"])

        # 查看linux服务器上test目录下的文件
        # cmd_ll = 'ls -l  /home/test'
        print("==========5. 文件上传成功==========")
        time.sleep(1)

    except Exception as ex:            
        print("出现如下异常%s"%ex)   
    finally:
        sshclent.close_ssh()
```

### 代码执行

`python3 index.py`

## 九、启动开发板可执行程序

### 程序代码

```cpp
import paramiko
import subprocess
import json
def startExt():
    with open('./configuration.json') as conf:
        data = json.load(conf)

    # 远程可执行程序路径
    remote_executable_path ="/var/zjx9083/SERVE_EXE_qnx"
    try:
        # 创建SSH客户端
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(data['target'][0]['target_ssh_host'], 
                    data['target'][0]['target_ssh_port'],
                    data['target'][0]['target_ssh_username'], 
                    data['target'][0]['target_ssh_password'])

        # 构造远程命令，注意添加执行权限(此处因为更新的时候已经添加，此处就不需要在进行添加了)
        # remote_command = f'chmod +x {remote_executable_path} && {remote_executable_path}'

        remote_command = f'{remote_executable_path}'
        # 执行远程命令
        stdin, stdout, stderr = ssh.exec_command(remote_command)

        # 输出命令执行结果
        # (因为日志的输出在，前面脚本output.txt中有打印，所以此处就不再做打印了，单独使用可以取消注释，进行打印)
        ssh.close()
        # print(stdout.read().decode())
        return "success"

        # print("出错了")
        # # print(stderr.read().decode())

    finally:
        # 关闭SSH连接
        ssh.close()
```

### 代码执行

> 这个就不介绍执行方式啦，这个是整合到任务中了，只需要启动主任务就自动执行啦！！！

