var btn = document.getElementById("search");

function ripple(el){
    let x = el.touches[0].clientX - this.offsetLeft;             
    let y = el.touches[0].clientY - this.offsetTop;           
    let circle = document.createElement('span');
    circle.className = 'ripple';       
    circle.style.left = x + 'px';     
    circle.style.top = y + 'px';   
    btn.appendChild(circle);
}

btn.addEventListener('touchstart', ripple);