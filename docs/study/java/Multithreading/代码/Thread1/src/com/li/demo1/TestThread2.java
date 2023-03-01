package com.li.demo1;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.net.URL;

//练习Thread, 实现多线程同步下载图片
public class TestThread2 extends Thread{
    private String url;  //网络图片地址
    private String name;  //保存的文件名

    public TestThread2(String url,String name){
        this.url = url;
        this.name = name;

    }

//下载图片线程的执行体
    @Override
    public void run() {
        WebDownLoader webDownLoader = new WebDownLoader();
        webDownLoader.downloader(url,name);
        System.out.println("下载了文件名为" + name);
    }

    public static void main(String[] args) {
        TestThread2 t1 = new TestThread2("https://img1.baidu.com/it/u=1734138103,3403884663&fm=253&fmt=auto?w=801&h=800","约克夏1.jpg");
        TestThread2 t2 = new TestThread2("https://img0.baidu.com/it/u=154291885,270874090&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500","约克夏2.jpg");
        TestThread2 t3 = new TestThread2("https://img1.baidu.com/it/u=1574610124,2792721127&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750","约克夏3.jpg");
        //先下载t1
        t1.start();
        //然后是t2
        t2.start();
        //最后是t3
        t3.start();
        //实际是无序的
    }
}

//下载器
class WebDownLoader{
    //下载方法
    public void downloader(String url,String name){
        try {
            FileUtils.copyURLToFile(new URL(url),new File(name));
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("IO异常，downloader方法出现问题");
        }
    }
}
