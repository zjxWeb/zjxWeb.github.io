// 创建一个名为IFrameComponent的组件
class IFrameComponent extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      // 获取传入的src属性值
      const src = this.getAttribute('src');
  
      // 创建iframe元素
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', src);
      iframe.style.width = '100%';
      iframe.style.height = '100vh';
  
      // 将iframe添加到shadow DOM中
      shadow.appendChild(iframe);
    }
  }
  
  // 定义组件标签名
  customElements.define('iframe-component', IFrameComponent);
  