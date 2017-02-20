import {KeyExchange} from "../../../share/keyexchange";
import {Rect} from "../../../share/math/primitive";
/**
 * Created by binhlt on 13/02/2017.
 */
export class MapGame {

    game;
    commandService;
    map;
    floor;
    grass;
    sea;

    constructor(game, commandService) {
        this.game = game;
        this.commandService = commandService;

        //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
        this.map = this.game.add.tilemap('tilemap');
        //  Now add in the tileset
        this.map.addTilesetImage('assetmap');
    }

    createFloor() {
        //  Create our layer
        this.floor = this.map.createLayer('floor');
        //  Resize the world
        this.floor.resizeWorld();
        this.sea = this.map.createLayer('sea');

        this.map.setCollisionBetween(KeyExchange.MAP_ITEM.SNOW, KeyExchange.MAP_ITEM.EAGLE_BOT_RIGHT, true, this.floor);
        this.map.setCollisionBetween(KeyExchange.MAP_ITEM.BRICK, KeyExchange.MAP_ITEM.EAGLE_BOT_RIGHT, true, this.floor);
        this.map.setCollisionBetween(KeyExchange.MAP_ITEM.RIVER, KeyExchange.MAP_ITEM.RIVER, true, this.sea);

    }

    createGrass() {
        this.grass = this.map.createLayer('grass');
    }

    removeBrick(iCol, iRow, bulletId?) {
        var tile = this.map.getTile(iCol, iRow, this.floor);
        if (tile && tile.index == KeyExchange.MAP_ITEM.BRICK) {
            if (bulletId)
                this.commandService.hitMapItem(iCol, iRow, tile.index, bulletId);

            this.map.removeTile(iCol, iRow, this.floor);
            return true;
        }
        return false;
    }

    tilePosFromPoint(point) {
        var iCol = point.x / this.map.tileWidth | 0;
        var iRow = point.y / this.map.tileWidth | 0;
        return [iCol, iRow];
    }

    hitBullet(bullet) {
        let x = bullet.centerX,
            y = bullet.centerY;
        var rect = new Rect(x - 8, y - 8, 16, 16);
        var isBrickHitted = false;
        var points = [
            this.tilePosFromPoint(rect.topLeft),
            this.tilePosFromPoint(rect.topRight),
            this.tilePosFromPoint(rect.bottomLeft),
            this.tilePosFromPoint(rect.bottomRight),
        ];

        for (let point of points) {
            isBrickHitted = this.removeBrick(point[0], point[1], bullet.bulletId) || isBrickHitted;
        }
    }
}