package com.li.demo1;

public class TestThread04 implements Runnable{
    private String url;
    private String name;

    public TestThread04(String url,String name){
        this.url = url;
        this.name = name;
    }
    @Override
    public void run() {
        WebDownLoader webDownLoader = new WebDownLoader();
        webDownLoader.downloader(url,name);
        System.out.println("下载了文件名为" + name);
    }

    public static void main(String[] args) {
        TestThread04 t1 = new TestThread04("https://img1.baidu.com/it/u=1734138103,3403884663&fm=253&fmt=auto?w=801&h=800","约克夏1.jpg");
        TestThread04 t2 = new TestThread04("https://img0.baidu.com/it/u=154291885,270874090&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500","约克夏2.jpg");
        TestThread04 t3 = new TestThread04("https://img1.baidu.com/it/u=1574610124,2792721127&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750","约克夏3.jpg");

        new Thread(t1).start();
        new Thread(t2).start();
        new Thread(t3).start();


    }
}
