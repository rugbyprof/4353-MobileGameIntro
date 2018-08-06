// app.js
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.lastPlayerID = 0;

// Communicate between local page and app.js
io.on('connection', function (client) {
    console.log('Player Joined ...');

    client.on('test',function(){
        console.log('test received');
    });
});

server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on '+server.address().port);
});