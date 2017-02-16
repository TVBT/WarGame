import {Injectable} from "@angular/core";
import {Tank} from "./tank";
import {GameInput} from "./input";
import {MapGame} from "./map";
import {KeyExchange} from "../../../share/keyexchange";
import {UserService} from "../services/user.service";
import {CommandService} from "../services/command.service";
import {Vector} from "../../../share/math/primitive";
/**
 * Created by binhlt on 13/02/2017.
 */

@Injectable()
export class TankGame {

    game; //Phaser
    gameData;
    map:MapGame;
    explosions;
    listTank = [];
    myTank:Tank;
    playController:GameInput;

    constructor(public userService:UserService,
                public commandService:CommandService) {

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
        this.game.stage.disableVisibilityChange = true;
        this.game.load.tilemap('tilemap', 'assets/map/map1.json?v=1', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('assetmap', 'assets/map/assetmap.png');
        this.game.load.spritesheet('tank', 'assets/images/tank1.png', 32, 32);
        this.game.load.image('bullet_up', 'assets/images/bullet_up.png');
        this.game.load.spritesheet('explosion', 'assets/images/explosion.png', 32, 32);
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

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

        this.playController = new GameInput(this, this.myTank);
        this.explosions = this.game.add.group();
        for (let i = 0; i < listPos.length; i++) {
            let explosion = this.explosions.create(0, 0, 'explosion', 0, false);
            explosion.anchor.set(0.5, 0.5);
            explosion.animations.add("bum", [0, 1, 2], 10, false);
        }
    }

    update() {
        this.playController.update();
        for (let tank of this.listTank) {
            this.game.physics.arcade.collide(tank.sprite, this.map.floor);
            this.game.physics.arcade.collide(tank.sprite, this.map.sea);
            this.checkBulletsCollision(tank);
        }
    }

    forceBulletExplosion(playerId, bulletId) {
        let tank = this.getTankById(playerId);
        if (tank) {
            let bullet = tank.getBulletById(bulletId);
            if (bullet) {
                bullet.kill();
                this.playExplosion(bullet.x, bullet.y);
            }
        }
    }

    checkBulletsCollision(tank:Tank) {
        let bullets = tank.getBullets();
        for (let bullet of bullets) {
            if (bullet) {
                // check collision with map
                this.game.physics.arcade.collide(bullet, this.map.floor, () => {
                    bullet.kill();
                    this.playExplosion(bullet.centerX, bullet.centerY);
                    if (tank === this.myTank) {
                        // only clear map item when my tank is firing
                        this.map.hitBullet(bullet);
                    }
                });
                // check collision with other tanks
                for (let otherTank of this.listTank) {
                    if (tank === this.myTank && otherTank.playerId != tank.playerId) {
                        this.game.physics.arcade.collide(bullet, otherTank.sprite, () => {
                            bullet.kill();
                            this.playExplosion(bullet.centerX, bullet.centerY);
                            otherTank.sprite.kill();
                            this.commandService.hitTank(otherTank.playerId, bullet.bulletId);
                        })
                    }
                }
            }
        }
    }

    playExplosion(x, y) {
        let explosion = this.explosions.getFirstDead();
        if (explosion) {
            explosion.reset(x, y);
            explosion.animations.play('bum', 10, false, true);
        }
    }

    render() {

    }

    startCountdown(seconds, callback, endCallback?) {
        var timer = this.game.time.events.loop(Phaser.Timer.SECOND, () => {
            seconds--;
            callback(seconds);
            if (seconds <= 0) {
                if (endCallback) endCallback();
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

    getTankById(playerId): Tank {
        for (let tank of this.listTank) {
            if (tank.playerId == playerId) {
                return tank;
            }
        }
        return null;
    }

    onPlayerMove(data) {
        let playerId = data[KeyExchange.KEY_DATA.PLAYER_ID];
        let tank: Tank = this.getTankById(playerId);
        if (tank && tank.playerId != this.userService.getMyPlayerId()) {
            tank.setPosition(data[KeyExchange.KEY_DATA.PLAYER_POSITION]);
            tank.setVelocity(data[KeyExchange.KEY_DATA.PLAYER_DIRECTION]);
        }
    }

    // unused
    onPlayerStopMove(data) {
        let playerId = data[KeyExchange.KEY_DATA.PLAYER_ID];
        let tank: Tank = this.getTankById(playerId);
        if (tank && tank.playerId != this.userService.getMyPlayerId()) {
            tank.setPosition(data[KeyExchange.KEY_DATA.PLAYER_POSITION]);
            tank.setVelocity({x: 0, y: 0});
        }
    }

    onHitTank(data:any) {
        let status = data[KeyExchange.KEY_DATA.STATUS];
        if (status) {
            let shootedPlayerId = data[KeyExchange.KEY_DATA.PLAYERID_BE_SHOOT];
            let tank = this.getTankById(shootedPlayerId);
            if (tank && tank.sprite.alive) {
                this.playExplosion(tank.sprite.centerX, tank.sprite.centerY);
                tank.sprite.kill();
            }
        }
    }

    onPlayerShoot(data) {
        let playerId = data[KeyExchange.KEY_DATA.PLAYERID_ACTION];
        let tank: Tank = this.getTankById(playerId);
        if (tank && tank.playerId != this.userService.getMyPlayerId()) {
            let serverPos = data[KeyExchange.KEY_DATA.PLAYER_POSITION];
            let serverVel = data[KeyExchange.KEY_DATA.BULLET_DIRECTION];
            let delayTime = Date.now() - data[KeyExchange.KEY_DATA.ACTION_TIME];
            serverPos = new Vector(serverPos.x, serverPos.y);
            serverVel = new Vector(serverVel.x, serverVel.y);
            let bulletStartPos = serverVel.mul(delayTime/1000);
            tank.setPosition(serverPos);
            tank.fire(serverVel, bulletStartPos, data[KeyExchange.KEY_DATA.BULLET_ID]);
        }
    }

    onPlayerReborn(data) {
        let status = data[KeyExchange.KEY_DATA.STATUS];
        if (status) {
            let playerId = data[KeyExchange.KEY_DATA.PLAYER_ID];
            let playerPos = data[KeyExchange.KEY_DATA.PLAYER_POSITION];
            let tank: Tank = this.getTankById(playerId);
            if (tank && tank.playerId == this.userService.getMyPlayerId()) {
                tank.setPosition(playerPos);
                tank.sprite.revive();
            }
        }
    }
}