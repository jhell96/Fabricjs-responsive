// ----------------------------------------------------------------------------

var express = require('express');
var app = express();

app.use(express.static('public', {'extensions': ['html']}));
app.use('/pnacl', express.static('pnacl'));
app.use('/app', express.static('public/app'));

// ----------------------------------------------------------------------------

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

// ----------------------------------------------------------------------------

var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({server: server, path: '/ws'});

wss.broadcast = function(sender, data) {
    for(var i in wss.clients) {
        var client = wss.clients[i];

        if (client !== sender) {
            wss.clients[i].send(data);
        }
    }
};

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
        wss.broadcast(ws, message);
    });
});
