const express = require('express');
const { Server } = require('ws');
const spawn = require('child_process').spawn;
const path = require('path');

const port = process.env.PORT || 3000;
const s = express().use((req, res) => res.sendFile(req.path || 'index.html', { root: path.join(__dirname, 'public') })).listen(port, () => console.log('listening on ' + port));

const wss = new Server({ server: s });
wss.on('connection', (ws) => {
	ws.on('message', m => {
		const a = m.toString().replace(/\n+$/, '').split(' ');
		const p = spawn(a.shift() || '', a, { stdio: ['pipe', 'pipe', 'pipe'] });
		p.on('error', console.error);
		p.stdout.setEncoding('utf-8').on('data', s => ws.send(s.replace(/\n+$/, '')));
		p.stderr.setEncoding('utf-8').on('data', s => ws.send(s.replace(/\n+$/, '')));
	});
});

process.stdin.on('data', b => {
	
});