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