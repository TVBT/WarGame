/**
 * Created by thinhth2 on 2/10/2017.
 */

require('timers');

class Ticker {
    private frameTime;
    private _fps;
    private _lastTime;
    private _mainLoop;
    private _interval;

    set fps(fps) {
        this._fps = fps;
        this.frameTime = 1000 / this.fps;
        if (this._interval)
            clearInterval(this._interval);

        if (this._mainLoop)
            this.start(this._mainLoop);
    }

    get fps() {
        return this._fps;
    }

    get currentTime() {
        return new Date().getTime();
    }
    constructor(fps = 60) {
        this.fps = fps;
    }

    start(mainLoop) {
        this._mainLoop = mainLoop;
        this._lastTime = Date.now();
        this._interval = setInterval(() => {
            this._mainLoop(Date.now() - this._lastTime);
            this._lastTime = Date.now();
        }, this.frameTime);
    }
}

export {
    Ticker
}