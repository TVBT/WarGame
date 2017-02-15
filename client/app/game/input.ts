import {Tank} from "./tank";
import {TankGame} from "./game";
/**
 * Created by binhlt on 13/02/2017.
 */

export class GameInput {

    tankGame:TankGame;
    cursors;
    myTank:Tank;
    stopped:boolean = false;
    tankSpeed:number = 100;
    bulletSpeed:number = 300;

    constructor(gameTank, tank) {
        this.tankGame = gameTank;
        this.myTank = tank;
        this.addKeys();
    }

    private addKeys() {
        this.cursors = this.tankGame.game.input.keyboard.createCursorKeys();
        this.initKeyEvents(Phaser.Keyboard.UP);
        this.initKeyEvents(Phaser.Keyboard.DOWN);
        this.initKeyEvents(Phaser.Keyboard.LEFT);
        this.initKeyEvents(Phaser.Keyboard.RIGHT);
    }

    private initKeyEvents(keyCode:number) {
        let key = this.tankGame.game.input.keyboard.addKey(keyCode);
        if (key) {
            key.onDown.add(this.onKeyDown, this);
            key.onUp.add(this.onKeyUp, this);
        }
    }

    private onKeyDown(key) {
        this.checkMove();
    }

    private onKeyUp(key) {
        this.checkMove();
    }

    private checkMove() {
        if (this.stopped) {
            return;
        }
        var position = {x: this.myTank.sprite.centerX, y: this.myTank.sprite.centerY};
        var velocity = {x: 0, y: 0};
        if (this.cursors.up.isDown) {
            velocity.y = -this.tankSpeed;
        } else if (this.cursors.down.isDown) {
            velocity.y = this.tankSpeed;
        } else if (this.cursors.left.isDown) {
            velocity.x = -this.tankSpeed;
        } else if (this.cursors.right.isDown) {
            velocity.x = this.tankSpeed;
        }
        this.myTank.setVelocity(velocity);
        this.tankGame.commandService.move(this.tankGame.userService.getMyPlayerId(), position, velocity);
    }

    private checkFire() {
        if (this.stopped) {
            return;
        }
        if (this.tankGame.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if (this.myTank.canFire()) {
                let position = {x: this.myTank.sprite.centerX, y: this.myTank.sprite.centerY};
                let velocity = {x: 0, y: 0};
                let direction:string = this.myTank.getDirection();
                switch (direction) {
                    case "left":
                        velocity.x = -this.bulletSpeed;
                        break;
                    case "right":
                        velocity.x = this.bulletSpeed;
                        break;
                    case "up":
                        velocity.y = -this.bulletSpeed;
                        break;
                    case "down":
                        velocity.y = this.bulletSpeed;
                        break;
                }
                this.myTank.fire(velocity);
                this.tankGame.commandService.shoot(this.tankGame.userService.getMyPlayerId(), position, velocity);
            }
        }
    }

    update() {
        this.checkFire();
    }
}