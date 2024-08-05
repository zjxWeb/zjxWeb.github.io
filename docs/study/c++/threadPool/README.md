# 线程池的实现

## 线程池的原理

+ 我们使用线程的时候就去创建一个线程，这样实现起来非常简便，但是就会有一个问题：如果并发的线程数量很多，并且每个线程都是执行一个时间很短的任务就结束了，这样频繁创建线程就会大大降低系统的效率，因为频繁创建线程和销毁线程需要时间。

+ 那么有没有一种办法使得线程可以复用，就是执行完一个任务，并不被销毁，而是可以继续执行其他的任务呢？

+ 线程池是一种多线程处理形式，处理过程中将任务添加到队列，然后在创建线程后自动启动这些任务。线程池线程都是后台线程。每个线程都使用默认的堆栈大小，以默认的优先级运行，并处于多线程单元中。如果某个线程在托管代码中空闲（如正在等待某个事件）,则线程池将插入另一个辅助线程来使所有处理器保持繁忙。如果所有线程池线程都始终保持繁忙，但队列中包含挂起的工作，则线程池将在一段时间后创建另一个辅助线程但线程的数目永远不会超过最大值。超过最大值的线程可以排队，但他们要等到其他线程完成后才启动。

+ 在各个编程语言的语种中都有线程池的概念，并且很多语言中直接提供了线程池，作为程序猿直接使用就可以了，下面给大家介绍一下线程池的实现原理：

+ 线程池的组成主要分为3个部分，这三部分配合工作就可以得到一个完整的线程池：

  1. `任务队列，存储需要处理的任务，由工作的线程来处理这些任务`
     + 通过线程池提供的API函数，将一个待处理的任务添加到任务队列，或者从任务队列中删除
     + 已处理的任务会被从任务队列中删除
     + 线程池的使用者，也就是调用线程池函数往任务队列中添加任务的线程就是生产者线程
  2. `工作的线程（任务队列任务的消费者） ，N个`
     + 线程池中维护了一定数量的工作线程, 他们的作用是是不停的读任务队列, 从里边取出任务并处理
     + 工作的线程相当于是任务队列的消费者角色，
     + 如果任务队列为空, 工作的线程将会被阻塞 (使用条件变量/信号量阻塞)
     + 如果阻塞之后有了新的任务, 由生产者将阻塞解除, 工作线程开始工作
  3. `管理者线程（不处理任务队列中的任务），1个`
     + 它的任务是周期性的对任务队列中的任务数量以及处于忙状态的工作线程个数进行检测
     + 当任务过多的时候, 可以适当的创建一些新的工作线程
     + 当任务过少的时候, 可以适当的销毁一些工作的线程

  ![1](./src/1.png)

## C语言实现——线程池

> threadpool.h

```cpp
#ifndef _THREADPOOL_H
#define _THREADPOOL_H

typedef struct ThreadPool ThreadPool;
// 创建线程池并初始化
ThreadPool *threadPoolCreate(int min, int max, int queueSize);

// 销毁线程池
int threadPoolDestroy(ThreadPool* pool);

// 给线程池添加任务
void threadPoolAdd(ThreadPool* pool, void(*func)(void*), void* arg);

// 获取线程池中工作的线程的个数
int threadPoolBusyNum(ThreadPool* pool);

// 获取线程池中活着的线程的个数
int threadPoolAliveNum(ThreadPool* pool);

//////////////////////
// 工作的线程(消费者线程)任务函数
void* worker(void* arg);
// 管理者线程任务函数
void* manager(void* arg);
// 单个线程退出
void threadExit(ThreadPool* pool);
#endif  // _THREADPOOL_H
```

> threadpool.c

