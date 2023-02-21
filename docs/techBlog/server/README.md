#  

# (一)git的基本操作，大文件上传（码云和GitHub）和出现error处理

### git的基本操作

## 1. 建立仓库（码云和GitHub）

+ 可以在`码云`和`github`进行仓库的建立

## 2. 基本操作代码

+ git 的全局设置

  + ```
    git config --global user.name "用户名"
    git config --global user.email "邮箱"
    ```

+ 本地创建仓库，并执行以下的代码命令。

+ **记得安装git**

+ [git下载链接](https://git-scm.com/downloads)

  + ```
    mkdir digital-twins-all
    cd digital-twins-all
    git init 
    touch README.md
    git add README.md
    git commit -m "first commit"
    git remote add origin 你创建仓库的URL
    git push -u origin "master"
    ```

+ 如果已有仓库可以执行以下代码

  + ```
    cd existing_git_repo
    git remote add origin 你创建仓库的URL
    git push -u origin "master"
    ```

## 3. 大文件的上传

+ 安装 git lfs（一个仓库里面执行一次就好了）

  + `git lfs install`

+ 将需要上传的文件放置test3文件夹中，跟踪一下你要上传（push）的文件或指定文件类型（以指定文件model.h5为例）

  ```bash
  git lfs track "*.zip" 或者 git lfs track "serverYyz.zip"
  ```

+ 添加.gitattributes（配置文件，缺少它执行其他git操作可能会有问题，具体作用不详述）

  ```bash
  git add .gitattributes
  ```

+ 、添加要上传（push）的文件

  ```bash
  git add 文件名
  ```

+ error

  + ![请添加图片描述](./src/1.png)


  + `$ rm .git/hooks/pre-push `

  + `$ git push -u origin "master"`

+ **其余步骤同上**

## 4. ssh 配置

+ ## 生成密钥

  ```
  ssh-keygen -t rsa -C “email”
  ```

  + 输入之间按三下回车，直到出现image,就是虚线的方框,红色部分

  +![请添加图片描述](./src/2.png)

  + 可以使用下面的命令进行查看密钥：

    ```bash
    cat ~/.ssh/id_rsa.pub
    ```

    + 此处不做展示，自己查看即可

+ 下面就到码云或者github上配置，这里以gitee（码云）为例
![请添加图片描述](./src/3.png)
![请添加图片描述](./src/4.png)
![请添加图片描述](./src/5.png)

# (二)怎么访问云服务器上的图片

## 1. 准备工作

- 你需要在阿里云或者腾讯云购买云服务器。
- 配置宝塔面板。
- 安装Tomcat

## 2. 具体操作步骤

### 1. 安装好Tomcat

### 2. 在宝塔界面开启相应的端口，端口为 8080

### 3. ip+8080，访问一下，看是否出现如下图的界面，如果出现则成功。

- ![请添加图片描述](./src/6.png)


### 4. 进入Tomcat目录，打开配置文件：server.xml

```
# docBase: 要访问图片所在的路径
# path: 虚拟路径
<Context docBase="/home/class_program/upload" path="/upload" debug="0" reloadable="true" />
```

### 5. 用浏览器打开url（ip+8080:upload/图片名）

![请添加图片描述](./src/7.png)


### 使用场景

1. 可以利用这个做一个简单的云相册。
2. 处理头像上传的功能。

# (三) #1045 无法登录 MySQL 服务器

![在这里插入图片描述](./src/8.png)

1. 在本地无法连接服务器
2. phpMyAdmin无法登录
3. 修改root密码
![出现的问题](./src/9.png)
1.停止mysql数据库
`/etc/init.d/mysqld stop`
 （或者直接 kill -9 [PID]  杀进程！)

2.执行如下命令
`mysqld_safe --user=mysql --skip-grant-tables --skip-networking &`

3.使用root登录mysql数据库
`mysql -u root mysql`

4.更新root密码
`mysql>GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;`
`mysql> UPDATE user SET Password=PASSWORD('newpassword') where USER='root';`

最新版MySQL请采用如下SQL：
`mysql> UPDATE user SET authentication_string=PASSWORD('newpassword') where USER='root';`

5.刷新权限
`mysql> FLUSH PRIVILEGES;`

6.退出mysql
`mysql> quit`

7.重启mysql
`/etc/init.d/mysqld restart`

8.使用root用户重新登录mysql
`mysql -uroot -p
 Enter password: <输入新设的密码newpassword>`
 ![演示图片](./src/10.png)

# (四)code-server详细安装

