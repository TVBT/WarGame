/**
 * Created by vutp on 2/7/2017.
 */

export class UserInfo {
    public client:any;
    public userId: number;
    public userName: string;
    public teamId:number;

    constructor() {
        this.client = null;
        this.userId = -1;
        this.userName = "";
        this.teamId = -1;
    }
}