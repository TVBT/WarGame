/**
 * Created by thinhth2 on 2/10/2017.
 */

const MapLoader = require("../share/maploader").MapLoader;
const fs = require("fs");

describe("MapLoader test suite", function() {
    it("getArrayData", function() {
        var loader = new MapLoader();
        var data = fs.readFileSync("spec/data/map1.json", 'utf8');
        loader.loadString(data);
        var arrayData = loader.getArrayData();
        expect(arrayData[0]).toEqual(2);
        expect(arrayData[1]).toEqual(1);
    });

    it("getCSVData", function() {
        var loader = new MapLoader();
        var data = fs.readFileSync("spec/data/map1.json", 'utf8');
        loader.loadString(data);
        var csvData = loader.getCSVData();
        expect(csvData).toEqual("2,1,-1\n-1,-1,-1\n-1,-1,-1");
    });
});