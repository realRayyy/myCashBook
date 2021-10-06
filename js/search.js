var input = document.getElementById("input");
var t = localStorage.getItem("times");
var list = document.getElementById("list");
var dateToday = new Date();
var text = ["", "其它", "餐饮", "交通", "购物", "服饰", "日用品", "娱乐", "食材", "零食", "烟茶酒"];
var textR = ["", "其它", "薪资", "奖金", "借入", "收债", "利息收入", "投资回收", "投资收益", "意外所得"];
var div = [""], cirDiv = [""];
var longClick = document.getElementById("long-click");
var historyContent = document.getElementById("history-content");

function clearList(){
    let divs = list.getElementsByClassName("list-content");
    for(let i = divs.length -1; i >= 0; i--){
        list.removeChild(divs[i]);
    }
}

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

function remove(div, cir){
    clearTimeout(div.timer);
    div.timer = setTimeout(function(){
        div.removeChild(cir);
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

if(!localStorage.getItem("history-time")){
    localStorage.setItem("history-time", "0");
}

var ht = localStorage.getItem("history-time");
ht = Number(ht);
var divHistory = document.getElementById("history");

for(let i = 1; i <= ht; i++){
    let text = localStorage.getItem("history-" + i.toString());
    if(text === null){
        continue;
    }
    let divMain = document.createElement("div");
    divMain.className = "history-main";
    divHistory.appendChild(divMain);

    let divText = document.createElement("div");
    divText.className = "history-text";
    let textNode = document.createTextNode(text);
    divText.appendChild(textNode);
    divMain.appendChild(divText);

    let divMiddle = document.createElement("div");
    divMiddle.className = "history-middle";
    divMain.appendChild(divMiddle);

    let divBtn = document.createElement("div");
    divBtn.className = "history-btn";
    divMain.appendChild(divBtn);

    let divImg = document.createElement("img");
    divImg.src = "icon/history-delete.png";
    divBtn.appendChild(divImg);

    divMain.addEventListener('click', function(){
        input.value = text;
        let inputText = text;
        historyContent.style.display = "none";
        for(let i = 1; i <= t; i++){
            let info = localStorage.getItem("list-" + i);
            if (info === null){
                continue;
            }
            if(info.indexOf(inputText) === -1){
                continue;
            }
            let data = JSON.parse(info);
            if(data.dayCheck !== dateToday.getDay()){
                
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
    
            //波纹效果
            div[i] = divContent;
            createRipple(i);
    
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
    })

    //波纹效果
    let cir;

    divMain.addEventListener('touchstart', function(el){
        el.stopPropagation();
        cir = ripple(el, divMain, 0, 0);
    });
    
    divMain.addEventListener('touchend' ,function(el){
        el.stopPropagation();
        remove(divMain, cir);
    });

    //删除历史
    divBtn.addEventListener('click', function(el){
        el.stopPropagation();
        localStorage.removeItem("history-" + i);
        window.location.href = "search.html";
    })
}

// 搜索

input.addEventListener('change', function(){
    clearList();
    let inputText = input.value;
    if(inputText != ""){
        historyContent.style.display = "none";
        ht = localStorage.getItem("history-time");
        ht = Number(ht) + 1;
        localStorage.setItem("history-" + ht.toString(), inputText);
        localStorage.setItem("history-time", ht.toString());
    }
    else{
        window.location.href = "search.html";
    }

    for(let i = 1; i <= t; i++){
        let info = localStorage.getItem("list-" + i);
        if (info === null){
            continue;
        }
        if(info.indexOf(inputText) === -1){
            continue;
        }
        let data = JSON.parse(info);
        if(data.dayCheck !== dateToday.getDay()){
            
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

        //波纹效果
        div[i] = divContent;
        createRipple(i);

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
})

// 删除与修改

var longClickChange = document.getElementById("long-click-change");
var touchCheck1 = 0, touchCheck2 = 0;
longClickChange.addEventListener('touchstart', function(){
    touchCheck1 = 1;
})
longClickChange.addEventListener('touchend', function(){
    touchCheck1 = 0;
    localStorage.setItem("addNowHref", "search.html");
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
    window.location.href = "search.html";
})

var deleteCancel = document.getElementById("delete-cancel");
deleteCancel.addEventListener('click', function(){
    window.location.href = "search.html";
})

// 返回

var btnBack = document.getElementById("back");
var cirBtnBack;
var btnBackTimer;

btnBack.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirBtnBack = ripple(el, btnBack, 0, 0);
});

btnBack.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    clearTimeout(btnBackTimer);
    btnBackTimer = setTimeout("removeRipple(btnBack, cirBtnBack)", 100);
});

btnBack.addEventListener('click', function(){
    window.location.href = "main.html";
})

// 清空历史
var clearHistory = document.getElementById("clear-history");
var cirClearHistory;
var clearHistoryTimer;

clearHistory.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirClearHistory = ripple(el, clearHistory, 0, 0);
});

clearHistory.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    clearTimeout(clearHistoryTimer);
    clearHistoryTimer = setTimeout("removeRipple(clearHistory, cirClearHistory)", 100);
});

clearHistory.addEventListener('click', function(){
    let divClear = divHistory.getElementsByClassName("history-main");
    for(let i = divClear.length -1; i >= 0; i--){
        divHistory.removeChild(divClear[i]);
    }
    for(let i = 1; i <= ht; i++){
        if(localStorage.getItem("history-" + i)){
            localStorage.removeItem("history-" + i);
        }
    }
})