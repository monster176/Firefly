---
title: "IO多路复用"
published: 2025-11-11
tags: ["网络", "操作系统"]
image: /assets/images/yatuoli.jpg
cover: "/assets/images/cover.webp"
category: '网络'
description: "关于 IO 多路复用的学习笔记"
draft: false
---

IO多路复用

1> 引入目的

当主机没有操作系统时，或者说程序不能使用多进程或多线程完成任务的并发操作时，
我们可以引入IO多路复用的技术，完成多任务并发执行的操作

2> 事件和函数的关系

     比如，scanf是一个阻塞函数，该函数完成的是输入事件
     当函数先于事件发生时，函数会阻塞等待事件的到来
     当函数后于事件发生时，函数就不会阻塞，直接执行

#include <myhead.h>
int main(int argc, const char *argv[])
{
    int num = 0;
    cin >> num;
    cout << num << endl;
    cin >> num;
    cout << num << endl;
    return 0;
}

从上述例子中的第二个输入可以看出，如果事件先于函数发生，当程序再执行到函数时，函数会直接运
行，不会阻塞了

通过一个阻塞函数实现多个阻塞事件

3> IO多路复用原理图

4> IO多路复用相关函数

select、poll

5> select函数：

如果man手册中没有select函数，执行指令 sudo yum install man-pages(Cent OS)

  #include <sys/select.h>
  int select(int nfds, fd_set *readfds, fd_set *writefds,fd_set *exceptfds, 
struct timeval *timeout);

功能：阻塞等待文件描述符集合中是否有事件产生，如果有事件产生，则解除阻塞
参数1：文件描述符集合中，最大的文件描述符 加1
参数2、参数3、参数4：分别表示读集合、写集合、异常处理集合的起始地址
                        由于对于写操作而言，我们也可以转换读操作，所以，只需要使用一个集合就行
                        对于不使用的集合而言，直接填NULL即可
参数5：超时时间，如果填NULL表示永久等待，如果想要设置时间，需要定义一个如下结构体类型的变量，并将地址传递进去

struct timeval {
               long    tv_sec;         /* 秒数 */
               long    tv_usec;        /* 微秒 */
           };
       and
           struct timespec {
               long    tv_sec;         /* 秒数 */
               long    tv_nsec;        /* 纳秒 */
           };

返回值：
            >0:成功返回解除本次阻塞的文件描述符的个数
            =0:表示设置的超时时间，时间已经到达，但是没有事件事件产生
            =-1：表示失败，置位错误码
        注意：当该函数解除阻塞时，文件描述符集合中，就只剩下本次触发事件的文件描述符，其余的文
件描述符就被删除了

//专门针对于文件描述符集合提供的函数
       void FD_CLR(int fd, fd_set *set);       //将fd文件描述符从容器set中删除
       int  FD_ISSET(int fd, fd_set *set);     //判断fd文件描述符，是否存在于set容器中
       void FD_SET(int fd, fd_set *set);      //将fd文件描述符，放入到set容器中
       void FD_ZERO(fd_set *set);               //清空set容器

6> select函数的基本使用方式

