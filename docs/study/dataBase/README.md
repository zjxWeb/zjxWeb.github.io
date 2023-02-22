## **mysql**
### MySQL操作命令
#### 1、mysql服务的启动和停止（系统默认启动，通常不需要我们启动）
`net stop mysql`

`net start mysql`

#### 2、登录mysql
语法如下： 
+ `mysql -u用户名 -p用户密码`
  
+ `键入命令mysql -uroot -p`， 回车后提示你输入密码，输入`12345`，然后回车即可进入到mysql中了，mysql的提示符是：
`mysql>`

> 注意：如果是连接到另外的机器上，则需要加入一个参数-h机器IP

#### 3、增加新用户（通常我们用默认的root用户就可以了）

+ 格式：`grant 权限 on 数据库.* to 用户名@登录主机 identified by "密码"`
 + 如，增加一个用户user1密码为password1，让其可以在本机上登录， 并对所有数据库有查询、插入、修改、删除的权限。首先用以root用户连入mysql，然后键入以下命令：

`grant select,insert,update,delete on *.* to user1@localhost Identified by "password1";`


+ 如果希望该用户能够在任何机器上登陆mysql，则将localhost改为"%"。
+ 如果你不想user1有密码，可以再打一个命令将密码去掉。


`grant select,insert,update,delete on mydb.* to user1@localhost identified by "";`


#### 4、 操作数据库

+ 登录到mysql中，然后在mysql的提示符下运行下列命令，每个命令以分号结束。
  
##### 1、 显示数据库列表。

`show databases;`

+ 缺省有两个数据库：mysql和test。 mysql库存放着mysql的系统和用户权限信息，我们改密码和新增用户，实际上就是对这个库进行操作。
  
##### 2、 显示库中的数据表：

`use mysql;`

`show tables;`

##### 3、 显示数据表的结构：
`describe 表名;`
##### 4、 建库与删库：
`create database 库名;`

`drop database 库名;`
##### 5、 建表：
`use 库名;`

`create table 表名(字段列表);`

`drop table 表名;`
##### 6、 清空表中记录：
`delete from 表名;`
##### 7、 显示表中的记录：
`select * from 表名;`

#### 5、导出和导入数据（一般我们不用，有能力者研究）
+ 导出数据：
`mysqldump --opt test > mysql.test`

即将数据库test数据库导出到mysql.test文件，后者是一个文本文件

如：`mysqldump -u root -p123456 --databases dbname > mysql.dbname`
就是把数据库dbname导出到文件mysql.dbname中。
+  导入数据:
`mysqlimport -u root -p123456 < mysql.dbname。`
不用解释了吧。
+  将文本数据导入数据库:
+ 文本数据的字段数据之间用tab键隔开。
`use test;`

`load data local infile "文件名" into table 表名;`

# SQL server (oracle)语句练习案例

***！！！练习希望可以按顺序执行！！！***
1. ### 建表(一)：
	
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
2. ### 插入数据（一）：
	
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
3. ### 查询（一）：
	
	```
	/*select * from teacher;*/
	/*select * from teacher where dept='通信';*/
	/*select distinct dept from teacher;*/
	/*select count(*) from teacher;*/
	/*select count(distinct dept) from teacher;*/
	/*select * from teacher aa,teacher bb where aa.tno=bb.tno;*/
	```
4. ### 建表（二）：
	
	```
	create Table Course(
	Cno integer not null,
	Tno integer not null,
	Cname char(10) not null,
	credit numeric(3,1) not null,
	Primary key(cno,tno));
	```
5. ### 插入数据（二）：
	
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
6. ### 查询（二）：
	
	```
	select * 
	from teacher,course;
	
	select * 
	from teacher,course
	where teacher.tno=course.tno;
	```
7. ### 查询（三）：
	
	```
	//select cname from course ;
	//select distinct cname from course;
	select * from teacher;
	```
8. ### 更新数据：
	
	```
		//update teacher
		//set dept='通信工程'
		//where dept='通信';
	```
9. ### 删除数据：
	
	```
	//delete from teacher where dept='计算机';
	```
10. ### 查询（四）：
	
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
11. ### 查询（五）：
	
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
12. ### 查询（六）：
	
	```
	select Distinct Tno from course
	  where 2<=(select count(*) from Course aa
	                where aa.Tno=course.tno);
	
	//select count(*) from Course aa
	//                where Tno=102;
	//
	```
13. ### 新建视图：
	
	```
	create view v_t_c
	   as 
	      select Teacher.Tno,Tname,Title,Dept,Cno,Cname
	        from Teacher,course
	          where Teacher.Tno=course.Tno;
	```
14. ### 视图查询
	
	```
	Select * from v_t_c;
	
	Select * from v_t_c where Tno=101;
	```
15. ### 认识NUll：
	
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
16. ### 外键1：
	
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
17. ### 外键2：
	
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
18. ### 查询（七）：
	
	```
	select * from teacher;
	
	select title,count(*) from teacher group by title ;
	
	select title,count(*) from teacher group by title having count(*)>1;
	```
19. ### 触发器（建表）：
	
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
20. ### 触发器（测试）：
	
	```
	delete from teacher where tno=101; 
	select * from teacher;
	select * from course;
	```
21. ### 触发器2-oracle
	
	```
	create trigger trig_demo1
	after delete on teacher
	for each row
	begin
	  delete course
	     where course.tno=:old.tno;
	end;
	
	```
22. ### 触发器2-SQL Server 2000:
	
	```
	create trigger trig_demo1
	  on teacher
	   for delete
	as
	  delete course
	    from course,deleted
	        where course.tno=deleted.tno
	
	```
23. ### 触发器3(测试):
	
	```
	select * from teacher;
	select * from course; 
	update teacher
	  set tno=110
	where tno=103;
	select * from teacher;
	select * from course; 
	```
24. ### 触发器3-oracle:
	
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
25. ### 触发器3-SQL Server 2000
	
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
26. ### 事务(SQL Server 2000)
	
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
