import {UserManager} from "./manager/usermanager";
import {RoomManager} from "./manager/roommanager";
import {KeyExchange} from "../share/keyexchange";
import {Room} from "./model/room";
import {User} from "./model/user";
import {ConfigManager} from "./manager/configmanager";

/**
 * Created by thuctvd on 2/6/2017.
*/

export class Main {
    private HTTP_PORT = 9090;
    private SOCKET_PORT = 9191;

    public io;
    public userManager:UserManager = UserManager.getInstance();
    public roomManager:RoomManager = RoomManager.getInstance();
    public configManager:ConfigManager = ConfigManager.getInstance();

    static _instance: Main;
    static getInstance() : Main {
        if (!Main._instance) {
            Main._instance = new Main();
        }

        return Main._instance;
    }

    startServer(httpPort,socketPort) {
        var app = require('express')();
        var server = require('http').createServer(app);
        this.io = require('socket.io')(server);

        this.startHttp(app, this.HTTP_PORT);
        this.startSocket(server, this.io, this.SOCKET_PORT);

    }

    startSocket(server, io, port) {
        io.on('connection', (client) => {
            var user = new User();
            user.client = client;
            this.userManager.addUser(client.id, user);

            client.on('event', function(msg) {
                this.receiveMessageHandler(msg, client);

            }.bind(this));

            client.on('disconnect', function(){
                console.log("client disconnected!");

                var user:User = this.userManager.getUserById(client.id);
                if(user.player) {
                    var objectToOtherUser = {
                        command: KeyExchange.KEY_COMMAND.USER_LEAVE_LOBBY_ROOM,
                        data : user.parseJsonDataPlayer()
                    };

                    this.sendListUser(objectToOtherUser, user.room.getListUserExceptUserId(user.userId));
                }
                this.userLeave(user);
            }.bind(this));
        });

        server.listen(port);
        console.log('Socket App listening on port ' + port +'!')
    }

    startHttp(app, port) {
        var path    = require("path");
        app.get('/', function (req, res) {
            res.send('Welcome to WarGame!')
        })

        app.get('/api', function (req, res) {
            res.sendFile(path.join(__dirname+'/../docs/api.html'));
        })
        app.get('/assets/*', function (req, res) {
            res.sendFile(path.join(__dirname+ '/../docs/'+req.url));
        })

        app.listen(port, function () {
            console.log('Http app listening on port ' + port +'!')
        })

    }

    receiveMessageHandler(msg, client) {
        console.log("RECEIVE Client msg --- cmd: " + msg.command + " --- data: " + JSON.stringify(msg.data));

        switch (msg.command) {
            case KeyExchange.KEY_COMMAND.PING_PONG:
                this.handlePingPong(client);
                break;

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

            case KeyExchange.KEY_COMMAND.USER_LEAVE_LOBBY_ROOM:
                this.handleUserLeaveLobbyRoom(msg.data, client);
                break;

            case KeyExchange.KEY_COMMAND.ACTION_IN_GAME:
                var room:Room = this.userManager.getUserById(client.id).room;
                room.handleActionInGame(msg.sub, msg.data, client);
                break;
        }
    }

