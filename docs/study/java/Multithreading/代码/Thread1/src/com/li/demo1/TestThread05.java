package com.li.demo1;
//多个线程同时操作同一个对象
//买火车票例子

//发现问题：多个线程操作同一个对象资源情况下，线程不安全，数据紊乱
public class TestThread05 implements Runnable{
    //票数
    private int ticketNums = 10;

    @Override
    public void run() {
        while (true){

            if (ticketNums<=0){
                break;
            }
            //模拟延时
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println(Thread.currentThread().getName()+"拿到了第"+ ticketNums-- +"张票");
        }
    }

    public static void main(String[] args) {
        TestThread05 testThread05 = new TestThread05();
        new Thread(testThread05,"小米").start();
        new Thread(testThread05,"大周").start();
        new Thread(testThread05,"小刘").start();
    }
}
