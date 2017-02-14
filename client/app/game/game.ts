import {Injectable} from "@angular/core";
import {Tank} from "./tank";
import {GameInput} from "./input";
import {MapGame} from "./map";
import {KeyExchange} from "../../../share/keyexchange";
import {UserService} from "../services/user.service";
import {CommandService} from "../services/command.service";
/**
 * Created by binhlt on 13/02/2017.
 */

@Injectable()
export class TankGame {

    game; //Phaser
    gameData;
    map:MapGame;
    explosion;
    listTank = [];
    myTank:Tank;
    playController:GameInput;

    constructor(private userService:UserService,
                private commandService:CommandService) {

    }

    setGameData(data, callback) {
        this.gameData = data;
        this.game = new Phaser.Game(1280, 640, Phaser.AUTO, 'game-content', {
            preload: this.preload.bind(this),
            create: () => {
                this.create();
                if (callback) {
                    callback()
                }
            },
            update: this.update.bind(this),
            render: this.render.bind(this)
        });
    }

    stopGame() {
        this.playController.stopped = true;
    }

    resumeGame() {
        this.playController.stopped = false;
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
        this.game.stage.disableVisibilityChange = true;

        this.map = new MapGame(this.game, this.commandService);
        this.map.createFloor();

        let listPos = this.gameData[KeyExchange.KEY_DATA.LIST_PLAYER_POSITION];
        for (let i = 0; i < listPos.length; i++) {
            let posObj = listPos[i];
            let tank = new Tank(this.game, posObj[KeyExchange.KEY_DATA.PLAYER_ID], posObj[KeyExchange.KEY_DATA.PLAYER_POSITION]);
            if (tank.playerId == this.userService.getMyPlayerId()) {
                this.myTank = tank;
            }
            this.listTank.push(tank);
        }

        this.map.createGrass();

        this.playController = new GameInput(this.game, this.myTank);

        this.explosion = this.game.add.sprite(0, 0, 'explosion');
        this.explosion.anchor.set(0.5, 0.5);
        this.explosion.animations.add("bum", [0, 1, 2], 10, false);
        this.explosion.kill();
    }

    update() {
        this.game.physics.arcade.collide(this.myTank.sprite, this.map.floor);
        this.game.physics.arcade.collide(this.myTank.sprite, this.map.sea);
        this.playController.update();
        for (let tank of this.listTank) {
            this.checkCollision(tank);
        }
    }

    checkCollision(tank:Tank) {
        let bullets = tank.getBullets();
        for (let bullet of bullets) {
            if (bullet) {
                // check collision with map
                this.game.physics.arcade.collide(bullet, this.map.floor, () => {
                    bullet.kill();
                    this.playExplosion(bullet.centerX, bullet.centerY);
                    this.map.hitBullet(bullet.centerX, bullet.centerY);
                });
                // check collision with other tanks
                for (let otherTank of this.listTank) {
                    if (otherTank.playerId != tank.playerId) {
                        this.game.physics.arcade.collide(bullet, otherTank.sprite, () => {
                            bullet.kill();
                            this.playExplosion(bullet.centerX, bullet.centerY);
                            otherTank.sprite.kill();
                            //TODO send shoot tank command
                        })
                    }
                }
            }
        }
    }

    playExplosion(x, y) {
        this.explosion.reset(x, y);
        this.explosion.animations.play('bum', 10, false, true);
    }

    render() {

    }

    startCountdown(callback, seconds) {
        var timer = this.game.time.events.loop(Phaser.Timer.SECOND, () => {
            seconds--;
            callback(seconds);
            if (seconds <= 0) {
                this.game.time.events.remove(timer);
            }
        }, this);
    }

    startClock(callback, limitSeconds = -1) {
        var seconds = 0;
        var timer = this.game.time.events.loop(Phaser.Timer.SECOND, () => {
            seconds++;
            callback(seconds);
            if (limitSeconds > -1 && seconds >= limitSeconds) {
                this.game.time.events.remove(timer);
            }
        }, this);
    }
}