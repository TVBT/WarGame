/**
 * Created by vutp on 2/7/2017.
 */

class KeyCommand {
    CHECK_NICK_NAME = 1;
    AUTO_JOIN_ROOM = 2;
    GET_ROOM_INFO = 3;
}

class KeyData {
    USER_ID = "uid";
    USER_NAME = "un";
    STATUS = "st";
}

export class KeyExchange {
    static KEY_COMMAND = new KeyCommand();
    static KEY_DATA = new KeyData();
}


