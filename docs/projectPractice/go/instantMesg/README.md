## 项目简介 [代码仓库地址](https://github.com/zjxWeb/instantMesg.git)

> 项目架构

![1](./src/1.png)

> **构建基础server   用户上线功能   用户消息广播机制   用户业务层封装  在线用户查询  修改用户名  超时强踢功能  私聊功能  客户端实现**

## 构建基础server

> 程序入口`server.go`

```go
package main

import (
	"net"
	"fmt"
)

type Server struct {
	Ip string
	Port int
}

// 创建一个server接口
func NewServer(ip string, port int) *Server {
	server := &Server{
		Ip: ip,
		Port: port,
	}
	return server
}
func (this *Server) Hander(conn net.Conn){
	// ...当前链接业务
	fmt.Println("连接建立成功")
}

// 启动服务器的接口
func (this *Server) Start() {
	// socket listen
	listen, err := net.Listen("tcp", fmt.Sprintf("%s:%d", this.Ip, this.Port))
	if err!= nil {
		fmt.Println("listen error:",err)
		return
	}
	// close listen socket
	defer listen.Close()
	
	for{
		// accept
		conn, err := listen.Accept()
		if err!= nil {
			fmt.Println("accept error:",err)
			continue
		}
		// do hander
		go this.Hander(conn)
	}

}
```

> `main.go`

```go
package main

func main() {
    server := NewServer("127.0.0.1", 8080)
    server.Start()
}
```

> 编译

```bash
# windows
go build -o server.exe main.go .\server.go
#客户端  如果telnet不能用的话，可以到控制面板——》 程序和功能 ----》 打开一下telnet
telnet 127.0.0.1 8080

# linux
go build -o server main.go .\server.go
#客户端
nc 127.0.0.1 8080
```

##  用户上线和广播功能

> user.go

```go
package main

import "net"

type User struct{
	Name string
	Addr string
	C chan string // 表示当前是否有数据，回写给对应的客户端
	conn net.Conn  // 唯一socket连接
}

// 创建一个用户API
func NewUser(conn net.Conn) *User{
	userAddr := conn.RemoteAddr().String()	

	user := &User{
		Name: userAddr,
		Addr: userAddr,
		C: make(chan string, 100),
		conn: conn,
	}
	// 启动监听当前user channel的方法，一旦有消息，就直接发送给客户端
	go user.ListenMessage()
	return user
}

// 监听当前User channel的方法，一旦有消息，就直接发送给端客户端
func (this *User) ListenMessage(){
	for {
		msg := <-this.C
		this.conn.Write([]byte(msg + "\n"))
	}	
}
```

### `server.go`

<!-- tabs:start -->

#### **处理客户端上线的handler创建并添加用户**

```go
func (this *Server) Hander(conn net.Conn){
	// ...当前链接业务
	// fmt.Println("连接建立成功")

	user := NewUser(conn)
	// 用户上线了，将用户加入到onlineMap中
	this.mapLock.Lock()
	this.OnlineMap[user.Name] = user
	this.mapLock.Unlock()
	// 广播当前用户上线消息
	this.BroadCast(user,"已上线")

	// 当前handle阻塞 
	select {}
}
```

#### **新增广播消息方法**

```go
// 广播消息方法
func (this *Server) BroadCast(user *User, msg string){
	sendMsg := "[" + user.Addr + "]" + user.Name + ":" + msg
	this.Message <- sendMsg
}
```

#### **新增监听广播消息channel方法**

```go
// 监听Message广播消息channel的goroutine，一旦有消息就发送给全部的在线User
func (this *Server) ListenMessage(){
	for{
		msg := <-this.Message

		// 将msg发送给全部在线的user
		this.mapLock.RLock()
		for _,cli := range this.OnlineMap{
			cli.C <- msg
		}
		this.mapLock.RUnlock()
	}
}
```

#### **用一个`goroutine` 单独监听Message**

```go
// 启动服务器的接口
func (this *Server) Start() {
	// socket listen
	listen, err := net.Listen("tcp", fmt.Sprintf("%s:%d", this.Ip, this.Port))
	if err!= nil {
		fmt.Println("listen error:",err)
		return
	}
	// close listen socket
	defer listen.Close()
	//启动监听Message的goroutine
	go this.ListenMessage()
	
	for{
		// accept
		conn, err := listen.Accept()
		if err!= nil {
			fmt.Println("accept error:",err)
			continue
		}
		// do hander
		go this.Hander(conn)
	}

}
```

