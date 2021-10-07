// 数据重置
localStorage.removeItem("addNow");
localStorage.removeItem("detailNow");

// 隐藏金额
var textPay = document.getElementById("message");
var textGet = document.getElementById("text-left");
var textBudget = document.getElementById("text-right");
var eye = document.getElementById("eye");
var tPay, tGet, tBudget, clickTimes = 0, budget = -1;

var eyeHide;
if(!localStorage.getItem("eyeHide")){
    localStorage.setItem("eyeHide", "0");
}

eye.addEventListener('click', function(el){
    el.stopPropagation();
    eyeHide = localStorage.getItem("eyeHide");
    if(eyeHide === "0"){
        tPay = textPay.innerText;
        textPay.innerText = "****";
        tGet = textGet.innerText;
        textGet.innerText = "****";
        tBudget = textBudget.innerText;
        textBudget.innerText = "****";
        localStorage.setItem("eyeHide", "1");
    }
    else{
        textPay.innerText = tPay;
        textGet.innerText = tGet;
        textBudget.innerText = tBudget;
        localStorage.setItem("eyeHide", "0");
    }
})

// 菜单按钮

var btnMenu = document.getElementById("btn-menu");
var al = document.getElementById("alert");
btnMenu.addEventListener('click', function(){
    al.style.display = "block";
})

var btnClose = document.getElementById("alert-close");
btnClose.addEventListener('click', function(){
    al.style.display = "none";
})

// 页面跳转

var btnPen = document.getElementById("pen");
pen.addEventListener('click', function(){
    window.location.href = "add.html"
})

// 记录账单

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

var text = ["", "其它", "餐饮", "交通", "购物", "服饰", "日用品", "娱乐", "食材", "零食", "烟茶酒"];
var textR = ["", "其它", "薪资", "奖金", "借入", "收债", "利息收入", "投资回收", "投资收益", "意外所得"];
var div = [], cirDiv = [];

function remove(a){
    clearTimeout(div[a].timer);
    div[a].timer = setTimeout(function(){
        div[a].removeChild(cirDiv[a]);
    }, 100);
}

function createRipple(a){
    div[a].addEventListener('touchstart', function(el){
        el.stopPropagation();
        let w = list.offsetWidth / 2;
        cirDiv[a] = ripple(el, div[a], 0, w);
    });
    
    div[a].addEventListener('touchend' ,function(el){
        el.stopPropagation();
        remove(a);
    });
}

var list = document.getElementById("list");
var t = localStorage.getItem("times");
var totalSum = 0, totalSumR = 0;
var longClick = document.getElementById("long-click");
var timeCheck = 0;
var dateToday = new Date();
var monthSum = 0, monthSumR = 0;

for(let i = t; i >= 1; i--){
    let info = localStorage.getItem("list-" + i.toString());
    if(info === null){
        continue;
    }
    let data = JSON.parse(info);
    if(data.type === "支出"){
        monthSum += data.sum;
    }
    else{
        monthSumR += data.sum;
    }
    if(data.dayCheck !== dateToday.getDate()){
        continue;
    }
    let picT;
    if(data.picType < 10){
        picT = "0" + data.picType.toString();
    }
    else{
        picT = data.picType.toString();
    }
    let sum = returnFloat(data.sum);

    let divContent = document.createElement("div");
    divContent.className = "list-content";
    list.appendChild(divContent);

    let divLeft = document.createElement("div");
    divLeft.className = "list-left";
    divContent.appendChild(divLeft);

    let divImg = document.createElement("img");
    divImg.className = "list-img";
    if(data.type === "支出"){
        divImg.src = "icon/" + picT + "_active.png";
    }
    else{
        divImg.src = "icon/r-" + picT + "_active.png";
    }
    divLeft.appendChild(divImg);

    let divTextLeft = document.createElement("p");
    let TextLeft
    if(data.type === "支出"){
        TextLeft = document.createTextNode(text[data.picType]);
    }
    else{
        TextLeft = document.createTextNode(textR[data.picType]);
    }
    divTextLeft.appendChild(TextLeft);
    divLeft.appendChild(divTextLeft);

    let divMiddle = document.createElement("div");
    divMiddle.className = "list-middle";
    divContent.appendChild(divMiddle);

    let divRight = document.createElement("div");
    divRight.className = "list-right";
    divContent.appendChild(divRight);

    let divTextTop = document.createElement("p");
    let TextTop = document.createTextNode("¥" + sum);
    divTextTop.className = "list-money";
    divTextTop.appendChild(TextTop);
    divRight.appendChild(divTextTop);

    let divTextBottom = document.createElement("p");
    let TextBottom = document.createTextNode("今天 " + data.dateTime);
    divTextBottom.className = "list-date";
    divTextBottom.appendChild(TextBottom);
    divRight.appendChild(divTextBottom);

    //增加波纹效果
    div[i] = divContent;
    createRipple(i);

    // 计算总额
    if(data.type === "支出"){
        totalSum += data.sum;
    }
    else{
        totalSumR += data.sum;
    }

    //增加页面跳转

    let timer, longClickCheck;
    

    divContent.addEventListener("touchstart", function(){
        longClickCheck = 0;
        timer = setTimeout(function(){
            //console.log("长按事件");
            longClick.style.display = "block";
            longClickCheck = 1;
            localStorage.setItem("addNow", i.toString());
            setTimeout(function(){
                timeCheck = 1;
            }, 500)
        }, 500)
    })
    divContent.addEventListener("touchmove", function(el){
        clearTimeout(timer);
        timeOutEvent = 0;
		el.preventDefault();
    })
    divContent.addEventListener("touchend", function(){
        clearTimeout(timer);
        if(timer != 0 && longClickCheck == 0){
            //console.log("点击事件");
            localStorage.setItem("detailNow", i.toString());
            localStorage.removeItem("addNow");
            window.location.href = "details.html";
        }
    })
}

