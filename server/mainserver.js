/**
 * Created by thuctvd on 2/6/2017.
 */
var Main = (function () {
    function Main(httpPort, socketPort) {
        this.HTTP_PORT = 9090;
        this.SOCKET_PORT = 9191;
        if (httpPort !== undefined && socketPort !== undefined) {
            this.HTTP_PORT = httpPort;
            this.SOCKET_PORT = socketPort;
        }
        this.startServer();
    }
    Main.prototype.startServer = function () {
        //var seft = this;
        var app = require('express')();
        var server = require('http').createServer(app);
        var io = require('socket.io')(server);
        this.startHttp(app, this.HTTP_PORT);
        this.startSocket(server, io, this.SOCKET_PORT);
    };
    Main.prototype.startSocket = function (server, io, port) {
        io.on('connection', function () {
            // client.on('event', function(data){
            //     console.log("client connected!");
            // });
            // client.on('disconnect', function(){
            //     console.log("client disconnected!");
            // });
            console.log('a user connected');
        });
        server.listen(port);
        console.log('Socket App listening on port ' + port + '!');
    };
    Main.prototype.startHttp = function (app, port) {
        app.get('/', function (req, res) {
            res.send('Welcome to WarGame!');
        });
        app.listen(port, function () {
            console.log('Http app listening on port ' + port + '!');
        });
    };
    return Main;
}());
var main = new Main(9090, 9191);
//# sourceMappingURL=mainserver.js.map