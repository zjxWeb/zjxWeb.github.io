// 按钮的形式
let shop  = document.createElement("button");
shop.setAttribute("class","shop")
document.body.appendChild(shop);
shop.innerText = "项目商店";

// 样式
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

// 给按钮绑定href
shop.addEventListener("click",function(){
    window.open("https://b23.tv/CrKiRjb");
})
