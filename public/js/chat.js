window.onload = function() {
	console.log('data');
	var messages = [],
		socket = io.connect(window.location.origin),
		display = document.getElementById('output'),
		send = document.getElementById('send'),
		content = document.getElementById('msg');

	socket.on('message', function(data) {
		console.log(data);
		console.log(nickname);
		if (data.message) {
			messages.push(data);
			var html = '';
			messages.forEach(function(msg) {
				var nickname = document.getElementById('nickname').value;
				if (msg.from == nickname)
					var newMsg = `<div class="msg-me">`;
				else
					var newMsg = `<div class="msg">`;
				newMsg += `<h1>${msg.from}</h1>
					<p>${msg.message}</p>
				</div><br>`;
				html += newMsg;
			});
			display.innerHTML = html;
		}
		else {
			console.log('error', data);
		}
	});

	send.onclick = function() {
		var nickname = document.getElementById('nickname').value;
		socket.emit('receive', { from: nickname, message: content.value });
	}
}

console.log('adasd');