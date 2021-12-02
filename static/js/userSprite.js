import {Element} from './element.js';

export class UserSprite extends Element {

    rightMove = false;
    leftMove = false;

    constructor(x0, y0, width, height, source, canvas) {
        super(x0, y0, width, height, source, canvas);
    }

    //method updates position of the class instance 
    updatePosition () {
        if ((this.rightMove) & ((this.x0 + this.width) < this.canvas.width)) {
            this.x0 += this.speed;
        }
        if ((this.leftMove) & (this.x0 > 0)) {
            this.x0 -= this.speed;
        }
    }
}