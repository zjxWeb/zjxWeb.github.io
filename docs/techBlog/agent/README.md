# 科学上网网络知识和技术使用指南

## 1. 科学上网平时使用技巧点

<!-- tabs:start -->

#### **`win11`配置`bat`脚本**

> 此脚本的使用场景是当你只有代理的`IP+端口`的时候可以使用，从而不需要下载任何软件就可以使用，点击运行脚本即可，当然你可以配置环境变量，通过 `cmd`来进行快速的执行，采用哪种方式，都是ok的。

+ `开启代理`:首先写脚本，代码中涉及到中文文字的地方需要自己改一下哦！注释就不要了，没这样的吧！

```bat
:: 开启代理脚本
@echo off
:: 设置代理
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /t REG_SZ /d "你的ip:端口" /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyUser /t REG_SZ /d "用户名" /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyPass /t REG_SZ /d "密码" /f

:: 刷新系统设置
ipconfig /flushdns
netsh winsock reset

:: 验证代理是否设置成功
echo 正在验证代理设置...
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer
```

+ `关闭代理`:默认会调起管理员权限，所以不需要在使用管理员权限进行启动啦！

```bat
@echo off
:: 以管理员身份运行（自动请求提权）
if not "%1"=="admin" (
    powershell -Command "Start-Process cmd -ArgumentList '/c %~s0 admin' -Verb RunAs"
    exit /b
)

:: 强制关闭代理
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d 0 /f
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /f 2>nul
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyUser /f 2>nul
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyPass /f 2>nul

:: 重置IE代理设置（影响系统全局）
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyOverride /t REG_SZ /d "<local>" /f
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v AutoConfigURL /t REG_SZ /d "" /f

:: 刷新系统网络设置
ipconfig /flushdns >nul
netsh winsock reset >nul

:: 通知系统代理变更（关键步骤！）
powershell -Command "& {[System.Net.WebRequest]::DefaultWebProxy = [System.Net.WebRequest]::GetSystemWebProxy()}"

:: 提示结果
echo.
echo [√] 代理已彻底关闭，所有设置已重置！
echo.
```

> 最后，在提醒一下，一定要保存为`.bat`文件，保存完之后右击看一下是不是`.bat`文件。

#### **`CMD`窗口代理**

> 上述的方法在浏览器没问题，但是有的时候我们需要在 `CMD`窗口进行运行，这个时候就需要以下代码。

+ 这种方式最好配置一下 `.bat` 所在的文件夹，到用户环境变量中。——这里不多少了，就是配置环境变量，添加到 `path`中就好，难度应该不大。

```bat
@echo off
REM 设置代理地址（含认证信息）
set HTTP_PROXY=http://s122are:123456@10.12.21.10:7890
set HTTPS_PROXY=http://s122are:123456@10.12.21.10:7890

REM 配置环境变量（仅当前窗口有效）
echo 正在设置代理...
echo  HTTP_PROXY=%HTTP_PROXY%
echo  HTTPS_PROXY=%HTTPS_PROXY%

```

`http://s122are:123456@10.12.21.10:7890`

> `http://用户名:密码@代理IP:端口`

+ 打开 `cmd`窗口输入 `start cdl`   `cdl为创建的.bat的名字`

<!-- tabs:end -->