#include <myhead.h>
#define SER_PORT 8888          //服务器端口号
#define SER_IP "192.168.31.49"     //服务器IP地址
int main(int argc, const char *argv[]) 
{
    //1、创建用于连接的套接字文件描述符
    int sfd = socket(AF_INET, SOCK_STREAM, 0);
    //参数1：AF_INET表示使用的是ipv4的通信协议
    //参数2：SOCK_STREAM表示使用的是tcp通信
    //参数3：由于参数2指定了协议，参数3填0即可
    if(sfd == -1)
    {
        perror("socket error");
        return -1;
    }
    printf("socket success sfd = %d\n", sfd);         //3
    //2、绑定ip地址和端口号
    //2.1 填充要绑定的ip地址和端口号结构体
    struct sockaddr_in sin;
    sin.sin_family = AF_INET;       //通信域
    sin.sin_port = htons(SER_PORT);   //端口号
    sin.sin_addr.s_addr = inet_addr(SER_IP);    //ip地址
    //2.2 绑定工作
    //参数1：要被绑定的套接字文件描述符
    //参数2：要绑定的地址信息结构体，需要进行强制类型转换，防止警告
    //参数3：参数2的大小
    if(bind(sfd, (struct sockaddr*)&sin, sizeof(sin)) ==-1)
    {
        perror("bind error");
        return -1;
    }
    printf("bind success\n");
    //3、启动监听
    //参数1：要启动监听的文件描述符
    //参数2：挂起队列的长度
    if(listen(sfd, 128) ==-1)
    {
        perror("listen error");
        return -1;
    }
    printf("listen success\n");
    //4、阻塞等待客户端的连接请求
    //定义变量，用于接受客户端地址信息结构体
    struct sockaddr_in cin;             //用于接收地址信息结构体的
    socklen_t socklen = sizeof(cin);        //用于接收地址信息的长度
    //定义文件描述符集合
    fd_set readfds, tempfds;       //读文件描述符集合
    //将该文件描述符集合清空
    FD_ZERO(&readfds);
    //将0号文件描述符以及sfd文件描述符放入到集合中
    FD_SET(0, &readfds);
    FD_SET(sfd, &readfds);
    while(1)
    {
        //将reafds备份一份放入tempfds中
        tempfds = readfds;
        //调用阻塞函数，完成对文件描述符集合的管理工作
        int res = select(sfd+1, &tempfds, NULL, NULL, NULL);
        if(res == -1)
        {
            perror("select error");
            return -1;
        }else if(res == 0)
        {
            printf("time out !!!\n");
            return -1;
        }
        //程序执行至此，表示一定有其中至少一个文件描述符产生了事件，只需要判断哪个文件描述还在集合中
        //就说明该文件描述符产生了事件
        //表示sfd文件描述符触发了事件
        if(FD_ISSET(sfd, &tempfds))
        {
            int newfd = accept(sfd, (struct sockaddr *)&cin, &socklen);
            //参数1：服务器套接字文件描述符
            //参数2：用于接收客户端地址信息结构体的容器，如果不接收，也可以填NULL
            //参数3：接收参数2的大小，如果参数2为NULL，则参数3也是NULL
            if(newfd == -1)
            {
                perror("accept error");
                return -1;
            }
            printf("[%s:%d]:已连接成功，newfd = %d!!!!\n", inet_ntoa(cin.sin_addr),  ntohs(cin.sin_port), newfd);
        }
        //判断0号文件描述符是否产生了事件
        if(FD_ISSET(0, &tempfds))
        {
            char wbuf[128] = "";     //字符数组
            fgets(wbuf, sizeof(wbuf), stdin);      //从终端读取数据,阻塞函数
            printf("触发了键盘输入事件：%s\n", wbuf);
        }
                                                               
    }
    close(sfd);
    std::cout << "Hello, World!" << std::endl;
    return 0;
 }

7> select 实现TCP并发服务器