<!-- tabs:end -->

## 用户消息广播机制

完善handle处理业务方法，启动一个针对当前客户端的读 `goroutine`

> `server.go`

```go
func (this *Server) Hander(conn net.Conn){
	// ...当前链接业务
	// fmt.Println("连接建立成功")

	user := NewUser(conn)
	// 用户上线了，将用户加入到onlineMap中
	this.mapLock.Lock()
	this.OnlineMap[user.Name] = user
	this.mapLock.Unlock()
	// 广播当前用户上线消息
	this.BroadCast(user,"已上线")

	// 接收客户端发送的消息
	go func(){
		buf := make([]byte, 4096)
		for{
			n, err := conn.Read(buf)
			if n == 0 {
				this.BroadCast(user,"已下线")
				return
			}
			if err != nil && err != io.EOF {
				fmt.Println("conn read error:", err)
				return
			}
			// 提取用户的消息，（去除 ‘\n’）
			msg := string(buf[:n-1])

			// 将得到的消息进行广播
			this.BroadCast(user, msg)
		}
	}()

	// 当前handle阻塞 
	select {}
}
```

## 用户业务封装

> `user.go`
>
> +  用户的上线
> + 用户的下线
> + 用户处理消息

```go
package main

import "net"

type User struct{
	Name string
	Addr string
	C chan string
	conn net.Conn
	
	server *Server
}

// 创建一个用户API
func NewUser(conn net.Conn, server *Server) *User{
	userAddr := conn.RemoteAddr().String()	

	user := &User{
		Name: userAddr,
		Addr: userAddr,
		C: make(chan string, 100),
		conn: conn,

		server: server,
	}
	// 启动监听当前user channel的方法，一旦有消息，就直接发送给客户端
	go user.ListenMessage()
	return user
}

// 用户的上线业务
func (this * User) Online(){
	// 用户上线了，将用户加入到onlineMap中
	this.server.mapLock.Lock()
	this.server.OnlineMap[this.Name] = this
	this.server.mapLock.Unlock()
	// 广播当前用户上线消息
	this.server.BroadCast(this,"已上线")
}

// 用户的下线业务
func (this * User) Offline(){
	// 用户下线了，将用户从onlineMap删除
	this.server.mapLock.Lock()
	delete(this.server.OnlineMap,this.Name)
	this.server.mapLock.Unlock()
	// 广播当前用户上线消息
	this.server.BroadCast(this,"已下线")
}

// 用户处理消息的业务
func (this * User) DoMessage(msg string){
	this.server.BroadCast(this,msg)
}

// 监听当前User channel的方法，一旦有消息，就直接发送给端客户端
func (this *User) ListenMessage(){
	for {
		msg := <-this.C
		this.conn.Write([]byte(msg + "\n"))
	}	
}
```

> `server.go`

