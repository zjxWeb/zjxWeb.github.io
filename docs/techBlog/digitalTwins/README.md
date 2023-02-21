# 
# Unity3d（webGL）构建数字孪生小案例
先来看看概念吧：

数字孪生体是现有或将有的物理实体对象的数字模型，

通过实测、仿真和数据分析来实时感知、诊断、预测物理实体对象的状态，

通过优化和指令来调控物理实体对象的行为，

通过相关数字模型间的相互学习来进化自身，

同时改进利益相关方在物理实体对象生命周期内的决策。

项目介绍：

重点来了！重点来了！重点来了！

    本项目是一个小的demo但是项目是一个完整的系统，设计到硬件、建模、前端、后端、数据库的开发，有点可惜的是——没有加入机器学习和计算机视觉相关的东西，自己正在学，希望后面可以更加完善，主要解决问题就是硬件、软件、数据库、建模的模型之间的数据交互，以及unity3d建模完成后如何在web上运行等一系列问题。

  


>  
> 本demo具有完整的代码，有简化的代码已上传到csdn上：已上传到CSDN：https://download.csdn.net/download/qq_44891434/86543456，可以自行提取，为简化版的，把多余的模块去掉了，如果想要完整版的可以关注微信公众号：“拼搏的小浣熊”，里面有我的联系方式，私聊我，私发。

 


构思：unity3d建模之后生成webGL格式，然后利用vue来进行二次开发，并在web端继续展示，模型可以和后端以及硬件之间可以做到实施的数据交互，彻底打通 硬件<--->模型<--->前端<----> 后端 <---> 数据库。

技术选型：

```
1. 建模：unity3d+C#

2. 前端：webGL，Vue全家桶

3. 服务端：Node.js(express.js)

4. 数据库：关系型数据库MySQL

5. 硬件：NodeMCU
```

界面截图：

登录界面：
![登录页面](./src/1.png)

主页面：

![在这里插入图片描述](./src/2.png)
就业界面：
![在这里插入图片描述](./src/3.png)




其余界面暂不展示。

使用到的工具和软件：

    建模使用的软件：QGIS、Blender、C4D、unity
    
    开发工具：VsCode、VS2020
    
    环境配置软件：小皮面板
# unity 3d与服务器以及数据库进行数据交互！！！（UnityWebRequest）
+ 数字孪生最重要的一步便是数据的通信，这里的数据通信包含了，数字模型和物理模型之间的通信。而对于数字模型在前面的介绍（[跳转前面介绍的](https://mp.weixin.qq.com/s?__biz=Mzg5MDU5ODk2OQ==&mid=2247484300&idx=1&sn=dffe183e5258ed6d607e2fd34b19e168&chksm=cfdb60daf8ace9cc8b378bd22c8cc5411d16e5254e395a0c50cbfdcc78f5d4020a684c9f12c7#rd)），我们采用的是unity3d来完成的，当然这里介绍的数据交互，重要也是以unity3d来介绍，但是大致的思想和原理都是一样的。下面简单做个介绍： 
+ 这里是我的理解，如果有错误的地方还请大家指出来，一起交流，学习。在unity 3d中自己采用的是C#脚本来完成。采用的是API的方式，类似与web的数据交互，也是通过搭建后端服务，然后后端服务将从数据库取出来的数据进行处理，在以API的形式，发送到前端，这时候前端只需要请求这个地址，并传对应的参数，即可完成数据的交互。
+ **这里是代码，大家参考一下，过程比较简单，就不画图了，如果需要可以在评论区，回复，根据情况在画！**
```
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.Networking;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public class http : MonoBehaviour
{
    public float speed = 0.1f;

    //private int degree;
    public string rssTitle;
    public GameObject LightObj;
    public Light LightCon;
    void Start()
    {
        //StartCoroutine(GetTexture());
        LightCon = LightObj.GetComponent<Light>();
        InvokeRepeating("doSomething", 0, 2);
    }
    void doSomething()
    {
       StartCoroutine(GetTexture());
    }
    IEnumerator GetTexture()
    {
       
        UnityWebRequest www = UnityWebRequest.Get("http://127.0.0.1:3000/day");
        yield return www.SendWebRequest();
        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            // 将结果显示为文本
            string product = www.downloadHandler.text;
            JObject rss = JObject.Parse(product);
            rssTitle = (string)rss["result"][0]["day"];
            if (rssTitle == "1")
            {
                LightCon.enabled = false;
                 Debug.Log("1");
            }
            if (rssTitle == "0")
            {
                LightCon.enabled = true;
                Debug.Log("0");
            }
            // 或者以二进制数据格式检索结果
            byte[ ] results = www.downloadHandler.data;
        }
    }
}
```