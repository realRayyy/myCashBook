//btn-click

function ripple(el, btn, height, width){
    let x = el.touches[0].clientX - btn.offsetLeft + width;             
    let y = el.touches[0].clientY - btn.offsetTop + height; 
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

var activeR = "01";
var activeImgR = document.getElementById("r-img-01");
var mainImgR = document.getElementById("r-img-main");
var mainTextR = document.getElementById("r-text-main");
var textR = ["", "其它", "薪资", "奖金", "借入", "收债", "利息收入", "投资回收", "投资收益", "意外所得"];

for(let i = 1; i <= 9; i++){
    let s; //记录当前选择的图标序号
    if(i == 10){
        s = i.toString();
    }
    else{
        s = "0" + i.toString();
    }
    let el = document.getElementById("r-" + s);
    el.addEventListener('click', function(){
        let img = document.getElementById("r-img-" + s);
        activeImgR.src = "icon/r-" + activeR + ".png";
        mainImgR.src = "icon/r-" + s + "_active.png";
        img.src = "icon/r-" + s + "_active.png";
        mainTextR.innerText = text[Number(s)];
        activeR = s;
        activeImgR = img;
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


var numberTextR = document.getElementById("r-text-number");

for(let i = 0; i <= 9; i++){
    let s = i.toString();
    let el = document.getElementById("r-" + s);
    el.addEventListener('click', function(){
        if(numberTextR.innerText === "0"){
            if(s !== "0"){
                numberTextR.innerText = s;
            }
        }
        else{
            numberTextR.innerText += s;
        }
    })
}

{
    let el = document.getElementById("r-remove");
    el.addEventListener('click', function(){
        numberTextR.innerText = "0";
    })
}

{
    let el = document.getElementById("r-point");
    el.addEventListener('click', function(){
        numberTextR.innerText += ".";
    })
}

{
    let el = document.getElementById("r-text-delete");
    el.addEventListener('click', function(){
        let s = numberTextR.innerText;
        if(s !== "0"){        
            if(s.length > 1){
                numberTextR.innerText = s.substring(0, s.length - 1);
            }
            else{
                numberTextR.innerText = "0";
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

window.addEventListener('resize', () => {
    const newInnerHeight = window.innerHeight;
    if(innerHeight > newInnerHeight){
        let el = document.getElementById("r-alert-content");
        el.style.top = "38.5%";
    } 
    else{
        let el = document.getElementById("r-alert-content");
        el.style.top = "73%";
    }
});

var alertTextR = document.getElementById("r-alert-text");
var remarksTextR = document.getElementById("r-remarks-text");
var remarkR = document.getElementById("r-remarks-left");
var alR = document.getElementById("r-alert");
remarkR.addEventListener('click', function(){
    alR.style.display = "block";
    if(remarksTextR.innerText !== "添加备注"){
        alertTextR.value = remarksTextR.innerText;
    }
})

var cancelR = document.getElementById("r-btn-cancel");
cancelR.addEventListener('click', function(){
    alR.style.display = "none";
})

var confirmR = document.getElementById("r-btn-confirm");


confirmR.addEventListener('click', function(){
    alR.style.display = "none";
    if(alertTextR.value !== ""){
        remarksTextR.innerText = alertTextR.value;
    }
    else{
        remarksTextR.innerText = "添加备注";
    }
})

// 数据传递

var dateNow = new Date();
var addNow = localStorage.getItem("addNow");
var dataNow;
var dateDay, dateTime, dayCheck;

var btnConfirm = document.getElementById("keyboard-confirm");
if(!localStorage.getItem("times")){
    localStorage.setItem("times", "0");
}

btnConfirm.addEventListener('click', function(){
    let s = Number(numberText.innerText);
    let r = "";
    let picT = Number(active);
    if(remarksText.innerText !== "添加备注"){
        r = remarksText.innerText;
    }
    //let info = sum.toString() + "," + picType.toString() + "," + remarks;
    let obj = {
        sum: s,
        remarks: r,
        picType: picT,
        dateDay: dateDay,
        dateTime: dateTime,
        dayCheck: dayCheck,
        dateText: dateText,
        type: "支出"
    }
    let info = JSON.stringify(obj);
    let t;
    if(addNow !== null){
        t = addNow;
        localStorage.setItem("list-" + t, info);
        let addNowHref = localStorage.getItem("addNowHref");
        localStorage.removeItem("addNow");
        window.location.href = addNowHref;
    }
    else{
        t = localStorage.getItem("times");
        t = Number(t) + 1;
        t = t.toString();
        localStorage.setItem("times", t);
        localStorage.setItem("list-" + t, info);
        window.location.href = "main.html";
    }
})

var btnConfirmR = document.getElementById("r-keyboard-confirm");

if(!localStorage.getItem("times")){
    localStorage.setItem("times", "0");
}

btnConfirmR.addEventListener('click', function(){
    let s = Number(numberTextR.innerText);
    let r = "";
    let picT = Number(activeR);
    if(remarksTextR.innerText !== "添加备注"){
        r = remarksTextR.innerText;
    }
    //let info = sum.toString() + "," + picType.toString() + "," + remarks;
    let obj = {
        sum: s,
        remarks: r,
        picType: picT,
        dateDay: dateDay,
        dateTime: dateTime,
        dayCheck: dayCheck,
        dateText: dateText,
        type: "收入"
    }
    let info = JSON.stringify(obj);
    let t;
    if(addNow !== null){
        t = addNow;
        localStorage.setItem("list-" + t, info);
        let addNowHref = localStorage.getItem("addNowHref");
        localStorage.removeItem("addNow");
        window.location.href = addNowHref;
    }
    else{
        t = localStorage.getItem("times");
        t = Number(t) + 1;
        t = t.toString();
        localStorage.setItem("times", t);
        localStorage.setItem("list-" + t, info);
        window.location.href = "main.html";
    }
})

// 页面加载
var dateText;
var main = document.getElementById("main");

function numToStr(num){
    if(num >= 10){
        return num.toString();
    }
    else{
        return "0" + num.toString();
    }
}

if(addNow !== null){
    infoNow = localStorage.getItem("list-" + addNow);
    dataNow = JSON.parse(infoNow);
    if(dataNow.type === "支出"){
        let picT;
        if(dataNow.picType < 10){
            picT = "0" + dataNow.picType.toString();
        }
        else{
            picT = dataNow.picType.toString();
        }
        mainImg.src = "icon/" + picT + "_active.png"; 
        activeImg.src = "icon/" + active + ".png";
        let img = document.getElementById("img-" + picT);
        img.src = "icon/" + picT + "_active.png";
        activeImg = img;
        active = picT;
        mainText.innerText = text[dataNow.picType];
        if(dataNow.remarks !== ""){
            remarksText.innerText = dataNow.remarks;
        }
        numberText.innerText = dataNow.sum;
    }
    else{
        let picT;
        if(dataNow.picType < 10){
            picT = "0" + dataNow.picType.toString();
        }
        else{
            picT = dataNow.picType.toString();
        }
        mainImgR.src = "icon/r-" + picT + "_active.png"; 
        activeImgR.src = "icon/r-" + active + ".png";
        let img = document.getElementById("r-img-" + picT);
        img.src = "icon/r-" + picT + "_active.png";
        activeImgR = img;
        activeR = picT;
        mainTextR.innerText = textR[dataNow.picType];
        if(dataNow.remarks !== ""){
            remarksTextR.innerText = dataNow.remarks;
        }
        numberTextR.innerText = dataNow.sum;
        main.style.transform = "translateX(-50%)";
    }
    
    date = document.getElementById("remarks-date");
    dateR = document.getElementById("r-remarks-date");
    dateDay = dataNow.dateDay;
    dateTime = dataNow.dateTime;
    dayCheck = dataNow.dayCheck;
    dateText = dataNow.dateText;
    date.innerText = dataNow.dateText;
    dateR.innerText = dataNow.dateText;
}
else{
    date = document.getElementById("remarks-date");
    dateR = document.getElementById("r-remarks-date");
    dateText = dateNow.getFullYear() + "年" + dateNow.getMonth() + "月" + dateNow.getDay() + "日" 
                     + numToStr(dateNow.getHours()) + ":" + numToStr(dateNow.getMinutes());
    date.innerText = dateText;      
    dateR.innerText = dateText;          
    dateDay = dateNow.getMonth() + "月" + dateNow.getDay() + "日";
    dateTime = numToStr(dateNow.getHours()) + ":" + numToStr(dateNow.getMinutes());
    dayCheck = dateNow.getDay();
}

//关闭页面 (需要完善)

btnClose.addEventListener('click', function(){
    window.location.href = "details.html";
})

// 界面切换

var leftStartX, leftEndX, rightStartX, rightEndX;
var mainLeft = document.getElementById("main-left");
var mainRight = document.getElementById("main-right");

var headerLeft = document.getElementById("header-left");
var headerRight = document.getElementById("header-right");

mainLeft.addEventListener('touchstart', function(el){
    leftStartX = el.touches[0].clientX;
})

mainLeft.addEventListener('touchend', function(el){
    leftEndX = el.changedTouches[0].clientX;
    if(leftEndX - leftStartX < -50){
        headerLeft.className = "header-notactive";
        headerRight.className = "header-active";
        main.style.transform = "translateX(-50%)";
    }
})

mainRight.addEventListener('touchstart', function(el){
    leftStartX = el.touches[0].clientX;
})

mainRight.addEventListener('touchend', function(el){
    leftEndX = el.changedTouches[0].clientX;
    if(leftEndX - leftStartX > 50){
        headerRight.className = "header-notactive";
        headerLeft.className = "header-active";
        main.style.transform = "none";
    }
})
