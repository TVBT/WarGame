/**
 * Created by vutp on 2/7/2017.
 */
"use strict";
var KeyCommand = (function () {
    function KeyCommand() {
        this.CHECK_NICK_NAME = 1;
        this.AUTO_JOIN_ROOM = 2;
        this.GET_ROOM_INFO = 3;
        this.USER_JOIN_LOBBY_ROOM = 4;
        this.USER_READY = 5;
        this.CHANGE_TEAM = 6;
    }
    return KeyCommand;
}());
var KeyData = (function () {
    function KeyData() {
        this.USER_ID = "userid";
        this.USER_NAME = "username";
        this.STATUS = "status";
        this.ROOM_ID = "roomid";
        this.ROOM_NAME = "roomname";
        this.PLAYER_LIST = "playerlist";
        this.TOTAL_PLAYER = "totalplayer";
        this.PLAYER_ID = "playerid";
        this.READY_STATUS = "readystatus";
        this.TEAM_ID = "teamid";
        this.MESSAGE = "message";
    }
    return KeyData;
}());
var KeyExchange = (function () {
    function KeyExchange() {
    }
    KeyExchange.KEY_COMMAND = new KeyCommand();
    KeyExchange.KEY_DATA = new KeyData();
    return KeyExchange;
}());
exports.KeyExchange = KeyExchange;
//# sourceMappingURL=keyexchange.js.map