##include <myhead.h>
#define SER_PORT 8888            // 服务器端口号
#define SER_IP "192.168.189.128" // 服务器IP地址
int main(int argc, const char *argv[])
{
    // 1、创建用于连接的套接字文件描述符
    int sfd = socket(AF_INET, SOCK_STREAM, 0);
    // 参数1：AF_INET表示使用的是ipv4的通信协议
    // 参数2：SOCK_STREAM表示使用的是tcp通信
    // 参数3：由于参数2指定了协议，参数3填0即可
    if (sfd == -1)
    {
        perror("socket error");
        return -1;
    }
    printf("socket sfd = %d\n", sfd);

    // 2、绑定ip地址和端口号
    // 2.1 填充要绑定的ip地址和端口号结构体
    struct sockaddr_in addr;
    addr.sin_family = AF_INET;                // 通信域
    addr.sin_port = htons(SER_PORT);          // 端口号转换为网络字节序
    addr.sin_addr.s_addr = inet_addr(SER_IP); // IP地址转换为网络字节序

    // 2.2 绑定工作
    // 参数1：要被绑定的套接字文件描述符
    // 参数2：要绑定的地址信息结构体，需要进行强制类型转换，防止警告
    // 参数3：参数2的大小
    if (bind(sfd, (const sockaddr *)&addr, sizeof(addr)) == -1)
    {
        perror("bind error");
        return -1;
    }
    printf("bind success\n");

    // 3、启动监听
    // 参数1：要启动监听的文件描述符
    // 参数2：挂起队列的长度
    if (listen(sfd, 128) == -1)
    {
        perror("listen error");
        return -1;
    }
    printf("listen success\n");

    // 4、阻塞等待客户端的连接请求
    // 定义变量，用于接受客户端地址信息结构体
    struct sockaddr_in cin;
    socklen_t len = sizeof(cin);

    fd_set readfd, tempfd;
    FD_ZERO(&readfd);
    FD_SET(0, &readfd);
    FD_SET(sfd, &readfd);

    // 定义最大文件描述符
    int maxfd = sfd;

    // 定于地址信息结构体数组
    struct sockaddr_in cin_arr[1024];

    while (1)
    {
        tempfd = readfd;
        int ret = select(maxfd + 1, &tempfd, NULL, NULL, NULL);
        if (ret == -1)
        {
            perror("select error");
            return -1;
        }
        else if (ret == 0)
        {
            printf("time out\n");
            return -1;
        }

        if (FD_ISSET(sfd, &tempfd))
        {
            int newfd = accept(sfd, (struct sockaddr *)&cin, &len);
            // 参数1：服务器套接字文件描述符
            // 参数2：用于接收客户端地址信息结构体的容器，如果不接收，也可以填NULL
            // 参数3：接收参数2的大小，如果参数2为NULL，则参数3也是NULL

            if (newfd == -1)
            {
                perror("accept error");
                return -1;
            }
            printf("[%s:%d] 连接成功\n", inet_ntoa(cin.sin_addr), ntohs(cin.sin_port));

            // 建立地址信息和文件描述符的索引关系
            cin_arr[newfd] = cin;

            // 添加新的文件描述符
            FD_SET(newfd, &readfd);

            if (maxfd < newfd)  maxfd = newfd;
        }

        if (FD_ISSET(0, &tempfd))
        {
            // 将输入的信息发送到所有客户端
            char wbuf[128] = "";
            fgets(wbuf, sizeof(wbuf), stdin);
            for(int i=4;i<=maxfd;i++)
            {
                if (FD_ISSET(i, &readfd))
                {
                    if (send(i, wbuf, strlen(wbuf), 0) == -1)
                    {
                        perror("send error");
                        return -1;
                    }
                    printf("[%s:%d]:发送成功\n", inet_ntoa(cin_arr[i].sin_addr), ntohs(cin_arr[i].sin_port));
                }
            }
        }

        for (int i = 4; i <= maxfd; i++)
        {
            if (FD_ISSET(i, &tempfd))
            {
                // 5、数据收发
                char rbuf[128] = ""; // 数据容器
                // 清空容器中的内容
                bzero(rbuf, sizeof(rbuf));
                // 从套接字中读取消息
                int res = recv(i, rbuf, sizeof(rbuf), 0);
                if (res == 0)
                {
                    printf("[%s:%d]:", inet_ntoa(cin_arr[i].sin_addr), ntohs(cin_arr[i].sin_port));
                    printf("对端已经下线\n");
                    // 6、关闭套接字
                    close(i);
                    FD_CLR(i,&readfd);

                    continue;
                }
                printf("[%s:%d]:%s\n", inet_ntoa(cin_arr[i].sin_addr), ntohs(cin_arr[i].sin_port), rbuf);
                // 对收到的数据处理一下，回给客户端
                strcat(rbuf, "*_*");
                // 将消息发送给客户端
                if (send(i, rbuf, strlen(rbuf), 0) == -1)
                {
                    perror("send error");
                    return -1;
                }
                printf("发送成功\n");
            }
        }
    }

    close(sfd);

    return 0;
}

8> select实现TCP并发服务器的模型

sfd = socket();        //创建用于连接的套接字文件描述符
bind();                //绑定ip和端口号
listen();               //监听
fd_set  readfds, tempfds;    //定义文件描述符集合
FD_ZERO();        //清空容器
FD_SET();         //将文件描述符放入容器
maxfd = sfd;         //记录最大的文件描述符
while(1)
 {
    tempfds = readfds;      //备份一份容器
    select(maxfd, &readfds, NULL, NULL, NULL);     //阻塞等待集合中是否有事件产生
    
    //判断相关文件描述符是否在集合中
    if(FD_ISSET(sfd, &tempfds))
    {
        newfd = accept();      //接收客户端请求
        FD_SET(newfd, &readfds);    //将新文件描述符放入集合
        //更新maxfd
    }
    
    //判断是否是客户端发来数据
    for(i=4; i<=maxfd; i++)
    {
        send();
        recv();
        close(i);     //退出客户端
        FD_CLR(i, &readfds);
        //更新maxfd
    }
    
}
 //关闭监听
close(sfd);

9> 使用poll实现IO多路复用

       #include <poll.h>
       int poll(struct pollfd *fds, nfds_t nfds, int timeout);

       功能：阻塞等待文件描述符集合中是否有事件产生，如果有，则解除阻塞，返回本次触发事件的文件描述符个数
       参数1：文件描述符集合容器的起始地址，是一个结构体数组，结构体类型如下

  struct pollfd 
          {
               int   fd;         /* 文件描述符 */
               short events;     /* 要等待的事件：由用户填写 */
               short revents;    /* 实际发生的事件 ：调用函数结束后，内核会自动设置*/
           };

