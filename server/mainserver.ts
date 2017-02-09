import {UserManager} from "./manager/usermanager";
import {RoomManager} from "./manager/roommanager";
import {KeyExchange} from "../share/keyexchange";
import {Room} from "./model/room";
import {User} from "./model/user";
import {UserInfo} from "./model/userinfo";

/**
 * Created by thuctvd on 2/6/2017.
 */

class Main {
    private HTTP_PORT = 9090;
    private SOCKET_PORT = 9191;

    public io;
    public userManager = UserManager.getInstance();
    public roomManager = RoomManager.getInstance();

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

            var user = new User();
            user.client = client;
            var userInfo:UserInfo = new UserInfo();
            user.setUserInfo(userInfo);
            this.userManager.addUser(client.id, user);

            client.on('event', function(msg) {
                console.log("receive msg client: " + msg);

                this.receiveMessageHandler(msg, client);

            }.bind(this));

            client.on('disconnect', function(){
                console.log("client disconnected!");

                var user:User = this.userManager.getUserById(client.id);
                this.roomManager.leaveRoom(user);
                this.userManager.removeUser(client.id);
                this.userManager.removeUserName(user.userInfo.userName);
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

            case KeyExchange.KEY_COMMAND.USER_READY:
                this.handleUserReady(msg.data, client);
                break;

            case KeyExchange.KEY_COMMAND.CHANGE_TEAM:
                this.handleUserChangeTeam(msg.data, client);
                break;
        }
    }

    handleCheckUserNameExist(data, client) {
        var user:User = this.userManager.getUserById(client.id);
        var userName = data[KeyExchange.KEY_DATA.USER_NAME];
        var isValid = this.userManager.checkValidNickName(userName);
        var status = isValid ? 1 : 0;
        var object = {
            command: KeyExchange.KEY_COMMAND.CHECK_NICK_NAME,
            data : {
                [KeyExchange.KEY_DATA.STATUS] : status
            }
        };

        this.sendUser(object, user);
    }

    handleAutoJoin(data, client) {
        var user:User = this.userManager.getUserById(client.id);
        user.userInfo.userName = data[KeyExchange.KEY_DATA.USER_NAME];
        var status = this.userManager.checkValidNickName(user.userInfo.userName) ? 1 : 0;
        var object:{};

        if (status == 1) {
            this.userManager.addUserName(user.userInfo.userName);
            var room:Room = this.roomManager.joinRoom(user);
            object = {
                command: KeyExchange.KEY_COMMAND.AUTO_JOIN_ROOM,
                data : {
                    [KeyExchange.KEY_DATA.STATUS] : 1,
                    [KeyExchange.KEY_DATA.ROOM_ID] : room.roomId,
                    [KeyExchange.KEY_DATA.TEAM_ID] : user.player.teamId
                }
            };
            this.sendUser(object, user);

            var objectToOtherUser = {
                command: KeyExchange.KEY_COMMAND.USER_JOIN_LOBBY_ROOM,
                data : user.parseJsonDataPlayer()
            };

            this.sendListUser(objectToOtherUser, user.room.getListUserExceptUserId(user.userInfo.userId));
        } else {
            object = {
                command: KeyExchange.KEY_COMMAND.AUTO_JOIN_ROOM,
                data : {
                    [KeyExchange.KEY_DATA.STATUS] : 0,
                    [KeyExchange.KEY_DATA.MESSAGE] : "User này đã tồn tại, ko thể tham gia!"
                }
            };
            this.sendUser(object, user);
        }
    }

    handleGetRoomInfo(data, client) {
        var user:User = this.userManager.getUserById(client.id);
        var roomId:number = data[KeyExchange.KEY_DATA.ROOM_ID];
        var room:Room = this.roomManager.getRoomById(roomId);

        var object;
        if (room) {
          object = room.parseJsonData();
        }

        object["command"] = KeyExchange.KEY_COMMAND.GET_ROOM_INFO;
        object.data[KeyExchange.KEY_DATA.STATUS] = room ? 1 : 0;

        this.sendUser(object, user);
    }

    handleUserReady(data, client) {
        var user:User = this.userManager.getUserById(client.id);
        if (user.player.isReady) {
            return;
        }

        user.player.isReady = true;
        var object = {
            command: KeyExchange.KEY_COMMAND.USER_READY,
            data : {
                [KeyExchange.KEY_DATA.READY_STATUS] : user.player.isReady,
                [KeyExchange.KEY_DATA.PLAYER_ID] : user.player.playerId,
            }
        };

        this.sendListUser(object, user.room.getListUsers());
    }

    handleUserChangeTeam(data, client) {
        var user:User = this.userManager.getUserById(client.id);
        if (user.player.isReady) {
            var object = {
                command: KeyExchange.KEY_COMMAND.CHANGE_TEAM,
                data : {
                    [KeyExchange.KEY_DATA.STATUS] : 0
                }
            };
            this.sendUser(object, user);
        } else {
            var room:Room = user.room;
            room.changeTeam(user);

            var objPlayer = user.parseJsonDataPlayer();
            objPlayer[KeyExchange.KEY_DATA.STATUS] = 1;

            var object = {
                command: KeyExchange.KEY_COMMAND.CHANGE_TEAM,
                data : objPlayer
            };
            this.sendListUser(object, user.room.getListUsers());
        }
    }

    sendUser(object, user:User) {
        user.client.emit('event', object);
    }

    sendListUser(object, user:Array<User>) {
        var i = 0;
        var num = user.length;

        for (i; i < num; i++) {
            user[i].client.emit('event', object);
        }
    }

    sendAllUser(command, object) {
        this.io.emit('event', object);
    }
}

var main = new Main(9090, 9191);
