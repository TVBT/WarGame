/**
 * Created by binhlt on 13/02/2017.
 */
export class Tank {

    game;
    sprite;
    bullets;
    playerId;

    constructor(game) {
        this.game = game;

        this.sprite = this.game.add.sprite(240, 100, 'tank');
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
}
