const { WebSocketServer } = require('ws');
const { Socket } = require('net');
const { createServer } = require('http');
const { spawn } = require('child_process');

const httpServer = createServer((req, res) => {
	const body = 'dummy server.';
	res.writeHead(404, { 'Content-Length': Buffer.byteLength(body), 'Content-Type': 'text/plain' }).end(body);
});

const server = new WebSocketServer({ server: httpServer });

server.on('connection', s => {
	let client = new Socket();
	client.connect(25565, '127.0.0.1');
	s.on('close', () => client.destroy());
	s.on('message', m => client.write(m));
	client.on('data', d => s.send(d));
});

httpServer.listen(process.env.PORT || 8080);

spawn('./jdk-16.0.2/bin/java', '-jar server.jar -Xmx2G --nogui'.split(' '));