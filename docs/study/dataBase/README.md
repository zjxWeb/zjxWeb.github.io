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
