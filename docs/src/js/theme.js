// 按钮的形式
let teme  = document.createElement("button");
teme.setAttribute("class","teme")
document.body.appendChild(teme);
teme.innerText = "主题";

// 样式
teme.style.position = "fixed";
teme.style.right = "0";
teme.style.bottom = "66px";
teme.style.width = "65px";
teme.style.height = "35px";
teme.style.background = "#29a9e0cf";
teme.style.color = "#ffffff";
teme.style.borderRadius = "15px";
teme.style.fontSize = "16px";
teme.style.color = "rebeccapurple";
teme.style.fontWeight = "600";
teme.style.lineHeight = "20px";
teme.style.textAlign = "center";
teme.style.cursor = "pointer";

document.getElementById("theme-link").setAttribute("href", "./src/css/vue.css");  
//按钮实现
teme.addEventListener("click", function() {    
    let theme = document.getElementById("theme-link").getAttribute("href");
    if (theme === "./src/css/vue.css") {  
        document.getElementById("theme-link").setAttribute("href", "./src/css/dark.css");  
    } else {  
        document.getElementById("theme-link").setAttribute("href", "./src/css/vue.css");  
    }  
});
