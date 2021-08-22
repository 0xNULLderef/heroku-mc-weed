const { WebSocket } = require('ws');
const { Server } = require('net');

const client = new WebSocket('ws://127.0.0.1.com:80');

client.on('open', () => {
	let server = new Server();
	server.on('connection', s => {
		s.on('close', () => { client.close(); server.close(); })
		s.on('data', d => client.send(d));
		client.on('message', m => s.write(m));
	})
	server.listen(process.argv[2] || 25565, '127.0.0.1');
});