/**
 * Created by thinhth2 on 2/10/2017.
 */

const MapLoader = require("../share/maploader").MapLoader;

describe("MapLoader test suite", function() {
    it("getArrayData", function() {
        var loader = new MapLoader("spec/data/map1.json");
        var arrayData = loader.getArrayData();
        expect(arrayData[0]).toEqual(2);
        expect(arrayData[1]).toEqual(1);
    });

    it("getCSVData", function() {
        var loader = new MapLoader("spec/data/map1.json");
        var csvData = loader.getCSVData();
        expect(csvData).toEqual("2,1,0\n0,0,0\n0,0,0");
    });
});