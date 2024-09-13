// Seçim üçün bütün lazımi elementləri götürürük
const colorPicker = document.getElementById("color");
const colorBG = document.querySelector(".color_bg");
const hex = document.querySelector("#hex");
const rgb = document.querySelector("#rgb");
const input = document.querySelector("#colorEnter");
const copyButtons = document.querySelectorAll(".copy");
const dynamicHeading = document.getElementById("dynamicHeading"); 

// HEX kodunu RGB koduna çevirmək üçün funksiya
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Qısa formatlı hex (#333 kimi) uzun formata çevirmək üçün funksiya
function expandShortHex(shortHex) {
    if (/^#?([a-f\d])([a-f\d])([a-f\d])$/i.test(shortHex)) {
        return shortHex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, "#$1$1$2$2$3$3");
    }
    return shortHex; 
}

// Copy düymələrini aktiv və ya deaktiv etmək üçün funksiya
function toggleCopyButtons(enabled) {
    copyButtons.forEach(button => {
        button.disabled = !enabled; 
        button.style.opacity = enabled ? "1" : "0.5"; 
        button.style.cursor = enabled ? "pointer" : "not-allowed";
    });
}

// Rəng seçildikdə HEX və RGB dəyərlərini dəyişmək
function changeInputs(value) {
    value = expandShortHex(value);

    hex.innerText = value; 
    let RGB = hexToRgb(value); 
    rgb.innerText = `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})`; 

    document.documentElement.style.setProperty('--selected_color', value);

    if (dynamicHeading) {
        dynamicHeading.style.color = value;
    }

    toggleCopyButtons(true);
}

// Rəng dəyişdikdə yeniləmək
colorPicker.addEventListener("input", (e) => {
    colorBG.style.backgroundColor = e.target.value;
    changeInputs(e.target.value);
});

// Əl ilə HEX kodu daxil edildikdə yeniləmək
input.addEventListener("input", (e) => {
    let inputValue = e.target.value;
    if (inputValue[0] === "#") {
        let convert = hexToRgb(expandShortHex(inputValue));
        if (convert) {
            colorBG.style.backgroundColor = `rgb(${convert.r},${convert.g},${convert.b})`;
            changeInputs(inputValue);
            colorPicker.value = expandShortHex(inputValue);
        }
    }
});

// Rəngi kopyalamaq üçün funksiyanı yazırıq
function copyBoard(e) {
    if (e.disabled) return;

    var textarea = document.createElement('textarea');
    textarea.value = e.previousElementSibling.innerText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea); 
    alert("Mətn kopyalandı!"); 
}

// Səhifə yüklənərkən copy düymələrini deaktiv edirik (ilk başda rəng seçilmədiyi üçün)
toggleCopyButtons(false);
