//import parent class Element to inherite
import {Element} from './element.js';
//class EnemySprite that inherites from class Element and models enemy sprite element (enemy space ship and objects)
export class EnemySprite extends Element {
    //class variables with their default values
    leftSwitch = true;
    rightSwitch = false;
    //constructor that assigns class variables with values for a particular class instance
    constructor(x0, y0, width, height, source, canvas) {
        super(x0, y0, width, height, source, canvas);
    }
    //method that updates horisontal position of class instance
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
