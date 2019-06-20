var shown = false;

function div_show() {
    document.getElementById('popuploginform').style.display = "flex";
    document.getElementById('body').onclick = function(e) {
        if(shown){
            if(e.target != document.getElementById('popuploginform')) {   
            } else {
                div_hide(); 
            }
        }
        shown = true;
    }
}

function div_hide() {
    document.getElementById("popuploginform").style.display = "none";
    shown = false;
}