    handlePingPong (client) {
        var object = {
            command: KeyExchange.KEY_COMMAND.PING_PONG,
            data: {
                [KeyExchange.KEY_DATA.TIME] : Date.now()
            }
        };
        client.emit('event', object);
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
        user.userName = data[KeyExchange.KEY_DATA.USER_NAME];
        var status = this.userManager.checkValidNickName(user.userName) ? 1 : 0;
        var object:{};

        if (status == 1) {
            this.userManager.addUserName(user.userName);
            var room:Room = this.roomManager.joinRoom(user);
            object = {
                command: KeyExchange.KEY_COMMAND.AUTO_JOIN_ROOM,
                data : {
                    [KeyExchange.KEY_DATA.STATUS] : 1,
                    [KeyExchange.KEY_DATA.ROOM_ID] : room.roomId,
                    [KeyExchange.KEY_DATA.PLAYER_INFO] : user.parseJsonDataPlayer()
                }
            };
            this.sendUser(object, user);

            var objectToOtherUser = {
                command: KeyExchange.KEY_COMMAND.USER_JOIN_LOBBY_ROOM,
                data : user.parseJsonDataPlayer()
            };

            this.sendListUser(objectToOtherUser, user.room.getListUserExceptUserId(user.userId));
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
        user.player.isReady = true;

        var object = {
            command: KeyExchange.KEY_COMMAND.USER_READY,
            data : {
                [KeyExchange.KEY_DATA.READY_STATUS] : user.player.isReady,
                [KeyExchange.KEY_DATA.PLAYER_ID] : user.player.playerId,
            }
        };

        this.sendListUser(object, user.room.getListUsers());

        var room:Room = user.room;
        if (room.checkAllReady()) {
            this.userJoinGame(user);
        }
    }

    handleUserChangeTeam(data, client) {
        var user:User = this.userManager.getUserById(client.id);

        var object = {
            command: KeyExchange.KEY_COMMAND.CHANGE_TEAM,
            data : {
                [KeyExchange.KEY_DATA.READY_STATUS] : user.player.isReady,
                [KeyExchange.KEY_DATA.PLAYER_ID] : user.player.playerId,
            }
        };

        this.sendListUser(object, user.room.getListUsers());
    }

    handleUserLeaveLobbyRoom(data, client) {
        var userLeave:User = this.userManager.getUserById(client.id);
        var userId = data[KeyExchange.KEY_DATA.USER_ID];
        var roomId = data[KeyExchange.KEY_DATA.ROOM_ID];
        var room:Room = this.roomManager.getRoomById(roomId);
        this.userLeave(userLeave);

        var object = {
            command: KeyExchange.KEY_COMMAND.USER_LEAVE_LOBBY_ROOM,
            data : userLeave.parseJsonDataPlayer()
        };

        this.sendListUser(object, room.getListUsers());
    }

    userJoinGame(user) {
        var room:Room = user.room;
        room.updatePositionPlayers();

        var object = {
            command: KeyExchange.KEY_COMMAND.JOIN_GAME,
            data : {
                [KeyExchange.KEY_DATA.START_GAME_TIME] : this.configManager.startGameTime,
                [KeyExchange.KEY_DATA.PLAY_GAME_TIME] : this.configManager.playGameTime,
                [KeyExchange.KEY_DATA.LIST_PLAYER_INFO] : room.getPlayerInfos(),
                [KeyExchange.KEY_DATA.LIST_TOWER_INFO] : this.getListTowerInfos(),
            }
        };

        room.startGame();
        this.sendListUser(object, room.getListUsers());

        console.log("SEND msg userJoinGame --- " + JSON.stringify(object));
    }

    sendUser(object, user:User) {
        user.client.emit('event', object);
    }

    sendListUser(object, users:Array<User>) {
        var i = 0;
        var num = users.length;

        for (i; i < num; i++) {
            users[i].client.emit('event', object);
        }
    }

    sendAllUser(command, object) {
        this.io.emit('event', object);
    }

    userLeave(user:User) {
        this.roomManager.leaveRoom(user);
        this.userManager.removeUser(user.client.id);
        this.userManager.removeUserName(user.userName);
    }

    getListTowerInfos() {
        let objTowerInfos = [];
        let obj:any = {
            [KeyExchange.KEY_DATA.TEAM_ID] : 1,
            [KeyExchange.KEY_DATA.TOWER_POSITION] : this.configManager.TOWER1_POS
        };
        objTowerInfos.push(obj);

        obj = {
            [KeyExchange.KEY_DATA.TEAM_ID] : 2,
            [KeyExchange.KEY_DATA.TOWER_POSITION] : this.configManager.TOWER2_POS
        };
        objTowerInfos.push(obj);

        return objTowerInfos;
    }
}

let main = Main.getInstance();
main.startServer(9090,9191);
