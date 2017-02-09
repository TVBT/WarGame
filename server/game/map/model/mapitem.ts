import {KeyExchange} from "../../../../share/keyexchange";
/**
 * Mô tả các Item có trên MAP
 * id: id của item
 * name: name của item
 * index: 0: nền background - có thể đi qua;
 *        1: các vật trên map - ko thể đi qua;
 *        2: index cao nhất (bụi cỏ) - nằm trên chướng ngại vật
 * isCanHit: Có thể bắn item này hay ko
 * x,y: tọa độ hiện tại trên map mô tả trong mảng
 *
 *
 * Created by thuctvd on 2/8/2017.
 */
export interface MapItem {
    readonly id: number;
    readonly name: string;
    readonly index: number;
    readonly isCanHit:boolean;
    x: number;
    y: number;

    setPos(x:number ,y:number):void;
    getPos();
}

/**
 * Item Nền tuyết
 */
export class SnowFloor implements MapItem{
    id:number
    name:string;
    x:number;
    y:number;
    index:number;
    isCanHit:boolean;
    constructor(){
        this.id = KeyExchange.MAP_ITEM.SNOW;
        this.name = "snowFloor";
        this.x = 0;
        this.y = 0;
        this.index = -1;
        this.isCanHit = false;
    }
    setPos(x:number, y:number):void {

    }
    getPos() {
        return {};
    }
}

/**
 * Item Sông
 */
export class River implements MapItem{
    id:number
    name:string;
    x:number;
    y:number;
    index:number;
    isCanHit:boolean;
    constructor(){
        this.id = KeyExchange.MAP_ITEM.RIVER;
        this.name = "river";
        this.x = 0;
        this.y = 0;
        this.index = 0;
        this.isCanHit = false;
    }
    setPos(x:number, y:number):void {

    }
    getPos() {
        return {};
    }
}


/**
 * Item Cỏ
 */
export class Grass implements MapItem{
    id:number
    name:string;
    x:number;
    y:number;
    index:number;
    isCanHit:boolean;
    constructor(){
        this.id = KeyExchange.MAP_ITEM.GRASS;
        this.name = "grass";
        this.x = 0;
        this.y = 0;
        this.index = 2;
        this.isCanHit = false;
    }
    setPos(x:number, y:number):void {

    }
    getPos() {
        return {};
    }
}


/**
 * Item Gạch
 */
export class Brick implements MapItem{
    id:number
    name:string;
    x:number;
    y:number;
    index:number;
    isCanHit:boolean;
    constructor(){
        this.id = KeyExchange.MAP_ITEM.BRICK;
        this.name = "brick";
        this.x = 0;
        this.y = 0;
        this.index = 1;
        this.isCanHit = true;
    }
    setPos(x:number, y:number):void {

    }
    getPos() {
        return {};
    }
}

/**
 * Item Bê tông
 */
export class Concrete implements MapItem{
    id:number
    name:string;
    x:number;
    y:number;
    index:number;
    isCanHit:boolean;
    constructor(){
        this.id = KeyExchange.MAP_ITEM.CONCRETE;
        this.name = "concrete";
        this.x = 0;
        this.y = 0;
        this.index = 1;
        this.isCanHit = true;
    }
    setPos(x:number, y:number):void {

    }
    getPos() {
        return {};
    }
}

/**
 * Item Đại Bàng - top left
 */
export class EagleTopLeft implements MapItem{
    id:number
    name:string;
    x:number;
    y:number;
    index:number;
    isCanHit:boolean;
    constructor(){
        this.id = KeyExchange.MAP_ITEM.EAGLE_TOP_LEFT;
        this.name = "egale-top-left";
        this.x = 0;
        this.y = 0;
        this.index = 1;
        this.isCanHit = true;
    }
    setPos(x:number, y:number):void {

    }
    getPos() {
        return {};
    }
}

/**
 * Item Đại Bàng - top right
 */
export class EagleTopRight implements MapItem{
    id:number
    name:string;
    x:number;
    y:number;
    index:number;
    isCanHit:boolean;
    constructor(){
        this.id = KeyExchange.MAP_ITEM.EAGLE_TOP_RIGHT;
        this.name = "egale-top-right";
        this.x = 0;
        this.y = 0;
        this.index = 1;
        this.isCanHit = true;
    }
    setPos(x:number, y:number):void {

    }
    getPos() {
        return {};
    }
}

/**
 * Item Đại Bàng - bottom left
 */
export class EagleBotLeft implements MapItem{
    id:number
    name:string;
    x:number;
    y:number;
    index:number;
    isCanHit:boolean;
    constructor(){
        this.id = KeyExchange.MAP_ITEM.EAGLE_BOT_LEFT;
        this.name = "egale-bot-left";
        this.x = 0;
        this.y = 0;
        this.index = 1;
        this.isCanHit = true;
    }
    setPos(x:number, y:number):void {

    }
    getPos() {
        return {};
    }
}

/**
 * Item Đại Bàng - bottom right
 */
export class EagleBotRight implements MapItem{
    id:number
    name:string;
    x:number;
    y:number;
    index:number;
    isCanHit:boolean;
    constructor(){
        this.id = KeyExchange.MAP_ITEM.EAGLE_BOT_RIGHT;
        this.name = "egale-bot-right";
        this.x = 0;
        this.y = 0;
        this.index = 1;
        this.isCanHit = true;
    }
    setPos(x:number, y:number):void {

    }
    getPos() {
        return {};
    }
}