## 首先， 我们应该有一个属于自己的服务器（阿里云学生优惠版即可）

## 安装步骤如下：

### 1. 下载包；

#### 方法一

`wget https://github.com/cdr/code-server/releases/download/3.4.1/code-server-3.4.1-linux-x86_64.tar.gz`

#### 方法二

使用FileZilla软件，将下好的包直接传到服务器上，具体步骤看视频：https://www.bilibili.com/video/BV1vt411P7zm/

![11](./src/11.png)


### 2. 查看压缩包

![查看所要用到的压缩包](./src/12.png)


### 3. 解压缩

##### 命 令：`tar -zxvf code-server-3.4.1-linux-x86_64.tar.gz`

### 4.查看解压之后文件

![查看解压之后文件](./src/13.png)

### 5. 切到code-server-3.4.1-linux-x86_64目录下

#### 命令： `cd code-server-3.4.1-linux-x86_64`

### 6. 运行命令

### 命令：`export PASSWORD="你的密码" && ./code-server --host 0.0.0.0 --port 8080`

### 成功登陆界面

![成功登陆界面](./src/14.png)

### 主界面

![主界面](./src/15.png)

# (五)SQL server (oracle)语句练习案例

***！！！练习希望可以按顺序执行！！！***
1. 建表(一)：
	```
	create table Teacher(
	Tno integer ,
	Tname char(6) ,
	Title char(6),
	Dept char(10));
	
	create table Teacher(
	Tno integer Primary Key,
	Tname char(6) not null,
	Title char(6),
	Dept char(10));
	```
2. 插入数据（一）：
	```
	insert into Teacher
	values
	(101,'李华','讲师','计算机');
	insert into Teacher
	values
	(102,'张丽','讲师','通信');
	insert into Teacher
	values
	(103,'刘力伟','助教','计算机');
	insert into Teacher(Tno,Tname,Dept)
	values
	(104,'李春生','计算机');
	insert into Teacher(Tno,Tname,Dept)
	values
	(105,'王华英','自动化');
	```
3. 查询（一）：
	```
	/*select * from teacher;*/
	/*select * from teacher where dept='通信';*/
	/*select distinct dept from teacher;*/
	/*select count(*) from teacher;*/
	/*select count(distinct dept) from teacher;*/
	/*select * from teacher aa,teacher bb where aa.tno=bb.tno;*/
	```
4. 建表（二）：
	```
	create Table Course(
	Cno integer not null,
	Tno integer not null,
	Cname char(10) not null,
	credit numeric(3,1) not null,
	Primary key(cno,tno));
	```
5. 插入数据（二）：
	```
	insert into Course
	values(1,101,'数据库',3.5);
	insert into Course
	values(1,103,'数据库',3.5);
	insert into Course
	values(2,102,'网络',3);
	insert into Course
	values(2,101,'网络',3);
	insert into Course
	values(3,103,'操作系统',3);
	```
6. 查询（二）：
	```
	select * 
	from teacher,course;
	
	select * 
	from teacher,course
	where teacher.tno=course.tno;
	```
7. 查询（三）：
	```
	//select cname from course ;
	//select distinct cname from course;
	select * from teacher;
	```
8. 更新数据：
	```
		//update teacher
		//set dept='通信工程'
		//where dept='通信';
	```
9. 删除数据：
	```
	//delete from teacher where dept='计算机';
	```
10. 查询（四）：
	```
	//select * from course where credit >3;
	
	//select * from course where credit between 2 and 3;
	
	//select * from teacher where dept in('计算机','自动化' ) ;
	
	//select * from teacher where dept not in('计算机') ;
	
	//select * from teacher where tname like '李%' ;
	
	//select * from teacher where title is null ;
	
	//select * from teacher order by tno desc ;
	
	//select * from teacher order by title ;
	
	//select count(*) from teacher;
	
	//select count(distinct cname) from course;
	
	select * from course aa, course bb
	where aa.tno=bb.tno;
	```
11. 查询（五）：
	```
	//select * from course
	//    where Tno in ( select Tno 
	//                    from Teacher
	//                     where Tname='李华');
	//
	//
	//select * from teacher,course
	//   where (teacher.tno=course.tno) and Tname='李华';
	//
	
	//select * from course
	//    where Tno in ( select Tno 
	//                    from Teacher
	//                     where Title='讲师');
	
	
	select * from teacher,course
	   where (teacher.tno=course.tno) and Title='讲师';
	
	```
12. 查询（六）：
	```
	select Distinct Tno from course
	  where 2<=(select count(*) from Course aa
	                where aa.Tno=course.tno);
	
	//select count(*) from Course aa
	//                where Tno=102;
	//
	```