```cpp
#include "threadpool.h"
#include<pthread.h>
#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>

const int NUMBER = 2;
// 任务结构体
typedef struct Task {
    void (*function)(void *arg); // 任务函数
    void *arg; // 参数
}Task;


// 线程池结构体
struct ThreadPool {
    // 任务队列
    Task *taskQ;
    int queueCapacity;// 队列容量
    int queueSize; // 队列中实际任务数
    int queueFront; // 队头  取数据
    int queueRear; // 队尾  放数据
    // 管理者线程
    pthread_t managerID; // 管理者线程ID
    // 工作者线程
    pthread_t *threadIDs; // 存放线程ID的数组
    // 线程范围
    int minNum; // 最小线程数
    int maxNum; // 最大线程数
    int busyNum;// 有多少工作的线程
    int liveNum;// 当前存活的线程
    int exitNum; // 要销毁的线程个数
    pthread_mutex_t mutexPool;// 锁整个线程池
    pthread_mutex_t mutexBusy; // 锁busyNum变量
    int shutdown; // 是不是要销毁线程池，销毁为1，不销毁为0
    // 条件变量
    pthread_cond_t notEmpty; // 任务队列是否为空
    pthread_cond_t notFull; // 任务队列是否满了
};

ThreadPool* threadPoolCreate(int min, int max, int queueSize)
{
    ThreadPool* pool = (ThreadPool*)malloc(sizeof(ThreadPool));
    do 
    {
        if (pool == NULL)
        {
            printf("malloc threadpool fail...\n");
            break;
        }

        pool->threadIDs = (pthread_t*)malloc(sizeof(pthread_t) * max);
        if (pool->threadIDs == NULL)
        {
            printf("malloc threadIDs fail...\n");
            break;
        }
        memset(pool->threadIDs, 0, sizeof(pthread_t) * max);
        pool->minNum = min;
        pool->maxNum = max;
        pool->busyNum = 0;
        pool->liveNum = min;    // 和最小个数相等
        pool->exitNum = 0;

        if (pthread_mutex_init(&pool->mutexPool, NULL) != 0 ||
            pthread_mutex_init(&pool->mutexBusy, NULL) != 0 ||
            pthread_cond_init(&pool->notEmpty, NULL) != 0 ||
            pthread_cond_init(&pool->notFull, NULL) != 0)
        {
            printf("mutex or condition init fail...\n");
            break;
        }

        // 任务队列
        pool->taskQ = (Task*)malloc(sizeof(Task) * queueSize);
        pool->queueCapacity = queueSize;
        pool->queueSize = 0;
        pool->queueFront = 0;
        pool->queueRear = 0;

        pool->shutdown = 0;

        // 创建线程
        pthread_create(&pool->managerID, NULL, manager, pool);
        for (int i = 0; i < min; ++i)
        {
            pthread_create(&pool->threadIDs[i], NULL, worker, pool);
        }
        return pool;
    } while (0);

    // 释放资源
    if (pool && pool->threadIDs) free(pool->threadIDs);
    if (pool && pool->taskQ) free(pool->taskQ);
    if (pool) free(pool);

    return NULL;
}

int threadPoolDestroy(ThreadPool* pool)
{
    if (pool == NULL)
    {
        return -1;
    }

    // 关闭线程池
    pool->shutdown = 1;
    // 阻塞回收管理者线程
    pthread_join(pool->managerID, NULL);
    // 唤醒阻塞的消费者线程
    for (int i = 0; i < pool->liveNum; ++i)
    {
        pthread_cond_signal(&pool->notEmpty);
    }
    // 释放堆内存
    if (pool->taskQ)
    {
        free(pool->taskQ);
    }
    if (pool->threadIDs)
    {
        free(pool->threadIDs);
    }

    pthread_mutex_destroy(&pool->mutexPool);
    pthread_mutex_destroy(&pool->mutexBusy);
    pthread_cond_destroy(&pool->notEmpty);
    pthread_cond_destroy(&pool->notFull);

    free(pool);
    pool = NULL;

    return 0;
}


void threadPoolAdd(ThreadPool* pool, void(*func)(void*), void* arg)
{
    pthread_mutex_lock(&pool->mutexPool);
    while (pool->queueSize == pool->queueCapacity && !pool->shutdown)
    {
        // 阻塞生产者线程
        pthread_cond_wait(&pool->notFull, &pool->mutexPool);
    }
    if (pool->shutdown)
    {
        pthread_mutex_unlock(&pool->mutexPool);
        return;
    }
    // 添加任务
    pool->taskQ[pool->queueRear].function = func;
    pool->taskQ[pool->queueRear].arg = arg;
    pool->queueRear = (pool->queueRear + 1) % pool->queueCapacity;
    pool->queueSize++;

    pthread_cond_signal(&pool->notEmpty);
    pthread_mutex_unlock(&pool->mutexPool);
}

int threadPoolBusyNum(ThreadPool* pool)
{
    pthread_mutex_lock(&pool->mutexBusy);
    int busyNum = pool->busyNum;
    pthread_mutex_unlock(&pool->mutexBusy);
    return busyNum;
}

int threadPoolAliveNum(ThreadPool* pool)
{
    pthread_mutex_lock(&pool->mutexPool);
    int aliveNum = pool->liveNum;
    pthread_mutex_unlock(&pool->mutexPool);
    return aliveNum;
}

void* worker(void* arg)
{
    ThreadPool* pool = (ThreadPool*)arg;

    while (1)
    {
        pthread_mutex_lock(&pool->mutexPool);
        // 当前任务队列是否为空
        while (pool->queueSize == 0 && !pool->shutdown)
        {
            // 阻塞工作线程
            pthread_cond_wait(&pool->notEmpty, &pool->mutexPool);

            // 判断是不是要销毁线程
            if (pool->exitNum > 0)
            {
                pool->exitNum--;
                if (pool->liveNum > pool->minNum)
                {
                    pool->liveNum--;
                    pthread_mutex_unlock(&pool->mutexPool);
                    threadExit(pool);
                }
            }
        }

        // 判断线程池是否被关闭了
        if (pool->shutdown)
        {
            pthread_mutex_unlock(&pool->mutexPool);
            threadExit(pool);
        }

        // 从任务队列中取出一个任务
        Task task;
        task.function = pool->taskQ[pool->queueFront].function;
        task.arg = pool->taskQ[pool->queueFront].arg;
        // 移动头结点
        pool->queueFront = (pool->queueFront + 1) % pool->queueCapacity;
        pool->queueSize--;
        // 解锁
        pthread_cond_signal(&pool->notFull);
        pthread_mutex_unlock(&pool->mutexPool);

        printf("thread %ld start working...\n", pthread_self());
        pthread_mutex_lock(&pool->mutexBusy);
        pool->busyNum++;
        pthread_mutex_unlock(&pool->mutexBusy);
        task.function(task.arg);
        free(task.arg);
        task.arg = NULL;

        printf("thread %ld end working...\n", pthread_self());
        pthread_mutex_lock(&pool->mutexBusy);
        pool->busyNum--;
        pthread_mutex_unlock(&pool->mutexBusy);
    }
    return NULL;
}

void* manager(void* arg)
{
    ThreadPool* pool = (ThreadPool*)arg;
    while (!pool->shutdown)
    {
        // 每隔3s检测一次
        sleep(3);

        // 取出线程池中任务的数量和当前线程的数量
        pthread_mutex_lock(&pool->mutexPool);
        int queueSize = pool->queueSize;
        int liveNum = pool->liveNum;
        pthread_mutex_unlock(&pool->mutexPool);

        // 取出忙的线程的数量
        pthread_mutex_lock(&pool->mutexBusy);
        int busyNum = pool->busyNum;
        pthread_mutex_unlock(&pool->mutexBusy);

        // 添加线程
        // 任务的个数>存活的线程个数 && 存活的线程数<最大线程数
        if (queueSize > liveNum && liveNum < pool->maxNum)
        {
            pthread_mutex_lock(&pool->mutexPool);
            int counter = 0;
            for (int i = 0; i < pool->maxNum && counter < NUMBER
                && pool->liveNum < pool->maxNum; ++i)
            {
                if (pool->threadIDs[i] == 0)
                {
                    pthread_create(&pool->threadIDs[i], NULL, worker, pool);
                    counter++;
                    pool->liveNum++;
                }
            }
            pthread_mutex_unlock(&pool->mutexPool);
        }
        // 销毁线程
        // 忙的线程*2 < 存活的线程数 && 存活的线程>最小线程数
        if (busyNum * 2 < liveNum && liveNum > pool->minNum)
        {
            pthread_mutex_lock(&pool->mutexPool);
            pool->exitNum = NUMBER;
            pthread_mutex_unlock(&pool->mutexPool);
            // 让工作的线程自杀
            for (int i = 0; i < NUMBER; ++i)
            {
                pthread_cond_signal(&pool->notEmpty);
            }
        }
    }
    return NULL;
}

void threadExit(ThreadPool* pool)
{
    pthread_t tid = pthread_self();
    for (int i = 0; i < pool->maxNum; ++i)
    {
        if (pool->threadIDs[i] == tid)
        {
            pool->threadIDs[i] = 0;
            printf("threadExit() called, %ld exiting...\n", tid);
            break;
        }
    }
    pthread_exit(NULL);
}
```

