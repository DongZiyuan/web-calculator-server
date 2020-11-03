const app = require('express')();
<<<<<<< HEAD
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
=======
const server = require('https').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server);
>>>>>>> 0de988d214ac733d352d1426c417fc12329385dc
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
	socket.on('fromClient', (response) => {
    	queue.push(`${ getTimestamp() }-${ response }`);
    	if(queue.length > 10) queue.shift();
		io.emit('fromServer', queue.join('#'));
	});
}

<<<<<<< HEAD
=======
app.use(cors());
io.origins('*:*');
>>>>>>> 0de988d214ac733d352d1426c417fc12329385dc
io.on('connect', onConnect);
server.listen(port, () => console.log(`listening on port: ${ port }`));
