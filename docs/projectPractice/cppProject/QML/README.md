## 创建项目

1. ![1](./src/1.png)
2. ![2](./src/2.png)
3. ![3](./src/3.png)

> 剩下的就是一路`下一步`即可

## 添加静态资源——图片

1. ![4](./src/4.png)

2. ![5](./src/5.png)

3. 添加之后完成之后的路径
   
   ![6](./src/6.png)

## 案列 || demo

### 1. 文本省略号

```qml
Text {
    width: 100
    text: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    elide: Text.ElideRight
}
```

### 2. `Canvas`画圆角

> 针对项目当中要有矩形中不同地方的圆角，这样就需要使用 `Canvas`来进行绘制一下就是针对圆角的绘制

```c++
import QtQuick
import QtQuick.Controls 2.15

Window {
    visible: true
    width: 1000
    height: 900
        Canvas {
        id: canvas
        anchors.fill: parent

        onPaint: {
            var ctx = getContext("2d");
            // 渐变色的设置
            var gradient = ctx.createLinearGradient(x,y+height,x+width,y+height)
            gradient.addColorStop(0.0, "#191919")
            gradient.addColorStop(1.0, "#272829")
            var x = 50;
            var y = 50;
            var width = 200;
            var height = 100;
            var cornerSize = 20;
            // 左下
            // ctx.beginPath();
            // ctx.moveTo(x + cornerSize, y);
            // ctx.lineTo(x + width, y);
            // ctx.lineTo(x + width, y + height);
            // ctx.arcTo(x + width, y + height, x + width - cornerSize, y + height, cornerSize);
            // ctx.lineTo(x + cornerSize, y + height);
            // ctx.arcTo(x, y + height, x, y + height - cornerSize, cornerSize);
            // ctx.lineTo(x, y + cornerSize);
            // ctx.lineTo(x, y);
            // ctx.closePath();

            // 带圆角的矩形
            // ctx.beginPath();
            // ctx.moveTo(x + cornerSize, y);
            // ctx.arcTo(x + width, y, x + width, y + cornerSize, cornerSize);//右上
            // ctx.lineTo(x + width, y + height - cornerSize);
            // ctx.arcTo(x + width, y + height, x + width - cornerSize, y + height, cornerSize);//右下
            // ctx.lineTo(x + cornerSize, y + height);
            // ctx.arcTo(x, y + height, x, y + height - cornerSize, cornerSize);//左下
            // ctx.lineTo(x, y + cornerSize);
            // ctx.arcTo(x, y, x + cornerSize, y, cornerSize);// 左上
            // ctx.closePath();

            // 右上+左上
            // ctx.beginPath();
            // ctx.moveTo(x + cornerSize, y);
            // ctx.arcTo(x + width, y, x + width, y + cornerSize, cornerSize);//右上
            // ctx.lineTo(x + width, y + height);
            // ctx.lineTo(x + cornerSize, y + height);
            // ctx.lineTo(x, y + height);
            // ctx.arcTo(x, y, x + cornerSize, y, cornerSize);// 左上
            // ctx.closePath();

            // 右下
            ctx.beginPath();
            ctx.moveTo(x + cornerSize, y);
            ctx.lineTo(x + width, y);
            ctx.lineTo(x + width, y + height - cornerSize);
            ctx.arcTo(x + width, y + height, x + width - cornerSize, y + height, cornerSize);//右下
            ctx.lineTo(x + width, y + height);
            ctx.lineTo(x, y + height);
            ctx.lineTo(x, y);


            ctx.closePath();

            ctx.fillStyle = gradient;
            ctx.strokeStyle = 'transparent';// 边框
            ctx.fill();
            ctx.stroke();
        }
    }
}
```

### 3.  关闭按钮

