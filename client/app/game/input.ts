import {Tank} from "./tank";
import any = jasmine.any;
import {TankGame} from "./game";
/**
 * Created by binhlt on 13/02/2017.
 */

export class GameInput {

    tankGame: TankGame;
    cursors;
    myTank: Tank;
    stopped = false;
    speed :number = 100;

    constructor(gameTank, tank) {
        this.tankGame = gameTank;
        this.myTank = tank;
        this.addKeys();
    }

    update() {
        this.myTank.setVelocity({x: 0, y: 0});

        if (this.stopped) return;

        if (this.cursors.left.isDown) {
            this.myTank.setVelocity({x: -this.speed, y: 0});
        } else if (this.cursors.right.isDown) {
            this.myTank.setVelocity({x: this.speed, y: 0});
        } else if (this.cursors.up.isDown) {
            this.myTank.setVelocity({x: 0, y: -this.speed});
        } else if (this.cursors.down.isDown) {
            this.myTank.setVelocity({x: 0, y: this.speed});
        }

        if (this.tankGame.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if (this.myTank.canFire()) {
                this.myTank.fire();
            }
        }
    }

    private addKeys() {
        this.cursors = this.tankGame.game.input.keyboard.createCursorKeys();
        this.initKeyEvents(Phaser.Keyboard.UP);
        this.initKeyEvents(Phaser.Keyboard.DOWN);
        this.initKeyEvents(Phaser.Keyboard.LEFT);
        this.initKeyEvents(Phaser.Keyboard.RIGHT);
    }

    private initKeyEvents(keyCode: number) {
        let key = this.tankGame.game.input.keyboard.addKey(keyCode);
        if (key) {
            key.onDown.add(this.onKeyDown, this);
            key.onUp.add(this.onKeyUp, this);
        }
    }

    private onKeyDown(key) {
        var position = {x: this.myTank.sprite.centerX, y: this.myTank.sprite.centerY};
        var velocity = {x: 0, y: 0};
        if (key.keyCode == Phaser.Keyboard.UP) {
            velocity.y = -this.speed;
        } else if (key.keyCode == Phaser.Keyboard.DOWN) {
            velocity.y = this.speed;
        } else if (key.keyCode == Phaser.Keyboard.LEFT) {
            velocity.x = -this.speed;
        } else if (key.keyCode == Phaser.Keyboard.RIGHT) {
            velocity.x = this.speed;
        }
        this.tankGame.commandService.move(this.tankGame.userService.getMyPlayerId(), position, velocity);
    }

    private onKeyUp(key) {
        this.tankGame.commandService.stopMove(this.tankGame.userService.getMyPlayerId(), {x: this.myTank.sprite.centerX, y: this.myTank.sprite.centerY});
    }
}