var net = require('net');

const client = new net.Socket();
const server = new net.Server();

let sockets = [];

server.on('connection', s => {
	client.connect(25565, '127.0.0.1');
	s.on('data', d => client.write(d));
	// s.on('ready', () => { sockets.push(s); console.log(s); });
	sockets.push(s);
	// console.log(sockets);
	s.on('close', () => { setTimeout(() => {sockets = sockets.filter(f => f.address != s.address); console.log(sockets); client.end()}, 100) });
});

client.on('data', d => sockets.forEach(s => s.write(d)));

server.listen(25564, '127.0.0.1');