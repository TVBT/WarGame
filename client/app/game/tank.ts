/**
 * Created by binhlt on 13/02/2017.
 */
export class Tank {

    bulletStartId = 1;

    game;
    sprite;
    bullets;
    playerId:number;
    fireRate = 1; // second
    lastFireTime = Date.now();
    maxBullets = 10;

    constructor(game, playerId, playerPos) {
        this.game = game;
        this.playerId = playerId;

        this.sprite = this.game.add.sprite(playerPos.x, playerPos.y, 'tank');
        this.sprite.anchor.set(0.5);
        this.game.physics.enable(this.sprite);
        this.sprite.body.setSize(25, 30, 3.5, 1);
        this.sprite.body.collideWorldBounds = true;

        this.sprite.animations.add("down", [0, 3], 10, true);
        this.sprite.animations.add("left", [1, 4], 10, true);
        this.sprite.animations.add("right", [6, 7], 10, true);
        this.sprite.animations.add("up", [2, 5], 10, true);
        // cheat, set initial animation
        this.sprite.animations.play("down");
        this.sprite.animations.stop();

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(this.maxBullets, "bullet_up");
        this.bullets.setAll("checkWorldBounds", true);
        this.bullets.setAll("outOfBoundsKill", true);
    }

    canFire():boolean {
         return this.bullets.countLiving() < this.maxBullets && (Date.now() - this.lastFireTime > this.fireRate*1000);
    }

    getDirection():string {
        return this.sprite.animations.name;
    }

    generateBulletId() {
        return this.bulletStartId++;
    }

    fire(velocity, startPos={x:0, y:0}, bulletId?) {
        this.lastFireTime = Date.now();
        if (velocity.x == 0 && velocity.y == 0) {
            return null;
        }
        if (velocity.x != 0 && velocity.y != 0) {
            return null;
        }
        let bullet = this.bullets.getFirstDead();
        if (bullet) {
            bullet.bulletId = bulletId ? bulletId : this.generateBulletId();
            bullet.anchor.setTo(0.5, 0.5);
            bullet.body.setSize(4, 4, 2, 2);
            bullet.reset(this.sprite.centerX + startPos.x, this.sprite.centerY + startPos.y);
            this.game.physics.enable(bullet);
            if (velocity.x < 0 && velocity.y == 0) {        // left
                bullet.angle = -90;
            } else if (velocity.x > 0 && velocity.y == 0) { // right
                bullet.angle = 90;
            } else if (velocity.x == 0 && velocity.y < 0) { // up
                bullet.angle = 0;
            } else if (velocity.x == 0 && velocity.y > 0) { // down
                bullet.angle = -180;
            }
            bullet.body.velocity.set(velocity.x, velocity.y);
        }
        return bullet;
    }

    getBulletById(bulletId): any {
        for (let bullet of this.bullets.children) {
            if (bullet.alive && bullet.bulletId == bulletId) {
                return bullet;
            }
        }
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
        if (velocity.x == 0 && velocity.y == 0) {
            this.sprite.animations.stop();
        }
        this.sprite.body.angularVelocity = 0;
        this.sprite.body.velocity.set(velocity.x, velocity.y);
    }
}
