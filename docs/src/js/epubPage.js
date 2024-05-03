// 创建一个名为DIVComponent的组件
class DIVComponent extends HTMLElement {
    constructor() {
        super();
        function epubBookDisplay(url,epubShow){
            // 创建外部div容器  
            var containerDiv = document.createElement('div');  
            containerDiv.style.width = '250px';  
            containerDiv.style.margin = 'auto';  
            containerDiv.style.paddingBottom = '10px';  
            containerDiv.style.position = 'fixed';
            containerDiv.style.left = '40%';
            containerDiv.style.top = '0px';
          
            // 创建背景色输入框  
            var backcolorInput = document.createElement('input');  
            backcolorInput.type = 'color';  
            backcolorInput.value = '#ffffff';
            backcolorInput.id = 'backcolor';  
            backcolorInput.style.position = 'fixed';
            backcolorInput.style.left = '0px';
            backcolorInput.style.top = '0px';
            //添加onchange事件
            backcolorInput.onchange = backcolor;
          
            // 创建字体颜色输入框  
            var textcolorInput = document.createElement('input');  
            textcolorInput.type = 'color';  
            textcolorInput.value = '#000000';  
            textcolorInput.id = 'textcolor';
            textcolorInput.onchange = backcolor;
          
            // 包裹字体变化的div
            var fontChangeDiv = document.createElement('div');
            fontChangeDiv.style.width = '450px';
            fontChangeDiv.style.margin = 'auto';
            fontChangeDiv.style.paddingBottom = '50px';
            fontChangeDiv.style.position = 'fixed';
            fontChangeDiv.style.left = '40%';
            fontChangeDiv.style.top = '0px';
          
            // 创建字体缩小按钮  
            var smallFont = document.createElement('button');
            smallFont.textContent = '字体小';
            smallFont.id = 'smallFontChange';
            smallFont.style.display = "block";
            smallFont.style.position = "fixed";
            smallFont.style.right = "1vw";
            smallFont.style.top = "54vh";
            smallFont.style.width = "65px";
            smallFont.style.height = "35px";
            smallFont.style.background = "#29a9e0cf";
            smallFont.style.color = "#ffffff";
            smallFont.style.borderRadius = "15px";
            smallFont.style.fontSize = "15px";
            smallFont.style.color = "rebeccapurple";
            smallFont.style.fontWeight = "600";
            smallFont.style.lineHeight = "20px";
            smallFont.style.textAlign = "center";
            smallFont.style.cursor = "pointer";
          
            // 字体放大
            var bigFont = document.createElement('button');
            bigFont.textContent = '字体大';
            bigFont.id = 'bigFontChange';
            bigFont.style.display = "block";
            bigFont.style.position = "fixed";
            bigFont.style.right = "1vw";
            bigFont.style.top = "50vh";
            bigFont.style.width = "65px";
            bigFont.style.height = "35px";
            bigFont.style.background = "#29a9e0cf";
            bigFont.style.color = "#ffffff";
            bigFont.style.borderRadius = "15px";
            bigFont.style.fontSize = "15px";
            bigFont.style.color = "rebeccapurple";
            bigFont.style.fontWeight = "600";
            bigFont.style.lineHeight = "20px";
            bigFont.style.textAlign = "center";
            bigFont.style.cursor = "pointer";
            
          
            // 添加文本标签  
            var backcolorLabel = document.createElement('label');  
            backcolorLabel.textContent = '背景色:';  
            var textcolorLabel = document.createElement('label');  
            textcolorLabel.textContent = '字体颜色:';  
          
            function backcolor(){
                console.log("saadfasdf")
          
                var zhuti = {
                    name: "123",
                    style: {
                        body: {
                            color:  $("#textcolor").val(),
                            background: $("#backcolor").val(),
                        },
                    },
                }
                console.log(zhuti)
          
                themes.register(zhuti.name, zhuti.style);
          
                themes.select(zhuti.name);
          
            }
          
            // 字体变化
            var fontSize = 16;
            bigFont.addEventListener("click", function () {
                fontSize = fontSize+1
                themes.fontSize(fontSize+"px")
            });
            smallFont.addEventListener("click", function () {
                fontSize = fontSize-1
                themes.fontSize(fontSize+"px")
            });
            
          
            
            //上一页
            var prevPageBtn = document.createElement("button");
            prevPageBtn.innerHTML = "上一页";
            prevPageBtn.addEventListener("click", function() {
                rendition.prev();
            });
            prevPageBtn.style.position = "fixed";
            prevPageBtn.style.right = "1vw";
            prevPageBtn.style.bottom = "195px";
            prevPageBtn.style.width = "65px";
            prevPageBtn.style.height = "35px";
            prevPageBtn.style.background = "#29a9e0cf";
            prevPageBtn.style.color = "#ffffff";
            prevPageBtn.style.borderRadius = "15px";
            prevPageBtn.style.fontSize = "15px";
            prevPageBtn.style.color = "rebeccapurple";
            prevPageBtn.style.fontWeight = "600";
            prevPageBtn.style.lineHeight = "20px";
            prevPageBtn.style.textAlign = "center";
            prevPageBtn.style.cursor = "pointer";
          
            //下一页
            var nextPageBtn = document.createElement("button");
            nextPageBtn.innerHTML = "下一页";
            nextPageBtn.addEventListener("click", function() {
                rendition.next();
            });
            nextPageBtn.style.position = "fixed";
            nextPageBtn.style.right = "1vw";
            nextPageBtn.style.bottom = "155px";
            nextPageBtn.style.width = "65px";
            nextPageBtn.style.height = "35px";
            nextPageBtn.style.background = "#29a9e0cf";
            nextPageBtn.style.color = "#ffffff";
            nextPageBtn.style.borderRadius = "15px";
            nextPageBtn.style.fontSize = "15px";
            nextPageBtn.style.color = "rebeccapurple";
            nextPageBtn.style.fontWeight = "600";
            nextPageBtn.style.lineHeight = "20px";
            nextPageBtn.style.textAlign = "center";
            nextPageBtn.style.cursor = "pointer";
          
            // 加载图书
            var book = ePub(url);
            var rendition = book.renderTo(epubShow, {
                // 默认双页显示
                width: '95%',
                height: '95%',
                // 单页滚动显示epub，推荐加上下面两个属性
                // manager: "continuous",
                // flow: "scrolled"
            });
            console.log("rendition", rendition);
            var themes = rendition.themes;
            console.log("themes",themes);
            rendition.display();
            book.ready.then(function () {
                var toc = book.navigation.toc;
                console.log("toc",toc);
            });
          
            // 将标签和输入框添加到容器中  
            epubShow.appendChild(containerDiv);
            epubShow.appendChild(fontChangeDiv);
            epubShow.appendChild(prevPageBtn);
            epubShow.appendChild(nextPageBtn);
            // containerDiv.appendChild(backcolorLabel);  
            // containerDiv.appendChild(backcolorInput);  
            // containerDiv.appendChild(document.createElement('br')); // 可选，添加换行  
            // containerDiv.appendChild(textcolorLabel);  
            // containerDiv.appendChild(textcolorInput);  
            fontChangeDiv.appendChild(smallFont);
            fontChangeDiv.appendChild(bigFont);
          }
          var shadow = this.attachShadow({ mode: 'open' });
          // 创建一个按钮元素
          var button = document.createElement('button');
          let  butTex = 'Show PDF'
          // 好看的渐变背景色
          button.style.backgroundColor = 'LightSkyBlue';
          // button.style.width = '10vw';
          button.style.height = '5vh';
          button.innerText = butTex;
          button.borderRadius = "30px"
          // 鼠标放上去显示小手,并改变背景色
          button.addEventListener('mouseover', () => {
              button.style.cursor = 'pointer';
              button.style.backgroundColor = 'DeepSkyBlue';
          });
          // 移出鼠标恢复原样
          button.addEventListener('mouseout', () => {
              button.style.cursor = 'default';
              button.style.backgroundColor = 'LightSkyBlue';
          });
          var dialog = document.createElement('dialog');
          dialog.style.width = "100vw";
          dialog.style.height = "100vh";
        //   dialog.style.backgroundColor = "rgba(0,0,0,0.5)"
          dialog.style.dialog = "none"
          dialog.style.zIndex = "9999"
          dialog.style.position = "fixed"
          dialog.style.top = "0"
          dialog.style.left = "0"
        // 获取传入的src属性值
        var btnsrc = this.getAttribute('src');
        button.setAttribute('src', btnsrc);

        var divShow = document.createElement('div');
      
        divShow.setAttribute('src', btnsrc);
        divShow.style.width = '100%';
        divShow.style.height = '100%';

        button.addEventListener('click', () => {
          // 将标签和输入框添加到容器中  
          epubBookDisplay(btnsrc,divShow)
          dialog.style.display = "block"
          dialog.appendChild(divShow);
          shadow.appendChild(dialog);
      });

        // 右下角关闭按钮
        // 创建一个按钮元素
        var btn = document.createElement("button");
        // 设置按钮的文本
        btn.innerText = "关闭";

        // 样式
        btn.style.display = "block";
        btn.style.position = "fixed";
        btn.style.right = "1vw";
        btn.style.bottom = "110px";
        btn.style.width = "65px";
        btn.style.height = "35px";
        btn.style.background = "#29a9e0cf";
        btn.style.color = "#ffffff";
        btn.style.borderRadius = "15px";
        btn.style.fontSize = "16px";
        btn.style.color = "rebeccapurple";
        btn.style.fontWeight = "600";
        btn.style.lineHeight = "20px";
        btn.style.textAlign = "center";
        btn.style.cursor = "pointer";
        dialog.appendChild(btn)
        btn.addEventListener('click', () => {
            dialog.style.display = "none"
            location.reload();
        })

        shadow.appendChild(button);

        // 截取btnsrc中的文件名字，传递给按钮的文本butTex
        // 从./src/pdf/stl.pdf 中截取出文件名字stl
        butTex = btnsrc.substring(btnsrc.lastIndexOf('/') + 1, btnsrc.lastIndexOf('.'));
        console.log(butTex)
        button.innerText = butTex
        }
    }
  
  // 定义组件标签名
    customElements.define('div-component', DIVComponent);