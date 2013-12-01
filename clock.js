document.body.innerHTML = '<div id="mychromeclock" style="position:fixed;right:0;text-align:right;z-index:99999999;" onmouseover="document.getElementById('+"'mychromeclock').style.display='none'"+'" onmouseout="document.getElementById('+"'mychromeclock').style.display='block'"+'"></div>'+document.body.innerHTML;

document.body.parentNode.onwebkitfullscreenchange = function(e) {
    console.log("Entered fullscreen!");
};

mychromeclockDisp();

var fullscreen_only;
var mil_time; // military (24-hour) clock

function is_fullscreen() {
    // var ret = screenfull.isFullscreen;
    var ret = (screen.width == window.outerWidth) && (screen.height == window.outerHeight);
    console.log("fs: "+ret);
    return ret;
}

function time_string() {
    var now = new Date();
    var hh = now.getHours();
    var ampm = "";
    if (mil_time) {
	if( hh < 10 ){ hh = "0" + hh; }
	} else {
	if (hh == 0) {ampm = "a"; hh = "12"; }
	else if (hh < 10) {ampm = "a"; hh = "0" + hh; }
	else if (hh < 13) {ampm = "a"; }
	else if (hh < 22) {ampm = "p"; hh = "0" + (hh - 12); }
	else {ampm = "p"; hh = "" + (hh - 12); }
	}
    var mm = now.getMinutes();
    if( mm < 10 ){ mm = "0" + mm; }
    var ss = now.getSeconds();
    return hh+":"+mm+ampm;
}

function init_options(on_options_ready) {
	chrome.storage.sync.get({"fullscreen_only": false, "mil_time": true}, on_options_ready);
}

function mychromeclockDisp(){
    init_options(options_ready);
}

function options_ready(values) {
    fullscreen_only = values["fullscreen_only"];
    mil_time = values["mil_time"];
    var obj = document.getElementById("mychromeclock");
    if (!fullscreen_only || is_fullscreen()) {
	    obj.innerText = time_string();
    } else {
	obj.innerText = '';
    }
    setTimeout(mychromeclockDisp, 10000);
}
