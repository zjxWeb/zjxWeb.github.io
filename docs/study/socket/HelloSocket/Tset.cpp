# define WIN32_LEAN_AND_MEAN
#include<windows.h>
#include<WinSock2.h>

#pragma comment(lib, "ws2_32.lib") // windows中使用

int main()
{
	WORD ver = MAKEWORD(2, 2); // 版本
	WSADATA dat;
	WSAStartup(ver, &dat);
	///
	 
	///
	WSACleanup();
	return 0;
}