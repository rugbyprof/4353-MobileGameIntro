## Basic Multiplayer
### Starting communication

Sources: 
- https://www.programwitherik.com/getting-started-with-socket-io-node-js-and-express/ 
- https://expressjs.com/
- https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
- https://socket.io/docs/emit-cheatsheet/

### Purpose

This file is really an implementation of a chat client using node, express, socket.io, and jquery along with a few extra explanations of the code from the original tutorial.

- Node: server side javascript
- Express: a "server" written in Node that handles requests
- Socket.io: The connection scheme between client and server
- Jquery: A javascript framework that makes it a little easier to write javascript for web pages.

It shows some basic Socket.io commands and how socket can be used to interact with a simple web page. My goal is to use this knowledge to add functionality to our games. For example if we wanted to allow a person to:
- register 
- player rankings
- remember high scores or last game state
- add chat to a game
- better HUD with player info (all players)

### Express and Socket

- `Express` web server framework: https://expressjs.com/
- https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
    - http   : hypertext transfer protocl
    - tcp/ip : protocal that http runs on (packet based transactions)

- `Socket.io` 
    - Keeps communications open
    - Http does not allow "push" communications (normally), one solution os something like `socket.io`  
    - A "push" communication originates from the server to the client. Normally, communication requires a "request" from the client and an "answer" from the server.

### Server Makeup

- https://socket.io/docs/emit-cheatsheet/
- You server (app in this case) is running on some server listening to some port. 
- This chunk of code will send back the "index.html" page but will be listening for client requests (other than a page refresh wich will get the index.html again).
```js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});
```
- To add any communcation we need the following to just get it started:

```js
// client is the socket referene being passed to the server
io.on('connection', function (client) {
    console.log('Client connected...');

});
```

- To handle **incoming** requests we need the `on` method:
```js
client.on('some_command', function (input_data) {
        // do something
        console.log(input_data);
});
```

- To create **outgoing** requests we need the `emit` method: 
```js
client.emit('some_command', data_to_be_sent);
```

- To handle an incoming request with a response we need them both:
```js
client.on('messages', function (data) {
    client.emit('broad', data);     // sends to server
    client.broadcast.emit('broad', data); // broadcast to every other client.
});
```

### Client Makeup

- Same `on` and `emit` idea.

```js
    // Create a server instance / connection
    var server = io.connect('http://206.189.236.251:4200/');

    //`connect` is reserved word by socket and runs on a new connection
    server.on('connect', function (data) {
        server.emit('join', 'Hello World from client');
    });

    // If server 'emits' the key 'broad' then handle it.
    server.on('broad', function (data) {
        // Jquery for "go find the element with ID 'future' and append the data with a line break".
        $('#future').append(data + "<br/>");
    });

    //Jquery that handles a form submit event (button click in this case)
    $('form').submit(function (e) {
        //don't submit the form like you would normall, we will handle it with socket
        e.preventDefault();
        //Jquery for: "find the element with the ID 'chat_input', and get its value (the text box in this case).
        var message = $('#chat_input').val();

        //Send that to the server.
        server.emit('messages', message);
    });
```

### Keep Node Running Using Forever

- https://stackoverflow.com/questions/12701259/how-to-make-a-node-js-application-run-permanently

- You could install forever using npm like this:
    - `sudo npm install -g forever`
- And then start your application with:
    - `forever server.js`
- Or as a service:
    - `forever start server.js`
- Forever restarts your app when it crashes or stops for some reason. To restrict restarts to 5 you could use:
    - `forever -m5 server.js`
-To list all running processes:
    - `forever list`
- Note the integer in the brackets and use it as following to stop a process:
    - `forever stop 0`
- Restarting a running process goes:
    - `forever restart 0`
- If you're working on your application file, you can use the -w parameter to restart automatically whenever your `server.js` file changes:
    - `forever -w server.js`

