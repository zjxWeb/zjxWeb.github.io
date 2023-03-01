package com.li.syn;

//不安全线程，买票
//线程不安全，有负数
public class UnsafeBuyTicket {
    public static void main(String[] args) {
        BuyTicket station = new BuyTicket();

        new Thread(station,"胡晓飞").start();
        new Thread(station,"马晓楠").start();
        new Thread(station,"张晓明").start();

    }

}

class BuyTicket implements Runnable{

    //票
    int ticketNums = 10;
    boolean flag =true; //外部停止方式
    @Override
    public void run() {
        //买票
        while(flag){
            buy();
        }

    }

    private synchronized void buy(){
        //判断是否有票
        if (ticketNums <= 0){
            return;
        }
        //模拟延时
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //买票
        System.out.println(Thread.currentThread().getName()+"拿到"+ticketNums--);

    }

}
