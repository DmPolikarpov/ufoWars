import {Element} from './element.js';

export class EnemySprite extends Element {

    leftSwitch = true;
    rightSwitch = false;

    constructor(x0, y0, width, height, source, canvas) {
        super(x0, y0, width, height, source, canvas);
    }

    //function receives an element as an argument and updates its horisontal position 
    updateHorizontalPosition () {
        if (this.leftSwitch) {
            if ((this.x0 + this.width) < this.canvas.width) {
                this.x0 += this.speed;
            } else {
                this.leftSwitch = false;
                this.rightSwitch = true;
            }
        } else if (this.rightSwitch) {
            if (this.x0 > 0) {
                this.x0 -= this.speed;
            } else {
                this.leftSwitch = true;
                this.rightSwitch = false;
            }
    }
}
}
