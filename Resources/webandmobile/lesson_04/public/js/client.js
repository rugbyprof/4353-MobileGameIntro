/**
 * Created by ....
 */

var Client = {};
Client.socket = io.connect();

Client.sendTest = function () {
    Client.socket.emit('test');
};

Client.sendNewPlayerRequest = function () {
    Client.socket.emit('newPlayerJoining');
};

Client.sendPlayerPosition = function (data) {
    Client.socket.emit('updatePlayerPosition',data);
};

Client.sendPlayerRefresh = function () {
    Client.socket.emit('requestPlayers');
};

Client.fireBullets = function () {
    Client.socket.emit('fireBullets',game.multi.pid);
};


Client.spawnObstacle = function (x, y, speed, x_scale, y_scale,name){
    data = {
        x:x,
        y:y,
        speed:speed,
        x_scale:x_scale,
        y_scale:y_scale,
        name
    }
    Client.socket.emit('spawnObstacle',data);
};

Client.socket.on('spawnObstacle', function(data){
    destroyer.spawnObstacle(data.x,data.y,data.speed,data.x_scale,data.y_scale,data.name);
});

Client.socket.on('fireBullets', function(pid){
    console.log("firebullets")
    console.log(destroyer.player);
    if(pid != game.multi.pid){
        destroyer.player.fireBullets();
    }
});

Client.socket.on('playerCount', function(count){
    destroyer.checkPlayerCount(count);
});

/**
 * Assigns local player it's ID. This way it can update the array 
 * of players and ignore itself.
 * @param {string} pid | string unique hash
 */
Client.socket.on('playerID',function(pid){
    game.multi.pid = pid;
});

Client.socket.on('playerMoved',function(data){
    destroyer.moveOtherPlayers(data);
});

/**
 * @param {obj} data | object with socket id's as keys pointing to player data;
 */
Client.socket.on('playersArray', function (players) {
    Object.keys(players).forEach(function(pid){
        if(pid != game.multi.pid && !(pid in game.multi.others)){
            game.multi.others[pid] = players[pid];
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