const { WebSocket } = require('ws');
const { Socket } = require('net');

const server = new WebSocket('ws://127.0.0.1:8080');

server.on('open', () => {
	let client = new Socket();
	client.connect(25565, '127.0.0.1');
	client.on('connect', () => {
		client.on('close', () => {client.close(); server.close(); });
		client.on('data', d => server.send(d));
		server.on('message', m => client.write(m));
	});	
});