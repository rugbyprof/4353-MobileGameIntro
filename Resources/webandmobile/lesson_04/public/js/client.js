/**
 * Created by ....
 */

var Client = {};
Client.socket = io.connect();

Client.sendTest = function () {
    console.log("test sent");
    Client.socket.emit('test');
};

Client.sendNewPlayerRequest = function () {
    console.log("sending request to join...");
    Client.socket.emit('newPlayerJoining');
};

/**
 * Assigns local player it's ID. This way it can update the array 
 * of players and ignore itself.
 * @param {string} pid | string unique hash
 */
Client.socket.on('playerID',function(pid){
    destroyer.player.id = pid;
    console.log('got my id');
});

/**
 * @param {obj} data | object with socket id's as keys pointing to player data;
 */
Client.socket.on('playersArray', function (data) {
    game.multiPlayersObj = {};
    game.num_other_players = 0;
    new_player_id = data.new_player_id;
    players = data.players_obj;
    Object.keys(players).forEach(function(pid){
        game.multiPlayersObj[pid] = players[pid];
        game.num_other_players++;
    });
    console.log(game.num_other_players);
    console.log(game.multiPlayersObj);
    destroyer.spawnNewPlayer(game.multiPlayersObj[new_player_id]);
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