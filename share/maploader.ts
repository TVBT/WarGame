/**
 * Created by thinhth2 on 2/10/2017.
 */


export class MapLoader {
    private filepath:string;
    private jsonMap;

    // Client side call
    loadString(str) {
        this.jsonMap = JSON.parse(str);
    }

    public getArrayData() {
        if (this.jsonMap.layers.length > 1) {
            var cols = this.jsonMap.width;
            var rows = this.jsonMap.height;
            var length = cols * rows;
            var mapData = [];
            for (let i = 0; i < length; i++) {
                mapData[i] = 0;
                for (let layer of this.jsonMap.layers) {
                    if (layer.data[i]) {
                        mapData[i] = layer.data[i];
                        break;
                    }
                }
            }

            return mapData;
        }

        return this.jsonMap.layers[0];
    }

    public getCSVData() {
        var cols = this.jsonMap.width;
        var rows = this.jsonMap.height;
        var mapData = [];
        var csv = '';
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let index = i * cols + j;
                mapData[index] = -1;
                for (let layer of this.jsonMap.layers) {
                    if (layer.data[index]) {
                        mapData[index] = layer.data[index] - 1;
                        break;
                    }
                }
                csv += mapData[index];

                if (j < cols-1) {
                    csv += ",";
                }
            }

            if (i < rows-1) {
                csv += "\n";
            }
        }

        return csv;
    }
}