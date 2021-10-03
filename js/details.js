var btnDelete = document.getElementById("delete");
var cirDelete;

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

//btn-click

