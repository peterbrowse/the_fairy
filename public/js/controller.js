var socket = io.connect(io_path);
socket.on('connect', function(data) {
    socket.emit('join', 'command');
});

$(document).ready(function(){
	$('.item').on('click', function(e){
		var play_sound = $(this).find('p').attr('alt');
		
		console.log(play_sound);
		
		socket.emit('command', play_sound);
	});
});