const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 4001;
const queue = [];
io.on('connect', onConnect);

function getTimestamp() {
	let time = new Date();
	return `${ time.toTimeString().slice(0, 8) }:${ time.getMilliseconds() }`
}

function onConnect(socket) {
	socket.on('connection', (response) => {
		socket.emit('fromServer', queue.join('#'));
	});
	socket.on('fromClient', (response) => {
    	queue.push(`${ getTimestamp() }-${ response }`);
    	if(queue.length > 10) queue.shift();
		io.emit('fromServer', queue.join('#'));
	});
}

server.listen(port, () => console.log(`listening on port: ${ port }`));
