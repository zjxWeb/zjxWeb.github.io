## 小度低成本智能小灯，超简单，一起看看，改造一下

> 低成本做一个小度智能小灯，还可以看温湿度哦。

<iframe src="https://www.bilibili.com/video/BV1j2WyzAEUL/?vd_source=97f1d2f43cfb254aee6535dca8f8f4ee#reply115406693991686" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="height:80vh;"> </iframe> 

+ 上面的视频为具体的功能实现，大家可以在B站进行观看。

> **硬件烧录可以点击**[此链接](/projectPractice/digitalTwinsProject/smartCity/)

### 源码

```c++
#include <ESP8266WiFi.h>
#include <SimpleDHT.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

//------------------ OLED 屏幕配置 ------------------
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

//------------------ WiFi 和 巴法云配置 ------------------
#define TCP_SERVER_ADDR "bemfa.com"
#define TCP_SERVER_PORT "8344"
#define WIFI_SSID "CMCC-5Xkw"
#define WIFI_PASS "ghmffu66"

//------------------ 巴法云主题 ------------------
String UID = "注册巴法云后可以看到了！";
String TOPIC_DHT = "10004";    // 温湿度主题
String TOPIC_RELAY = "10001"; // 继电器控制主题

//------------------ DHT11 配置 ------------------
const int DHT_PIN = D2;
SimpleDHT11 dht11(DHT_PIN);

//------------------ I2C引脚定义 ------------------
#define SDA_PIN D3
#define SCL_PIN D4

//------------------ 继电器配置 ------------------
#define RELAY_PIN D1
bool relayState = false; // 当前继电器状态（false=关, true=开）

//------------------ 定时参数 ------------------
#define UPDATE_INTERVAL 2000 // 2秒更新一次
#define MAX_PACKETSIZE 512

WiFiClient TCPclient;
String TcpClient_Buff = "";
unsigned int TcpClient_BuffIndex = 0;
unsigned long lastUpdateTick = 0;
unsigned long preHeartTick = 0;
unsigned long preTCPStartTick = 0;
bool preTCPConnected = false;

//------------------ 函数声明 ------------------
void startWiFi();
void doWiFiTick();
void startTCPClient();
void doTCPClientTick();
void sendToServer(String p);
void updateDisplay(byte temperature, byte humidity);
void initOLED();
void handleTCPMessage(String msg);
void controlRelay(bool state);

//------------------ 初始化 OLED ------------------
void initOLED() {
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("OLED 初始化失败"));
    for (;;);
  }
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(10, 20);
  display.println("Starting...");
  display.display();
  delay(1500);
  display.clearDisplay();
}

//------------------ 更新OLED显示 ------------------
void updateDisplay(byte temperature, byte humidity) {
  display.clearDisplay();

  // 温度
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.print("T: ");
  display.print(temperature);
  display.println("C");

  // 湿度
  display.setCursor(0, 30);
  display.print("H: ");
  display.print(humidity);
  display.println("%");

  // 状态栏
  display.setTextSize(1);
  display.setCursor(0, 55);
  display.print(WiFi.status() == WL_CONNECTED ? "WiFi OK " : "WiFi...");
  display.print(preTCPConnected ? " | TCP OK" : " | TCP...");
  display.display();
}

//------------------ 控制继电器 ------------------
// 假设为低电平触发：LOW=开, HIGH=关
void controlRelay(bool state) {
  relayState = state;
  digitalWrite(RELAY_PIN, relayState ? LOW : HIGH); // 低电平触发
  Serial.println(relayState ? "🔌 继电器：开启" : "⚡ 继电器：关闭");
}

//------------------ 发送数据到巴法云 ------------------
void sendToServer(String p) {
  if (!TCPclient.connected()) {
    Serial.println("TCP未连接，无法发送");
    return;
  }
  TCPclient.print(p);
  Serial.println("[发送] => " + p);
}

//------------------ 建立TCP连接 ------------------
void startTCPClient() {
  Serial.println("尝试连接巴法云...");
  if (TCPclient.connect(TCP_SERVER_ADDR, atoi(TCP_SERVER_PORT))) {
    Serial.println("连接成功！");
    // 订阅温湿度主题
    String subStr = "cmd=1&uid=" + UID + "&topic=" + TOPIC_DHT + "\r\n";
    sendToServer(subStr);
    // 订阅继电器主题
    subStr = "cmd=1&uid=" + UID + "&topic=" + TOPIC_RELAY + "\r\n";
    sendToServer(subStr);

    preTCPConnected = true;
    preHeartTick = millis();
    TCPclient.setNoDelay(true);
  } else {
    Serial.println("连接失败，重试中...");
    TCPclient.stop();
    preTCPConnected = false;
  }
  preTCPStartTick = millis();
}

//------------------ WiFi连接 ------------------
void startWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.println("正在连接WiFi...");
}

//------------------ WiFi状态检查 ------------------
void doWiFiTick() {
  static bool startSTAFlag = false;
  static bool tcpStarted = false;

  if (!startSTAFlag) {
    startWiFi();
    startSTAFlag = true;
  }

  if (WiFi.status() == WL_CONNECTED) {
    if (!tcpStarted) {
      Serial.print("WiFi已连接，IP地址：");
      Serial.println(WiFi.localIP());
      startTCPClient();
      tcpStarted = true;
    }
  } else {
    tcpStarted = false;
  }
}

//------------------ 解析巴法云消息 ------------------
void handleTCPMessage(String msg) {
  msg.trim();
  Serial.println("[收到] => " + msg);

  // 检测是否为继电器主题
  if (msg.indexOf(TOPIC_RELAY) != -1) {
    if (msg.indexOf("on") != -1) {
      controlRelay(true);
    } else if (msg.indexOf("off") != -1) {
      controlRelay(false);
    }
  }
}

//------------------ TCP通信检查与数据上报 ------------------
void doTCPClientTick() {
  if (WiFi.status() != WL_CONNECTED) return;

  if (!TCPclient.connected()) {
    if (preTCPConnected) {
      preTCPConnected = false;
      TCPclient.stop();
      Serial.println("TCP断开，尝试重连...");
      preTCPStartTick = millis();
    } else if (millis() - preTCPStartTick > 1000) {
      startTCPClient();
    }
  } else {
    // 接收服务器消息
    while (TCPclient.available()) {
      char c = TCPclient.read();
      if (TcpClient_BuffIndex < MAX_PACKETSIZE) {
        TcpClient_Buff += c;
        TcpClient_BuffIndex++;
      }
      if (c == '\n') {
        handleTCPMessage(TcpClient_Buff);
        TcpClient_Buff = "";
        TcpClient_BuffIndex = 0;
      }
    }

    // 定时上报温湿度
    if (millis() - lastUpdateTick >= UPDATE_INTERVAL) {
      lastUpdateTick = millis();
      byte temperature = 0;
      byte humidity = 0;
      if (dht11.read(&temperature, &humidity, NULL) == SimpleDHTErrSuccess) {
        String payload = "cmd=2&uid=" + UID + "&topic=" + TOPIC_DHT +
                         "&msg=#" + String(temperature) + "#" + String(humidity) + "#"
                         + (relayState ? "on" : "off") + "#\r\n";
        sendToServer(payload);
        updateDisplay(temperature, humidity);
      } else {
        Serial.println("读取DHT11失败");
      }
    }
  }
}

//------------------ setup 初始化 ------------------
void setup() {
  Serial.begin(115200);
  Wire.begin(SDA_PIN, SCL_PIN);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, HIGH); // 默认关闭继电器（高电平）
  controlRelay(false); // 同步状态
  initOLED();
  startWiFi();
}

//------------------ 主循环 ------------------
void loop() {
  doWiFiTick();
  doTCPClientTick();
}
```