```qml
import QtQuick
import QtQuick.Controls 2.15

Window {
    width: 640
    height: 480
    visible: true
    title: qsTr("Hello World")
    Canvas {
    id: canvas
    anchors.fill: parent

        onPaint: {
            var ctx = getContext("2d");

            // 定义矩形位置和大小
            var rectX = 0;
            var rectY = 0;
            var rectWidth = 59;
            var rectHeight = 59;

            // 定义圆弧半径
            var arcRadius = 8;

            // 计算圆弧位置
            var arcX = rectX + rectWidth;//109
            var arcY = rectY// 50
            var arcStartX = arcX + arcRadius;//117
            var arcStartY = rectY;//50
            var arcEndX = arcStartX; //117
            var arcEndY = arcStartY + arcRadius;// 58r
            console.log(arcX,arcY,arcStartX,arcStartY,arcEndX,arcEndY)

            // 绘制矩形
            ctx.fillStyle = "#000000";

            // 绘制右上角圆弧
            ctx.beginPath();
            ctx.moveTo(rectX, rectY);// 50 50
            ctx.lineTo(arcX, arcY);// 109 50
            ctx.arcTo(arcStartX, arcStartY, arcEndX, arcEndY, arcRadius);
            ctx.lineTo(arcEndX, arcEndY);
            ctx.lineTo(arcEndX, rectY + rectHeight);
            ctx.lineTo(rectX, rectY + rectHeight);
            ctx.closePath();
            ctx.fill();
            // 计算 X 图标的位置
            var xIconSize = 20;
            var xIconX = rectX + 3　+ (rectWidth - xIconSize) / 2;
            var xIconY = rectY + (rectHeight - xIconSize) / 2;

            // 绘制 X 关闭图标
            ctx.beginPath();
            ctx.moveTo(xIconX, xIconY);
            ctx.lineTo(xIconX + xIconSize, xIconY + xIconSize);
            ctx.moveTo(xIconX + xIconSize, xIconY);
            ctx.lineTo(xIconX, xIconY + xIconSize);
            ctx.strokeStyle = Qt.rgba(255, 255, 255, 0.7);
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }
}
```

![](./src/8.png)

### 4. QT 进度条放`gif`

```cpp
#include <QApplication>
#include <QProgressBar>
#include <QPropertyAnimation>
#include <QPixmap>
#include <QMovie>
#include <QLabel>


int main(int argc, char *argv[])
{

    QApplication a(argc, argv);

    QProgressBar progressBar;
    QLabel label(&progressBar);
    QMovie movie(":/tenor-1.gif");  // 从资源中加载 GIF 图片
    label.setMovie(&movie);
    movie.start();

    progressBar.show();

    return a.exec();
}

```

>  效果就是导航栏上放一个gif图片的动态效果，当然加载 `gif`的相关东西也是可以参考；

### QT进度条加入css属性

```cpp
#include <QApplication>
#include <QProgressBar>
#include <QTimer>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);

    QProgressBar progressBar;
    progressBar.setRange(0, 100); // 设置进度条范围为 0 到 100

    QTimer timer;
    int progress = 0;

    // 每隔一段时间更新进度条的值，模拟加载过程
    QObject::connect(&timer, &QTimer::timeout, [&](){
        progress += 1;
        progressBar.setValue(progress);

        if (progress >= 100) {
            timer.stop();
        }
    });

    timer.start(100); // 每100毫秒更新一次进度条

    // 设置进度条的样式，使其具有流动的效果
    progressBar.setStyleSheet("QProgressBar { border: 2px solid grey; border-radius: 5px; text-align: center; }"
                              "QProgressBar::chunk { background-color: #37c9e1; width: 20px; margin: 1px; }");

    progressBar.show();

    return a.exec();
}

```

![](./src/9.png)

## 属性

### implicitWidth

> 是指一个组件在没有显示设置宽度所具有的默认宽度。

```qml
Item {
      property alias icon: image.source
      property alias label: text.text
      implicitWidth: text.implicitWidth + image.implicitWidth
      implicitHeight: Math.max(text.implicitHeight, image.implicitHeight)
      Image { id: image }
      Text {
          id: text
          wrapMode: Text.Wrap
          anchors.left: image.right; anchors.right: parent.right
          anchors.verticalCenter: parent.verticalCenter
      }
  }
```

