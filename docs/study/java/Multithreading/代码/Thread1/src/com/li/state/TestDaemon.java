package com.li.state;
//测试守护线程
public class TestDaemon {
    public static void main(String[] args) {
        God god =new God();
        You you = new You();
        Thread thread = new Thread(god);
        thread.setDaemon(true);  //默认是false表示是用户线程，正常的线程都是用户线程

        thread.start(); //守护线程启动

        Thread thread1 = new Thread(you);  //用户线程启动
        thread1.start();
    }

}


//守护线程
class God implements Runnable{
    @Override
    public void run() {
        System.out.println("God bless you!");
    }
}

//用户线程
class You implements Runnable{
    @Override
    public void run() {
        for (int i = 0; i < 365; i++) {
            System.out.println("用户线程");
        }
        System.out.println("=====goodbye! world!=========");
    }
}
