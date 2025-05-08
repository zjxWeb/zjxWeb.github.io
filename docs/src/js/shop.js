// // 按钮的形式
// let shop  = document.createElement("button");
// shop.setAttribute("class","shop")
// document.body.appendChild(shop);
// shop.innerText = "项目商店";

// // 样式
// shop.style.position = "fixed";
// shop.style.right = "0";
// shop.style.bottom = "25px";
// shop.style.width = "65px";
// shop.style.height = "35px";
// shop.style.background = "#29a9e0cf";
// shop.style.color = "#ffffff";
// shop.style.borderRadius = "15px";
// shop.style.fontSize = "12px";
// shop.style.color = "rebeccapurple";
// shop.style.fontWeight = "600";
// shop.style.lineHeight = "20px";
// shop.style.textAlign = "center";
// shop.style.cursor = "pointer";

// // 给按钮绑定href
// shop.addEventListener("click",function(){
//     window.open("https://b23.tv/CrKiRjb");
// })


// ---------- 创建“项目商店”按钮 ----------
let shop = document.createElement("button");
shop.className = "shop-btn";
shop.innerText = "项目商店";
document.body.appendChild(shop);

// 按钮样式
shop.style.position = "fixed";
shop.style.right = "0";
shop.style.bottom = "25px";
shop.style.width = "65px";
shop.style.height = "35px";
shop.style.background = "#29a9e0cf";
shop.style.color = "#ffffff";
shop.style.borderRadius = "15px";
shop.style.fontSize = "12px";
shop.style.color = "rebeccapurple";
shop.style.fontWeight = "600";
shop.style.lineHeight = "20px";
shop.style.textAlign = "center";
shop.style.cursor = "pointer";

// ---------- 构建弹窗 ----------
let popup = document.createElement("div");
popup.className = "shop-popup";
popup.innerHTML = `
  <div class="popup-mask"></div>
  <div class="popup-box">
    <div class="popup-header">
      <strong>温馨提示</strong>
    </div>
    <div class="popup-body">
      <p class="popup-text">
        为了获得最佳体验，<span class="highlight">请务必</span><br>
        <span class="link-text">在手机浏览器</span>打开以下链接：
      </p>
      <p class="popup-link">https://b23.tv/CrKiRjb</p>
    </div>
    <div class="popup-footer">
      <button id="copyBtn" class="action-btn">复制并打开</button>
      <button id="closeBtn" class="close-btn">稍后再说</button>
    </div>
  </div>
`;
document.body.appendChild(popup);

// 弹窗初始隐藏
popup.style.display = "none";

// 点击主按钮弹出
shop.addEventListener("click", () => popup.style.display = "block");

// 复制逻辑
popup.querySelector("#copyBtn").addEventListener("click", () => {
  navigator.clipboard.writeText("https://b23.tv/CrKiRjb")
    .then(() => {
      alert("已复制链接，快去浏览器打开吧！");
      popup.style.display = "none";
    })
    .catch(err => alert("复制失败，请长按链接手动复制"));
});

// 关闭逻辑
popup.querySelector("#closeBtn").addEventListener("click", () => {
  popup.style.display = "none";
});

const style = document.createElement("style");
style.innerHTML = `
.shop-popup .popup-mask {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(2px);
  z-index: 1000;
}
.shop-popup .popup-box {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  width: 85%;
  max-width: 320px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.2);
  z-index: 1001;
  overflow: hidden;
  display: flex; flex-direction: column;
}
.popup-header {
  background: #007AFF;
  padding: 12px;
  text-align: center;
}
.popup-header strong {
  color: #fff;
  font-size: 17px;
}
.popup-body {
  padding: 20px 16px;
  text-align: center;
}
.popup-text {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}
.popup-text .highlight {
  color: #FF3B30;       /* 红色强调 */
  font-weight: 600;
}
.popup-text .link-text {
  color: #007AFF;
  font-weight: 600;
}
.popup-link {
  margin-top: 10px;
  font-size: 13px;
  word-break: break-all;
  color: #555;
  background: #F2F2F7;
  padding: 8px;
  border-radius: 8px;
}
.popup-footer {
  display: flex;
  justify-content: space-around;
  padding: 12px 0 16px;
}
.action-btn {
  flex: 1;
  margin: 0 8px;
  background: linear-gradient(90deg, #34C759, #30D158);
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 0;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: transform .1s;
}
.action-btn:active {
  transform: scale(0.95);
}
.close-btn {
  flex: 1;
  margin: 0 8px;
  background: none;
  color: #8E8E93;
  border: none;
  border-radius: 20px;
  padding: 10px 0;
  font-size: 15px;
  cursor: pointer;
}
`;
document.head.appendChild(style);
