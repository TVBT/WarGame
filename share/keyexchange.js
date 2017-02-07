/**
 * Created by vutp on 2/7/2017.
 */
"use strict";
var KeyCommand = (function () {
    function KeyCommand() {
        this.CHECK_NICK_NAME = 1;
        this.AUTO_JOIN_ROOM = 2;
        this.GET_ROOM_INFO = 3;
    }
    return KeyCommand;
}());
var KeyData = (function () {
    function KeyData() {
        this.USER_ID = "uid";
        this.USER_NAME = "un";
        this.STATUS = "st";
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