> main.c 测试

```cpp
#include "threadpool.h"
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <pthread.h>


void taskFunc(void* arg)
{
    int num = *(int*)arg;
    printf("thread %ld is working, number = %d\n",
        pthread_self(), num);
    sleep(1);
}

int main()
{
    // 创建线程池
    ThreadPool* pool = threadPoolCreate(3, 10, 100);
    for (int i = 0; i < 100; ++i)
    {
        int* num = (int*)malloc(sizeof(int));
        *num = i + 100;
        threadPoolAdd(pool, taskFunc, num);
    }

    sleep(30);

    threadPoolDestroy(pool);
    return 0;
}
```

## socket 通信——线程池

> server.c

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<unistd.h>
#include<arpa/inet.h>
// 多线程
#include<pthread.h>
#include "threadpool.h"

// 信息结构体
struct SockInfo
{
    struct sockaddr_in cliaddr;
    int fd;
};

typedef struct PoolInfo
{
    ThreadPool* p;
    int fd;
}PoolInfo;
// struct SockInfo infos[512];

void working(void *arg);
void acceptConn(void* arg);

int main(){
    // 1. 创建监听的套接字
    int fd = socket(AF_INET, SOCK_STREAM, 0);
    if(fd == -1){
        perror("socket");
        return -1;
    }
    // 2. 绑定
    struct sockaddr_in saddr;
    saddr.sin_family = AF_INET;
    saddr.sin_port = htons(9999);
    saddr.sin_addr.s_addr = INADDR_ANY; // 0 = 0.0.0.0
    int ret = bind(fd, (struct sockaddr*)&saddr, sizeof(saddr));
    if( ret == -1){
        perror("bind");
        return -1;
    }
    // 3. 监听
    ret = listen(fd, 128);
    if(ret == -1){
        perror("listen");
        return -1;
    }

    // 初始化结构体数组
    // int max = sizeof(infos)/sizeof(infos[0]);
    // for(int i = 0; i < max; i++){
    //     bzero(&infos[i], sizeof(infos[i]));
    //     infos[i].fd = -1;// 空闲
    // }

    // 创建线程池
    ThreadPool* pool = threadPoolCreate(3, 8, 100);
    PoolInfo* info =  (PoolInfo*)malloc(sizeof(PoolInfo));
    info->fd = fd;
    info->p = pool;
    threadPoolAdd(pool, acceptConn, info);

    pthread_exit(NULL);
    return 0;
}
void acceptConn(void* arg){
    PoolInfo* poolInfo = (PoolInfo*)arg;
    // 4. 阻塞等待客户端的连接（主线程）
    // struct sockaddr_in cliaddr;
    int addelen = sizeof(struct sockaddr_in);
    while(1){
        struct SockInfo* pinfo;
        // for(int i = 0; i < max; i++){
        //     if(infos[i].fd == -1){
        //         pinfo = &infos[i];
        //         break;
        //     }
        // }
        pinfo = (struct SockInfo*)malloc(sizeof(struct SockInfo));
        // int cfd = accept(fd, (struct sockaddr*)&pinfo->cliaddr, &addelen);
        pinfo->fd = accept(poolInfo->fd, (struct sockaddr*)&pinfo->cliaddr, &addelen);
        // pinfo->fd = cfd;

        if(pinfo->fd == -1){
            perror("accept");
            break;
        }
        // 创建子线程
        // pthread_t tid;
        // pthread_create(&tid, NULL, working, pinfo);
        // pthread_detach(tid);//join是阻塞函数，主线程回收资源

        // 添加通信任务
        threadPoolAdd(poolInfo->p, working, pinfo);
    }
    close(poolInfo->fd);
}
void working(void* arg)
{
    struct SockInfo* pinfo = (struct SockInfo*)arg;
    // 连接成功，打印客户端的IP和端口信息
    char ip[32];
    printf("客户端的IP地址是：%s, 端口是：%d\n", inet_ntop(AF_INET, &pinfo->cliaddr.sin_addr.s_addr, ip, sizeof(ip)), ntohs(pinfo->cliaddr.sin_port));
    // 5. 通信（子线程）
    while(1){
        char recvbuf[1024];
        int len = recv(pinfo->fd, recvbuf, sizeof(recvbuf), 0);
        if(len > 0 ){
            printf("客户端说：%s\n", recvbuf);
            send(pinfo->fd, recvbuf, len, 0);
        }
        else if(len == 0){
            printf("客户端断开连接\n");
            break;
        }
        else{
            perror("recv");
            break;
        }
    }

    // 关闭文件描述符
    close(pinfo->fd);
    // pinfo->fd = -1;

    // return NULL;
}
```

> client.c

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<unistd.h>
#include<arpa/inet.h>

int main(){
    // 1. 创建通信的套接字
    int fd = socket(AF_INET, SOCK_STREAM, 0);
    if(fd == -1){
        perror("socket");
        return -1;
    }
    // 2. 绑定
    struct sockaddr_in saddr;
    saddr.sin_family = AF_INET;
    saddr.sin_port = htons(9999);
    //saddr.sin_addr.s_addr = INADDR_ANY; // 0 = 0.0.0.0
    // 转大端
    inet_pton(AF_INET,"127.0.0.1",&saddr.sin_addr.s_addr);
    int ret = connect(fd, (struct sockaddr*)&saddr, sizeof(saddr));
    if( ret == -1){
        perror("connect");
        return -1;
    }

    int number = 0;
    // 3. 通信
    while(1){
        char recvbuf[1024];
        sprintf(recvbuf, "hello, I am client %d", number++);
        send(fd,recvbuf, strlen(recvbuf)+1, 0);

         // 清空缓存区，将接收到的数据存到buff
        memset(recvbuf, 0, sizeof(recvbuf));
        
        // 接收
        int len = recv(fd, recvbuf, sizeof(recvbuf), 0);
       
        if(len > 0 ){
            printf("server say%s\n", recvbuf);
        }
        else if(len == 0){ // 服务端断开连接
            printf("服务器断开连接\n");
            break;
        }
        else{
            perror("recv");
            break;
        }
        sleep(1);
    }

    // g关闭
    close(fd);
    return 0;
}
```

