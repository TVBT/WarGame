/**
 * Created by thuctvd on 2/6/2017.
 */

class Main {
    private HTTP_PORT = 9090;
    private SOCKET_PORT = 9191;

    constructor(httpPort, socketPort) {
        if(httpPort !== undefined && socketPort !== undefined){
            this.HTTP_PORT = httpPort;
            this.SOCKET_PORT = socketPort;
        }

        this.startServer();
    }

    startServer() {
        var app = require('express')();
        var server = require('http').createServer(app);
        var io = require('socket.io')(server);

        this.startHttp(app, this.HTTP_PORT);
        this.startSocket(server, io, this.SOCKET_PORT);

    }

    startSocket(server, io, port) {
        io.on('connection', function(client){
            console.log('client:'+client);
            client.on('event', function(data){
                console.log("client connected!" + data);
            });
            client.on('disconnect', function(){
                console.log("client disconnected!");
            });

            console.log('a user connected');
        });

        server.listen(port);
        console.log('Socket App listening on port ' + port +'!')
    }

    startHttp(app, port) {
        app.get('/', function (req, res) {
            res.send('Welcome to WarGame!');
        })
        app.get('/api', function (req, res) {
            var path    = require("path");
            res.sendFile(path.join(__dirname+'/../docs/api.html'));
        })

        app.listen(port, function () {
            console.log('Http app listening on port ' + port +'!')
        })
    }
}

var main = new Main(9090, 9191);
