let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let players = [];
let games = [];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    var ip = socket.handshake.address;
    console.log(`\nNew Socket connection from ${ip}`);
    broadcastScore();
    broadcastPlayers();

    socket.on('disconnect', function () {
        console.log('\nEvent: disconnect');
        console.log(`Connection to ${ip} lost`);
    });

    socket.on('addPlayers', function (playerNames) {
        console.log('\nEvent: addPlayers');
        console.log('Adding Players: ', playerNames.toString())
        players = playerNames;
        broadcastPlayers();
        broadcastScore();
    });

    socket.on('addScores', function (gameScore) {
        console.log('\nEvent: addScores');
        console.log('Adding Scores: ' + gameScore)
        games.push(gameScore);
        broadcastScore();
        broadcastPlayers();
    });

    socket.on('deleteGame', function(id) {
        console.log('Deleting Game with id: ', id);
        games = games.filter(g => g.id != id);
        broadcastScore();
    });

    socket.on('getScores', function () {
        console.log('\nEvent: getScores');
        broadcastScore();
    });

    function broadcastScore() {
        console.log('Broadcasting Scores');
        io.emit('scoreBroadcast', games);
    }

    function broadcastPlayers() {
        console.log('Broadcasting Players');
        io.emit('getPlayers', players);
    }

});

http.listen(3000, function () {
    console.log('listening on localhost:3000');
});