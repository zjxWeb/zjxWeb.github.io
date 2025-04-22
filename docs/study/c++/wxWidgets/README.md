# wxWidgets

> [🖱️英文学习文档](https://wiki.wxwidgets.org/Hello_World)            [🖱️中文学习文档](https://wiki.wxwidgets.org/WxWidgets%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E6%95%99%E7%A8%8B03:%E7%AC%AC%E4%B8%80%E4%B8%AA%E7%A8%8B%E5%BA%8F)            [中文学习书籍](https://wizardforcel.gitbooks.io/wxwidgets-book/content/index.html)

## 1. 环境配置

> 采用的是visual studio 2022 + wxWidgets-3.2.2.1

### 1.1 下载和编译

1. #### 下载wxWidgets

> [🖱️点击跳转下载](https://github.com/wxWidgets/wxWidgets/releases)具体下载那个可以参考下图（其他版本也可以，具体看自己的需要）

![版本选择](./src/1.png)

2. 编译wxWidgets源代码

> 打开目录`wxWidgets-3.1.4\build\msw`，找到与自己的Visual Studio版本最相近的`.sln`文件并用VS打开

![编译选择](./src/2.png)

3. 打开加载完成后，选择 `生成`——`批生成`

![3](./src/3.png)

4. 选择 `全选`——`生成`，等待即可

![4](./src/4.png)

### 1.2 visual studio 2022 配置

1. 创建一个空项目
2. 鼠标右键——> `属性`

![5](./src/5.png)

3. 具体配置参考下图即可

![6](./src/6.png)

![7](./src/7.png)

![8](./src/8.png)

![9](./src/9.png)

![10](./src/10.png)

### 1.3 错误集合及其解决方法

> 上述方法都是网上的步骤，自己也是用来参考，但是最终都会出现或多或少的问题，下面会附上对应的解决方法；

#### 1.3.1 错误一

> **错误提示：**
>
> * `fatal error C1083:无法打开包括文件: “wx/setup.h”: No such file or directory`

##### 解决方法：

> 到`C:\wxwidgets\include\wx`目录下， 找到`platform.h`文件，用`notepad++`打开

> 找到` #include "wx/setup.h" `一行

> 将 `"wx/setup.h" `改为` "wx/msw/setup.h"`, 然后保存修改后的`platform.h`文件即可，之后你再去编译工程，就不会出现这个错误了

+ 原来官方给的下载包里的wx.chm帮助文件有这个问题的解决办法，意思是说，wx/...目录里根本没有setup.h文件, 首先要在platform.h文件里进行配置， 格式大致是 #include "wx/XXX/setup.h", 而这里的XXX是根据你所用的操作系统的不同而改变的，例如WINDOW下就改成"wx/msw/setup.h", 而MacOS就改成"wx/mac/setup.h"

#### 1.3.2 错误而

> 错误大概形式如下

```tex
1>wxmsw32u_core.lib(app.obj) : error LNK2001: 无法解析的外部符号 __imp_InitCommonControls
1>wxmsw32u_core.lib(ownerdrw.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_Create
1>wxmsw32u_core.lib(imaglist.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_Create
1>wxmsw32u_core.lib(ownerdrw.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_Destroy
1>wxmsw32u_core.lib(imaglist.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_Destroy
1>wxmsw32u_core.lib(ownerdrw.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_Add
1>wxmsw32u_core.lib(imaglist.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_Add
1>wxmsw32u_core.lib(ownerdrw.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_Draw
1>wxmsw32u_core.lib(imaglist.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_Draw
1>wxmsw32u_core.lib(msw_listctrl.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_Draw
1>wxmsw32u_core.lib(msw_spinbutt.obj) : error LNK2001: 无法解析的外部符号 __imp_CreateUpDownControl
1>wxmsw32u_core.lib(imaglist.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_GetImageCount
1>wxmsw32u_core.lib(msw_listctrl.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_GetImageCount
1>wxmsw32u_core.lib(imaglist.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_SetBkColor
1>wxmsw32u_core.lib(imaglist.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_Replace
1>wxmsw32u_core.lib(imaglist.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_AddMasked
1>wxmsw32u_core.lib(imaglist.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_Remove
1>wxmsw32u_core.lib(imaglist.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_GetIcon
1>wxmsw32u_core.lib(imaglist.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_GetIconSize
1>wxmsw32u_core.lib(msw_listctrl.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_GetIconSize
1>wxmsw32u_core.lib(imaglist.obj) : error LNK2001: 无法解析的外部符号 __imp_ImageList_GetImageInfo
1>wxmsw32u_core.lib(uuid.obj) : error LNK2001: 无法解析的外部符号 __imp_RpcStringFreeW
1>wxmsw32u_core.lib(uuid.obj) : error LNK2001: 无法解析的外部符号 __imp_UuidCreate
1>wxmsw32u_core.lib(uuid.obj) : error LNK2001: 无法解析的外部符号 __imp_UuidToStringW
1>wxmsw32u_core.lib(uuid.obj) : error LNK2001: 无法解析的外部符号 __imp_UuidFromStringW
1>C:\study\wxWidgets\one\x64\Release\one.exe : fatal error LNK1120: 18 个无法解析的外部命令
```

> 当时很头疼尝试了很多方法，本文提供了一种方法，最后可以顺利进行，如果大家有什么好的方法可以随时交流；

![11](./src/11.png)

> 相关的lib文件如下(仅供参考)

```latex
wxbase32u.lib
wxmsw32u_core.lib
wxmsw32u_richtext.lib
wxmsw32u_html.lib
wxmsw32u_gl.lib
wxmsw32u_adv.lib
wxpng.lib
wxzlib.lib
wxtiff.lib
wxjpeg.lib
wxregexu.lib
wxexpat.lib
comctl32.lib
rpcrt4.lib
```

> `comctl32.lib; rpcrt4.lib`并不是由 wxWidgets 编译产生的，而是随 Windows SDK（Windows Kits）一起提供的系统导入库（import libraries）。如果在您的 wxWidgets lib 目录中看不到这两个文件，很可能是因为尚未安装或配置 Windows SDK，导致 Visual Studio 无法找到这些系统库。

### 1.4 示例程序

```
// wxWidgets "Hello World" Program
// For compilers that support precompilation, includes "wx/wx.h".
#include <wx/wxprec.h>
#ifndef WX_PRECOMP
#include <wx/wx.h>
#endif
class MyApp : public wxApp
{
public:
	virtual bool OnInit();
};
class MyFrame : public wxFrame
{
public:
	MyFrame();
private:
	void OnHello(wxCommandEvent& event);
	void OnExit(wxCommandEvent& event);
	void OnAbout(wxCommandEvent& event);
};
enum
{
	ID_Hello = 1
};
wxIMPLEMENT_APP(MyApp);
bool MyApp::OnInit()
{
	MyFrame* frame = new MyFrame();
	frame->Show(true);
	return true;
}
MyFrame::MyFrame()
	: wxFrame(NULL, wxID_ANY, "Hello World")
{
	wxMenu* menuFile = new wxMenu;
	menuFile->Append(ID_Hello, "&Hello...\tCtrl-H",
		"Help string shown in status bar for this menu item");
	menuFile->AppendSeparator();
	menuFile->Append(wxID_EXIT);
	wxMenu* menuHelp = new wxMenu;
	menuHelp->Append(wxID_ABOUT);
	wxMenuBar* menuBar = new wxMenuBar;
	menuBar->Append(menuFile, "&File");
	menuBar->Append(menuHelp, "&Help");
	SetMenuBar(menuBar);
	CreateStatusBar();
	SetStatusText("Welcome to wxWidgets!");
	Bind(wxEVT_MENU, &MyFrame::OnHello, this, ID_Hello);
	Bind(wxEVT_MENU, &MyFrame::OnAbout, this, wxID_ABOUT);
	Bind(wxEVT_MENU, &MyFrame::OnExit, this, wxID_EXIT);
}
void MyFrame::OnExit(wxCommandEvent& event)
{
	Close(true);
}
void MyFrame::OnAbout(wxCommandEvent& event)
{
	wxMessageBox("This is a wxWidgets Hello World example",
		"About Hello World", wxOK | wxICON_INFORMATION);
}
void MyFrame::OnHello(wxCommandEvent& event)
{
	wxLogMessage("Hello world from wxWidgets!");
}

```

> 运行结果

![12](./src/12.png)

> 最后备注一下，每次修改`属性信息`，记得先`清理解决方案`，在重新生成；

