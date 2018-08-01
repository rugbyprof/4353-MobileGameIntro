/**
 * Created by Jerome on 03-03-17.
 */

var Client = {};
Client.socket = io.connect();

Client.sendTest = function () {
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function () {
    Client.socket.emit('newplayer');
};

Client.sendVelocity = function (data) {
    Client.socket.emit('moveme', data);
};

Client.sendLocation = function (x, y) {
    //console.log({vx:x,vy:y})
    Client.socket.emit('snapTo', {
        x: x,
        y: y
    });
};

Client.sendTarget = function (mouse) {
    console.log({
        x: mouse.event.x,
        y: mouse.event.y
    })
    Client.socket.emit('targetPlayer', {
        x: mouse.event.x,
        y: mouse.event.y
    });
};

Client.socket.on('newplayer', function (data) {
    FlameGame.addNewPlayer(data.id, data.x, data.y);
});

Client.socket.on('allplayers', function (data) {
    for (var i = 0; i < data.length; i++) {
        FlameGame.addNewPlayer(data[i].id, data[i].x, data[i].y);
    }

    Client.socket.on('move', function (data) {
        FlameGame.movePlayer(data.id, data.velocity.x, data.velocity.y);
    });

    Client.socket.on('snapTo', function (data) {
        FlameGame.snapPlayer(data.id, data.x, data.y);
    });

    Client.socket.on('remove', function (id) {
        FlameGame.removePlayer(id);
    });

    Client.socket.on('fireWeapon', function (data) {
        FlameGame.fireWeapon(data);
    });
});