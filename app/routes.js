// app/routes.js

//Requires

//Variables
var io_path = '';

module.exports = function(app, io) {
	if ('production' == app.get('env')) {
		io_path = "http://the-fairy.herokuapp.com:3000";
	} else {
		io_path = "http://localhost:3000";
	}
	
	app.get('/', function (req, res) {
		res.render('index', {
			title: 'The Fairy - Controller',
			io_path: io_path
		});
	});
	
	app.get('/fairy', function(req, res) {
		res.render('fairy', {
			title: 'The Fairy',
			io_path: io_path
		});
	});
	
	io.on('connection', function(client) {
		client.on('join', function(data) {
			client.join(data);
		});
		
		client.on('command', function(command) {
			io.to('client').emit('command', command);
		});
	});
}