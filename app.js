var express = require('express');
var app = express();
var port = 3535;
var io = require('socket.io').listen(app.listen(port));

app.set('views', __dirname + '/views')
	// Set plain HTML as our template engine, which requires EJS
	.engine('html', require('ejs').renderFile)
	// Ensure that the Routes below aren't overwritten by static files
	//.use(app.router)
	// All are client-side files will be stored in public directory
	.use(express.static(__dirname + '/public'))
	// OUR ROUTES
	.get('/', function(req, res) {
		res.render('index.html');
	});

io.sockets.on('connection', function(socket) {
	// Emit a 'message' on the socket that just connected
	//socket.emit('message', { from: 'user', message: 'Welcome to the room' });
	// 'receive' event handler
	socket.on('receive', function(data) {
		io.sockets.emit('message', data);
	});
});