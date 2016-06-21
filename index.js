var express 			= require('express')
,	pug					= require('pug')
,	sass				= require('node-sass')
,   sassMiddleware		= require('node-sass-middleware')
,	errorhandler		= require('errorhandler')
,	morgan 				= require('morgan')
,   dotenv				= require('dotenv').config({silent: true})
,	io					= require('socket.io');

var app = express();
var server = require('http').createServer(app);
var io = io.listen(server);

io.set('heartbeat timeout', 120000); 
io.set('heartbeat interval', 1000);

if ('development' == app.get('env')) {
	app.use(sassMiddleware({
		src: __dirname + '/sass',
		dest: __dirname + '/public',
		debug: true,
		outputStyle: 'extended'
	}));
	app.use(errorhandler({ dumpExceptions: true, showStack: true })); 
}

if ('production' == app.get('env')) {
	app.use(sassMiddleware({
		src: __dirname + '/sass',
		dest: __dirname + '/public',
		debug: false,
		outputStyle: 'compressed'
	}));
}

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(morgan('combined'));

//Set up routes
require('./app/routes.js')(app, io);

/*
var listener = app.listen(process.env.PORT || 8080, function () {
	console.log('Express listening on port ' + listener.address().port + ' in ' + process.env.NODE_ENV + ' mode.');
});
*/

var io_listen = server.listen(process.env.PORT || 8080, function() {
	console.log('Server listening on port ' + io_listen.address().port + ' in ' + process.env.NODE_ENV + ' mode.');
});