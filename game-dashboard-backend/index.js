let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let gameObject = {
    players: [],
    scores: []
};

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    var ip = socket.handshake.address;
    console.log(`\nNew Socket connection from ${ip}`);
    console.log('Broadcasting Scores');
    io.emit('scoreBroadcast', gameObject);

    socket.on('disconnect', function () {
        console.log('\nEvent: disconnect');
        console.log(`Connection to ${ip} lost`);
    });

    socket.on('addPlayer', function (playerName) {
        console.log('\nEvent: addPlayer');
        console.log('Adding Player: ' + playerName)
        gameObject.players.push(playerName);
        console.log('Broadcasting Scores');
        io.emit('scoreBroadcast', gameObject);
    });

    socket.on('addPlayers', function (playerNames) {
        console.log('\nEvent: addPlayers');
        console.log('Adding Players: ', playerNames.toString())
        gameObject.players = playerNames;
        console.log('Broadcasting Scores');
        io.emit('scoreBroadcast', gameObject);
    });

    socket.on('addScores', function (gameScore) {
        console.log('\nEvent: addScores');
        console.log('Adding Scores: ' + gameScore)
        gameObject.scores.push(gameScore);
        console.log('Broadcasting Scores');
        io.emit('scoreBroadcast', gameObject);
    });

    socket.on('getScores', function () {
        console.log('\nEvent: getScores');
        console.log('Broadcasting Scores');
        io.emit('scoreBroadcast', gameObject);
    });
});

http.listen(3000, function () {
    console.log('listening on localhost:3000');
});