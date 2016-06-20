// app/routes.js

//Requires


//Variables


module.exports = function(app) {
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
}