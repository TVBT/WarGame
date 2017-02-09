/**
 * Created by vutp on 2/7/2017.
 */

class KeyCommand {
    CHECK_NICK_NAME = 1;
    AUTO_JOIN_ROOM = 2;
    GET_ROOM_INFO = 3;
    USER_JOIN_LOBBY_ROOM = 4;
    USER_READY = 5;
}

class KeyData {
    USER_ID = "userid";
    USER_NAME = "username";
    STATUS = "status";
    ROOM_ID = "roomid";
    ROOM_NAME = "roomname";
    PLAYER_LIST = "playerlist";
    TOTAL_PLAYER = "totalplayer";
    PLAYER_ID = "playerid";
    READY_STATUS = "readystatus";
    TEAM_ID = "teamid";
    MESSAGE = "message";
}

export class KeyExchange {
    static KEY_COMMAND = new KeyCommand();
    static KEY_DATA = new KeyData();
}


