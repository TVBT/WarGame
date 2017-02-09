import {KeyExchange} from "../../share/keyexchange";
import {Player} from "../game/player";
import {User} from "./user";
import {TankGameLogic} from "../game/tankgamelogic";
/**
 * Created by vutp on 2/7/2017.
 */

export class Room {
    public roomId:number;
    public roomName:string;
    public roomType:number;                 // 0: room lobby, 1 : room game
    public maxPlayer:number;
    public team1:Array<User>;                       // Danh sách user ở đội 1
    public team2:Array<User>;                       // Danh sách user ở đội 2
    private automicPlayerId:number;
    private gameLogic:TankGameLogic;

    constructor() {
        this.roomId = -1;
        this.roomName = "";
        this.roomType = 0;
        this.maxPlayer = 50;

        this.team1 = [];
        this.team2 = [];

        this.automicPlayerId = 1;
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

    getTotalPlayer() {
        return (this.team1.length + this.team2.length);
    }

    parseJsonData() {
        var playerTeam1 = this.parseJsonDataPlayers(this.team1);
        var playerTeam2 = this.parseJsonDataPlayers(this.team2);
        var objectPlayer = {
            1 : playerTeam1,
            2 : playerTeam2
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
        var user:User;
        var obj:{};

        for (i; i < len; i++) {
            user = users[i];
            obj = user.parseJsonDataPlayer();
            playerInfos.push(obj);
        }

        return playerInfos;
    }

    getListUsers() {
        return this.team1.concat(this.team2);
    }

    startGame() {
        this.gameLogic.startGame(this);
    }

    getListUserExceptUserId(userId:number) {
        var users = [];
        var i = 0;
        var len = this.team1.length;
        for (i = 0; i < len; i++) {
            if (this.team1[i].userInfo.userId != userId)
                users.push(this.team1[i]);
        }

        len = this.team2.length;
        for (i = 0; i < len; i++) {
            if(this.team2[i].userInfo.userId != userId)
                users.push(this.team2[i]);
        }

        return users;
    }
}