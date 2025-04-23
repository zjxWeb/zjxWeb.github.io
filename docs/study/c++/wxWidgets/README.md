# wxWidgets

> [🖱️英文学习文档](https://wiki.wxwidgets.org/Hello_World)            [🖱️中文学习文档](https://wiki.wxwidgets.org/WxWidgets%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E6%95%99%E7%A8%8B03:%E7%AC%AC%E4%B8%80%E4%B8%AA%E7%A8%8B%E5%BA%8F)            [🖱️中文学习书籍](https://wizardforcel.gitbooks.io/wxwidgets-book/content/index.html)

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

#### 1.3.2 错误二

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

```cpp
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

## 2. 代码示例

### 2.1 wxWidgets 双向通信示例

```cpp
#include <wx/wx.h>  // 引入 wxWidgets 主头文件，包含所有基本控件和事件定义

// 定义两个自定义事件类型，用于 GroupA → GroupB，GroupB → GroupA 的通信
// wxDEFINE_EVENT(事件名, 事件类型)
wxDEFINE_EVENT(EVT_MSG_TO_B, wxCommandEvent);  // A → B 的消息事件
wxDEFINE_EVENT(EVT_MSG_TO_A, wxCommandEvent);  // B → A 的消息事件

// 前向声明两个面板类，方便在主窗口类中引用
class GroupAPanel;
class GroupBPanel;

// 主窗口类，继承自 wxFrame，是整个程序的主容器
class MyFrame : public wxFrame {
public:
	// 构造函数：用于创建窗口和初始化界面
	MyFrame(const wxString& title);

private:
	GroupAPanel* groupA;  // Group A 面板指针
	GroupBPanel* groupB;  // Group B 面板指针

	// 接收来自 Group A 的事件（发送给 B）
	void OnMsgToB(wxCommandEvent& event);

	// 接收来自 Group B 的事件（发送给 A）
	void OnMsgToA(wxCommandEvent& event);
};

// Group A 面板，继承自 wxPanel，包含按钮和显示消息的文本
class GroupAPanel : public wxPanel {
public:
	// 构造函数：构建 Group A 的 UI
	GroupAPanel(wxWindow* parent)
		: wxPanel(parent) {  // 父窗口是主窗口 MyFrame

		// 设置背景颜色：AliceBlue
		SetBackgroundColour(wxColour(240, 248, 255));

		// 创建一个带边框的垂直排列容器，标题为 "Group A"
		wxStaticBoxSizer* box = new wxStaticBoxSizer(wxVERTICAL, this, "Group A");

		// 创建一个按钮（wxID_ANY 表示自动分配 ID），标签为 "Send to B ➡️"
		btn = new wxButton(this, wxID_ANY, "Send to B ➡️");

		// 创建一个文本标签用于显示来自 B 的消息，初始文本为 "Msg from B: "
		msgDisplay = new wxStaticText(this, wxID_ANY, "Msg from B: ", wxDefaultPosition, wxDefaultSize, wxALIGN_LEFT);

		// 将按钮和文本添加到 box 布局中，设置边距和对齐方式
		box->Add(btn, 0, wxALL | wxEXPAND, 10);                      // 四周边距 10，填充
		box->Add(msgDisplay, 0, wxLEFT | wxRIGHT | wxBOTTOM, 10);   // 三边边距

		// 设置面板使用这个布局
		SetSizer(box);

		// 绑定按钮点击事件：点击按钮时调用 OnSend()
		btn->Bind(wxEVT_BUTTON, &GroupAPanel::OnSend, this);
	}

	// 点击按钮后调用的函数：发送自定义事件给主窗口（发给 B）
	void OnSend(wxCommandEvent& event) {
		wxCommandEvent customEvent(EVT_MSG_TO_B);  // 创建自定义事件，类型是 EVT_MSG_TO_B
		customEvent.SetString("👋 Hello from A!"); // 设置事件携带的字符串
		wxPostEvent(GetParent(), customEvent);     // 异步发送事件给父窗口（MyFrame）
	}

	// 用于更新文本内容（显示来自 B 的消息）
	void UpdateText(const wxString& msg) {
		msgDisplay->SetLabel("Msg from B: " + msg);
	}

private:
	wxButton* btn;              // 发送按钮
	wxStaticText* msgDisplay;   // 显示文本
};

// Group B 面板，与 Group A 结构几乎相同
class GroupBPanel : public wxPanel {
public:
	GroupBPanel(wxWindow* parent)
		: wxPanel(parent) {
		SetBackgroundColour(wxColour(255, 250, 240));  // 设置背景为 FloralWhite

		wxStaticBoxSizer* box = new wxStaticBoxSizer(wxVERTICAL, this, "Group B");

		btn = new wxButton(this, wxID_ANY, "⬅️ Send to A");
		msgDisplay = new wxStaticText(this, wxID_ANY, "Msg from A: ", wxDefaultPosition, wxDefaultSize, wxALIGN_LEFT);

		box->Add(btn, 0, wxALL | wxEXPAND, 10);
		box->Add(msgDisplay, 0, wxLEFT | wxRIGHT | wxBOTTOM, 10);
		SetSizer(box);

		// 绑定按钮事件：点击按钮后调用 OnSend()
		btn->Bind(wxEVT_BUTTON, &GroupBPanel::OnSend, this);
	}

	// 向 A 发送消息
	void OnSend(wxCommandEvent& event) {
		wxCommandEvent customEvent(EVT_MSG_TO_A);     // 创建类型为 EVT_MSG_TO_A 的事件
		customEvent.SetString("📨 Reply from B!");    // 设置事件的字符串内容
		wxPostEvent(GetParent(), customEvent);        // 发送给主窗口
	}

	// 更新显示内容（显示来自 A 的消息）
	void UpdateText(const wxString& msg) {
		msgDisplay->SetLabel("Msg from A: " + msg);
	}

private:
	wxButton* btn;
	wxStaticText* msgDisplay;
};

// 主窗口构造函数
MyFrame::MyFrame(const wxString& title)
	: wxFrame(NULL, wxID_ANY, title, wxDefaultPosition, wxSize(520, 300)) {

	wxBoxSizer* sizer = new wxBoxSizer(wxHORIZONTAL); // 创建水平布局容器

	groupA = new GroupAPanel(this);  // 创建 Group A，父窗口是当前 MyFrame
	groupB = new GroupBPanel(this);  // 创建 Group B

	// 把两个组分别加入布局中，设置为均等占用空间、可拉伸
	sizer->Add(groupA, 1, wxEXPAND | wxALL, 5);
	sizer->Add(groupB, 1, wxEXPAND | wxALL, 5);
	SetSizer(sizer);  // 设置窗口的主布局

	// 绑定两个自定义事件到主窗口
	// 当收到 EVT_MSG_TO_B 类型事件时，调用 OnMsgToB()
	Bind(EVT_MSG_TO_B, &MyFrame::OnMsgToB, this);

	// 当收到 EVT_MSG_TO_A 类型事件时，调用 OnMsgToA()
	Bind(EVT_MSG_TO_A, &MyFrame::OnMsgToA, this);

	SetBackgroundColour(wxColour(245, 245, 245)); // 设置主窗口背景色为浅灰
}

// 主窗口收到来自 A 的消息后，把内容传给 B 更新界面
void MyFrame::OnMsgToB(wxCommandEvent& event) {
	groupB->UpdateText(event.GetString());  // 将事件中的字符串交给 B 处理
}

// 主窗口收到来自 B 的消息后，把内容传给 A 更新界面
void MyFrame::OnMsgToA(wxCommandEvent& event) {
	groupA->UpdateText(event.GetString());  // 同上
}

// 应用程序类（wxApp），入口类
class MyApp : public wxApp {
public:
	// 重载 OnInit()，应用程序启动时调用
	virtual bool OnInit() {
		MyFrame* frame = new MyFrame("🌐 wxWidgets 双向通信"); // 创建主窗口
		frame->Centre();      // 居中显示
		frame->Show(true);    // 显示窗口
		return true;
	}
};

// 宏定义应用程序入口，生成 main 函数
wxIMPLEMENT_APP(MyApp);

```

### 2.2 进一步扩展通信

>  ✅ 使用 wxTextCtrl 显示多条聊天记录 ✅ 多个组广播（如 A、B、C、D 全连接） ✅ 加入线程通信示例（后台发消息） ✅ 改为支持消息携带结构体数据

```cpp
// wxWidgets 多组面板通信扩展示例
// 功能：
// ✅ 多个组（A/B/C/D）可以广播通信
// ✅ 每个面板使用 wxTextCtrl 显示多条聊天记录
// ✅ 后台线程定时发消息
// ✅ 消息中携带结构体数据（包含 sender, content）

#include <wx/wx.h>
#include <wx/thread.h>
#include <vector>
#include <random>
#include <ctime>

// 消息数据结构
struct ChatMessage {
	wxString sender;
	wxString content;
};

wxDEFINE_EVENT(EVT_CHAT_MESSAGE, wxCommandEvent);

// 转换结构体为字符串（简单方式）
wxString FormatChat(const ChatMessage& msg) {
	return msg.sender + ": " + msg.content;
}

// 所有组面板的基类
class GroupPanel : public wxPanel {
public:
	GroupPanel(wxWindow* parent, const wxString& name)
		: wxPanel(parent), groupName(name) {

		SetBackgroundColour(*wxWHITE);
		wxStaticBoxSizer* box = new wxStaticBoxSizer(wxVERTICAL, this, name);

		chatLog = new wxTextCtrl(this, wxID_ANY, "", wxDefaultPosition, wxSize(200, 200),
			wxTE_MULTILINE | wxTE_READONLY | wxTE_RICH2);
		sendBtn = new wxButton(this, wxID_ANY, "Broadcast from " + name);

		box->Add(chatLog, 1, wxALL | wxEXPAND, 5);
		box->Add(sendBtn, 0, wxALL | wxALIGN_CENTER, 5);
		SetSizer(box);

		sendBtn->Bind(wxEVT_BUTTON, &GroupPanel::OnSendClicked, this);
	}

	// 显示消息
	void AppendMessage(const ChatMessage& msg) {
		chatLog->AppendText(FormatChat(msg) + "\n");
	}

	wxString GetName() const { return groupName; }

	// 设置广播回调
	std::function<void(const ChatMessage&)> onSend;

private:
	void OnSendClicked(wxCommandEvent&) {
		if (onSend) {
			ChatMessage msg{ groupName, "👋 Hi from " + groupName };
			onSend(msg);
		}
	}

	wxTextCtrl* chatLog;
	wxButton* sendBtn;
	wxString groupName;
};

// 后台线程事件源
class MessageThread : public wxThread {
public:
	MessageThread(wxEvtHandler* handler, const std::vector<wxString>& senders)
		: wxThread(wxTHREAD_DETACHED), evtHandler(handler), groups(senders) {
		srand(time(nullptr));
	}

protected:
	ExitCode Entry() override {
		while (!TestDestroy()) {
			wxThread::Sleep(3000);  // 每 3 秒

			// 随机选择一个发送者
			int i = rand() % groups.size();
			ChatMessage msg{ groups[i], "🕒 Timed hello from " + groups[i] };

			wxCommandEvent evt(EVT_CHAT_MESSAGE);
			evt.SetClientData(new ChatMessage(msg));
			wxQueueEvent(evtHandler, evt.Clone());
		}
		return (wxThread::ExitCode)0;
	}

private:
	wxEvtHandler* evtHandler;
	std::vector<wxString> groups;
};

class MyFrame : public wxFrame {
public:
	MyFrame() : wxFrame(NULL, wxID_ANY, "🌐 Group Broadcast Chat", wxDefaultPosition, wxSize(850, 300)) {
		wxBoxSizer* sizer = new wxBoxSizer(wxHORIZONTAL);

		wxString names[] = { "Group A", "Group B", "Group C", "Group D" };

		for (const auto& name : names) {
			GroupPanel* panel = new GroupPanel(this, name);

			// 设置广播回调（转发给所有组）
			panel->onSend = [this](const ChatMessage& msg) {
				Broadcast(msg);
				};

			groups.push_back(panel);
			sizer->Add(panel, 1, wxEXPAND | wxALL, 5);
		}

		SetSizer(sizer);
		Bind(EVT_CHAT_MESSAGE, &MyFrame::OnThreadMessage, this);

		std::vector<wxString> groupNames;
		for (const auto& g : groups)
			groupNames.push_back(g->GetName());

		// 启动线程
		(new MessageThread(this, groupNames))->Run();
	}

	// 广播消息给所有组（除了自己）
	void Broadcast(const ChatMessage& msg) {
		for (auto* g : groups) {
			if (g->GetName() != msg.sender)
				g->AppendMessage(msg);
		}
	}

	void OnThreadMessage(wxCommandEvent& evt) {
		auto* msg = static_cast<ChatMessage*>(evt.GetClientData());
		Broadcast(*msg);
		delete msg;
	}

private:
	std::vector<GroupPanel*> groups;
};

class MyApp : public wxApp {
public:
	bool OnInit() override {
		MyFrame* frame = new MyFrame();
		frame->Centre();
		frame->Show(true);
		return true;
	}
};

wxIMPLEMENT_APP(MyApp);
```

![13](./src/13.png)