> threadpool.c 和 threadpool.h 参考上述线城市c语言实现版本

## C++ 实现线程池

> TaskQueue.h

```cpp
#pragma once
#include <queue>
#include <pthread.h>

// 定义任务结构体
using callback = void(*)(void*);

template <typename T>
struct Task
{
    Task()
    {
        function = nullptr;
        arg = nullptr;
    }
    Task(callback f, void* arg)
    {
        function = f;
        this->arg = (T*)arg;
    }
    callback function;
    T* arg;
};

template <typename T>
// 任务队列
class TaskQueue
{
public:
    TaskQueue();
    ~TaskQueue();

    // 添加任务
    void addTask(Task<T>& task);
    void addTask(callback func, void* arg);

    // 取出一个任务
    Task<T> takeTask();

    // 获取当前队列中任务个数
    inline int taskNumber()
    {
        return m_queue.size();
    }

private:
    pthread_mutex_t m_mutex;    // 互斥锁
    std::queue<Task<T>> m_queue;   // 任务队列
};
```

> TaskQueue.cpp

```cpp
#include "TaskQueue.h"

template <typename T>
TaskQueue<T>::TaskQueue()
{
    pthread_mutex_init(&m_mutex, NULL);
}
template <typename T>
TaskQueue<T>::~TaskQueue()
{
    pthread_mutex_destroy(&m_mutex);
}
template <typename T>
void TaskQueue<T>::addTask(Task<T>& task)
{
    pthread_mutex_lock(&m_mutex);
    m_queue.push(task);
    pthread_mutex_unlock(&m_mutex);
}
template <typename T>
void TaskQueue<T>::addTask(callback func, void* arg)
{
    pthread_mutex_lock(&m_mutex);
    // Task task;
    // task.function = func;
    // task.arg = arg;
    // m_queue.push(task);
    m_queue.push(Task<T>(func, arg));
    pthread_mutex_unlock(&m_mutex);
}
template <typename T>
Task<T> TaskQueue<T>::takeTask()
{
    Task<T> t;
    pthread_mutex_lock(&m_mutex);
    if (m_queue.size() > 0)
    {
        t = m_queue.front();
        m_queue.pop();
    }
    pthread_mutex_unlock(&m_mutex);
    return t;
}
```

