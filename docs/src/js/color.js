class ColorComponent extends HTMLElement {
    constructor() {
        super();
        console.log("color_tools")
        const shadow = this.attachShadow({ mode: 'open' });
        // 创建一个按钮元素
        const button = document.createElement('button');
        let  butTex = '颜色工具'
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

        const Box = document.createElement("div");
        Box.style.width = "50vw";
        Box.style.height = "40vh";
        Box.style.backgroundColor = "white"
        // 左右上下居中
        Box.style.position = "absolute"
        Box.style.top = "25%"
        Box.style.left = "25%"

        


        const colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.id = "colorPicker";
        colorPicker.style.width = "50vw";
        colorPicker.style.height = "30vh";
        // 下边距
        colorPicker.style.marginBottom = "3vh";
        
    
        // 创建id为inputColor的input框
        const inputText = document.createElement("label");
        inputText.innerHTML = "输入你的颜色"
        const inputColor = document.createElement("input");
        // 将其属性type设置为text
        inputColor.type = "text";
        inputColor.id = "inputColor";
    
        const label = document.createElement("label");
        // <label for="hexColor">Hex Color:</label>
        // 设置属性for
        label.setAttribute("for","hexColor")
        label.innerHTML = "Hex Color"
        const hexColor = document.createElement("input");
        hexColor.type = "text";
        hexColor.readOnly = true;
        hexColor.id = "hexColor"
    
        const label1 = document.createElement("label");
        label1.setAttribute("for","rgbColor")
        label1.innerHTML = "RGB Color:"
        const rgbColor = document.createElement("input");
        rgbColor.type = "text";
        rgbColor.readOnly = true;
        rgbColor.id = "rgbColor"
    
        
        shadow.appendChild(button);
        Box.appendChild(colorPicker);
        Box.appendChild(inputText);
        Box.appendChild(inputColor);
        Box.appendChild(label);
        Box.appendChild(hexColor);
        Box.appendChild(label1);
        Box.appendChild(rgbColor);


        // 点击上方按钮弹出框，
        button.addEventListener('click', () => {
            dialog.style.display = "block"
            dialog.appendChild(Box);
            shadow.appendChild(dialog);
        });

        // ---------------------------------------------------------
        // 右下角关闭按钮
        // 创建一个按钮元素
        var btn = document.createElement("button");
        // 设置按钮的文本
        btn.innerText = "关闭";

        // 样式
        btn.style.display = "block";
        btn.style.position = "fixed";
        btn.style.right = "0";
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
        })

        //---------------------------------------------------------------
        inputColor.addEventListener('input', updateColorPicker);
        colorPicker.addEventListener('change', updateColor);
    
        function updateColorPicker() {
            const inputColorValue = inputColor.value;
            if (isValidHex(inputColorValue)) {
                colorPicker.value = inputColorValue;
            } else if (isValidRgb(inputColorValue)) {
                const rgbArray = inputColorValue.match(/\d+/g);
                colorPicker.value = rgbToHex(rgbArray[0], rgbArray[1], rgbArray[2]);
            }
            updateColor();
        }
    
        function updateColor() {
            const selectedColor = colorPicker.value;
            hexColor.value = selectedColor;
            
            const rgb = hexToRgb(selectedColor);
            rgbColor.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
    
        function hexToRgb(hex) {
            const r = parseInt(hex.substring(1, 3), 16);
            const g = parseInt(hex.substring(3, 5), 16);
            const b = parseInt(hex.substring(5, 7), 16);
            return { r, g, b };
        }
    
        function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
    
        function componentToHex(c) {
            const hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
    
        function isValidHex(hex) {
            return /^#[0-9A-F]{6}$/i.test(hex);
        }
    
        function isValidRgb(rgb) {
            return /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/.test(rgb);
        }
    }
}
  
  // 定义组件标签名
  customElements.define('color-tool', ColorComponent);