package com.li.syn;

//不安全得取钱
//两个人去银行取钱，账户
public class UnsafeBank {
    public static void main(String[] args) {
        //账户
        Account account = new Account(1000,"结婚基金");
        Drawing you = new Drawing(account,50,"你");
        Drawing girlFriend = new Drawing(account,100,"对象");
        you.start();
        girlFriend.start();
    }

}

//账户
class Account {
    int money; //余额
    String name; //卡名

    public Account(int money,String name){
        this.money = money;
        this.name = name;
    }
}

//银行：模拟取款
class Drawing extends Thread{
    Account account; //账户
    //取了多少钱
    int drawingMoney;
    //现在手里有多少钱
    int nowMoney;

    public Drawing(Account account,int drawingMoney,String name){
        super(name);
        this.account = account;
        this.drawingMoney = drawingMoney;
        this.nowMoney = nowMoney;
    }

    //取钱
    //synchronized默认锁的是this本身，run（）这里不能锁
    @Override
    public  void run() {
        //锁的对象就是变化的量，需要增删改的对象
        synchronized (account){
            //判断有没有钱
            if (account.money - drawingMoney < 0 ){
                System.out.println(Thread.currentThread().getName()+"余额不足");
                return;
            }
            //sleep 可以放大问题的发生性
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }

            //卡内余额更新
            account.money = account.money-drawingMoney;

            //当前手里得钱
            nowMoney = nowMoney + drawingMoney;
            System.out.println(account.name + "余额为"+account.money);
            //Thread.currentThread().getName() = this.getName()
            System.out.println(this.getName() + "手里的钱" +nowMoney);

        }
        //判断有没有钱
        /*if (account.money - drawingMoney < 0 ){
            System.out.println(Thread.currentThread().getName()+"余额不足");
            return;
        }
        //sleep 可以放大问题的发生性
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        //卡内余额更新
        account.money = account.money-drawingMoney;

        //当前手里得钱
        nowMoney = nowMoney + drawingMoney;
        System.out.println(account.name + "余额为"+account.money);
        //Thread.currentThread().getName() = this.getName()
        System.out.println(this.getName() + "手里的钱" +nowMoney);*/
    }
}



