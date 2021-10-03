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



