// app.js

// Create our express http server.
// https://expressjs.com/
var express = require('express'); 
var app = express();

//https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

// .require == a node #include statement. In this case we need 'http' (typical web protocol)
// .createserver == create the server and pass in the 'app' object to handle the basics (see link above)
var server = require('http').createServer(app);

// https://medium.com/@rloperena/quick-guide-to-socket-io-basics-59b07c39c6ec
// Now we require 'socket.io' and pass in our http server. See README for more.
var io = require('socket.io')(server);

//load path to node modules
app.use(express.static(__dirname + '/node_modules'));

//Set up root path to server the index.html file
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

//  When socket gets request from client
//  run a specific 'route' (join,messages)
io.on('connection', function (client) {
    var address = client.handshake.address;
    console.log('New connection from ' + client.handshake.address);

    client.on('join', function (data) {
        console.log(data);
    });
    client.on('messages', function (data) {
        client.emit('broad', data);
        client.broadcast.emit('broad', data);
    });
});

// What port to listen on.
server.listen(4100, function () {
    console.log(`Listening on ${server.address().port}`);
});