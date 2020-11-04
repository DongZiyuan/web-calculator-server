const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 4001;
const queue = [];

function getTimestamp() {
	let time = new Date();
	return `${ time.toTimeString().slice(0, 8) }:${ time.getMilliseconds() }`
}

function onConnect(socket) {
	socket.on('connection', (response) => {
		socket.emit('fromServer', queue.join('#'));
	});

	socket.on('clear logs', (response) => {
		queue.length = 0;
		io.emit('fromServer', queue.join('#'));
	});

	socket.on('fromClient', (response) => {
    	queue.push(`${ getTimestamp() }-${ response }`);
    	if(queue.length > 10) queue.shift();
		io.emit('fromServer', queue.join('#'));
	});
}

app.use(express.static(path.join(__dirname, 'build')));
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', '/index.html'));
});


io.on('connect', onConnect);
http.listen(port, () => console.log(`Socket server is listening on port: ${ port }`));
