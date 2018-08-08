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

var players = {};

io.on('connection',function(socket){
    socket.on('newPlayerJoining',function(){
        pid = server.lastPlayerID++;
        players[pid] = {
            sid: socket.id,
            pid: pid,
            x: randomInt(300,800),
            y: randomInt(300,800),
            angle: 0
        };

        // setTimeout(function(){
        //     socket.broadcast.emit('spawnObstacle',data);
        // }, 750);

        socket.on('updatePlayerPosition',function(data){
            if( typeof players[data.pid] == 'object'){
                players[data.pid].x = data.x;
                players[data.pid].y = data.y;
                players[data.pid].angle = data.angle;
                socket.broadcast.emit('playerMoved', data);
            }
            socket.emit('playerCount',server.lastPlayerID);
        });

        socket.on('requestPlayers',function(){
            socket.emit('playersArray',players);
        });

        socket.on('spawnObstacle',function(data){
            socket.broadcast.emit('spawnObstacle',data);
        });
        
        socket.on('fireBullets',function(pid){
            socket.broadcast.emit('fireBullets',pid);
        });

        socket.on('stopFireBullets',function(pid){
            socket.broadcast.emit('stopFireBullets',pid);
        });

        

        // Sends back our own socket id so we know who we are
        // in the list of players
        socket.emit('playerID',pid);
        socket.emit('playersArray', players);
        // Sends object of players + new players id so we know who to spawn
        socket.broadcast.emit('playersArray', players);

        socket.on('disconnect',function(){
            console.log("removing:" + socket.id)
            socket.broadcast.emit('removePlayer',socket.id);
            io.emit('remove',socket.id);
            Object.keys(players).forEach(function(pid){
                if(players[pid].sid == socket.id){
                    delete players[pid];
                }
            });
            
        });
    });

    socket.on('test',function(){
        console.log('Server: test');
    });

    
});



// Communicate between local page and app.js
// io.on('connection', function (client) {
    
//     console.log('a player connected: ', client.id);
//     //client.emit('gameReady');
//     // create a new player and add it to our players object
//     client.player = {
//         x:random(0,1000),
//         y:random(0,1000)
//     };

//     console.log(client.player);

//     // sends the players array to the new player so
//     // they get all the players playing
//     client.emit('initPlayersArray', getAllPlayers());

//     // update all other players of the new player
//     // new connections doesn't get this
//     client.broadcast.emit('newPlayerJoining', players[client.id]);

//     client.on('test', function () {
//         console.log('test received');
//     });
// });

function randomInt(min=0,max=9007199254740992){
    return Math.floor(max * Math.random()) + min;
}

function getAllPlayers(){
    var players = {};
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players[socketID] = player;
    });
    return players;
}

server.listen(process.env.PORT || 4400, function () {
    console.log('Listening on ' + server.address().port);
});

/*
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var players = {};
var star = {
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50
};
var scores = {
    blue: 0,
    red: 0
};

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected: ', socket.id);
    socket.emit('gameReady');
    // create a new player and add it to our players object
    players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
        team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
    };
    
    // send the players object to the new player
    socket.emit('currentPlayers', players);
    // send the star object to the new player
    socket.emit('starLocation', star);
    // send the current scores
    socket.emit('scoreUpdate', scores);
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);

    // when a player disconnects, remove them from our players object
    socket.on('disconnect', function () {
        console.log('user disconnected: ', socket.id);
        delete players[socket.id];
        // emit a message to all players to remove this player
        io.emit('disconnect', socket.id);
    });

    // when a player moves, update the player data
    socket.on('playerMovement', function (movementData) {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].rotation = movementData.rotation;
        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });

    socket.on('requestPlayerInfo',function(playerId){
        socket.emit('lostPlayer',players[socket.id]);
    });

    socket.on('starCollected', function () {
        if (players[socket.id].team === 'red') {
            scores.red += 10;
        } else {
            scores.blue += 10;
        }
        star.x = Math.floor(Math.random() * 700) + 50;
        star.y = Math.floor(Math.random() * 500) + 50;
        io.emit('starLocation', star);
        io.emit('scoreUpdate', scores);
    });
});

server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});
*/