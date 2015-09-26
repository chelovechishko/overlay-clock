var overlay_clock = document.createElement('div');

overlay_clock.id = 'mychromeclock';
overlay_clock.style.borderRadius = "6px";
overlay_clock.style.padding = "6px";
overlay_clock.style.position = "fixed";
overlay_clock.style.zIndex = "667";

overlay_clock.onclick = function() {this.style.display = 'none'};
document.body.appendChild(overlay_clock);

mychromeclockDisp();

function is_fullscreen() {
    // This is the q&d solution. The "right" way is: http://stackoverflow.com/a/20310858/955670
    var ret = (screen.width == window.outerWidth) && (screen.height == window.outerHeight);
    return ret;
}

// set by options
var mil_time;

function time_string() {
	var now = new Date();
	var hh = ('0' + now.getHours()).slice(-2);
	var mm = ('0' + now.getMinutes()).slice(-2);
	apm = '';

	if (!mil_time) {
		if (hh < 13) {
			apm = ' am'
		}
		else {
			hh -= 12;
			hh = ('0' + hh).slice(-2);
			apm = ' pm';
		}
	}

	return hh + ':' + mm + apm;
}

function init_options(on_options_ready) {
	chrome.storage.sync.get(document.clock_defaults, on_options_ready);
}

function mychromeclockDisp() {
	init_options(options_ready);
}

function options_ready(values) {
	var fullscreen_only = values["fullscreen_only"];
	mil_time = values["mil_time"];
	var fg_color = values['fg_color'];
	var bg_color = values['bg_color'];
	var opacity = values['bg_opacity'];
	var font_size = values['font_size'];
	var font_family = values['font_family'];
	var style_right = values['style_right'];
	var style_top = values['style_top'];

	var overlay_clock = document.getElementById("mychromeclock");
	if (!fullscreen_only || is_fullscreen()) {
		overlay_clock.textContent = time_string();
		overlay_clock.style.color = fg_color;
		overlay_clock.style.backgroundColor = bg_color;
		overlay_clock.style.opacity = opacity;
		overlay_clock.style.fontSize = font_size;
		overlay_clock.style.fontFamily = font_family;
		overlay_clock.style.right = style_right;
		overlay_clock.style.top = style_top;
		overlay_clock.style.display = 'block';
	} else overlay_clock.style.display = 'none';

	setTimeout(mychromeclockDisp, 15000); // 15s
}
