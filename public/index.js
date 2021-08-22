var h = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(h);

var c = document.querySelector('#console');
c.value = '';
ws.addEventListener('message', m => {
	c.value += m.data.toString() + '\n';
});

var f = document.querySelector('form');
f.children[0].value = '';
if(f.attachEvent) {
	f.attachEvent('submit', p);
} else {
	f.addEventListener('submit', p);
}

function p(e) {
	if(e.preventDefault) e.preventDefault();
	if(ws.OPEN) {
		ws.send(f.children[0].value);
		f.children[0].value = '';
	}
	return false;
}