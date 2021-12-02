//import parent class Element to inherite
import {Element} from './element.js';
//class UserSprite that inherites from class Element and models user sprite element (user space ship and shield)
export class UserSprite extends Element {
    //class variables with their default values
    rightMove = false;
    leftMove = false;
    //constructor that assigns class variables with values for a particular class instance
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