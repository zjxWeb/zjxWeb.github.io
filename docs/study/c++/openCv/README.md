## 一. `openCV` C++（Visual studio 2017）配置

[open下载](https://opencv.org/releases/)

### 1. 配置包含目录

![1](./src/1.png)

### 2. 配置库目录

![2](./src/2.png)

### 3. 配置链接器

![3](./src/3.png)

![4](./src/4.png)

### 4. 配置环境变量并重启`vs2017`

> 将此 `E:\study\openCV\opencv-4.8.0\opencv\build\x64\vc16\bin`；路径配置到系统环境变量当中

```cpp
// 测试程序
#include <opencv2/opencv.hpp>

int main(int argc, char** argv) {
	cv::Mat src = cv::imread("E:/study/openCV/1.jpg");
	if (src.empty()) {
		printf("could not load image...");
		return -1;
	}
	cv::imshow("输入图像", src);
	cv::waitKey(0);
	return 0;
}
```

## 二. [`openCV`入门](https://blog.csdn.net/Aden422413/article/details/137361030)

### 1. 图像读取和显示

```cpp
#include <opencv2/opencv.hpp>
#include <iostream>

using namespace cv;
using namespace std;

int main(int argc, char** argv) {
	//imread 参数：路径；IMREAD_GRAYSCALE(灰度图)
	Mat src = cv::imread("E:/study/openCV/1.jpg");// 三通道，24位
	//namedWindow("输入窗口", WINDOW_FREERATIO);// 创建一个窗口，记住参数1要和imshow（）的参数1保持一直
	if (src.empty()) {
		printf("could not load image...");
		return -1;
	}
	cv::imshow("输入窗口", src);// 显示图片，默认是autosize和我们的图像大小保持一直
	cv::waitKey(0);// 程序阻塞 当为0的时候；为1的时候，表示停顿1毫秒
	destroyAllWindows(); // 销毁所有的窗口显示
	return 0;
}
```

### 2. 图片的转化和保存

#### `cvtColor`

+ `cvtColor`的功能是把图像从一个色彩空间转换到另外一个色彩空间，有三个参数，第一个参数表示源图像，第二个参数表示色彩空间转换之后的图像，第三个参数表示源和目标色彩空间如：`COLOR_BGR2HLS`、`COLOR_BGR2GRAY`等
+ `cvtColor(image,gray_image,COLOR_BGR2GRAY);`

原文链接：https://blog.csdn.net/m0_61427031/article/details/132325853

> `quickopencv.h`

```cpp
#pragma once
#include <opencv2/opencv.hpp>

using namespace cv;

class QuickDemo
{
public:
	void colorSpace_Demo(Mat &image);
};
```

> `quickopencv.cpp`

```cpp
#include <quickopencv.h>

void QuickDemo::colorSpace_Demo(Mat &image) {
	Mat gray, hsv;
	// hsv  H 0~180,s,v
	cvtColor(image, hsv, COLOR_BGR2HSV);
	cvtColor(image, gray, COLOR_BGR2GRAY);
	imshow("HSV", hsv);
	imshow("gray", gray);
	imwrite("E:/study/openCV/hsv.png", hsv);
	imwrite("E:/study/openCV/gray.png", gray);
}
```

> `main.cpp`

```cpp
#include <quickopencv.h>

using namespace std;

int main(int argc, char** argv) {
	//imread 参数：路径；IMREAD_GRAYSCALE(灰度图)
	Mat src = imread("E:/study/openCV/1.jpg");// 三通道，24位
	//namedWindow("输入窗口", WINDOW_FREERATIO);// 创建一个窗口，记住参数1要和imshow（）的参数1保持一直
	if (src.empty()) {
		printf("could not load image...");
		return -1;
	}
	imshow("输入窗口", src);// 显示图片，默认是autosize和我们的图像大小保持一直  src图像必须是8位
	QuickDemo pd;
	pd.colorSpace_Demo(src);
	waitKey(0);// 程序阻塞 当为0的时候；为1的时候，表示停顿1毫秒
	destroyAllWindows(); // 销毁所有的窗口显示
	return 0;
}
```

### 3. Mat基本结构

#### 显式创建Mat对象的七种方式

+ 【方法一】使用Mat（）`构造函数`

```cpp
Mat M(2,2,CV_8UC3,Scalar(0,0,255));
//CV_[位数][带符号与否][类型前缀]C[通道数]
//预先定义的通道数可以多达4个
```

+ 【方法二】在C/C++中通过构造函数进行初始化；

```cpp
int sz[3]={2,2,2};
Mat L(3,sz,cv_8UC,Scalar::all(0));
//上面的例子演示了如何创建一个超过两维的矩阵：指定维数，然后传递给一个指向数组的指针，这个数组包含每个维度的尺寸；后续两个参数与方法一中的相同
```

+ 【方法三】为已存在的`IplImage`指针创建信息头

```cpp
IplImage* img = cvLoadImage("1.jpg",1);
Mat mtx(img);//转换 IplImage*->Mat
```

+ 【方法四】利用Create（）函数

```cpp
M.create(4,4,CV_8UC(2));
//需要注意的是，此方法不能为矩阵设初值，只是在该百年尺寸时重新为矩阵数据开辟内存而已。
```

+ 【方法六】对小矩阵使用逗号分隔式初始化函数

```cpp
Mat C = (Mat_<double>(3,3)<<0,-1,0,-1,5,-1,0,-1,0);
cout<<"C = "<<endl<<" "<C<<endl<<endl;
```

+ 【方法七】为已存在的对象创建新信息头

```cpp
Mat RowClone = C.row(1).clone();
cout<<"RowClone = "<<endl<<" "<<RowClone<<endl<<endl;
//方法七为使用成员函数clone()或者copyTo()为一个已存在的Mat对象创建一个新的信息头
```

![5](./src/5.png)

![6](./src/6.png)

> `quickopencv.cpp`

```cpp
#include <quickopencv.h>

void QuickDemo::colorSpace_Demo(Mat &image) {
	Mat gray, hsv;
	// hsv  H 0~180,s,v
	cvtColor(image, hsv, COLOR_BGR2HSV);
	cvtColor(image, gray, COLOR_BGR2GRAY);
	imshow("HSV", hsv);
	imshow("gray", gray);
	imwrite("E:/study/openCV/hsv.png", hsv);
	imwrite("E:/study/openCV/gray.png", gray);
}

void QuickDemo::mat_creation_demo(Mat &image) {
	Mat m1, m2;
	m1 = image.clone();
	image.copyTo(m2);
	// 创建空白对象
	/*Mat m3 = Mat::zeros(Size(8, 8), CV_8UC3);*/
	Mat m3 = Mat::ones(Size(400, 400), CV_8UC3); // 注意是不是单通道，当为三通道的时候，只会初始化第一个通道为1
	// 给三通道赋值
	m3 = Scalar(127, 127, 127);
	// 获取宽度
	cout << "width " << m3.cols << " " << "height " << m3.rows << " " <<"channel " << m3.channels() << endl;
	cout << m3 << endl;

	//Mat m4 = m3;// 相同保持一直
	//Mat m4 = m3.clone();//不一样的自我
	Mat m4;
	m3.copyTo(m4); // 产生新的对象
	m4 = Scalar(26, 255, 26);
	imshow("show", m4);
}
```

### 4. 图像像素的读写操作

+ C++中的像素遍历与访问
  + 数组遍历
  + 指针遍历

#### `imwrite`

- 保存文件到指定的目录途径
- 只有8位，16位的`PNG/JPG/Tiff`文件格式而且是单通道或者三通道的`BGR`图像 才可以通过这种方式保存
- 保存`PNG`格式的时候可以保存透明通道的图片（`RGBA`）
- 可以指定压缩参数

> `quickopencv.cpp`

```cpp
void QuickDemo::pixel_visit_demo(Mat &image) {
	int w = image.cols;
	int h = image.rows;
	int dims = image.channels();
	// 数组下标遍历
	//for (int row = 0; row < h; row++) {
	//	for (int col = 0; col < w; col++) {
	//		if (dims == 1) {// 灰度图像
	//			int pv = image.at<uchar>(row, col);// 将uchar转为int
	//			image.at<uchar>(row, col) = 255 - pv;
	//		}
	//		if (dims == 3) {// 彩色图像
	//			Vec3b bgr = image.at<Vec3b>(row, col);
	//			image.at<Vec3b>(row, col)[0] = 255 - bgr[0];
	//			image.at<Vec3b>(row, col)[1] = 255 - bgr[1];
	//			image.at<Vec3b>(row, col)[2] = 255 - bgr[2];
	//		}
	//	}
	//}

	// 指针遍历(速度更快)
	for (int row = 0; row < h; row++) {
		uchar* current_row = image.ptr<uchar>(row);
		for (int col = 0; col < w; col++) {
			if (dims == 1) {// 灰度图像
				int pv = *current_row;
				*current_row++ = 255 - pv;
			}
			if (dims == 3) {// 彩色图像
				*current_row++ = 255 - *current_row;
				*current_row++ = 255 - *current_row;
				*current_row++ = 255 - *current_row;
			}
		}
	}

	imshow("像素读写", image);
}
```

### 5. 算术操作

+ **加法**运算（合并两张图片，注意图片格式大小要一致）
  + 特点：输出图像像素的灰度仅取决于两幅或两幅以上的输入图像的对应像素灰度值。算术运算结果和参与运算像素的邻域内像素的灰度值无关。算术运算不会改变像素的空间位置。  
+ **减法**运算：将同一景物在不同时间拍摄的图像或同一景物在不同坡段的图像相减，常称为差影法。
  + 差值图像提供了图像间的差值信息，能用于指导动态监测，运动目标的检测与跟踪，图像背景的消除及目标识别等。
  + 主要应用举例：差影法（检测同一场景两幅图像之间的变化），混合图像的分离  
+ **乘法**运算
  + 图像的乘法运算就是将两幅图像对应的灰度值或彩色分量进行相乘。
  + 乘运算的主要作用是抑制图像的某些区域，掩膜值置为1，否则置为0。乘运算有时也被用来实现卷积或相关的运算。
  + 主要应用： 1.图像的局部显示 2.改变图像的灰度级 
+ **除法**运算
  + 图像的乘法运算就是将两幅图像对应的灰度值或彩色分量进行相除。

```cpp
void QuickDemo::operator_demo(Mat &image) {
	Mat dst;
	dst = image + Scalar(50, 50, 50);
	Mat m = Mat::zeros(image.size(), image.type());
	m = Scalar(2, 2, 2);
	//multiply(image, m, dst);// 相乘计算
	add(image, m, dst); // 加
	subtract(image, m, dst); //减
	divide(image, m, dst); //除
	imshow("算术操作", image);

	// 加法
	/*
	Mat dst = Mat::zeros(image.size(), image.type());
	Mat m = Mat::zeros(image.size(), image.type());
	m = Scalar(50, 50, 50);
	int w = image.cols;
	int h = image.rows;
	int dims = image.channels();
	for (int row = 0; row < h; row++) {
		for (int col = 0; col < w; col++) {
			Vec3b p1 = image.at<Vec3b>(row, col);
			Vec3b p2 = image.at<Vec3b>(row, col);
			dst.at<Vec3b>(row, col)[0] = saturate_cast<uchar>(p1[0] - p2[0]);//saturate_cast 做范围的判定
			dst.at<Vec3b>(row, col)[1] = saturate_cast<uchar>(p1[1] - p2[1]);;
			dst.at<Vec3b>(row, col)[2] = saturate_cast<uchar>(p1[2] - p2[2]);
		}
	}
	imshow("算术操作", image);
	*/
}
```

### 6. 亮度调节demo

```cpp
Mat dst, m, src;
int lightness = 50;
static void on_track(int, void*) {
	m = Scalar(lightness, lightness, lightness);
	add(src, m, dst);
	imshow("亮度调节", dst);;
}
void QuickDemo::tracking_demo(Mat &image) {
	namedWindow("亮度调节", WINDOW_AUTOSIZE);
	dst = Mat::zeros(image.size(), image.type());
	m = Mat::zeros(image.size(), image.type());
	src = image;
	int max_value = 100;
	createTrackbar("value bar:", "亮度调节", &lightness, max_value, on_track);

}
```

+ 优化之后的程序

```cpp
static void on_track(int b, void* userdata) {
	Mat image = *((Mat*)userdata);
	Mat dst = Mat::zeros(image.size(), image.type());
	Mat m = Mat::zeros(image.size(), image.type());
	m = Scalar(b, b, b);
	subtract(image, m, dst);
	imshow("亮度调节", dst);;

}
void QuickDemo::tracking_demo(Mat &image) {
	namedWindow("亮度调节", WINDOW_AUTOSIZE);
	int lightness = 50;
	int max_value = 100;
	createTrackbar("value bar:", "亮度调节", &lightness, max_value, on_track,(void*)(&image));
	on_track(50, &image);
}
```

![7](./src/7.png)

### 7. 参数传递与亮度调节与对比度

#### 改变图像的亮度和对比度

+ 理论：
+ 图像变换可以看作如下：
  + 像素变换——点操作
  + 邻域操作——区域
  + 调整图像亮度属于像素变换-点操作

$$
g ( i , j ) = α f ( i , j ) + β
$$

+ 其中*α*>0,*β*是增益变量

```cpp
static void on_light(int lightness, void* userdata) {
 
    Mat image = *((Mat*)(userdata));
    Mat dst = Mat::zeros(image.size(), image.type());
    Mat m = Mat::zeros(image.size(), image.type());
 
    double light = lightness-50;
    /*
        gamma范围变成[-50,50]
        这样我们就实现了增大/降低亮度，
        先 降低一半，不然只能提高
    */
 
    addWeighted(image, 1.0, m, 0, light, dst);
    /*
    由公式：dst = src1 * alpha + src2 * beta + gamma 可知
    设置第1个权重1，第二个权重0
        相当于图片融合时，只有第1个的成分
    设置要增加的标量为lightness
        可以实现亮度的调整
    */
    imshow("windows", dst);
 
}
 
static void on_contrast(int contrast, void* userdata) {
 
    Mat image = *((Mat*)(userdata));
    Mat dst = Mat::zeros(image.size(), image.type());
    Mat m = Mat::zeros(image.size(), image.type());
 
    double contra = contrast / 100.0;
    /*
    这里的contrast初始值1 是一个[0,2]范围的数, 实现 可以调高调小
    */
    addWeighted(image, contra, m, 0, 0, dst);// 利用 图片融合函数
    /*
    由公式：dst = src1 * alpha + src2 * beta + gamma 可知
    设置第1个权重cotrast，第二个权重0
        相当于图片融合时，只有第1个的成分
        同时可以实现对比度的调整
    */
 
    imshow("windows", dst);
 
}
 
 
int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    MainWindow w;
    //w.show();
 
    namedWindow("windows", WINDOW_NORMAL);
    resizeWindow("windows", 500, 500);
 
 
    Mat srcImage = imread("C:\\Users\\29492\\Desktop\\Qt +opencv\\project\\light contrast regulate\\car7.png");
//默认BGR
 
    if (srcImage.empty())
    {
        printf("could not load image……\n");
    }
 
        int lightness = 50; //当前值
        int max_light = 100;//最大值
 
        int contrast = 100; //当前值
        int max_contrast = 200;//最大值
 
    createTrackbar("Value_contrast:", "windows", &contrast, max_contrast, on_contrast,(void*)(&srcImage));
    createTrackbar("Value_light:", "windows", &lightness, max_light, on_light,(void*)(&srcImage));
 
    imshow("windows", srcImage);
 
    std::cout <<srcImage << std::endl;
 
}
```

> `quickopencv.cpp`

```cpp
static void on_lightness(int b, void* userdata) {
	Mat image = *((Mat*)userdata);
	Mat dst = Mat::zeros(image.size(), image.type());
	Mat m = Mat::zeros(image.size(), image.type());
	addWeighted(image, 1.0,m,0,b,dst);
	imshow("亮度调节", dst);

}

static void on_contrast(int b, void* userdata) {
	Mat image = *((Mat*)userdata);
	Mat dst = Mat::zeros(image.size(), image.type());
	Mat m = Mat::zeros(image.size(), image.type());
	double contrast = b / 100.0;
	addWeighted(image, contrast, m, 0.0, b, dst);
	imshow("亮度对比度调节", dst);
}
void  QuickDemo::tracking_demo(Mat &image) {
	namedWindow("亮度调节", WINDOW_AUTOSIZE);
	int lightness = 50;
	int max_value = 100;
	int contrast_value = 100;
	createTrackbar("value bar:", "亮度调节", &lightness, max_value, on_lightness,(void*)(&image));
	createTrackbar("contrast_value bar:", "亮度调节", &contrast_value, 200, on_contrast,(void*)(&image));
	on_lightness(50, &image);
}
```

### 8. `applyColorMap`

#### 1、函数原型

```cpp
cv::applyColorMap (InputArray src, OutputArray dst, int colormap)
cv::applyColorMap (InputArray src, OutputArray dst, InputArray userColor)
```

#### 2、参数详解

| `src`      | `CV_8UC1` 或 `CV_8UC3` 类型的源图像，灰度或彩色。            |
| ---------- | ------------------------------------------------------------ |
| `dst`      | 结果是颜色映射的源图像。 注意：在 `dst` 上调用 `Mat::create。` |
| `colormap` | `The colormap to apply, see ColormapTypes`                   |

```cpp
// 将灰度图或彩色图转换成opencv提供的20多种色彩值
void QuickDemo::color_style_demo(Mat &image) {
	// opencv提供的色彩值
	int colorMap[] = {
		COLORMAP_AUTUMN,
		COLORMAP_BONE,
		COLORMAP_JET,
		COLORMAP_WINTER,
		COLORMAP_RAINBOW,
		COLORMAP_OCEAN,
		COLORMAP_SUMMER,
		COLORMAP_SPRING,
		COLORMAP_COOL,
		COLORMAP_HSV,
		COLORMAP_PINK,
		COLORMAP_HOT,
		COLORMAP_PARULA,
		COLORMAP_MAGMA,
		COLORMAP_INFERNO,
		COLORMAP_PLASMA,
		COLORMAP_VIRIDIS,
		COLORMAP_CIVIDIS,
		COLORMAP_TWILIGHT,
		COLORMAP_TWILIGHT_SHIFTED
	};
	Mat dst;
	int index = 0;
	while (true) {
		int c = waitKey(1000);
		if (c == 27) {	// 退出
			break;
		}
		// index%19,index取模之后下标值在 0 - 19 之间循环，下标不会超过19
		applyColorMap(image, dst, colorMap[index % 19]);
		index++;
		namedWindow("colorStyle", WINDOW_NORMAL);
		imshow("colorStyle", dst);
	}
}
```

### 9. 逻辑运算（并集、差集、补集、异或）

```cpp
void QuickDemo::bitwise_Demo(Mat& image) {
	Mat m1 = Mat::zeros(Size(256, 256), CV_8UC3);
	Mat m2 = Mat::zeros(Size(256, 256), CV_8UC3);

	rectangle(m1, Rect(50, 50, 80, 80), Scalar(255, 255, 0), -1, LINE_8, 0);//LINE_8 反锯齿
	//rectangle(m2, Rect(100, 100, 80, 80), Scalar(0, 255, 255), -1, LINE_8, 0);
	circle(m2, Point(100, 100), 40, Scalar(0, 255, 255), -1, LINE_8, 0);

	imshow("m1", m1);
	imshow("m2", m2);
	Mat dst0, dst1, dst00, dst11, dst3;
	bitwise_and(m1.clone(), m2.clone(), dst0);
	bitwise_or(m1.clone(), m2.clone(), dst1);

	bitwise_not(dst0, dst00);
	dst11 = ~dst1;

	bitwise_xor(m1.clone(), m2.clone(), dst3);
	imshow("and_交集_dst", dst0);
	imshow("or_并集_dst", dst1);
	imshow("not_交集取反_dst", dst00);
	imshow("not_并集取反_dst", dst11);
	imshow("xor_异或集_dst", dst3);
}
```

![8](./src/8.png)

### 10. 键盘响应

```cpp
void QuickDemo::keys_Demo(Mat& image) {
	Mat dst = Mat::zeros(image.size(),image.type());
	while (true) {
		int c = waitKey(200);
		if (c == 27) {
			break;
		}
		if (c == 49) {
			std::cout << "you enter key #" << c << std::endl;
			cvtColor(image, dst, COLOR_BGR2GRAY);
		}
		if (c == 50) {
			std::cout << "you enter key #" << c << std::endl;
			cvtColor(image, dst, COLOR_BGR2HSV);
		}
		if (c == 51) {
			std::cout << "you enter key #" << c << std::endl;
			add(image, Scalar(30, 30, 30), dst);
		}
		imshow("键盘响应",dst);
	}
}
```

### 11. 通道相关操作

> - `src`: 输入的矩阵数组。
> - `nsrcs`: 输入矩阵的数量。
> - `dst`: 输出的矩阵数组。
> - `ndsts`: 输出矩阵的数量。
> - `fromTo`: 一个整数数组，指定了如何从输入矩阵的通道复制到输出矩阵的通道。例如，`fromTo`数组 `{0,2,1,1,2,0}` 表示将`src`的第0个通道复制到`dst`的第2个通道，将`src`的第1个通道复制到`dst`的第1个通道，以此类推。
> - `npairs`: `fromTo`数组中索引对的数量。这个数字应该是`fromTo`数组长度的一半，因为每对索引占用两个位置。

```cpp
void mixChannels(
    const Mat* src,       // 输入数组或向量矩阵，所有矩阵的大小和深度必须相同
    size_t nsrcs,         // 输入矩阵的数量
    Mat* dst,             // 输出数组或矩阵向量，大小和深度必须与src[0]相同
    size_t ndsts,         // 输出矩阵的数量
    const int* fromTo,    // 指定被复制通道与要复制到的位置组成的索引对
    size_t npairs         // fromTo中索引对的数目
);

```

```cpp
void QuickDemo::channel_Demo(Mat& image) {
	vector<Mat>mv;
	split(image, mv);// 通道分离
	imshow("blue", mv[0]);
	imshow("green", mv[1]);
	imshow("red", mv[2]);

	Mat dst;
	mv[0] = 0;
	mv[1] = 0;
	merge(mv, dst);// 通道合并
	imshow("red", dst);

	int form_to[] = { 0,2,1,1,2,0 };
	mixChannels(&image,1, &dst, 1,form_to,3); // 通道混合
	imshow("mixChannels", dst);
}
```

### 12. 图像色彩空间变化

> ```cpp
>  inRange(src, lowerb, upperb, dst);
> ```

+ `src` 是源图像，`lowerb` 和 `upperb` 定义了颜色范围，`dst` 是输出的二值图像。

```cpp
void QuickDemo::inrange_demo(Mat &image) {

	//将输入图像从BGR色彩空间转换到HSV色彩空间。这是因为在HSV空间中，基于颜色的图像分割更加简单和直观。
	Mat hsv;
	cvtColor(image, hsv, COLOR_BGR2HSV);

	//通过inRange函数定义绿色的HSV范围，并生成一个二值掩码（mask），其中绿色区域为白色（值为255），非绿色区域为黑色（值为0）。
	Mat mask;
	inRange(hsv, Scalar(35, 43, 46), Scalar(77, 255, 255), mask);

	imshow("mask1", mask);

	//创建一个与原图同样大小和类型的纯红色背景图像redback。
	Mat redback = Mat::zeros(image.size(), image.type());
	redback = Scalar(40, 40, 200);// 红色背景

	//使用bitwise_not函数反转掩码，使得原来的绿色区域变为黑色（0），非绿色区域变为白色（255）。
	bitwise_not(mask, mask);
	imshow("mask2", mask);
	image.copyTo(redback, mask);
	imshow("roi", redback);
}
```

### 13. 像素值统计

```cpp
void QuickDemo::pixel_statistic_demo(Mat &image) {
	double minv, maxv;
	Point minLoc, maxLoc;
	vector<Mat>mv;
	split(image, mv);// 通道分离
	for (int i = 0; i < mv.size(); i++) {
		minMaxLoc(mv[i], &minv, &maxv, &minLoc, &maxLoc, Mat());// image需要是单通道的
		cout << "No.channels: " << i << "min value: " << minv << "max value: " << maxv << endl;
	}
	Mat mean, stddev;// 方差越大，图片的差异化越大
	meanStdDev(image, mean, stddev);
	cout << "means: " << mean  << endl;
	cout << "stddev: " << stddev << endl;
}
```

### 14. 几何形状绘制

<!-- tabs:start -->

#### **线**

> 绘制线，要给出两个点坐标

+ `img`：输入/输出图像，即要在其上绘制直线的图像。
+ `pt1`：直线的起始点坐标。
+ `pt2`：直线的结束点坐标。
+ `color`：直线的颜色，可以是 Scalar 类型表示的颜色值。
+ `thickness`：直线的厚度。默认值为1，表示单像素宽度。
+ `lineType`：线条类型，定义了边框的连接方式。默认值为LINE_8。
+ `shift`：坐标点的小数位数。默认值为0。

```cpp
void cv::line(InputOutputArray img, Point pt1, Point pt2, const Scalar& color, 
int thickness = 1, int lineType = LINE_8, int shift = 0);
```

#### **线圆**

> 绘制圆，要给出圆点和半径：

+ `img`: 在该图像上进行绘制操作。可以是单通道或多通道图像。
+ `center`: 圆心坐标，指定圆的中心点位置，类型为 `cv::Point` 或 `cv::Point2f。`
+ `radius`: 圆的半径，指定圆的大小。
+ `color`: 圆的颜色，类型为 `cv::Scalar`，表示 `BGR` 颜色值。例如，红色可表示为 (0, 0, 255)。
+ `thickness` (可选): 表示绘制圆的线条粗细。默认值为 1。如果设为-1，则绘制一个实心圆
+ `lineType` (可选): 指定绘制线条的样式。默认值为 LINE_8，表示8连通线条。
+ `shift` (可选): 像素坐标的小数位数。默认值为 0。

```cpp
void cv::circle(InputOutputArray img, Point center, int radius, const Scalar& color,
                int thickness = 1, int lineType = LINE_8, int shift = 0);
```

#### **线椭圆**

> 椭圆相比于圆，半径分成了半长轴和半短轴，并且有角度

+ `axes`：椭圆的主轴尺寸，以半长轴和半短轴的大小表示。 
+ `angle`：椭圆旋转角度（逆时针方向）。 
+ `startAngle`：椭圆起始角度（以逆时针方向测量）。 
+ `endAngle`：椭圆结束角度（以逆时针方向测量）。

```cpp
void cv::ellipse(InputOutputArray img, Point center, Size axes, double angle, double startAngle,
 double endAngle, const Scalar& color, int thickness = 1, int lineType = LINE_8, int shift = 0);
```

#### **矩形**

> 绘制矩形，要给出左上角坐标和右下角坐标或者是左上角坐标和宽、高

+ `pt1`：矩形的左上角点坐标。 
+ `pt2`：矩形的右下角点坐标 
  + 或者：`cv::Rect`(左上角点坐标,宽，高)

```cpp
rectangle(bg,rect,Scalar(0,0,255),-1,8,0);
```

> - 参数8：这是线型参数。在绘制图形时，可以选择不同的线型。数字8代表使用8连接线型，也就是说线条是8个方向连接的，这是默认值。还有其他选项，如抗锯齿线型 `cv::LINE_AA`。
> - 参数0：这是像素点的位移参数，它表示坐标点的小数位数。通常，这个参数用于高精度的坐标位置，当设置为0时，表示没有位移，即坐标值是整数。在大多数情况下，使用默认值0就足够了。

```cpp
第一种
void cv::rectangle(InputOutputArray img, Point pt1, Point pt2, const Scalar& color, 
int thickness = 1, int lineType = LINE_8, int shift = 0);

第二种
void cv::rectangle(InputOutputArray img, Rect rect, const Scalar& color, 
int thickness = 1, int lineType = LINE_8, int shift = 0);
```

```cpp
#include <opencv2/opencv.hpp>
#include<iostream>  

using namespace std;

int main()
{
    cv::Mat mask = cv::Mat::zeros(cv::Size(640, 400), CV_8UC3);

    cv::line(mask, cv::Point2f(300, 300), cv::Point2f(400, 400), cv::Scalar(255, 255, 255), 3);  // 宽度为3的直线

    cv::circle(mask, cv::Point(30, 30), 10, cv::Scalar(255, 255, 255), 1);  // 空心圆
    cv::circle(mask, cv::Point(100, 30), 15, cv::Scalar(0, 0, 255), -1);   // 实心圆

    cv::ellipse(mask, cv::Point(150, 30), cv::Size(30, 15), 30, 0, 360, cv::Scalar(255, 0, 0), -1);  // 实心椭圆
  
    cv::rectangle(mask, cv::Point(200, 200), cv::Point(300, 300), cv::Scalar(0, 255, 0), 2);  // 矩形
    // cv::rectangle(mask, cv::Rect(200,200,100,100), cv::Scalar(0, 255, 0), 2);  // 矩形

    cv::imshow("原图", mask);
    cv::waitKey(0);
    cv::destroyAllWindows();

    return 0;
}
```

![9](./src/9.png)

#### **多边形**

+ 在[图像分割](https://so.csdn.net/so/search?q=图像分割&spm=1001.2101.3001.7020)中，目标对象往往是不规则的形状。根据目标对象的多个顶点坐标来绘制（进行分割标签标注的时候，不就是在目标周围点很多个坐标吗)。
+ 目前`OpenCV4`提供的绘制多边形的`fillPoly`有两种构造方式：

```cpp
第一种：
void cv::fillPoly(InputOutputArray img, const Point** pts, const int* npts, int ncontours,
 const Scalar& color, int lineType = LINE_8, int shift = 0, Point offset = Point());
 
第二种：
void fillPoly(InputOutputArray img, InputArrayOfArrays pts,
                           const Scalar& color, int lineType = LINE_8, int shift = 0,
                           Point offset = Point() );
                           
第一种：
pts：多边形顶点的数组指针，可以使用二维数组或vector来表示。每个多边形都由一组点组成。
npts：多边形顶点数目的整型数组指针，指定每个多边形的顶点数。
ncontours：多边形数量，即pts和npts数组中多边形的数量。

第二种：
上面三个参数统一为一个数组，存放所有多边形的坐标

color：填充的颜色，可以是 Scalar 类型表示的颜色值。
lineType：线条类型，定义了多边形轮廓的连接方式。默认值为LINE_8。
shift：坐标点的小数位数。默认值为0。
offset：偏移量，添加到所有顶点的坐标中。默认情况下为Point()，表示没有偏移。
```

+ **比较简单和常用的是第二种构造方式，只需要给出所有要绘制的坐标就行。在实际应用中，目标对象的坐标是通过一些方法来捕获的，如`findContours`函数，与之对应的绘制函数还有一个`drawContours()`，后面用实例再一起说明。**

```cpp
#include <opencv2/opencv.hpp>
#include <vector>
#include<iostream>  

using namespace std;

int main()
{
    cv::Mat image(400, 400, CV_8UC3, cv::Scalar(0, 0, 0));
    
    std::vector<cv::Point> points1 = { cv::Point(50, 50), cv::Point(200, 100), cv::Point(150, 200) };
    std::vector<cv::Point> points2 = { cv::Point(250, 250), cv::Point(350, 300), cv::Point(300, 150) };
    std::vector<cv::Point> points3 = { cv::Point(100, 200), cv::Point(200, 300), cv::Point(150, 350) };

    std::vector<std::vector<cv::Point>> polygons;
    polygons.push_back(points1);
    polygons.push_back(points2);
    polygons.push_back(points3);

    cv::fillPoly(image, polygons, cv::Scalar(255, 0, 0));

    cv::imshow("Image", image);
    cv::waitKey(0);
    cv::destroyAllWindows();

    return 0;
}

```

![10](./src/10.png)

> 第二种方法绘制
>
> `drawContours`

```cpp
void drawContours(InputOutputArray image, InputOutputArray contours, InputOutputArray contourIdx, 
int contourColor, Scalar thickness=Scalar(), int lineType=LINE_8, 
InputArray hierarchy = noArray(), int maxLevel = INT_MAX, Point offset = Point() );
```

+ 参数说明：

  + `image`：输出图像，即绘制轮廓后的图像。

  + `contours`：轮廓集合，每个轮廓由一系列点组成。

  + `contourIdx`：轮廓索引数组，指定要绘制哪些轮廓。如果为NULL,则绘制所有轮廓。

  + `contourColor`：轮廓颜色，使用Scalar类型表示。

  + `thickness`：轮廓线宽，默认值为1。

  + `lineType`：轮廓线类型，默认值为LINE_8。

  + `hierarchy`：轮廓层次结构，用于绘制轮廓的父子关系。默认值为`noArray()。`只有在你想要绘制部分轮廓(参见`maxLevel`)时，才需要使用这个参数。

  + `maxLevel`：**表示绘制轮廓的最大层级。如果`maxLevel`为0，则只绘制指定的轮廓；如果`maxLevel`为1，则绘制轮廓及其所有嵌套廓；如果`maxLevel`为2,则绘制轮廓、所有嵌套轮廓、所有嵌套到嵌套的轮廓等。需要注意的是，当存在层次结构时，这个参数才会被考虑。**

  + offset：轮廓点的偏移量，默认值为(0,0)。

```cpp
#include <iostream>
#include <opencv2/opencv.hpp>
 
using namespace cv;
using namespace std;
 
int main()
{
    // 读取灰度图像
    Mat src = imread("./1.png", IMREAD_GRAYSCALE);
    if (src.empty())
    {
        cout << "无法读取图像" << endl;
        return -1;
    }
    imshow("原图", src);
    waitKey(0);
    // 二值化图像
    Mat binary;
    threshold(src, binary, 128, 255, THRESH_BINARY);
    imshow("二值化图", binary);
    waitKey(0);
 
    // 查找轮廓
    vector<vector<Point>> contours;
    vector<Vec4i> hierarchy;
    findContours(binary, contours, hierarchy, RETR_EXTERNAL, CHAIN_APPROX_SIMPLE);
 
    // 绘制轮廓
    Mat result(src.size(), CV_8UC3, Scalar(0, 0, 0));
    for (size_t i = 0; i < contours.size(); i++)
    {
        // 蓝色颜色
        Scalar color(255,0,0); 
        // 只绘制第一层的轮廓
        drawContours(result, contours, static_cast<int>(i), color, 2, LINE_8, hierarchy, 0);
    }
 
    // 显示结果
    imshow("轮廓图", result);
    waitKey(0);
 
    return 0;
}
```

<!-- tabs:end -->

### 15. 随机数和随机颜色

```cpp
void QuickDemo::random_drawing() {
	Mat canvas = Mat::zeros(Size(512, 512), CV_8UC3);
	int w = canvas.cols;
	int h = canvas.rows;
	RNG rng(12345);// 产生随机数，12345产生随机数的种子
	while (true) {
		int c = waitKey(10);
		if (c == 27) { // 退出
			break;
		}
		int x1 = rng.uniform(0, w);
		int y1 = rng.uniform(0, h);
		int x2 = rng.uniform(0, w);
		int y2 = rng.uniform(0, h);
		//canvas = Scalar(0, 0, 0);// 每次绘制一条线，每次绘制之后清屏，擦除画板
		line(canvas,Point(x1,y1),Point(x2,y2),Scalar(rng.uniform(0,255), rng.uniform(0, 255), rng.uniform(0, 255)),1,LINE_AA,0);
		imshow("随机绘制演示", canvas);
	}
}
```

![11](./src/11.png)

### 16. 鼠标操作与响应(ROI区域绘制)

<!-- tabs:start -->

#### **API**

> opencv中使用鼠标事件使用的是鼠标操作相关的回调函数：

```cpp
cv::setMouseCallback(const string& windowname, MouseCallback onMouse, void* userdata=0)
// windowname: 要操作的窗口名称
// onMouse: 鼠标事件函数，鼠标事件发生以后，要执行的回调函数。函数原型是 
// void onMouse(int event, int x, int y, int flags, void * para)
// userdata: 回调函数的参数
```

> 下面是回调函数 " onMouse "

```cpp
void onMouse(int event, int x, int y, int flags, void *para)
// int event: 鼠标事件，见后续说明
// x, y 是鼠标在图像坐标系中的坐标
// flags :
// para： 是用户传递到回调函数中的参数
```

> 其他项目使用涉及到的函数代码：

```cpp
cv::selectROIs("MultiTracker", frame, bboxes_, showCrosshair, fromCenter);
// “MultiTracker” : windowsName
// frame: 当前画面；格式为cv::Mat
// bboxes： 要存储的框框格式为：std::vector<cv::Rect>
// showCrosshair:默认为True
// fromCenter:从中心点还是从对角点，默认为false，为true时，选框从中心点开始
```

#### **参数定义**

>  EVENT:

```cpp
// EVENT的参数定义
enum
{
	CV_EVENT_MOUSEMOVE =0,//滑动
	CV_EVENT_LBUTTONDOWN =1,//左键点击
	CV_EVENT_RBUTTONDOWN =2,//右键点击
	CV_EVENT_MBUTTONDOWN =3,//中键点击
	CV_EVENT_LBUTTONUP =4,//左键放开
	CV_EVENT_RBUTTONUP =5,//右键放开
	CV_EVENT_MBUTTONUP =6,//中键放开
	CV_EVENT_LBUTTONDBLCLK =7,//左键双击
	CV_EVENT_RBUTTONDBLCLK =8,//右键双击
	CV_EVENT_MBUTTONDBLCLK =9//中键双击
};
```

> flags:

```cpp
enum
{
    CV_EVENT_FLAG_LBUTTON =1,//左键拖拽
    CV_EVENT_FLAG_RBUTTON =2,//右键拖拽
    CV_EVENT_FLAG_MBUTTON =4,//中键拖拽
    CV_EVENT_FLAG_CTRLKEY =8,//按CTRL不放
    CV_EVENT_FLAG_SHIFTKEY =16,//按SHIFT不放
    CV_EVENT_FLAG_ALTKEY =32//按ALT不放
};
```

#### **案列**

```cpp
Point sp(-1,-1);// 开始的位置
Point ep(-1, -1); // 结束的位置
Mat temp;// 保存原图
static void on_draw(int event, int x, int y, int flags, void *userdata) {
	Mat image = *((Mat*)userdata);
	if (event == EVENT_LBUTTONDOWN) {
		sp.x = x;
		sp.y = y;
	}
	else if (event == EVENT_LBUTTONUP) {
		ep.x = x;
		ep.y = y;
		int dx = ep.x - sp.x;
		int dy = ep.y - sp.y;
		if (dx > 0 && dy > 0) {
			Rect box(sp.x, sp.y, dx, dy);
            temp.copyTo(image);
			imshow("ROI区域", image(box));
			rectangle(image, box, Scalar(0, 0, 255), 2, 8, 0);
			imshow("鼠标绘制", image);
			// 为下一次绘制做初始化
			sp.x = -1;
			sp.y = -1;
		}
	}
	else if (event == EVENT_MOUSEMOVE) {
		if (sp.x > 0 && sp.y > 0) {
			ep.x = x;
			ep.y = y;
			int dx = ep.x - sp.x;
			int dy = ep.y - sp.y;
			if (dx > 0 && dy > 0) {
				Rect box(sp.x, sp.y, dx, dy);
				temp.copyTo(image);
				rectangle(image, box, Scalar(0, 0, 255), 2, 8, 0);
				imshow("鼠标绘制", image);
			}
		}
	}
}
void QuickDemo::mouse_demo(Mat &image) {
	namedWindow("鼠标绘制", WINDOW_AUTOSIZE);
	setMouseCallback("鼠标绘制", on_draw,(void*)(&image));
	imshow("鼠标绘制", image);
	temp = image.clone();
}
```

<!-- tabs:end -->

### 17. 图像数据类型转化和归一化

