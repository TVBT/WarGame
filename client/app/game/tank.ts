/**
 * Created by binhlt on 13/02/2017.
 */
export class Tank {

    game;
    sprite;
    bullets;
    playerId;

    constructor(game, playerId, playerPos) {
        this.game = game;
        this.playerId = playerId;

        this.sprite = this.game.add.sprite(playerPos.x, playerPos.y, 'tank');
        this.sprite.anchor.set(0.5);
        this.game.physics.enable(this.sprite);
        this.sprite.body.setSize(25, 30, 3.5, 1);
        this.sprite.body.collideWorldBounds=true;

        this.sprite.animations.add("down", [0, 3], 10, false);
        this.sprite.animations.add("left", [1, 4], 10, false);
        this.sprite.animations.add("right", [6, 7], 10, false);
        this.sprite.animations.add("up", [2, 5], 10, false);

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(1, "bullet_up");
        this.bullets.setAll("checkWorldBounds", true);
        this.bullets.setAll("outOfBoundsKill", true);
    }

    canFire(): boolean {
        return this.bullets.countDead() > 0;
    }

    fire() {
        var bullet = this.bullets.getFirstDead();
        bullet.anchor.setTo(0.5, 0.5);
        bullet.reset(this.sprite.centerX, this.sprite.centerY);
        this.game.physics.enable(bullet);
        bullet.body.setSize(4, 4, 2, 2);

        let aniName = this.sprite.animations.name;
        let speed = 300;
        switch (aniName) {
            case "left":
                bullet.angle = -90;
                bullet.body.velocity.x = -speed;
                break;
            case "right":
                bullet.angle = 90;
                bullet.body.velocity.x = speed;
                break;
            case "up":
                bullet.angle = 0;
                bullet.body.velocity.y = -speed;
                break;
            case "down":
                bullet.angle = -180;
                bullet.body.velocity.y = speed;
                break;
        }

        return bullet;
    }

    getBullets() {
        return this.bullets.children.filter((child) => child.alive);
    }

    setPosition(point) {
        this.sprite.reset(point.x, point.y);
    }

    setVelocity(velocity) {
        if (velocity.x == 0) {
            if (velocity.y > 0) {
                this.sprite.animations.play("down");
                this.sprite.body.setSize(25, 30, 3.5, 1);
            } else if (velocity.y < 0) {
                this.sprite.animations.play("up");
                this.sprite.body.setSize(25, 30, 3.5, 1);
            }
        } else if (velocity.y == 0) {
            if (velocity.x > 0) {
                this.sprite.animations.play("right");
                this.sprite.body.setSize(30, 25, 1, 3.5);
            } else if (velocity.x < 0) {
                this.sprite.animations.play("left");
                this.sprite.body.setSize(30, 25, 1, 3.5);
            }
        } else {
            return;
        }
        this.sprite.body.angularVelocity = 0;
        this.sprite.body.velocity.set(velocity.x, velocity.y);
    }
}
