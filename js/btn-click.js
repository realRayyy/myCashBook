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

var btnSearch = document.getElementById("search");
var cirSearch;

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

btnSearch.addEventListener('touchstart', function(el){
    cirSearch = ripple(el, btnSearch, 0, 0);
});

btnSearch.addEventListener('touchend' ,function(el){
    setTimeout("removeRipple(btnSearch, cirSearch)", 100);
});

//此处有bug仍未处理
var btnEye = document.getElementById("eye");
var cirEye;

btnEye.addEventListener('touchstart', function(el){
    el.stopPropagation();
    let h = btnEye.offsetHeight / 2;
    cirEye = ripple(el, btnEye, h, 0);
});

btnEye.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    setTimeout("removeRipple(btnEye, cirEye)", 100);
});

var btnContent = document.getElementById("content");
var cirContent;

btnContent.addEventListener('touchstart', function(el){
    el.stopPropagation();
    let w = btnContent.offsetWidth / 2;
    cirContent = ripple(el, btnContent, 0, w);
});

btnContent.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    setTimeout("removeRipple(btnContent, cirContent)", 100);
});

var btnAbout = document.getElementById("about");
var cirAbout;

btnAbout.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirAbout = ripple(el, btnAbout, 0, 0);
});

btnAbout.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    setTimeout("removeRipple(btnAbout, cirAbout)", 100);
});

var btnSettings = document.getElementById("settings");
var cirSettings;

btnSettings.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirSettings = ripple(el, btnSettings, 0, 0);
});

btnSettings.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    setTimeout("removeRipple(btnSettings, cirSettings)", 100);
});

var btnRecords = document.getElementById("records");
var cirRecords;

btnRecords.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirRecords = ripple(el, btnRecords, 0, 0);
});

btnRecords.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    setTimeout("removeRipple(btnRecords, cirRecords)", 100);
});

var btnDetails = document.getElementById("details");
var cirDetails;

btnDetails.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirDetails = ripple(el, btnDetails, 0, 0);
});

btnDetails.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    setTimeout("removeRipple(btnDetails, cirDetails)", 100);
});

var btnClose = document.getElementById("alert-close");
var cirClose;

btnClose.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirClose = ripple(el, btnClose, 0, 0);
});

btnClose.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    setTimeout("removeRipple(btnClose, cirClose)", 100);
});

var btnLongClickChange = document.getElementById("long-click-change");
var cirLongClickChange;
var longClickChangeTimer;

btnLongClickChange.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirLongClickChange = ripple(el, btnLongClickChange, 0, 0);
});

btnLongClickChange.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    clearTimeout(longClickChangeTimer);
    longClickChangeTimer = setTimeout("removeRipple(btnLongClickChange, cirLongClickChange)", 100);
});

var btnLongClickDelete = document.getElementById("long-click-delete");
var cirLongClickDelete;
var longClickDeleteTimer;

btnLongClickDelete.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirLongClickDelete = ripple(el, btnLongClickDelete, 0, 0);
});

btnLongClickDelete.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    clearTimeout(longClickDeleteTimer);
    longClickDeleteTimer = setTimeout("removeRipple(btnLongClickDelete, cirLongClickDelete)", 100);
});

var btnDeleteCancel = document.getElementById("delete-cancel");
var cirDeleteCancel;
var deleteCancelTimer;

btnDeleteCancel.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirDeleteCancel = ripple(el, btnDeleteCancel, 0, 0);
});

btnDeleteCancel.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    clearTimeout(deleteCancelTimer);
    deleteCancelTimer = setTimeout("removeRipple(btnDeleteCancel, cirDeleteCancel)", 100);
});

var btnDeleteConfirm = document.getElementById("delete-confirm");
var cirDeleteConfirm;
var deleteConfirmTimer;

btnDeleteConfirm.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirDeleteConfirm = ripple(el, btnDeleteConfirm, 0, 0);
});

btnDeleteConfirm.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    clearTimeout(deleteConfirmTimer);
    deleteConfirmTimer = setTimeout("removeRipple(btnDeleteConfirm, cirDeleteConfirm)", 100);
});

var btnSetBudget = document.getElementById("budget-close");
var cirSetBudget;
var setBudgetTimer;

btnSetBudget.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirSetBudget = ripple(el, btnSetBudget, 0, 0);
});

btnSetBudget.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    clearTimeout(setBudgetTimer);
    setBudgetTimer = setTimeout("removeRipple(btnSetBudget, cirSetBudget)", 100);
});