### vision

> qml当中的vision表示当前组件的可见性，当为 `false`的时候只是表示当前组件不显示，但是当前组件在布局中还是存在的；（相当于vue中的 `v-show`）

+ 在 QML 中，要实现类似 Vue.js 中 v-if 的功能，即根据条件动态创建或销毁组件，可以使用 Loader 组件。Loader 组件可以根据条件动态加载指定的 QML 组件，并在不需要时卸载该组件，从而实现类似 v-if 的效果。
+ 以下是一个简单的示例，演示如何在 QML 中使用 Loader 实现类似 v-if 的功能

```c++
import QtQuick 2.15
import QtQuick.Controls 2.15

Item {
    width: 200
    height: 200

    property bool showComponent: false

    Loader {
        id: componentLoader
        sourceComponent: showComponent ? componentA : null
    }

    Component {
            id: componentA
            Rectangle {
            width: 100
            height: 100
            color: "red"
        }
    }

    Button {
        text: "Toggle Component"
        onClicked: showComponent = !showComponent
    }
}
```

+ 在上面的示例中，我们定义了一个 Loader 组件，根据 showComponent 属性的值来加载或卸载 componentA 组件。当 showComponent 为 true 时，componentA 被加载并显示；当 showComponent 为 false 时，componentA 被卸载。
+ 通过点击按钮，可以动态切换 showComponent 属性的值，从而实现类似 v-if 的效果。 
+ 这种方法可以让你在 QML 中根据条件动态加载组件，实现类似于 Vue.js 中 v-if 的功能。

### 布局

#### Row 行布局

> 当你把一个Item交给Row来管理，那就不要在使用 `Item` 的 `x、y、anchors`等属性

> 在一个Row内的 `Item`，可以使用`Poistioner`附加属性来获知自己在 `Row`中的详细位置信息。 `Positioner` 有 `index、isFirstItem、isLastItem`

```qml
Row {
    spacing: 2
    Rectangle { color: "red"; width: 50; height: 50 }
    Rectangle { color: "green"; width: 20; height: 50 }
    Rectangle { color: "blue"; width: 50; height: 20 }
}
```

#### Colomun 用法和Row基本一样

#### Grid

> Grid 在一个网格上安置它的子Item，他会创建一个一个拥有很多单元格的网格——从左到右，从上到下把它的子Item一个个塞到单元格里。

> Item 默认会被放到一个单元格左上角，即（0,0）位置

```qml
Grid {
      columns: 3
      spacing: 2
      Rectangle { color: "red"; width: 50; height: 50 }
      Rectangle { color: "green"; width: 20; height: 50 }
      Rectangle { color: "blue"; width: 50; height: 20 }
      Rectangle { color: "cyan"; width: 50; height: 50 }
      Rectangle { color: "magenta"; width: 10; height: 10 }
  }
```

![7](./src/7.png)

#### Flow

> Flow其实和Grid类似，不同之处是它没有显示的行、列数，`它会计算子item的尺寸，然后与自身尺寸比较，按需折行`

> `Flow`的 `flow`属性，默认取值 `Flow.LeftToRight`,从左到右安排Item，知道Flow本身的宽度不能容纳新的子Item时折行；

```qml
 Flow {
     anchors.fill: parent
     anchors.margins: 4
     spacing: 10
     Text { text: "Text"; font.pixelSize: 40 }
     Text { text: "items"; font.pixelSize: 40 }
     Text { text: "flowing"; font.pixelSize: 40 }
     Text { text: "inside"; font.pixelSize: 40 }
     Text { text: "a"; font.pixelSize: 40 }
     Text { text: "Flow"; font.pixelSize: 40 }
     Text { text: "item"; font.pixelSize: 40 }
 }
```

#### X，Y 定位

> 在qml中的X，Y定位相对于web中的absolute定位

+ 这种定位的位置，是`相对于它的父级元素而言的，x，y,`而不是相对于 全局的 `window`来定位的，重要！重要！重要！
