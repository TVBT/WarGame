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

    removeBrick(iCol, iRow) {
        var tile = this.map.getTile(iCol, iRow, this.floor);
        if (tile && tile.index == KeyExchange.MAP_ITEM.BRICK) {
            this.map.removeTile(iCol, iRow, this.floor);
        }
    }

    tilePosFromPoint(point) {
        var iCol = point.x / this.map.tileWidth | 0;
        var iRow = point.y / this.map.tileWidth | 0;
        return [iCol, iRow];
    }

    hitBullet(x, y) {
        var rect = new Rect(x-8, y-8, 16, 16);
        this.removeBrick.apply(this, this.tilePosFromPoint(rect.topLeft));
        this.removeBrick.apply(this, this.tilePosFromPoint(rect.topRight));
        this.removeBrick.apply(this, this.tilePosFromPoint(rect.bottomLeft));
        this.removeBrick.apply(this, this.tilePosFromPoint(rect.bottomRight));
    }
}