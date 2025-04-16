window.onload = adjustMargin;
window.onresize = adjustMargin; 

function adjustMargin() {
    var element = document.getElementById("welcome");
    if (window.innerWidth > 900) { 
        element.style.margin = "100px";
    } else if (window.innerWidth > 480) { // Tablets
        element.style.margin = "50px";
    } else { // Mobile phones
        element.style.margin = "20px";
    }
}