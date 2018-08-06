// app.js
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Communicate between local page and app.js
io.on('connection', function (client) {
    console.log('Client connected...');

    client.on('join', function (data) {
        console.log(data);
    });

    client.on('messages', function (message) {
        data = {
            message:message,
            class:'me'
        }
        client.emit('broadCastMessage', data);
        data['class'] = 'you';
        client.broadcast.emit('broadCastMessage', data);
    });
});

server.listen(4200, function () {
    console.log(`Listening on ${server.address().port}`);
});