window.onload = function() {
	var messages = [],
		socket = io.connect(window.location.origin),
		display = document.getElementById('output'),
		send = document.getElementById('send'),
		content = document.getElementById('msg');

	socket.on('message', function(data) {
		if (data.message) {
			messages.push(data.message);
			var html = '';
			messages.forEach(function(msg) {
				html += msg;
			});
			content.innerHTML = html;
		}
		else {
			console.log('error', data);
		}
	});
}