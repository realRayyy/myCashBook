//btn-click

var btnDelete = document.getElementById("delete");
var cirDelete;

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

btnDelete.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirDelete = ripple(el, btnDelete, 0, 0);
});

btnDelete.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    setTimeout("removeRipple(btnDelete, cirDelete)", 100);
});

var btnClose = document.getElementById("close");
var cirClose;

btnClose.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirClose = ripple(el, btnClose, 0, 0);
});

btnClose.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    setTimeout("removeRipple(btnClose, cirClose)", 100);
});

var btnBottom = document.getElementById("bottom");
var cirBottom;
var bottomTimer;

btnBottom.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirBottom = ripple(el, btnBottom, 0, 0);
});

btnBottom.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    clearTimeout(bottomTimer);
    bottomTimer = setTimeout("removeRipple(btnBottom, cirBottom)", 100);
});

var btnContent = document.getElementById("content");
var cirContent;
var contentTimer;

btnContent.addEventListener('touchstart', function(el){
    el.stopPropagation();
    let w = btnContent.offsetWidth / 2;
    cirContent = ripple(el, btnContent, 0, w);
});

btnContent.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    clearTimeout(contentTimer);
    contentTimer = setTimeout("removeRipple(btnContent, cirContent)", 100);
});

// 设置页面内容

var text = ["", "其它", "餐饮", "交通", "购物", "服饰", "日用品", "娱乐", "食材", "零食", "烟茶酒"];
var textR = ["", "其它", "薪资", "奖金", "借入", "收债", "利息收入", "投资回收", "投资收益", "意外所得"];
var now = localStorage.getItem("detailNow");
var info = localStorage.getItem("list-" + now);
var data = JSON.parse(info);
var picT;
if(data.picType < 10){
    picT = "0" + data.picType.toString();
}
else{
    picT = data.picType.toString();
}

var img = document.getElementById("content-img");
var textTop = document.getElementById("text-top");
if(data.type === "支出"){
    img.src = "icon/" + picT + "_active.png";
    textTop.innerText = text[data.picType];
}
else{
    img.src = "icon/r-" + picT + "_active.png";
    textTop.innerText = textR[data.picType];
}

var textSum = document.getElementById("text-sum");
textSum.innerText = "¥" + data.sum;

var textDate = document.getElementById("content-date");
textDate.innerText = "今天 " + data.dateTime;

var textRemark = document.getElementById("content-remark");
if(data.remarks){
    textRemark.innerText = data.remarks;
}

// 页面跳转

btnBottom.addEventListener('click', function(){
    localStorage.setItem("addNow", now);
    localStorage.setItem("addNowHref", "details.html");
    window.location.href = "add.html";
})

btnClose.addEventListener('click', function(){
    window.location.href = "main.html";
})

// 删除

var alertDelete = document.getElementById("alert-delete");

btnDelete.addEventListener('click', function(){
    alertDelete.style.display = "block";
})

var deleteConfirm = document.getElementById("delete-confirm");
deleteConfirm.addEventListener('click', function(){
    let detailNow = localStorage.getItem("detailNow");
    localStorage.removeItem("list-" + detailNow);
    window.location.href = "main.html";
})

var deleteCancel = document.getElementById("delete-cancel");
deleteCancel.addEventListener('click', function(){
    window.location.href = "details.html";
})