/**
 * Analog Clock
 * 2020/08/12 Created by CleanLake
 * 
 * @version 1.0
 */
$.fn.digitalclock = async function(_options) {
	this.addClass("digitalclock");

	let option = {
		x: 0,
		y: 0,
		size: 500,
		skew: 0,
        rotate: 0,
		color: '#66ff99',
		colorDelimiter: '#000000',
		fontsize: 100,
		scale: [1,1],
	};
	
	if (_options != undefined) {
		jQuery.each(_options, function(i, val) {
			option[i] = val;
		});
	}	

	// Render clock background and clock hands
	let init = function(clock) {
		let clockWidth = option.size;
		let clockHeight = option.size;

		// Clock position
		clock.css("left",(option.x-clockWidth/2) + "px");
		clock.css("top", (option.y-clockHeight/2) + "px");
		clock.css("width", clockWidth + "px");
		clock.css("height", clockHeight + "px");


		// Rotate and skew clock
		let transform = "";
		transform += "scale(" + option.scale[0] + ", " + option.scale[1] + ")";
		transform += " skew(" + option.skew + "deg)";
        transform += " rotate(" + option.rotate + "deg)";
		clock.css("transform", transform);
		clock.css("color", option.color);
		clock.css("font-size", option.fontsize + "px");
		clock.css("line-height", clockHeight + "px");
	};

	// Rotate hands according to current time
	let clock = function(clock) {
		var date = new Date(); /* creating object of Date class */
		var hour = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		hour = paddingZero(hour);
		min = paddingZero(min);
		sec = paddingZero(sec);
		clock.html('<span>' + hour + '<span class="second">:</span>' + min + '</span>');
		if (sec % 2== 0) {
			clock.find('.second').css("color", option.color);
		} else {
			clock.find('.second').css("color", option.colorDelimiter);
		}
	};
	
	let paddingZero = function(k) {
		if (k < 10) {
			return "0" + k;
		}
		else {
			return k;
		}
	}

	init(this);
	clock(this);
	setInterval(clock, 1000, this);
};

