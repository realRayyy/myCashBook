// 隐藏金额
var textPay = document.getElementById("message");
var textGet = document.getElementById("text-left");
var textBudget = document.getElementById("text-right");
var eye = document.getElementById("eye");
var tPay, tGet, tBudget, clickTimes = 0;

eye.addEventListener('click', function(){
    if(clickTimes === 0){
        tPay = textPay.innerText;
        textPay.innerText = "****";
        tGet = textGet.innerText;
        textGet.innerText = "****";
        tBudget = textBudget.innerText;
        textBudget.innerText = "****";
        clickTimes = 1;
    }
    else{
        textPay.innerText = tPay;
        textGet.innerText = tGet;
        textBudget.innerText = tBudget;
        clickTimes = 0;
    }
})