package com.li.demo02;

import com.li.demo1.TestThread2;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.concurrent.*;

//线程创建方式三：实现Callable接口
public class TestCallable implements Callable<Boolean> {
    private String url;  //网络图片地址
    private String name;  //保存的文件名

    public TestCallable(String url, String name) {
        this.url = url;
        this.name = name;

    }

    //下载图片线程的执行体
    @Override
    public Boolean call() {
        WebDownLoader webDownLoader = new WebDownLoader();
        webDownLoader.downloader(url, name);
        System.out.println("下载了文件名为" + name);
        return true;
    }

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        TestCallable t1 = new TestCallable("https://img1.baidu.com/it/u=1734138103,3403884663&fm=253&fmt=auto?w=801&h=800", "约克夏1.jpg");
        TestCallable t2 = new TestCallable("https://img0.baidu.com/it/u=154291885,270874090&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500", "约克夏2.jpg");
        TestCallable t3 = new TestCallable("https://img1.baidu.com/it/u=1574610124,2792721127&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750", "约克夏3.jpg");

        //创建执行服务
        ExecutorService ser = Executors.newFixedThreadPool(3);
        //提交执行
        Future<Boolean> R1 = ser.submit(t1);
        Future<Boolean> R2 = ser.submit(t2);
        Future<Boolean> R3 = ser.submit(t3);

        //获取结果
        boolean rs1 = R1.get();
        boolean rs2 = R2.get();
        boolean rs3 = R3.get();
        System.out.println(rs1);
        System.out.println(rs2);
        System.out.println(rs3);

        //关闭服务
        ser.shutdownNow();
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
