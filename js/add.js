//btn-click

function ripple(el, btn, height, width){
    let x = el.touches[0].clientX - btn.offsetLeft + width;             
    let y = el.touches[0].clientY - btn.offsetTop + height; 
    let circle = document.createElement('span');
    console.log(x);
    console.log(y);
    circle.className = 'ripple';       
    circle.style.left = x + 'px';     
    circle.style.top = y + 'px';   
    btn.appendChild(circle);
    return circle;
}

function removeRipple(btn, circle){
    btn.removeChild(circle);
}

var btnClose = document.getElementById("close");
var cirClose;

btnClose.addEventListener('touchstart', function(el){
    cirClose = ripple(el, btnClose, 0, 0);
});

btnClose.addEventListener('touchend' ,function(el){
    setTimeout("removeRipple(btnClose, cirClose)", 100);
});



//未完成轮播图部分

// 图标选择

var active = "01";
var activeImg = document.getElementById("img-01");
var mainImg = document.getElementById("img-main");
var mainText = document.getElementById("text-main");
var text = ["", "其它", "餐饮", "交通", "购物", "服饰", "日用品", "娱乐", "食材", "零食", "烟茶酒"];

for(let i = 1; i <= 10; i++){
    let s; //记录当前选择的图标序号
    if(i == 10){
        s = i.toString();
    }
    else{
        s = "0" + i.toString();
    }
    let el = document.getElementById(s);
    el.addEventListener('click', function(){
        let img = document.getElementById("img-" + s);
        activeImg.src = "icon/" + active + ".png";
        mainImg.src = "icon/" + s + "_active.png";
        img.src = "icon/" + s + "_active.png";
        mainText.innerText = text[Number(s)];
        active = s;
        activeImg = img;
    })
}

// 数字键盘

var numberText = document.getElementById("text-number");

for(let i = 0; i <= 9; i++){
    let s = i.toString();
    let el = document.getElementById(s);
    el.addEventListener('click', function(){
        if(numberText.innerText === "0"){
            if(s !== "0"){
                numberText.innerText = s;
            }
        }
        else{
            numberText.innerText += s;
        }
    })
}

{
    let el = document.getElementById("remove");
    el.addEventListener('click', function(){
        numberText.innerText = "0";
    })
}

{
    let el = document.getElementById("point");
    el.addEventListener('click', function(){
        numberText.innerText += ".";
    })
}

{
    let el = document.getElementById("text-delete");
    el.addEventListener('click', function(){
        let s = numberText.innerText;
        if(s !== "0"){        
            if(s.length > 1){
                numberText.innerText = s.substring(0, s.length - 1);
            }
            else{
                numberText.innerText = "0";
            }
        }
    })
}


//添加备注

const innerHeight = window.innerHeight;
window.addEventListener('resize', () => {
    const newInnerHeight = window.innerHeight;
    if(innerHeight > newInnerHeight){
        let el = document.getElementById("alert-content");
        el.style.top = "38.5%";
    } 
    else{
        let el = document.getElementById("alert-content");
        el.style.top = "73%";
    }
});

var alertText = document.getElementById("alert-text");
var remarksText = document.getElementById("remarks-text");
var remark = document.getElementById("remarks-left");
var al = document.getElementById("alert");
remark.addEventListener('click', function(){
    al.style.display = "block";
    if(remarksText.innerText !== "添加备注"){
        alertText.value = remarksText.innerText;
    }
})

var cancel = document.getElementById("btn-cancel");
cancel.addEventListener('click', function(){
    al.style.display = "none";
})

var confirm = document.getElementById("btn-confirm");


confirm.addEventListener('click', function(){
    al.style.display = "none";
    if(alertText.value !== ""){
        remarksText.innerText = alertText.value;
    }
    else{
        remarksText.innerText = "添加备注";
    }
})