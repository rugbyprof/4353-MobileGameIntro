var server = io.connect();
server.on('connect', function (data) {
    server.emit('join', 'Client connected');
});
server.on('broadCastMessage', function (data) {
    console.log(data);
    var message = '<span class="'+data.class+'">'+data.message+'</span><br>';
    $('.chat-out-area').append(message);
    $('#chat-input').val("");
});

$('form').submit(function (e) {
    e.preventDefault();
    var message = $('#chat-input').val();
    server.emit('messages', message);
});
