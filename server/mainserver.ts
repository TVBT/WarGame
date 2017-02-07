import {UserManager} from "./manager/usermanager";
import {RoomManager} from "./manager/roommanager";
import {UserInfo} from "./model/userinfo";
import {KeyExchange} from "../share/keyexchange";
/**
 * Created by thuctvd on 2/6/2017.
 */

class Main {
    private HTTP_PORT = 9090;
    private SOCKET_PORT = 9191;

    public io;
    public userManager = UserManager.getInstance();
    public roomManager = RoomManager.getInstance();
    private automicId = 1000;

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
        this.io = require('socket.io')(server);

        this.startHttp(app, this.HTTP_PORT);
        this.startSocket(server, this.io, this.SOCKET_PORT);

    }

    startSocket(server, io, port) {
        io.on('connection', (client) => {
            console.log('client:'+ client);

            var userInfo = new UserInfo();
            userInfo.client = client;
            userInfo.userId = this.automicId;
            this.automicId++;
            this.userManager.addUser(client.id, userInfo);

            client.on('event', function(msg) {
                console.log("receive msg client: " + msg);

                this.receiveMessageHandler(msg, client);

            }.bind(this));

            client.on('disconnect', function(){
                console.log("client disconnected!");

                this.userManager.removeUser(client.id);
            }.bind(this));
        });

        server.listen(port);
        console.log('Socket App listening on port ' + port +'!')
    }

    startHttp(app, port) {
        app.get('/', function (req, res) {
            res.send('Welcome to WarGame!')
        })

        app.get('/api', function (req, res) {
            var path    = require("path");
            res.sendFile(path.join(__dirname+'/../docs/api.html'));
        })

        app.listen(port, function () {
            console.log('Http app listening on port ' + port +'!')
        })

    }

    receiveMessageHandler(msg, client) {
        switch (msg.command) {
            case KeyExchange.KEY_COMMAND.CHECK_NICK_NAME:
                this.handleUserLogin(msg.data, client);
                break;


        }
    }

    handleUserLogin(data, client) {
        var userName = data[KeyExchange.KEY_DATA.USER_NAME];
        var isValid = this.userManager.checkValidNickName(userName);
        var status = isValid ? 1 : 0;
        var obj = {
            [KeyExchange.KEY_DATA.STATUS] : status
        };

        this.sendUser(KeyExchange.KEY_COMMAND.CHECK_NICK_NAME, obj, client);
    }

    sendUser(command, params, recipient) {
        recipient.emit(command, params);
    }

    sendListUser(command, params, recipients) {
        var i = 0;
        var num = recipients.length;

        for (i; i < num; i++) {
            recipients[i].emit(command, params);
        }
    }

    sendAllUser(command, params) {
        this.io.emit(command, params);
    }
}

var main = new Main(9090, 9191);
