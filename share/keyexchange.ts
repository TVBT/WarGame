/**
 * Created by vutp on 2/7/2017.
 */

class KeyCommand {
    CHECK_NICK_NAME = 1;
    AUTO_JOIN_ROOM = 2;
    GET_ROOM_INFO = 3;
    USER_JOIN_LOBBY_ROOM = 4;
    USER_READY = 5;
    CHANGE_TEAM = 6;
}

class KeyData {
    USER_ID = "userid";
    USER_NAME = "username";
    STATUS = "status";
    ROOM_ID = "roomid";
    ROOM_NAME = "roomname";
    PLAYER_LIST = "playerlist";
    TOTAL_PLAYER = "totalplayer";
    PLAYER_INFO = "playerinfo";
    PLAYER_ID = "playerid";
    READY_STATUS = "readystatus";
    TEAM_ID = "teamid";
    MESSAGE = "message";
}

class MapItem {
    SNOW = 1; // nền tuyết
    RIVER = 2; // sông
    GRASS = 3; // bụi cỏ
    BRICK = 4; // gạch
    CONCRETE = 5; // bê tông
    EAGLE_TOP_LEFT = 6; //góc trên trái đại bàng
    EAGLE_TOP_RIGHT = 7; //góc trên phải đại bàng
    EAGLE_BOT_LEFT = 8; //góc dưới trái đại bàng
    EAGLE_BOT_RIGHT = 9; //góc dưới phải đại bàng
}

export class KeyExchange {
    static KEY_COMMAND = new KeyCommand();
    static KEY_DATA = new KeyData();
    static MAP_ITEM = new MapItem();
}


