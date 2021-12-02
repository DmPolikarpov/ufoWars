//class Element that inherites from class Image and models general sprite element 
export class Element extends Image {
    //class variables with their default values
    x0 = 0;
    y0 = 0;
    width = 0;
    height = 0;
    speed = 1;
    //constructor that assigns class variables with values for a particular class instance
    constructor(x0, y0, width, height, source, canvas) {
        super();
        super.src = source;
        this.x0 = x0;
        this.y0 = y0;
        this.width = width;
        this.height = height;
        this.canvas = canvas;
    }
    //sets speed of an element
    setSpeed(param) {
        this.speed = param;
    }

}