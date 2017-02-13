import {Tank} from "./tank";
import {GameInput} from "./input";
import {MapGame} from "./map";
/**
 * Created by binhlt on 13/02/2017.
 */

export class TankGame {

    game;
    map: MapGame;
    explosion;
    listTank = {};
    myTank: Tank;
    playController: GameInput;

    constructor(data) {
        this.game = new Phaser.Game(1280, 768, Phaser.AUTO, 'game-content', {
            preload: this.preload.bind(this),
            create: this.create.bind(this),
            update: this.update.bind(this),
            render: this.render.bind(this)
        });
    }

    preload() {
        this.game.load.tilemap('tilemap', 'assets/map/map1.json?v=1', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('assetmap', 'assets/map/assetmap.png');
        this.game.load.spritesheet('tank', 'assets/images/tank1.png', 32, 32);
        this.game.load.image('bullet_up', 'assets/images/bullet_up.png');
        this.game.load.spritesheet('explosion', 'assets/images/explosion.png', 32, 32);
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = new MapGame(this.game);
        this.map.createFloor();
        this.myTank = new Tank(this.game);
        this.map.createGrass();

        this.playController = new GameInput(this.game, this.myTank);

        this.explosion = this.game.add.sprite(0, 0, 'explosion');
        this.explosion.anchor.set(0.5, 0.5);
        this.explosion.animations.add("bum", [0, 1, 2], 10, false);
        this.explosion.kill();
    }

    update() {
        this.game.physics.arcade.collide(this.myTank.sprite, this.map.floor);
        this.playController.update();

        let bullets = this.myTank.getBullets();
        for (let bullet of bullets) {
            if (bullet) {
                // check collision with map
                this.game.physics.arcade.collide(bullet, this.map.floor, () => {
                    bullet.kill();
                    this.explosion.reset(bullet.centerX, bullet.centerY);
                    this.explosion.animations.play('bum', 10, false, true);
                });
            }
        }
    }

    render() {

    }
}