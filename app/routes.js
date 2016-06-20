// app/routes.js

//Requires

//Variables


module.exports = function(app, io) {
	app.get('/', function (req, res) {
		res.render('index', {
			title: 'The Fairy - Controller'
		});
	});
	
	app.get('/fairy', function(req, res) {
		res.render('fairy', {
			title: 'The Fairy'
		});
	});
	
/*
	io.on('connection', function (socket) {
	  socket.emit('news', { hello: 'world' });
	  socket.on('my other event', function (data) {
	    console.log(data);
	  });
	});
*/
}