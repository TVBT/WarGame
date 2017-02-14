import {Tank} from "./tank";
/**
 * Created by binhlt on 13/02/2017.
 */

export class GameInput {

    game;
    cursors;
    myTank: Tank;

    constructor(game, tank) {
        this.game = game;
        this.myTank = tank;
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    update() {
        this.myTank.sprite.body.velocity.x = 0;
        this.myTank.sprite.body.velocity.y = 0;
        this.myTank.sprite.body.angularVelocity = 0;

        if (this.cursors.left.isDown) {
            this.myTank.sprite.body.velocity.x = -100;
            this.myTank.sprite.body.velocity.y = 0;
            this.myTank.sprite.animations.play("left");
            this.myTank.sprite.body.setSize(30, 25, 1, 3.5);
        } else if (this.cursors.right.isDown) {
            this.myTank.sprite.body.velocity.x = 100;
            this.myTank.sprite.body.velocity.y = 0;
            this.myTank.sprite.animations.play("right");
            this.myTank.sprite.body.setSize(30, 25, 1, 3.5);
        } else if (this.cursors.up.isDown) {
            this.myTank.sprite.body.velocity.y = -100;
            this.myTank.sprite.body.velocity.x = 0;
            this.myTank.sprite.animations.play("up");
            this.myTank.sprite.body.setSize(25, 30, 3.5, 1);
        } else if (this.cursors.down.isDown) {
            this.myTank.sprite.body.velocity.y = 100;
            this.myTank.sprite.body.velocity.x = 0;
            this.myTank.sprite.animations.play("down");
            this.myTank.sprite.body.setSize(25, 30, 3.5, 1);
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            if (this.myTank.canFire()) {
                this.myTank.fire();
            }
        }
    }
}