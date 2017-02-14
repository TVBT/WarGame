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
    JOIN_GAME = 7;
    ACTION_IN_GAME = 8;
    USER_LEAVE_LOBBY_ROOM = 9;

    // sub command
    START_GAME = 1;
    MOVE = 2;

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
    PLAYER_POSITION = "playerposition";
    READY_STATUS = "readystatus";
    TEAM_ID = "teamid";
    MESSAGE = "message";
    START_GAME_TIME = "startgametime";
    PLAY_GAME_TIME = "playgametime";
    MAP_INFO = "mapinfo";
    MAP_ID = "mapid";
    MAP_DATA = "mapdata";
    LIST_PLAYER_POSITION = "listplayerposition";
}

class MapItem {
    NONE = 0; //nền rỗng
    SNOW = 2; // nền tuyết
    RIVER = 3; // sông
    GRASS = 4; // bụi cỏ
    BRICK = 5; // gạch
    CONCRETE = 6; // bê tông
    EAGLE_TOP_LEFT = 7; //góc trên trái đại bàng
    EAGLE_TOP_RIGHT = 8; //góc trên phải đại bàng
    EAGLE_BOT_LEFT = 9; //góc dưới trái đại bàng
    EAGLE_BOT_RIGHT = 10; //góc dưới phải đại bàng
}

class TankPlayerStatus {
    ALIVE = "alive";
    DEAD = "dead";
    AFK = "AFK";
}

export class KeyExchange {
    static KEY_COMMAND = new KeyCommand();
    static KEY_DATA = new KeyData();
    static MAP_ITEM = new MapItem();
    static TANK_PLAYER_STATUS = new TankPlayerStatus();
}


