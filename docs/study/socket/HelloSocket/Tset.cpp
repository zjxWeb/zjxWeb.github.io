# define WIN32_LEAN_AND_MEAN
#include<windows.h>
#include<WinSock2.h>

#pragma comment(lib, "ws2_32.lib") // windows��ʹ��

int main()
{
	WORD ver = MAKEWORD(2, 2); // �汾
	WSADATA dat;
	WSAStartup(ver, &dat);
	///
	 
	///
	WSACleanup();
	return 0;
}