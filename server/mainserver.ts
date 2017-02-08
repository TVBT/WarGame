import {UserManager} from "./manager/usermanager";
import {RoomManager} from "./manager/roommanager";
import {UserInfo} from "./model/userinfo";
import {KeyExchange} from "../share/keyexchange";
import {RoomInfo} from "./model/roominfo";

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

                var userInfo = this.userManager.getUserById(client.id);
                this.userManager.removeUser(client.id);
                this.userManager.removeUserName(userInfo.userName);
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
                this.handleCheckUserNameExist(msg.data, client);
                break;

            case KeyExchange.KEY_COMMAND.AUTO_JOIN_ROOM:
                this.handleAutoJoin(msg.data, client);
                break;

            case KeyExchange.KEY_COMMAND.GET_ROOM_INFO:
                this.handleGetRoomInfo(msg.data, client);
                break;
        }
    }

    handleCheckUserNameExist(data, client) {
        var userName = data[KeyExchange.KEY_DATA.USER_NAME];
        var isValid = this.userManager.checkValidNickName(userName);
        var status = isValid ? 1 : 0;
        var object = {
            command: KeyExchange.KEY_COMMAND.CHECK_NICK_NAME,
            data : {
                [KeyExchange.KEY_DATA.STATUS] : status
            }
        };

        this.sendUser(object, client);
    }

    handleAutoJoin(data, client) {
        var userInfo:UserInfo = this.userManager.getUserById(client.id);
        userInfo.userName = data[KeyExchange.KEY_DATA.USER_NAME];
        var status = this.userManager.checkValidNickName(userInfo.userName)?1:0;
        var object:{};

        if(status == 1) {
            this.userManager.addUserName(userInfo.userName);
            var roomInfo:RoomInfo = this.roomManager.joinRoom(userInfo);
            object = {
                command: KeyExchange.KEY_COMMAND.AUTO_JOIN_ROOM,
                data : {
                    [KeyExchange.KEY_DATA.STATUS] : 1,
                    [KeyExchange.KEY_DATA.ROOM_ID] : roomInfo.roomId,
                    [KeyExchange.KEY_DATA.TEAM_ID] : userInfo.teamId
                }
            };
            this.sendUser(object, client);

            var objectToOtherUser = {
                command: KeyExchange.KEY_COMMAND.USER_JOIN_LOBBY_ROOM,
                data : {
                    [KeyExchange.KEY_DATA.USER_ID] : client.id,
                    [KeyExchange.KEY_DATA.USER_NAME] : userInfo.userName,
                    [KeyExchange.KEY_DATA.TEAM_ID] : userInfo.teamId
                }
            };
            //this.sendToOtherUserInRoom(objectToOtherUser, roomInfo.getListUserExceptPlayerId());

        } else {
            object = {
                command: KeyExchange.KEY_COMMAND.AUTO_JOIN_ROOM,
                data : {
                    [KeyExchange.KEY_DATA.STATUS] : 0,
                    [KeyExchange.KEY_DATA.MESSAGE] : "User này đã tồn tại, ko thể tham gia!"
                }
            };
            this.sendUser(object, client);
        }

    }

    handleGetRoomInfo(data, client) {
        var roomId = data[KeyExchange.KEY_DATA.ROOM_ID];
        var roomInfo:RoomInfo = this.roomManager.getRoomById(roomId);

        var object;
        if (roomInfo) {
          object = roomInfo.parseJsonData();
        }

        object["command"] = KeyExchange.KEY_COMMAND.GET_ROOM_INFO;
        object.data[KeyExchange.KEY_DATA.STATUS] = roomInfo ? 1 : 0;

        this.sendUser(object, client);
    }

    sendUser(object, recipient) {
        recipient.emit('event', object);
    }

    sendListUser(object, recipients) {
        var i = 0;
        var num = recipients.length;

        for (i; i < num; i++) {
            recipients[i].emit('event', object);
        }
    }

    sendAllUser(command, object) {
        this.io.emit('event', object);
    }
}

var main = new Main(9090, 9191);
