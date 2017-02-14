import {KeyExchange} from "../../share/keyexchange";
import {User} from "./user";
import {TankGameLogic} from "../game/tankgamelogic";
import {ConfigManager} from "../manager/configmanager";
import {Player} from "./player";
/**
 * Created by vutp on 2/7/2017.
 */

export class Room {
    public roomId:number;
    public roomName:string;
    public roomType:number;                         // 0: room lobby, 1 : room game
    public maxPlayer:number;
    public team1:Array<User>;                       // Danh sách user ở đội 1
    public team2:Array<User>;                       // Danh sách user ở đội 2
    private automicPlayerId:number;
    public gameLogic:TankGameLogic;

    constructor() {
        this.roomId = -1;
        this.roomName = "";
        this.roomType = 0;
        this.maxPlayer = 50;
        this.team1 = [];
        this.team2 = [];
        this.automicPlayerId = 1;

        this.gameLogic = new TankGameLogic(this);
    }

    addUser(user:User) {
        var player:Player = new Player();
        player.teamId = -1;
        player.playerId = this.automicPlayerId;
        this.automicPlayerId++;

        var numPlayer1 = this.team1.length;
        var numPlayer2 = this.team2.length;

        if (numPlayer1 <= numPlayer2) {
            this.team1.push(user);
            player.teamId = 1;
        } else {
            this.team2.push(user);
            player.teamId = 2;
        }

        user.setPlayer(player);
    }

    removeUser(user) {
        var index = this.team1.indexOf(user);
        if (index >= 0) {
            this.team1.splice(index, 1);
        }

        index = this.team2.indexOf(user);
        if (index >= 0) {
            this.team2.splice(index, 1);
        }
    }

    isFull() {
        return (this.team1.length + this.team2.length == this.maxPlayer);
    }

    getListUserByTeamId(teamId) {
        switch (teamId) {
            case 1:
                return this.team1;

            case 2:
                return this.team2;
        }
    }

    getTotalPlayer() {
        return (this.team1.length + this.team2.length);
    }

    parseJsonData() {
        var objectPlayer = {
            1 : this.parseJsonDataPlayers(this.team1),
            2 : this.parseJsonDataPlayers(this.team2)
        };

        var object = {
            data : {
                [KeyExchange.KEY_DATA.PLAYER_LIST] : objectPlayer,
                [KeyExchange.KEY_DATA.ROOM_NAME] : this.roomName,
                [KeyExchange.KEY_DATA.TOTAL_PLAYER] : this.getTotalPlayer()
            }
        };

        return object;
    }

    parseJsonDataPlayers(users:Array<User>) {
        var i = 0;
        var len = users.length;
        var playerInfos = [];

        for (i; i < len; i++) {
            playerInfos.push(users[i].parseJsonDataPlayer());
        }

        return playerInfos;
    }

    getListUsers() {
        return this.team1.concat(this.team2);
    }

    startGame() {
        this.gameLogic.startGame();
    }

    handleActionInGame(subId, data, client) {
        this.gameLogic.handleActionInGame(subId, data, client);
    }

    getListUserExceptUserId(userId:number) {
        var users = [];
        var i = 0;
        var len = this.team1.length;
        for (i = 0; i < len; i++) {
            if (this.team1[i].userId != userId)
                users.push(this.team1[i]);
        }

        len = this.team2.length;
        for (i = 0; i < len; i++) {
            if(this.team2[i].userId != userId)
                users.push(this.team2[i]);
        }

        return users;
    }

    changeTeam(user:User) {
        var index = this.team1.indexOf(user);
        if (index >= 0) {
            user.player.teamId = 2;
            this.team1.splice(index, 1);
            this.team2.push(user);
        } else {
            index = this.team2.indexOf(user);
            if (index >= 0) {
                user.player.teamId = 1;
                this.team2.splice(index, 1);
                this.team1.push(user);
            }
        }
    }

    checkAllReady() {
        var readyNumTeam1 = this.getCountPlayerReady(1);
        var readyNumTeam2 = this.getCountPlayerReady(2);

        if (readyNumTeam1 == 0 || readyNumTeam2 == 0) {
            return false;
        }

        if (readyNumTeam1 < this.team1.length || readyNumTeam2 < this.team2.length) {
            return false;
        }

        return true;
    }

    getCountPlayerReady(teamId:number) {
        var users = this.getListUserByTeamId(teamId);
        var i = 0;
        var len = users.length;
        var count = 0;

        for (i; i < len; i++) {
            if (users[i].player.isReady) {
                count++;
            }
        }

        return count;
    }

    public getPostionPlayers() {
        var i = 0;
        var len = this.team1.length;
        var objPlayerPosArr = [];
        var objPlayerPos:any;

        for (i = 0; i < len; i++) {
            objPlayerPos = {
                [KeyExchange.KEY_DATA.PLAYER_ID] : this.team1[i].player.playerId,
                [KeyExchange.KEY_DATA.PLAYER_POSITION] : ConfigManager.getInstance().getPosPlayerBy(1, i)
            };
            objPlayerPosArr.push(objPlayerPos);
        }

        len = this.team2.length;
        for (i = 0; i < len; i++) {
            objPlayerPos = {
                [KeyExchange.KEY_DATA.PLAYER_ID] : this.team2[i].player.playerId,
                [KeyExchange.KEY_DATA.PLAYER_POSITION] : ConfigManager.getInstance().getPosPlayerBy(2, i)
            };
            objPlayerPosArr.push(objPlayerPos);
        }

        return objPlayerPosArr;
    }

    public getUserByPlayerId(playerId:number) {
        var users:Array<User> = this.getListUsers();
        var i = 0;
        var len = users.length;

        for (i; i < len; i++) {
            if (users[i].player.playerId == playerId) {
                return users[i];
            }
        }

        return null;
    }

    public getUserByClientId(clientId:string) {
        var users:Array<User> = this.getListUsers();
        var i = 0;
        var len = users.length;

        for (i; i < len; i++) {
            if (users[i].client.id == clientId) {
                return users[i];
            }
        }

        return null;
    }
}