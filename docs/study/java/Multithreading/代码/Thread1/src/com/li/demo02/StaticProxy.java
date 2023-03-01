package com.li.demo02;
//总结 ：静态代理模式中  真实对象和代理对象都要实现同一个接口
//代理对象要代理真实角色(You)


//好处：代理对象可以做很多真实对象做不了的事情
//真实对象专注做自己的事情
public class StaticProxy {
    public static void main(String[] args) {
        //new Thread(()-> System.out.println("我爱你")).start();
        //Thread代理了Runnable接口，线程中的start()就相当于下面的HappyMary()

        //new WeddingCompany(new You()).HappyMary();   //等于下面代码
        /*You you = new You();
        you.HappyMary();*/
        WeddingCompany weddingCompany = new WeddingCompany(new You());
        weddingCompany.HappyMary();

    }

}

interface Marry{
    void HappyMary();
}

//真实角色
class You implements Marry{
    @Override
    public void HappyMary() {
        System.out.println("秦老师要结婚，开心");
    }
}

//代理角色
class WeddingCompany implements Marry{
    //代理谁 --》》真实目标角色
    private Marry target;

    public WeddingCompany(Marry target){
        this.target = target;
    }
    @Override
    public void HappyMary() {
        before();
        this.target.HappyMary();  //这里是真实对象You
        after();

    }

    private void after() {
        System.out.println("结婚之后收尾款");
    }

    private void before() {
        System.out.println("结婚之前，布置现场");
    }
}
