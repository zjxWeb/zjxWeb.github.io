// 创建一个按钮元素
var btn = document.createElement("button");
// 设置按钮的文本
btn.innerText = "回到顶部";
// 设置按钮的样式
btn.style.position = "fixed";
btn.style.bottom = "20px";
btn.style.right = "20px";
btn.style.display = "none";
btn.style.border = "1px solid red";
// 将按钮添加到网页中
document.body.appendChild(btn);
// 监听窗口的滚动事件
window.onscroll = function() {
  // 获取滚动条距离顶部的距离
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // 如果距离大于100，显示按钮，否则隐藏
  if (scrollTop > 100) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};
// 监听按钮的点击事件
btn.onclick = function() {
  // 创建一个定时器，每隔10毫秒执行一次
  var timer = setInterval(function() {
    // 获取滚动条距离顶部的距离
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 计算每次滚动的距离，逐渐减小
    var speed = Math.floor(scrollTop / 10);
    // 设置滚动条的位置，向上滚动
    document.documentElement.scrollTop = document.body.scrollTop = scrollTop - speed;
    // 如果滚动到顶部，清除定时器
    if (scrollTop == 0) {
      clearInterval(timer);
    }
  }, 1000);
};
