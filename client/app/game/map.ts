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
        this.map.setCollisionBetween(1, 3);
        this.map.setCollisionBetween(5, 32);
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
}