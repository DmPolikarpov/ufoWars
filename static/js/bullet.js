class Bullet {
    x0 = 0;
    y0 = 0;
    width = 0;
    height = 0;
    color = "#FFFFFF";
    speed = 3;
    nextBullet_Triggered=false

    constructor(x0, y0, width, height, color, context) {
        this.color = color;
        this.x0 = x0;
        this.y0 = y0;
        this.width = width;
        this.height = height;
        this.context = context;
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x0, this.y0, this.width, this.height);
    }

    setSpeed(param) {
        this.speed = param;
    }
}
