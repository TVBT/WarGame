import {TankGameLogic} from "./tankgamelogic";
/**
 * Created by thuctvd on 2/9/2017.
 */
export  class GameController {
    private gameLogic:TankGameLogic;

    constructor(game:TankGameLogic){
        this.gameLogic = game;
    };

}