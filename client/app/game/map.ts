import {KeyExchange} from "../../../share/keyexchange";
import {Rect} from "../../../share/math/primitive";
/**
 * Created by binhlt on 13/02/2017.
 */
export class MapGame {

    game;
    map;
    floor;
    grass;

    constructor(game) {
        this.game = game;

        //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
        this.map = this.game.add.tilemap('tilemap');
        //  Now add in the tileset
        this.map.addTilesetImage('assetmap');
        this.map.setCollisionBetween(KeyExchange.MAP_ITEM.SNOW, KeyExchange.MAP_ITEM.RIVER);
        this.map.setCollisionBetween(KeyExchange.MAP_ITEM.BRICK, KeyExchange.MAP_ITEM.EAGLE_BOT_RIGHT);
    }

    createFloor() {
        //  Create our layer
        this.floor = this.map.createLayer('floor');
        //  Resize the world
        this.floor.resizeWorld();
    }

    createGrass() {
        this.grass = this.map.createLayer('grass');
    }

    hitBrick(iCol, iRow) {
        var tile = this.map.getTile(iCol, iRow, this.floor);
        if (tile && tile.index == KeyExchange.MAP_ITEM.BRICK) {
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

    hitHomeTown(iCol, iRow) {
        var neightboor = [0, -2, -1, +1, +2];
        for (let padx of neightboor) {
            for (let pady of neightboor) {
                let tile = this.map.getTile(iCol + padx, iRow + pady, this.floor);
                if (tile && tile.index >= KeyExchange.MAP_ITEM.EAGLE_TOP_LEFT
                    && tile.index <= KeyExchange.MAP_ITEM.EAGLE_BOT_RIGHT) {
                    this.map.removeTile(iCol + padx, iRow + pady, this.floor);
                }
            }
        }

    }

    hitBullet(x, y) {
        var rect = new Rect(x - 8, y - 8, 16, 16);
        var isHitted = false;
        isHitted = this.hitBrick.apply(this, this.tilePosFromPoint(rect.topLeft)) || isHitted;
        isHitted = this.hitBrick.apply(this, this.tilePosFromPoint(rect.topRight)) || isHitted;
        isHitted = this.hitBrick.apply(this, this.tilePosFromPoint(rect.bottomLeft)) || isHitted;
        isHitted = this.hitBrick.apply(this, this.tilePosFromPoint(rect.bottomRight)) || isHitted;
        if (!isHitted) {
            this.hitHomeTown.apply(this, this.tilePosFromPoint(rect.center));
        }
    }
}