```go
package main

import (
	"net"
	"fmt"
	"sync"
	"io"
)

type Server struct {
	Ip string
	Port int
	// 在线用户的列表
	OnlineMap map[string]*User
	mapLock sync.RWMutex
	
	// 消息广播的channel
	Message chan string
}

// 创建一个server接口
func NewServer(ip string, port int) *Server {
	server := &Server{
		Ip: ip,
		Port: port,
		OnlineMap: make(map[string]*User),
		Message: make(chan string),
	}
	return server
}

// 监听Message广播消息channel的goroutine，一旦有消息就发送给全部的在线User
func (this *Server) ListenMessage(){
	for{
		msg := <-this.Message

		// 将msg发送给全部在线的user
		this.mapLock.RLock()
		for _,cli := range this.OnlineMap{
			cli.C <- msg
		}
		this.mapLock.RUnlock()
	}
}

// 广播消息方法
func (this *Server) BroadCast(user *User, msg string){
	sendMsg := "[" + user.Addr + "]" + user.Name + ":" + msg
	this.Message <- sendMsg
}

func (this *Server) Hander(conn net.Conn){
	// ...当前链接业务
	// fmt.Println("连接建立成功")

	user := NewUser(conn,this)

	user.Offline()
	// // 用户上线了，将用户加入到onlineMap中
	// this.mapLock.Lock()
	// this.OnlineMap[user.Name] = user
	// this.mapLock.Unlock()
	// // 广播当前用户上线消息
	// this.BroadCast(user,"已上线")

	// 接收客户端发送的消息
	go func(){
		buf := make([]byte, 4096)
		for{
			n, err := conn.Read(buf)
			if n == 0 {
				// this.BroadCast(user,"已下线")
				user.Offline()
				return
			}
			if err != nil && err != io.EOF {
				fmt.Println("conn read error:", err)
				return
			}
			// 提取用户的消息，（去除 ‘\n’）
			msg := string(buf[:n-1])
			
			// 将得到的消息进行广播
			// this.BroadCast(user, msg)
			//用户针对msg进行消息处理
			user.DoMessage(msg)
		}
	}()

	// 当前handle阻塞 
	select {}
}

// 启动服务器的接口
func (this *Server) Start() {
	// socket listen
	listen, err := net.Listen("tcp", fmt.Sprintf("%s:%d", this.Ip, this.Port))
	if err!= nil {
		fmt.Println("listen error:",err)
		return
	}
	// close listen socket
	defer listen.Close()
	//启动监听Message的goroutine
	go this.ListenMessage()

	for{
		// accept
		conn, err := listen.Accept()
		if err!= nil {
			fmt.Println("accept error:",err)
			continue
		}
		// do hander
		go this.Hander(conn)
	}

}
```

## 在线用户查询

> `user.go`

```go
// 给当前user对应的客户端发送消息
func (this *User) SendMsg(msg string){
	this.conn.Write([]byte(msg))
}

// 用户处理消息的业务
func (this * User) DoMessage(msg string){
	if msg == "who" {
		// 查询在线用户有哪些
		this.server.mapLock.Lock()
		for _,user := range this.server.OnlineMap {
			onlineMsg :=  "[" + user.Addr + "]" + ":" + "在线...\n"
			this.SendMsg(onlineMsg)
		}
		this.server.mapLock.Unlock()
	}else{
		this.server.BroadCast(this,msg)
	}
}
```

## 修改用户名

> `user.go`

```go
// 用户处理消息的业务
func (this * User) DoMessage(msg string){
	if msg == "who" {
		// 查询在线用户有哪些
		this.server.mapLock.Lock()
		for _,user := range this.server.OnlineMap {
			onlineMsg :=  "[" + user.Addr + "]" + ":" + "在线...\n"
			this.SendMsg(onlineMsg)
		}
		this.server.mapLock.Unlock()
	} else if len(msg) > 7 && msg[:7] == "rename:" {
		// 消息格式：rename|张三
		newName := strings.Split(msg, "|")[1]
		// 判断name是否存在
		if _, ok := this.server.OnlineMap[newName]; ok {
			this.SendMsg("昵称已存在！")
		} else {
			this.server.mapLock.Lock()
			delete(this.server.OnlineMap, this.Name)
			this.server.OnlineMap[newName] = this
			this.server.mapLock.Unlock()
			this.Name = newName
			this.SendMsg("昵称修改成功！" + this.Name + "\n")
		}
	} else{
		this.server.BroadCast(this,msg)
	}
}
```

## 超时强踢

> `server.go`

```go
func (this *Server) Hander(conn net.Conn){
	// ...当前链接业务
	// fmt.Println("连接建立成功")

	user := NewUser(conn,this)

	user.Offline()
	// // 用户上线了，将用户加入到onlineMap中
	// this.mapLock.Lock()
	// this.OnlineMap[user.Name] = user
	// this.mapLock.Unlock()
	// // 广播当前用户上线消息
	// this.BroadCast(user,"已上线")

	// 监听用户是否活跃的channel
	isLive := make(chan bool)

	// 接收客户端发送的消息
	go func(){
		buf := make([]byte, 4096)
		for{
			n, err := conn.Read(buf)
			if n == 0 {
				// this.BroadCast(user,"已下线")
				user.Offline()
				return
			}
			if err != nil && err != io.EOF {
				fmt.Println("conn read error:", err)
				return
			}
			// 提取用户的消息，（去除 ‘\n’）
			msg := string(buf[:n-1])
			
			// 将得到的消息进行广播
			// this.BroadCast(user, msg)

			//用户针对msg进行消息处理
			user.DoMessage(msg)

			// 用户的任意消息，代表用户是一个活跃的
			isLive <- true
		}
	}()

	// 当前handle阻塞 
	for{
		select {
			case <- isLive:
				// 当前用户是或与的，应该重置定时器
				// 不做任何操作，为了激活select，更新定时器
			case <- time.After(time.Second * 10):
				// 已经超时
				// 将当前的User强制关闭
				user.SendMsg("你已经超时了，请重新登录")

				// 销毁用的资源
				close(user.C)

				// 关闭连接
				conn.Close()

				// 退出当前的Handleer
				return //runtime.Goexit()
		}
	}
}
```

