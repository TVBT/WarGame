import {isNullOrUndefined} from "util";

/**
 * Created by thinhth2 on 2/10/2017.
 */

class Point {
    x;
    y;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class Size {
    width;
    height;

    constructor(width = 1, height = 1) {
        this.width = width;
        this.height = height;
    }
}

class Vector {
    x;
    y;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    negative() {
        return new Vector(-this.x, -this.y);
    }

    equals(v) {
        return this.x == v.x && this.y == v.y;
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    set(x, y?) {
        this.x = x;
        if (!isNullOrUndefined(y)) {
            this.y = y;
        }
    }

    add(v:Vector) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    sub(v:Vector) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    mul(n:number) {
        return new Vector(this.x * n, this.y * n);
    }

    div(n:number) {
        if (n == 0) return this;
        return new Vector(this.x / n, this.y / n);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    cross(v) {
        return this.x * v.y - this.y * v.x
    }

    length() {
        return Math.sqrt(this.dot(this));
    }

    normalize() {
        return this.div(this.length());
    }

    min() {
        return Math.min(this.x, this.y);
    }

    max() {
        return Math.max(this.x, this.y);
    }

    toAngles() {
        return -Math.atan2(-this.y, this.x);
    }

    angleTo(a) {
        return Math.acos(this.dot(a) / (this.length() * a.length()));
    }
}

class Rect {
    x;
    y;
    width;
    height;

    constructor(x = 0, y = 0, width = 1, height = 1) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get point() {
        return new Point(this.x, this.y);
    }

    set point(p:Point) {
        this.x = p.x;
        this.y = p.y;
    }

    get size() {
        return new Size(this.width, this.height);
    }

    set size(s:Size) {
        this.width = s.width;
        this.height = s.height;
    }

    get center() {
        return new Point(this.x + this.width / 2, this.y + this.height / 2);
    }

    get topLeft() {
        return new Point(this.x, this.y);
    }

    get topRight() {
        return new Point(this.x + this.width, this.y);
    }

    get bottomLeft() {
        return new Point(this.x, this.y + this.height);
    }

    get bottomRight() {
        return new Point(this.x + this.width, this.y + this.height);
    }

    get leftCenter() {
        return new Point(this.x, this.y + this.height / 2);
    }

    get topCenter() {
        return new Point(this.x + this.width / 2, this.y);
    }

    get rightCenter() {
        return new Point(this.x + this.width, this.y + this.height / 2);
    }

    get bottomCenter() {
        return new Point(this.x + this.width / 2, this.y + this.height);
    }

    get left() {
        return this.x;
    }

    get right() {
        return this.x + this.width;
    }

    get top() {
        return this.y;
    }

    get bottom() {
        return this.y + this.height;
    }

    clone() {
        return new Rect(this.x, this.y, this.width, this.height);
    }

    containsPoint(p:Point) {
        return p.x > this.x
            && p.x < this.x + this.width
            && p.y > this.y
            && p.y < this.y + this.height;
    }

    containsRect(rect:Rect) {
        return this.containsPoint(rect.topLeft)
            && this.containsPoint(rect.topRight)
            && this.containsPoint(rect.bottomLeft)
            && this.containsPoint(rect.bottomRight);
    }

    intersect(r2:Rect) {
        return !(r2.left > this.right ||
                r2.right < this.left ||
                r2.top > this.bottom ||
                r2.bottom < this.top);
    }
}


export {
    Point,
    Vector,
    Rect
}