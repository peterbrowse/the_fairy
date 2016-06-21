var loaded = false;
var audio_count = 1;
var animated = false;
	
var audio = [
	'../audio/ape.mp3',
	'../audio/bowhead-whale.mp3',
	'../audio/cat.mp3',
	'../audio/cow.mp3',
	'../audio/duck.mp3',
	'../audio/ding.mp3',
	'../audio/lion.mp3',
	'../audio/pig.mp3'
];

soundManager.setup({
	url: "/js/swf/",
	useHTML5Audio: true,
	preferFlash: false,
	flashVersion: 9,
	useHighPerformance: true,
	debugMode: false,
	debugFlash: false,
	flashLoadTimeout: 1000
});

var socket = io.connect(io_path);
socket.on('connect', function(data) {
    socket.emit('join', 'client');
});

socket.on('command', function(command) {
	//console.log('Play: ' + command);
	
	play_sound(command);
});

$(document).ready(function(){
	$('.preload_text').blink();
	
	soundInit(function(ready){
		if(ready) {
			preload();
		}
	});
	
	$('.activate_button').on('click', function() {
		play_sound('ding');
		$(this).find('h2').text('Ready');
	});
});

//SOUND & PRELOAD
function soundInit(callback) {
	soundManager.ontimeout(function(status) {
		soundManager.flashLoadTimeout = 0;
  		soundManager.onerror = {};
    	soundManager.reboot(); 
	});

	soundManager.onready(function() {
		callback(1);
	});
}

function preload() {
	var loader = new PxLoader();
	
	//Audio
	audio.forEach(function(item){
		var sound_title = item.split('../audio/').join('');
		sound_title = sound_title.replace('.mp3', '');
		
		loader.add(new PxLoaderSound(sound_title,item));
	});
	
	loader.addProgressListener(function(e) { 
	    //console.log(e.resource.getName()); 
	}); 
	
	loader.addCompletionListener(function(e) {
		loaded = true;
		
		init_scene();
	});
	
	loader.start();
}

function start_sounds() {
	setTimeout(function(){
		var track_num = randomIntFromInterval(1,2);
		play_sound(track_num);
		
		setInterval(function(){
			var track_num = randomIntFromInterval(1,2);
			play_sound(track_num);
		}, 30000)
	}, 5000);
}

function play_sound(track_num) {
	var track = soundManager.getSoundById(track_num);
	track.play();
}

//SCENE CONTROL
function init_scene() {
	$('.preload').fadeOut(800);
	
	$('.content').delay(600).fadeIn(800, function(){
		setTimeout(function(){
			
			//Start Animations
			//start_sounds();
		}, 300);
	});
}

//BLINK
(function ($) {
	$.fn.blink = function (options) {
		var defaults = { delay: 700 };
		var options = $.extend(defaults, options);
		return $(this).each(function (idx, itm) {
			setInterval(function () {
				if ($(itm).css("display") === "table-cell") {
					$(itm).fadeOut(200);//.css('visibility', 'hidden');
				}
				else {
					$(itm).fadeIn(300);//.css('visibility', 'visible');
				}
			}, options.delay);
		});
	}
} (jQuery))

//Random Number
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}