## 私聊功能

> `user.go`

```go
// 用户处理消息的业务
func (this * User) DoMessage(msg string){
	……	
	}else if len(msg) > 4  && msg[:3] == "to" {
		// 消息格式：to|张三|消息内容

		// 1.获取对方的用户名
		remoteName := strings.Split(msg, "|")[1]
		if remoteName == ""{
			this.SendMsg("消息格式不正确，请使用 \" to|张三|你好啊\"格式。\n")
			return
		}
		// 2. 根据用户名得到对方的User对象
		remoteUser,ok := this.server.OnlineMap[remoteName]
		if !ok {
			this.SendMsg("该用户名不存在。\n")
			return
		}
		//3. 获取消息内容，通过对方的User对象将内容发送过去
		content := strings.Split(msg,"|")[2]
		if content == "" {
			this.SendMsg("消息内容不能为空。\n")
			return
		}
		remoteUser.SendMsg(this.Name + " 说：" + content)
	} else{
		this.server.BroadCast(this,msg)
	}
}
```

## 客户端实现

### 建立连接

> `client.go`

```go
package main

import (
	"net"
	"fmt"
)

type Client struct{
	ServerIp string
	ServerPort int
	Name string
	conn net.Conn
}

func NewClient(serverIp string, serverPort int) *Client{
	// 创建客户端对象
	client := &Client{
		ServerIp: serverIp,
		ServerPort: serverPort,
	}

	// 连接server
	conn, err := net.Dial("tcp", fmt.Sprintf("%s:%d", serverIp, serverPort))
	if err!= nil {
		fmt.Println("连接服务器失败",err)
		return nil
	}
	client.conn = conn
	// 返回对象
	return client
}

func main() {
	client := NewClient("127.0.0.1", 8080)
	if client == nil{
		fmt.Println("连接服务器失败")
		return
	}
	fmt.Println("连接服务器成功")

	// 启动客户端的业务
	select{}
}
```

### 解析命令行

> `client.go`

#### init 函数初始化命令行参数

```go
var serverIp string
var serverPort int

// ./client -ip 127.0.0.1
func init(){
	flag.StringVar(&serverIp, "ip", "127.0.0.1", "默认server ip 127.0.0.1")
	flag.IntVar(&serverPort, "port", 8080, "默认server port 8080")
}
```

####  main 函数解析命令行

```go
func main() {
	// 命令行解析
	flag.Parse()
	fmt.Println("ip:",serverIp)
	client := NewClient(serverIp, serverPort)
	if client == nil{
		fmt.Println("连接服务器失败")
		return
	}
	fmt.Println("连接服务器成功")

	// 启动客户端的业务
	select{}
}
```

### 菜单显示

+ Client新增flag属性

```go
type Client struct{
	ServerIp string
	ServerPort int
	Name string
	conn net.Conn
	flag int // 当前client的模式
}

func NewClient(serverIp string, serverPort int) *Client{
	// 创建客户端对象
	client := &Client{
		ServerIp: serverIp,
		ServerPort: serverPort,
		flag: 999,
	}
```

+ 新增menu() 方法，获取用户输入的模式

```go
func (client *Client) menu() bool{
	var flag int

	fmt.Println("1.公聊模式")
	fmt.Println("2.私聊模式")
	fmt.Println("3. 更新用户名")
	fmt.Println("0.退出")

	fmt.Scanln(&flag)
	if flag >= 0 && flag <= 3 {
		client.flag = flag
		return true
	}else{
		fmt.Println("输入错误，请重新输入")
		return false
	}
}
```

+ 新增Run() 主业务循环

