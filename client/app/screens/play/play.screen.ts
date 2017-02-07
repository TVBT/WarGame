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
            game.load.image('tank', 'assets/images/tank.png');

        }

        var map;
        var layer;
        var cursors;
        var sprite;

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
        }

        function update() {
            game.physics.arcade.collide(sprite, layer);

            sprite.body.velocity.x = 0;
            sprite.body.velocity.y = 0;
            sprite.body.angularVelocity = 0;

            if (cursors.left.isDown) {
                sprite.body.velocity.x = -100;
                sprite.body.rotation = 180;
            } else if (cursors.right.isDown) {
                sprite.body.velocity.x = 100;
                sprite.body.rotation = 0;
            } else if (cursors.up.isDown) {
                sprite.body.velocity.y = -100;
                sprite.body.rotation = -90;
            } else if (cursors.down.isDown) {
                sprite.body.velocity.y = 100;
                sprite.body.rotation = 90;
            }
        }

        function render() {

        }
    }
}