13. 新建视图：
	```
	create view v_t_c
	   as 
	      select Teacher.Tno,Tname,Title,Dept,Cno,Cname
	        from Teacher,course
	          where Teacher.Tno=course.Tno;
	```
14. 视图查询
	```
	Select * from v_t_c;
	
	Select * from v_t_c where Tno=101;
	```
15. 认识NUll：
	```
	create table Teacher(
	Tno integer Primary Key,
	Tname char(6) not null,
	Title char(6),
	Dept char(10));
	
	insert into Teacher
	values
	(901,'李华','讲师','计算机');
	insert into Teacher
	values
	(902,'张丽','讲师','通信');
	insert into Teacher
	values
	(903,'刘力伟','助教','计算机');
	
	insert into Teacher
	values
	(904,'赵莺',null,'计算机');
	insert into Teacher
	values
	(905,'张大军',null,null);
	
	
	select * from teacher;
	
	Select * from teacher where title is null;
	
	select * from teacher where dept is not null;
	```
16. 外键1：
	```
	create table father_t
	(Cno integer primary key,
	 Cname char(10) not null,
	 Credit numeric(3,1) );
	
	insert into father_t
	values
	(1,'数据库',2);
	
	insert into father_t
	values
	(2,'网络',3);
	
	```
17. 外键2：
	```
	create table son_t
	(st_no integer primary key,
	 fk_cno integer,
	 grade integer,
	 foreign key(fk_cno)
	 references father_t(Cno));
	
	insert into son_t
	values
	(101,2,86);
	
	insert into son_t
	values
	(102,5,78);
	```
18. 查询（七）：
	```
	select * from teacher;
	
	select title,count(*) from teacher group by title ;
	
	select title,count(*) from teacher group by title having count(*)>1;
	```
19. 触发器（建表）：
	```
	create table Teacher(
	Tno integer Primary Key,
	Tname char(6) not null,
	Title char(6),
	Dept char(10));
	
	insert into Teacher
	values
	(101,'李华','讲师','计算机');
	insert into Teacher
	values
	(102,'张丽','讲师','通信');
	insert into Teacher
	values
	(103,'刘力伟','助教','计算机');
	insert into Teacher(Tno,Tname,Dept)
	values
	(104,'李春生','计算机');
	insert into Teacher(Tno,Tname,Dept)
	values
	(105,'王华英','自动化');
	
	
	create Table Course(
	Cno integer not null,
	Tno integer not null,
	Cname char(10) not null,
	credit numeric(3,1) not null,
	Primary key(cno,tno));
	
	insert into Course
	values(1,101,'数据库',3.5);
	insert into Course
	values(1,103,'数据库',3.5);
	insert into Course
	values(2,102,'网络',3);
	insert into Course
	values(2,101,'网络',3);
	insert into Course
	values(3,103,'操作系统',3);
	```
20. 触发器（测试）：
	```
	delete from teacher where tno=101; 
	select * from teacher;
	select * from course;
	```
21. 触发器2-oracle
	```
	create trigger trig_demo1
	after delete on teacher
	for each row
	begin
	  delete course
	     where course.tno=:old.tno;
	end;
	
	```
22. 触发器2-SQL Server 2000:
	```
	create trigger trig_demo1
	  on teacher
	   for delete
	as
	  delete course
	    from course,deleted
	        where course.tno=deleted.tno
	
	```
23. 触发器3(测试):
	```
	select * from teacher;
	select * from course; 
	update teacher
	  set tno=110
	where tno=103;
	select * from teacher;
	select * from course; 
	```
24. 触发器3-oracle:
	```
	create trigger trig_demo2
	   after update on teacher
	   for each row
	  
	   begin
	        update course
	        set course.Tno=:new.Tno
	     where course.Tno=:old.Tno;
	   end;
	
	```
25. 触发器3-SQL Server 2000
	```
	create trigger trig_demo2
	   on teacher
	   for update
	   as
	   if update(Tno)
	   begin
	      Declare @old_Tno integer,@new_Tno integer
	      select @old_Tno=Tno
	         from deleted;
	      select @new_Tno=Tno
	         from inserted;
	       update course
	        set course.Tno=@new_Tno
	     where course.Tno=@old_Tno;
	   end;
	
	```
26. 事务(SQL Server 2000)
	```
	begin transaction
	
	select * from teacher;
	
	update teacher
	  set title=null
	     where tno=101;
	
	select * from teacher;
	
	rollback;
	
	select * from teacher;
	```