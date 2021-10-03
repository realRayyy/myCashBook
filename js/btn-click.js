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

function ripple(el, btn){
    let x = el.touches[0].clientX - btn.offsetLeft;             
    let y = el.touches[0].clientY - btn.offsetTop;
    console.log(el.touches[0].clientX);
    console.log(btn.offsetLeft);
    console.log(btn.offsetParent);
    console.log(el.touches[0].clientY);
    console.log(btn.offsetTop); 
    console.log(getLeft(btn));
    console.log(getTop(btn));          
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
    cirSearch = ripple(el, btnSearch);
});

btnSearch.addEventListener('touchend' ,function(el){
    setTimeout("removeRipple(btnSearch, cirSearch)", 100);
});

var btnEye = document.getElementById("eye");
var cirEye;

btnEye.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirEye = ripple(el, btnEye);
});

btnEye.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    setTimeout("removeRipple(btnEye, cirEye)", 100);
});

var btnContent = document.getElementById("content");
var cirContent;

btnContent.addEventListener('touchstart', function(el){
    el.stopPropagation();
    cirContent = ripple(el, btnContent);
});

btnContent.addEventListener('touchend' ,function(el){
    el.stopPropagation();
    setTimeout("removeRipple(btnContent, cirContent)", 100);
});
