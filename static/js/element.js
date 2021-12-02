export class Element extends Image {
    x0 = 0;
    y0 = 0;
    width = 0;
    height = 0;
    speed = 1;

    constructor(x0, y0, width, height, source, canvas) {
        super();
        super.src = source;
        this.x0 = x0;
        this.y0 = y0;
        this.width = width;
        this.height = height;
        this.canvas = canvas;
    }

    setSpeed(param) {
        this.speed = param;
    }

}