tPay = returnFloat(totalSum);
document.getElementById("text-pay").innerText = tPay.toString() + "元";
tPay = "¥" + tPay.toString();
tGet = returnFloat(totalSumR);
document.getElementById("text-get").innerText = tGet.toString() + "元";
tGet = "¥" + tGet.toString();
if(!localStorage.getItem("budget")){
    tBudget = "未设置预算";
}
else{
    budget = localStorage.getItem("budget");
    tBudget = returnFloat(budget - totalSum);
    tBudget = "¥" + tBudget.toString();
}
tPay = "¥" + returnFloat(monthSum).toString();
tGet = "¥" + returnFloat(monthSumR).toString();
if(localStorage.getItem("eyeHide") === "0"){
    textPay.innerText = tPay;
    textGet.innerText = tGet;
    textBudget.innerText = tBudget;
}
else{
    textPay.innerText = "****";
    textGet.innerText = "****";
    textBudget.innerText = "****";
}


longClick.addEventListener('touchstart', function(){
    if(timeCheck){
        timeCheck = 0;
        longClick.style.display = "none";
    }
})

// 删除与修改

var longClickChange = document.getElementById("long-click-change");
var touchCheck1 = 0, touchCheck2 = 0;
longClickChange.addEventListener('touchstart', function(){
    touchCheck1 = 1;
})
longClickChange.addEventListener('touchend', function(){
    touchCheck1 = 0;
    localStorage.setItem("addNowHref", "main.html");
    window.location.href = "add.html"
})

var longClickDelete = document.getElementById("long-click-delete");
var alertDelete = document.getElementById("alert-delete");
longClickDelete.addEventListener('touchstart', function(){
    touchCheck2 = 1;
})
longClickDelete.addEventListener('touchend', function(){
    touchCheck2 = 0;
    longClick.style.display = "none";
    alertDelete.style.display = "block"
})

var deleteConfirm = document.getElementById("delete-confirm");
deleteConfirm.addEventListener('click', function(){
    let addNow = localStorage.getItem("addNow");
    localStorage.removeItem("list-" + addNow);
    window.location.href = "main.html";
})

var deleteCancel = document.getElementById("delete-cancel");
deleteCancel.addEventListener('click', function(){
    window.location.href = "main.html";
})

//搜索跳转

var btnSearch = document.getElementById("search");
btnSearch.addEventListener('click', function(){
    window.location.href = "search.html";
})

//设置预算

var budgetClose = document.getElementById("budget-close");
var budgetContent = document.getElementById("budget");
var budgetOpen = document.getElementById("text-budget");
var budgetConfirm = document.getElementById("btn-budget");
var budgetText = document.getElementById("budget-input");

budgetClose.addEventListener('click', function(){
    budgetContent.style.display = "none";
})

budgetOpen.addEventListener('click', function(el){
    el.stopPropagation();
    budgetContent.style.display = "block";
})

budgetConfirm.addEventListener('click', function(){
    if(budgetText.value === ""){
        if(localStorage.getItem("budget")){
            localStorage.removeItem("budget");
        }
    }
    else{
        budget = Number(budgetText.value);
        localStorage.setItem("budget", budget.toString());
    }
    window.location.href = "main.html";
})

//导出数据

var btnSettings = document.getElementById("settings");

btnSettings.addEventListener('click', function(){
    let t = localStorage.getItem("times");
    let jsonData = [];
    let k = 0;
    for(let i = t; i >= 1; i--){
        let info = localStorage.getItem("list-" + i.toString());
        if(info === null){
            continue;
        }
        let data = JSON.parse(info);
        let picType;
        if(data.type === "支出"){
            picType = text[data.picType];
        }
        else{
            picType = textR[data.picType];
        }
        let obj = {
            sum: data.sum,
            type: data.type,
            picType: picType,            
            remarks: data.remarks,
            time: data.dateText
        }
        k++;
        jsonData[k] = obj;
    }
    let str = `金额,类型,种类,备注,时间\n`;
    for(let i = 1; i <= k; i++){
        for(let item in jsonData[i]){
            str += `${jsonData[i][item] + '\t'},`;     
        }
        str += '\n';
    }
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);

    let link = document.createElement("a");
    link.href = uri;

    link.download =  "账单数据表.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
})

var content = document.getElementById("content");

content.addEventListener('click', function(){
    window.location.href = "sumDetails.html";
})