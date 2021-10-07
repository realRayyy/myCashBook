var div = [], cirDiv = [];

function getTop(e){
    var offset=e.offsetTop;
    if(e.offsetParent != null) offset += getTop(e.offsetParent);
    return offset;
}

function getLeft(e){
    var offset=e.offsetLeft;
    if(e.offsetParent != null) offset += getLeft(e.offsetParent);
    return offset;
}

function returnFloat(value){
    var value = Math.round(parseFloat(value) * 100) / 100;
    var s = value.toString().split(".");
    if(s.length == 1){
        value = value.toString()+".00";
        return value;
    }
    if(s.length > 1){
        if(s[1].length < 2){
            value = value.toString() + "0";
        }
        return value;
    }
}

function toPercent(value){
    var str = Number(value * 100).toFixed(2);
    str += "%";
    return str;
}

function ripple(el, btn, height, width){
    let x = el.touches[0].clientX - getLeft(btn) + width;             
    let y = el.touches[0].clientY - getTop(btn) + height; 
    let circle = document.createElement('span');
    circle.className = 'ripple';       
    circle.style.left = x + 'px';     
    circle.style.top = y + 'px';   
    btn.appendChild(circle);
    return circle;
}

function removeRipple(btn, circle){
    btn.removeChild(circle);
}

function remove(a){
    clearTimeout(div[a].timer);
    div[a].timer = setTimeout(function(){
        div[a].removeChild(cirDiv[a]);
    }, 100);
}

function createRipple(a){
    div[a].addEventListener('touchstart', function(el){
        el.stopPropagation();
        cirDiv[a] = ripple(el, div[a], 100, 0);
    });
    
    div[a].addEventListener('touchend' ,function(el){
        el.stopPropagation();
        remove(a);
    });
}

var monthSum = 0, monthSumR = 0;
var t = localStorage.getItem("times");
var timePay = 0, timeGet = 0;
var typeSum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], typeSumR = [];
var text = ["", "其它", "餐饮", "交通", "购物", "服饰", "日用品", "娱乐", "食材", "零食", "烟茶酒"];
var data = [];

for(let i = t; i >= 1; i--){
    let info = localStorage.getItem("list-" + i.toString());
    if(info === null){
        continue;
    }
    let data = JSON.parse(info);
    if(data.type === "支出"){
        monthSum += data.sum;
        typeSum[data.picType] += data.sum;
        timePay ++;
    }
    else{
        monthSumR += data.sum;
        timeGet ++;
    }
}

document.getElementById("content-pay").innerText = "共" + timePay.toString() + "笔支出，¥" + returnFloat(monthSum) + "元";
document.getElementById("content-get").innerText = "共" + timeGet.toString() + "笔支出，¥" + returnFloat(monthSumR) + "元";


var list = document.getElementById("list");

for(let i = 1; i <= 10; i++){
    if(!typeSum[i]){
        continue;
    }

    let picT;
    if(i < 10){
        picT = "0" + i.toString();
    }
    else{
        picT = i.toString();
    }

    let listContent = document.createElement("div");
    listContent.className = "list-content";
    list.appendChild(listContent);

    let listLeft = document.createElement("div");
    listLeft.className = "list-left";
    listContent.appendChild(listLeft);

    let imgLeft = document.createElement("img");
    imgLeft.src = "icon/" + picT + "_active.png";
    listLeft.appendChild(imgLeft);

    let textLeft = document.createElement("p");
    let textNodeLeft = document.createTextNode(text[i]);
    textLeft.appendChild(textNodeLeft);
    listLeft.appendChild(textLeft);

    let listMiddle = document.createElement("div");
    listMiddle.className = "middle";
    listContent.appendChild(listMiddle);

    let textMiddle = document.createElement("p");
    let percentText = toPercent(typeSum[i] / monthSum);
    let textNodeMiddle = document.createTextNode(percentText);
    textMiddle.appendChild(textNodeMiddle);
    listMiddle.appendChild(textMiddle);

    let listRight = document.createElement("div");
    listRight.className = "list-right";
    listContent.appendChild(listRight);

    let textRight = document.createElement("p");
    let textRightNode = document.createTextNode("¥" + returnFloat(typeSum[i]));
    textRight.appendChild(textRightNode);
    listRight.appendChild(textRight);

    let imgRight = document.createElement("img");
    imgRight.src = "icon/arrow.png";
    listRight.appendChild(imgRight);

    div[i] = listContent;
    createRipple(i);
}

var btnClose = document.getElementById("close");

btnClose.addEventListener('click', function(){
    window.location.href = "main.html";
})

