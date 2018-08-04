var Client = {};

Client.socket = io();

console.log(Client.socket);

Client.socket.on('currentPlayers', function (players) {
    console.log(Object.keys(players));
    Object.keys(players).forEach(function (id) {
        console.log(players[id])
        if (players[id].playerId === Client.socket.id) {
            SpaceGame.addPlayer(players[id]);
        } else {
            SpaceGame.addOtherPlayers(players[id]);
        }
    });
});

Client.socket.on('newPlayer', function (playerInfo) {
    SpaceGame.addOtherPlayers(playerInfo);
});

Client.socket.on('disconnect', function (playerId) {
    SpaceGame.removePlayer(playerId);
});

Client.socket.on('playerMoved', function (playerInfo) {
    SpaceGame.movePlayers(playerInfo);
});

Client.socket.on('scoreUpdate', function (scores) {
    SpaceGame.updateScores(scores);
});

Client.socket.on('starLocation', function (starLocation) {
    SpaceGame.updateStarLocation(starLocation);
});