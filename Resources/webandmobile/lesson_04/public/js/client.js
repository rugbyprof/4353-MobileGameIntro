/**
 * Created by ....
 */

var Client = {};
Client.socket = io.connect();

Client.sendTest = function () {
    console.log('Client: sendTest');
    Client.socket.emit('test');
};

Client.sendNewPlayerRequest = function () {
    console.log('Client: sendNewPlayerRequest');
    Client.socket.emit('newPlayerJoining');
};

Client.sendPlayerPosition = function (data) {
    console.log('Client: sendPlayerPosition');
    Client.socket.emit('updatePlayerPosition',data);
};

Client.sendPlayerRefresh = function () {
    console.log('Client: sendPlayerRefresh');
    Client.socket.emit('requestPlayers');
};

Client.socket.on('playerCount') = function(count){
    destroyer.checkPlayerCount(count);
}

/**
 * Assigns local player it's ID. This way it can update the array 
 * of players and ignore itself.
 * @param {string} pid | string unique hash
 */
Client.socket.on('playerID',function(pid){
    console.log('Client: playerID');
    game.multi.pid = pid;
    console.log('got my id:' + pid);
});

Client.socket.on('playerMoved',function(data){
    console.log('Client: playerMoved');
    destroyer.moveOtherPlayers(data);
});

/**
 * @param {obj} data | object with socket id's as keys pointing to player data;
 */
Client.socket.on('playersArray', function (players) {
    console.log('Client: playersArray');
    Object.keys(players).forEach(function(pid){
        if(pid != game.multi.pid && !(pid in game.multi.players)){
            console.log("spawning a player..." + pid)
            game.multi.players[pid] = players[pid];
            game.multi.count++;
            destroyer.spawnNewPlayer(players[pid]);
        }
    });
});


// Client.sendVelocity = function (data) {
//     Client.socket.emit('moveme', data);
// };

// Client.sendLocation = function (x, y) {
//     //console.log({vx:x,vy:y})
//     Client.socket.emit('snapTo', {
//         x: x,
//         y: y
//     });
// };

// Client.sendTarget = function (mouse) {
//     console.log({
//         x: mouse.event.x,
//         y: mouse.event.y
//     })
//     Client.socket.emit('targetPlayer', {
//         x: mouse.event.x,
//         y: mouse.event.y
//     });
// };

// Client.socket.on('newplayer', function (data) {
//     FlameGame.addNewPlayer(data.id, data.x, data.y);
// });

// Client.socket.on('allplayers', function (data) {
//     for (var i = 0; i < data.length; i++) {
//         FlameGame.addNewPlayer(data[i].id, data[i].x, data[i].y);
//     }

//     Client.socket.on('move', function (data) {
//         FlameGame.movePlayer(data.id, data.velocity.x, data.velocity.y);
//     });

//     Client.socket.on('snapTo', function (data) {
//         FlameGame.snapPlayer(data.id, data.x, data.y);
//     });

//     Client.socket.on('remove', function (id) {
//         FlameGame.removePlayer(id);
//     });

//     Client.socket.on('fireWeapon', function (data) {
//         FlameGame.fireWeapon(data);
//     });
// });