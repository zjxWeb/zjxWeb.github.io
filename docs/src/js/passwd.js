// 设置cookie过期时间  7天
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// while(true) {
let password = "";
let x = document.cookie;

if (!x) {
    let titleDiv  = document.createElement("div");// 主标题外部盒子
    let titleDoc  = document.createElement("h1");//主标题
    let overlayLayle  = document.createElement("div"); //指令盒子
    let qrDiv  = document.createElement("div"); //底部二维码盒子
    let qr  = document.createElement("img"); //底部二维码QR
    let qrTitle  = document.createElement("h3"); 
    

    overlayLayle.className = "overlay ";
    document.body.appendChild(titleDiv);
    titleDiv.appendChild(titleDoc);
    document.body.appendChild(overlayLayle);
    document.body.appendChild(qrDiv); //底部二维码盒子
    qrDiv.appendChild(qr);
    qrDiv.appendChild(qrTitle);

    //主标题外部盒子样式
    titleDiv.style.width="100vw";
    titleDiv.style.height = "80px";
    titleDiv.style.position="fixed";
    titleDiv.style.top="30px";
    // titleDiv.style.background="red";
    titleDiv.style.textAlign="center";
    //主标题样式
    titleDoc.style.color = "#fff";
    //底部二维码盒子样式
    qrDiv.style.width="100vw";
    qrDiv.style.position="fixed";
    qrDiv.style.bottom="10px";
    // qrDiv.style.background="red";
    qrDiv.style.textAlign="center";
    qrDiv.style.color = "#fff";
    qr.style.width = "150px";

    titleDoc.innerText="关注公众号“拼搏的小浣熊”——回复“接头口令”，来获取接头口令♥♥♥";
    qrTitle.innerText="👉扫一扫关注小浣熊的公众号👈";
    let title  = document.createElement("p");
    title.innerText="🐻欢迎来到小浣熊的世界🐻"
    let container = document.createElement("div");
    container.className = "password_input ";
    container.style.position = "absolute";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";

    let input = document.createElement("input");
    input.type = "password";
    input.setAttribute( "placeholder","请输入接头口令");
    input.style.display = "block";
    input.style.marginBottom = "10px";

    let button = document.createElement("button");
    button.innerText = "提交";
    //QR
    // qr.setAttribute("src","../img/qr.png")
    qr.src="https://cdn.jsdelivr.net/gh/zjxWeb/zjxWeb.github.io@main/docs/src/img/qr.png";
    button.onclick = function () {
        password = input.value;
        // 主要业务代码
        if (x == "april conns" || password == 'pbdxhx') {
            if (document.cookie != "apri conns") {
                document.cookie = "april conns";
                setCookie(" ", "april conns", 7);
                location.reload();
            }

        } else {
            alert("密码不正确,无法进入本站!!");
            input.value = "";
        }

    }
    container.appendChild(input);
    container.appendChild(button);
    container.appendChild(title);
    document.body.appendChild(container);
}
