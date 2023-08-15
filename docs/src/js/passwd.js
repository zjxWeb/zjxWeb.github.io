function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// while(true) {
var password = "";
var x = document.cookie;

if (!x) {
    var overlayLayle  = document.createElement("div");
    overlayLayle .className = "overlay ";
    document.body.appendChild(overlayLayle);
    var container = document.createElement("div");
    container.className = "password_input ";
    container.style.position = "absolute";
    container.style.top = "50%";
    container.style.left = "50%";
    container.style.transform = "translate(-50%, -50%)";

    var input = document.createElement("input");
    input.type = "password";
    input.style.display = "block";
    input.style.marginBottom = "10px";

    var button = document.createElement("button");
    button.innerText = "提交";
    button.onclick = function () {
        password = input.value;
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
    document.body.appendChild(container);
}

// if(x=="april conns"||password == 'pbdxhx' ) {
//     if(document.cookie!="apri conns")
//     {
//       document.cookie="april conns";
//       setCookie(" ", "april conns", 7);
//     }
//     break;

// } else {
//   alert("密码不正确,无法进入本站!!");
// }


// }