> ThreadPool.h

```cpp
#pragma once
#include <pthread.h>
#include "TaskQueue.h"
#include "TaskQueue.cpp"

template <typename T>
class ThreadPool
{
public:
    ThreadPool(int min, int max);
    ~ThreadPool();

    // 添加任务
    void addTask(Task<T> task);
    // 获取忙线程的个数
    int getBusyNumber();
    // 获取活着的线程个数
    int getAliveNumber();

private:
    // 工作的线程的任务函数
    static void* worker(void* arg);
    // 管理者线程的任务函数
    static void* manager(void* arg);
    void threadExit();

private:
    pthread_mutex_t m_lock;
    pthread_cond_t m_notEmpty;
    pthread_t* m_threadIDs;
    pthread_t m_managerID;
    TaskQueue<T>* m_taskQ;
    int m_minNum;
    int m_maxNum;
    int m_busyNum;
    int m_aliveNum;
    int m_exitNum;
    bool m_shutdown = false;
};
```

> ThreadPool.cpp

```cpp
#include "ThreadPool.h"
#include <iostream>
#include <unistd.h>
#include <string.h>
using namespace std;

template <typename T>
ThreadPool<T>::ThreadPool(int minNum, int maxNum)
{
    // 实例化任务队列
    m_taskQ = new TaskQueue<T>;
    do {
        // 初始化线程池
        m_minNum = minNum;
        m_maxNum = maxNum;
        m_busyNum = 0;
        m_aliveNum = minNum;

        // 根据线程的最大上限给线程数组分配内存
        m_threadIDs = new pthread_t[maxNum];
        if (m_threadIDs == nullptr)
        {
            cout << "malloc thread_t[] 失败...." << endl;;
            break;
        }
        // 初始化
        memset(m_threadIDs, 0, sizeof(pthread_t) * maxNum);
        // 初始化互斥锁,条件变量
        if (pthread_mutex_init(&m_lock, NULL) != 0 ||
            pthread_cond_init(&m_notEmpty, NULL) != 0)
        {
            cout << "init mutex or condition fail..." << endl;
            break;
        }

        /////////////////// 创建线程 //////////////////
        // 根据最小线程个数, 创建线程
        for (int i = 0; i < minNum; ++i)
        {
            pthread_create(&m_threadIDs[i], NULL, worker, this);
            cout << "创建子线程, ID: " << to_string(m_threadIDs[i]) << endl;
        }
        // 创建管理者线程, 1个
        pthread_create(&m_managerID, NULL, manager, this);
    } while (0);
}

template <typename T>
ThreadPool<T>::~ThreadPool()
{
    m_shutdown = 1;
    // 销毁管理者线程
    pthread_join(m_managerID, NULL);
    // 唤醒所有消费者线程
    for (int i = 0; i < m_aliveNum; ++i)
    {
        pthread_cond_signal(&m_notEmpty);
    }

    if (m_taskQ) delete m_taskQ;
    if (m_threadIDs) delete[]m_threadIDs;
    pthread_mutex_destroy(&m_lock);
    pthread_cond_destroy(&m_notEmpty);
}

template <typename T>
void ThreadPool<T>::addTask(Task<T> task)
{
    if (m_shutdown)
    {
        return;
    }
    // 添加任务，不需要加锁，任务队列中有锁
    m_taskQ->addTask(task);
    // 唤醒工作的线程
    pthread_cond_signal(&m_notEmpty);
}

template <typename T>
int ThreadPool<T>::getAliveNumber()
{
    int threadNum = 0;
    pthread_mutex_lock(&m_lock);
    threadNum = m_aliveNum;
    pthread_mutex_unlock(&m_lock);
    return threadNum;
}

template <typename T>
int ThreadPool<T>::getBusyNumber()
{
    int busyNum = 0;
    pthread_mutex_lock(&m_lock);
    busyNum = m_busyNum;
    pthread_mutex_unlock(&m_lock);
    return busyNum;
}


// 工作线程任务函数
template <typename T>
void* ThreadPool<T>::worker(void* arg)
{
    ThreadPool* pool = static_cast<ThreadPool*>(arg);
    // 一直不停的工作
    while (true)
    {
        // 访问任务队列(共享资源)加锁
        pthread_mutex_lock(&pool->m_lock);
        // 判断任务队列是否为空, 如果为空工作线程阻塞
        while (pool->m_taskQ->taskNumber() == 0 && !pool->m_shutdown)
        {
            cout << "thread " << to_string(pthread_self()) << " waiting..." << endl;
            // 阻塞线程
            pthread_cond_wait(&pool->m_notEmpty, &pool->m_lock);

            // 解除阻塞之后, 判断是否要销毁线程
            if (pool->m_exitNum > 0)
            {
                pool->m_exitNum--;
                if (pool->m_aliveNum > pool->m_minNum)
                {
                    pool->m_aliveNum--;
                    pthread_mutex_unlock(&pool->m_lock);
                    pool->threadExit();
                }
            }
        }
        // 判断线程池是否被关闭了
        if (pool->m_shutdown)
        {
            pthread_mutex_unlock(&pool->m_lock);
            pool->threadExit();
        }

        // 从任务队列中取出一个任务
        Task<T> task = pool->m_taskQ->takeTask();
        // 工作的线程+1
        pool->m_busyNum++;
        // 线程池解锁
        pthread_mutex_unlock(&pool->m_lock);
        // 执行任务
        cout << "thread " << to_string(pthread_self()) << " start working..." << endl;
        task.function(task.arg);
        delete task.arg;
        task.arg = nullptr;

        // 任务处理结束
        cout << "thread " << to_string(pthread_self()) << " end working...";
        pthread_mutex_lock(&pool->m_lock);
        pool->m_busyNum--;
        pthread_mutex_unlock(&pool->m_lock);
    }

    return nullptr;
}


// 管理者线程任务函数
template <typename T>
void* ThreadPool<T>::manager(void* arg)
{
    ThreadPool* pool = static_cast<ThreadPool*>(arg);
    // 如果线程池没有关闭, 就一直检测
    while (!pool->m_shutdown)
    {
        // 每隔5s检测一次
        sleep(5);
        // 取出线程池中的任务数和线程数量
        //  取出工作的线程池数量
        pthread_mutex_lock(&pool->m_lock);
        int queueSize = pool->m_taskQ->taskNumber();
        int liveNum = pool->m_aliveNum;
        int busyNum = pool->m_busyNum;
        pthread_mutex_unlock(&pool->m_lock);

        // 创建线程
        const int NUMBER = 2;
        // 当前任务个数>存活的线程数 && 存活的线程数<最大线程个数
        if (queueSize > liveNum && liveNum < pool->m_maxNum)
        {
            // 线程池加锁
            pthread_mutex_lock(&pool->m_lock);
            int num = 0;
            for (int i = 0; i < pool->m_maxNum && num < NUMBER
                && pool->m_aliveNum < pool->m_maxNum; ++i)
            {
                if (pool->m_threadIDs[i] == 0)
                {
                    pthread_create(&pool->m_threadIDs[i], NULL, worker, pool);
                    num++;
                    pool->m_aliveNum++;
                }
            }
            pthread_mutex_unlock(&pool->m_lock);
        }

        // 销毁多余的线程
        // 忙线程*2 < 存活的线程数目 && 存活的线程数 > 最小线程数量
        if (busyNum * 2 < liveNum && liveNum > pool->m_minNum)
        {
            pthread_mutex_lock(&pool->m_lock);
            pool->m_exitNum = NUMBER;
            pthread_mutex_unlock(&pool->m_lock);
            for (int i = 0; i < NUMBER; ++i)
            {
                pthread_cond_signal(&pool->m_notEmpty);
            }
        }
    }
    return nullptr;
}

// 线程退出
template <typename T>
void ThreadPool<T>::threadExit()
{
    pthread_t tid = pthread_self();
    for (int i = 0; i < m_maxNum; ++i)
    {
        if (m_threadIDs[i] == tid)
        {
            cout << "threadExit() function: thread " 
                << to_string(pthread_self()) << " exiting..." << endl;
            m_threadIDs[i] = 0;
            break;
        }
    }
    pthread_exit(NULL);
}
```

> main.cpp

```cpp
#include "ThreadPool.h"
#include "ThreadPool.cpp"
#include <unistd.h>
#include <stdio.h>
void taskFunc(void* arg)
{
    int num = *(int*)arg;
    printf("thread %ld is working, number = %d\n",
        pthread_self(), num);
    sleep(1);
}

int main()
{
    // 创建线程池
    ThreadPool<int> pool(3,10);
    for (int i = 0; i < 100; ++i)
    {
        int* num = new int(i+100);
        pool.addTask(Task<int>(taskFunc, num));
    }

    sleep(20);
    return 0;
}
```

```shell
 g++ main.cpp ThreadPool.cpp TaskQueue.cpp -o app
```

