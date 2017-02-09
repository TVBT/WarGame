/**
 * Created by thinhth2 on 2/6/2017.
 */
import {Component, AfterViewInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'play-screen',
    templateUrl: './play.screen.html',
    styleUrls: ['./play.screen.css']
})
export class PlayScreen implements AfterViewInit {
    ngAfterViewInit() {

        var game = new Phaser.Game(1280, 768, Phaser.AUTO, 'game-content', {
            preload: preload,
            create: create,
            update: update,
            render: render
        });

        function preload() {
            game.load.tilemap('tilemap', 'assets/map/map.json?v=1', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('map', 'assets/map/map.png');
            game.load.spritesheet('tank', 'assets/images/tank1.png', 32, 32);
            game.load.image('bullet_up', 'assets/images/bullet_up.png');
        }

        var map;
        var layer;
        var cursors;
        var sprite;
        var bullet;
        var bullets;

        function create() {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
            map = game.add.tilemap('tilemap', 16, 16, 80 * 16, 48 * 16);
            //  Now add in the tileset
            map.addTilesetImage('map');
            map.setCollisionBetween(1, 110);
            //  Create our layer
            layer = map.createLayer(0);
            //  Resize the world
            layer.resizeWorld();

            sprite = game.add.sprite(240, 100, 'tank');
            sprite.anchor.set(0.5);
            game.physics.enable(sprite);
            sprite.body.setSize(32, 32, 0, 0);

            cursors = game.input.keyboard.createCursorKeys();

            sprite.animations.add("down", [0,3], 10, false);
            sprite.animations.add("left", [1,4], 10, false);
            sprite.animations.add("right", [6,7], 10, false);
            sprite.animations.add("up", [2,5], 10, false);

            bullets = game.add.group();
            bullets.enableBody = true;
            bullets.physicsBodyType = Phaser.Physics.ARCADE;
            bullets.createMultiple(1, "bullet_up");
            bullets.setAll("checkWorldBounds", true);
            bullets.setAll("outOfBoundsKill", true);
        }

        function update() {
            game.physics.arcade.collide(sprite, layer);

            sprite.body.velocity.x = 0;
            sprite.body.velocity.y = 0;
            sprite.body.angularVelocity = 0;

            if (cursors.left.isDown) {
                sprite.body.velocity.x = -100;
                sprite.animations.play("left");
            } else if (cursors.right.isDown) {
                sprite.body.velocity.x = 100;
                sprite.animations.play("right");
            } else if (cursors.up.isDown) {
                sprite.body.velocity.y = -100;
                sprite.animations.play("up");
            } else if (cursors.down.isDown) {
                sprite.body.velocity.y = 100;
                sprite.animations.play("down");
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                if (bullets.countDead() > 0) {
                    bullet = bullets.getFirstDead();
                    bullet.anchor.setTo(0.5, 0.5);
                    bullet.reset(sprite.centerX, sprite.centerY);
                    game.physics.enable(bullet);

                    let aniName = sprite.animations.name;
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
                }
            }
            if (bullet) {
                game.physics.arcade.collide(bullet, layer, () => {
                    bullet.kill();
                });
            }
        }

        function render() {

        }
    }
}