关于事件对应的位：
           POLLIN:读事件
           POLLOUT：写事件
           
       参数2：集合中文件描述符的个数
       参数3：超时时间，负数表示永久等待，0表示非阻塞
       返回值：
            >0:表示触发本次解除阻塞事件的文件描述符的个数
            =0:表示超时
            =-1:出错，置位错误码

10> poll的使用实例

poll完成TCP客户端中发送数据和读取数据的并发

#include <myhead.h>
#define SER_PORT 8888            // 服务器端口号
#define SER_IP "192.168.174.128" // 服务器IP地址
#define CLI_PORT 9999            // 客户端端口号
#define CLI_IP "192.168.174.128" // 客户端ip地址
int main(int argc, const char *argv[])
{
    // 1、创建用于通信的客户端套接字文件描述符
    int cfd = socket(AF_INET, SOCK_STREAM, 0);
    if (cfd == -1)
    {
        perror("socket error");
        return -1;
    }
    printf("socket success cfd = %d\n", cfd); // 3
    // 2、绑定ip地址和端口号(可选)
    // 2.1 填充要绑定的地址信息结构体
    struct sockaddr_in cin;
    cin.sin_family = AF_INET;
    cin.sin_port = htons(CLI_PORT);
    cin.sin_addr.s_addr = inet_addr(CLI_IP);
    // 2.2 绑定工作
    if (bind(cfd, (struct sockaddr *)&cin, sizeof(cin)) == -1)
    {
        perror("bind error");
        return -1;
    }
    printf("bind success\n");
    // 3、连接服务器
    // 3.1 填充要连接的服务器地址信息结构体
    struct sockaddr_in sin;
    sin.sin_family = AF_INET;                // 通信域
    sin.sin_port = htons(SER_PORT);          // 端口号
    sin.sin_addr.s_addr = inet_addr(SER_IP); // 服务器ip地址
    // 3.2 连接工作
    if (connect(cfd, (struct sockaddr *)&sin, sizeof(sin)) == -1)
    {
        perror("connect error");
        return -1;
    }
    printf("连接服务器成功\n");
    // 使用poll完成终端输入和套接字接收数据的并发执行
    struct pollfd pfds[2]; // pfds[0]   pfds[1]
    // 分别给数组中两个文件描述符成员赋值
    pfds[0].fd = 0;          // 表示检测0号
    pfds[0].events = POLLIN; // 表示检测的是读事件
    pfds[1].fd = cfd;        // 检测cfd文件描述符
    pfds[1].events = POLLIN; // 检测读事件
    // 4、数据收发
    char wbuf[128] = "";
    while (1)
    {
        int res = poll(pfds, 2, -1);
        // 功能：阻塞等待文件描述符集合中是否有事件产生
        // 参数1：文件描述符集合起始地址
        // 参数2：文件描述符个数
        // 参数3：表示永久等待
        if (res == -1)
        {
            perror("poll error");
            return -1;
        }
        // 程序执行至此，表示文件描述符容器中，有事件产生
        // 表示0号文件描述符的事件
        if (pfds[0].revents == POLLIN)
        {
            // 清空容器
            bzero(wbuf, sizeof(wbuf));
            // 从终端获取数据
            fgets(wbuf, sizeof(wbuf), stdin); // 0
            wbuf[strlen(wbuf) - 1] = 0;       // 将换行改成 '\0'
            // 将数据发送给服务器
            if (send(cfd, wbuf, sizeof(wbuf), 0) == -1)
            {
                perror("send error");
                return -1;
            }
        }
        // 表示有客户端发来消息
        if (pfds[1].revents == POLLIN)
        {
            // 接受服务器发送过来的消息
            if (recv(cfd, wbuf, sizeof(wbuf), 0) == 0) // cfd
            {
                printf("对端已经下线\n");
                break;
            }
            printf("收到服务器消息为：%s\n", wbuf);
        }
    }
    // 5、关闭套接字
    close(cfd);
    std::cout << "Hello, World!" << std::endl;
    return 0;
}

11> 总结select和poll的区别

1、select管理三个文件描述符集合，poll只管理一个，但是，可以操作很多事件
2、select管理的文件描述符有上限，一般是1024个，而poll管理文件描述符没有这个限制
3、对于效率而言，poll的效率比select的略高