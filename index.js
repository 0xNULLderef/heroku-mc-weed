const { WebSocketServer } = require('ws');
const { Socket, Server } = require('net');
const { createServer } = require('http');

const httpServer = createServer((req, res) => {
	const body = 'dummy server.';
	res.writeHead(200, { 'Content-Length': Buffer.byteLength(body), 'Content-Type': 'text/plain' }).end(body);
});

const server = new WebSocketServer({ server: httpServer });

server.on('connection', s => {
	console.log(server.clients.size);
	if(server.clients.size <= 1) {
		let localserver = new Server();
		localserver.on('connection', c => {
			c.on('data', d => s.send(d));
			s.on('message', m => c.write(m));
		});
		localserver.listen(42069, '127.0.0.1');
	} else {
		let client = new Socket();
		client.connect(42069, '127.0.0.1');
		s.on('close', () => client.destroy());
		s.on('message', m => client.write(m));
		client.on('data', d => s.send(d));
	}
});

httpServer.listen(process.env.PORT || 8080);