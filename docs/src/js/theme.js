let themeLabel = document.createElement("label");
themeLabel.setAttribute("class","switch");

let themeCheck = document.createElement("input");
themeCheck.setAttribute("type","checkbox");

let teme  = document.createElement("span");
teme.setAttribute("class","slider round");

themeLabel.appendChild(themeCheck);
themeLabel.appendChild(teme);
document.body.appendChild(themeLabel);
// teme.value = "主题"


document.getElementById("theme-link").setAttribute("href", "./src/css/vue.css");  
//按钮实现
// teme.addEventListener("click", function() {    
//     let theme = document.getElementById("theme-link").getAttribute("href");
//     if (theme === "./src/css/vue.css") {  
//         document.getElementById("theme-link").setAttribute("href", "./src/css/dark.css");  
//     } else {  
//         document.getElementById("theme-link").setAttribute("href", "./src/css/vue.css");  
//     }  
// });


// 给复选框添加点击事件监听器
themeCheck.addEventListener('click', () => {
    let theme = document.getElementById("theme-link").getAttribute("href");
    // 判断复选框是否被选中
    if (themeCheck.checked) {
        // 如果复选框被选中，则切换为暗黑主题
        document.getElementById("theme-link").setAttribute("href", "./src/css/dark.css")
    } else {
        // 如果复选框未被选中，则切换为明亮主题
        document.getElementById("theme-link").setAttribute("href", "./src/css/vue.css"); 
    }
});