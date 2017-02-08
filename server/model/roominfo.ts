import {KeyExchange} from "../../share/keyexchange";
/**
 * Created by vutp on 2/7/2017.
 */

export class RoomInfo {
    public roomId: number;
    public roomName: string;
    public roomType: number;        // 0: room lobby, 1 : room game
    public maxPlayer:number;
    public listPlayer1: any;
    public listPlayer2: any;
    private automicPlayerId:number;

    constructor() {
        this.roomId = -1;
        this.roomName = "";
        this.roomType = 0;
        this.maxPlayer = 50;

        this.listPlayer1 = [];
        this.listPlayer2 = [];

        this.automicPlayerId = 1;
    }

    addPlayer(playerInfo):number {
        var teamId:number = -1;
        playerInfo.playerId = this.automicPlayerId;

        var numPlayer1 = this.listPlayer1.length;
        var numPlayer2 = this.listPlayer2.length;

        if (numPlayer1 <= numPlayer2) {
            this.listPlayer1.push(playerInfo);
            teamId = 1;
        } else {
            this.listPlayer2.push(playerInfo);
            teamId = 2;
        }

        this.automicPlayerId++;

        return teamId;
    }

    removePlayer(player) {

    }

    isFull() {
        return (this.listPlayer1.length + this.listPlayer2.length == this.maxPlayer);
    }

    getTotalPlayer() {
        return (this.listPlayer1.length + this.listPlayer2.length);
    }

    parseJsonData() {
        var object = {
            data : {
                [KeyExchange.KEY_DATA.PLAYER_LIST] : this.parseJsonPlayerList(),
                [KeyExchange.KEY_DATA.ROOM_NAME] : this.roomName,
                [KeyExchange.KEY_DATA.TOTAL_PLAYER] : this.getTotalPlayer()
            }
        };

        return object;
    }

    parseJsonPlayerList() {
        var playerTeam1 = this.getListPlayerObject(this.listPlayer1);
        var playerTeam2 = this.getListPlayerObject(this.listPlayer2);

        var listPlayer = [playerTeam1, playerTeam2];

        return listPlayer;
    }

    getListPlayerObject(listPlayer) {
        var i = 0;
        var len = listPlayer.length;
        var arrObject = [];

        for (i; i < len; i++) {
            arrObject.push(listPlayer[i].parseJsonData());
        }

        return arrObject;
    }

    getListUserExceptPlayerId(playerId:number) {
        var listPlayers = [];
        var i = 0;
        var len = this.listPlayer1.length;
        for (i = 0; i < len; i++) {
            if(this.listPlayer1[i].playerId != playerId)
                listPlayers.push(this.listPlayer1[i]);
        }
        len = this.listPlayer2.length;
        for (i = 0; i < len; i++) {
            if(this.listPlayer2[i].playerId != playerId)
                listPlayers.push(this.listPlayer2[i]);
        }
        return listPlayers;
    }
}