```go
func(client *Client) Run(){
	for client.flag != 0{
		for client.menu() != true {
		}
		// 根据不同的模式处理不同的业务
		switch client.flag {
		case 1:
			// 公聊天模式
			fmt.Println("公聊天模式")
			break
		case 2:
			// 私聊模式
			fmt.Println("私聊模式")
			break
		case 3:
			// 群聊模式
			fmt.Println("群聊模式")
			break
		}
	}
}
```

+ main中调用clinet.Run()

```go
func main() {
	// 命令行解析
	flag.Parse()
	fmt.Println("ip:",serverIp)
	client := NewClient(serverIp, serverPort)
	if client == nil{
		fmt.Println("连接服务器失败")
		return
	}
	fmt.Println("连接服务器成功")

	// 启动客户端的业务
	client.Run()
}
```

### 更新用户名

> 新增`UpdateName（）` 更新用户名

```go
// 更新用户名
func (client *Client) UpdateName() bool {
	fmt.Println("请输入新的用户名")
	fmt.Scanln(&client.Name)

	sendMsg := "rename| " + client.Name + "\n"
	_,err := client.conn.Write([]byte(sendMsg))
	if err!= nil{
		fmt.Println("更新用户名失败")
		return false
	}
	return true
}
```

> 加入到Run业务分支中

```go
case 3:
    // 更新用户名
    client.UpdateName()
    break
```

> 添加处理server 回执消息方法，`DeslResponse（）`

```go
// 处理server回应的消息，直接现实标准输出即可
func (client *Client) DeslResponse() {
	// 永久阻塞监听  一旦有数据，就直接copy到stdout 标准输出上
	io.Copy(os.Stdout, client.conn)
	// 等价于下面的写法
	// for{
	// 	buf := make()
	// 	client.conn.Read(buf)
	// 	fmt.Println(buf)
	// }

}
```

> 开启一个go，去承载`DealResponse（）`流程

```go
// 单独卡其一个gorountine去处理server回执的消息
	go client.DeslResponse()
```

### 公聊模式

> 新增`PublicChat（）` 公聊业务

```go
func (client *Client) PublicChat() {
	// 提示用户输入消息
	var chatMsg string
	fmt.Println("请输入聊天内容，exit退出")
	fmt.Scanln(&chatMsg)
	for chatMsg!= "exit" {
		// 发送消息给服务器

		// 消息部位空则发送
		if len(chatMsg) != 0 {
			sendMsg := chatMsg + "\n"
			_, err := client.conn.Write([]byte(sendMsg))
			if err!= nil {
				fmt.Println("发送消息失败:",err)
				break
			}
		}
		chatMsg = ""
		fmt.Println("请输入聊天内容，exit退出")
		fmt.Scanln(&chatMsg)
	}
}
```

> 加入RUN分支

```go
case 1:
    // 公聊天模式
    fmt.Println("公聊天模式")
    client.PublicChat()
    break
```

### 私聊模式

> 1. 查询当前都有哪些用户在线
> 2. 提示用户用户选择一个用户进入私聊

+ 查询当前有哪些用户在线

```go
//查询当前都有哪些用户在线
func (client *Client) SelectUsers() {
	sendMsg := "who\n"
	_,err := client.conn.Write([]byte(sendMsg))
	if err!= nil {
		fmt.Println("查询用户失败",err)
		return
	}
}
```

+ 新增私聊模式业务

```go
// 私聊模式
func (client *Client) PrivateChat() {
	var remoteName string
	var chatMsg string
	client.SelectUsers()
	fmt.Println("请选择用户,exit退出")
	fmt.Scanln(&remoteName)
	for remoteName != "exit" {
		fmt.Println("请输入聊天内容，exit退出")
		fmt.Scanln(&chatMsg)
		for chatMsg != "exit" {
			// 消息部位空则发送
			if len(chatMsg) != 0{
				sendMsg := "to|" + remoteName + "|" + chatMsg + "\n\n"
				_,err := client.conn.Write([]byte(sendMsg))
				if err!= nil {
					fmt.Println("发送消息失败",err)
					break
				}
			}
			chatMsg = ""
			fmt.Println("请选择用户,exit退出")
			fmt.Scanln(&remoteName)
		}
		client.SelectUsers()
		fmt.Println("请选择用户,exit退出")
		fmt.Scanln(&remoteName)
	}
}
```

