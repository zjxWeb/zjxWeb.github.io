// 创建一个名为IFrameComponent的组件
class IFrameComponent extends HTMLElement {
  constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      // 创建一个按钮元素
      const button = document.createElement('button');
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

      const dialog = document.createElement('dialog');
      dialog.style.width = "100vw";
      dialog.style.height = "100vh";
      dialog.style.backgroundColor = "rgba(0,0,0,0.5)"
      dialog.style.dialog = "none"
      dialog.style.zIndex = "9999"
      dialog.style.position = "fixed"
      dialog.style.top = "0"
      dialog.style.left = "0"


      // 获取传入的src属性值
      const btnsrc = this.getAttribute('src');
      button.setAttribute('src', btnsrc);

      // 创建iframe元素
      const iframe = document.createElement('iframe');
      // 点击上方按钮弹出框，并且带关闭按钮X
      button.addEventListener('click', () => {
          dialog.style.display = "block"
          dialog.appendChild(iframe);
          shadow.appendChild(dialog);
      });

    
      iframe.setAttribute('src', btnsrc);
      iframe.style.position = "absolute"
      iframe.style.top = "0"
      iframe.style.left = "0"
      iframe.style.width = '100%';
      iframe.style.height = '100%';

      // 右下角关闭按钮
      // 创建一个按钮元素
      var btn = document.createElement("button");
      // 设置按钮的文本
      btn.innerText = "关闭";

      // 样式
      btn.style.display      = "block";
      btn.style.position     = "fixed";
      btn.style.right        = "0";
      btn.style.bottom       = "110px";
      btn.style.width        = "65px";
      btn.style.height       = "35px";
      btn.style.background   = "#29a9e0cf";
      btn.style.color        = "rebeccapurple";
      btn.style.borderRadius = "15px";
      btn.style.fontSize     = "16px";
      btn.style.fontWeight   = "600";
      btn.style.lineHeight   = "20px";
      btn.style.textAlign    = "center";
      btn.style.cursor       = "pointer";
      btn.style.zIndex       = "10002";  // ← add this
      dialog.appendChild(btn)
      btn.addEventListener('click', () => {
          dialog.style.display = "none"
      })

      shadow.appendChild(button);

      // 截取btnsrc中的文件名字，传递给按钮的文本butTex
      console.log(btnsrc,butTex)

      // 从./src/pdf/stl.pdf 中截取出文件名字stl
      butTex = btnsrc.substring(btnsrc.lastIndexOf('/') + 1, btnsrc.lastIndexOf('.'));
      button.innerText = butTex

      // dialog.appendChild(iframe);
      }
  }

// 定义组件标签名
customElements.define('iframe-component', IFrameComponent);
//   <iframe-component src="https://www.example.com"></iframe-component>