/**
 * Created by thuctvd on 2/9/2017.
 */

import {GameController} from 'gamecontroller';
import {GameConfig} from 'gameconfig';

export class MainGame {
    public controller: GameController;
    private config:GameConfig;

    constructor () {
        this.controller = new GameController();

    };

    public startGame() {

    }
}