package com.li.demo02;

public class TestLambda2 {

    //静态类
    static class Love2 implements ILove{
        @Override
        public void love(int a) {
            System.out.println("i love you2 -->" + a);
        }
    }
    public static void main(String[] args) {
//局部内部类
        class Love3 implements ILove{
            @Override
            public void love(int a) {
                System.out.println("i love you2 -->" + a);
            }
        }
        //匿名内部类，借助接口
        ILove love = new ILove(){
            @Override
            public void love(int a) {
                System.out.println("i love you2 -->" + a);
            }
        };
        love.love(5);

        //lambda简化
        ILove love2 = (int a)->{
            System.out.println("i love you2 -->" + a);
        };
        love2.love(6);

        //lambda 再简化——简化数据类型
        ILove love3 = (a)->{
            System.out.println("i love you2 -->" + a);
        };
        love3.love(7);

        //lambda 再简化——简化括号
        ILove love4 = a->{
            System.out.println("i love you2 -->" + a);
        };
        love4.love(8);

        //lambda 再简化——简化花括号
        ILove love5 = a-> System.out.println("i love you2 -->" + a);

        love5.love(9);

        ILove love1 = new Love();
        love1.love(2);

        love = new Love2();
        love.love(3);

        love = new Love3();
        love .love(4);


    }
}

interface  ILove{
    void love(int a );
}

class Love implements ILove{
    @Override
    public void love(int a) {
        System.out.println("i love you1 -->" + a);
    }
}