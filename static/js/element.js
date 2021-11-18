class Element extends Image {
    x0 = 0;
    y0 = 0;
    width = 0;
    height = 0;
    leftSwitch = true;
    rightSwitch = false;
    speed = 1;
    rightMove = false;
    leftMove = false;

    constructor(x0, y0, width, height, source) {
        super();
        super.src = source;
        this.x0 = x0;
        this.y0 = y0;
        this.width = width;
        this.height = height;
    }

    setSpeed(param) {
        this.speed = param;
    }

}