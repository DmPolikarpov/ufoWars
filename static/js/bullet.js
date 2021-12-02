//class Bullet models bullets 
export class Bullet {
    //class variables with their default values
    x0 = 0;  
    y0 = 0;  
    width = 0;  
    height = 0; 
    color = "#FFFFFF"; 
    speed = 3; 
    nextBullet_Triggered=false // flag that enables the next bullet to be shoot
    //constructor that assigns class variables with values for a particular class instance
    constructor(x0, y0, width, height, color, context) {
        this.color = color;
        this.x0 = x0;
        this.y0 = y0;
        this.width = width;
        this.height = height;
        this.context = context;
    }
    //draws a bullet in canvas
    draw() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x0, this.y0, this.width, this.height);
    }
    //sets speed of a bullet
    setSpeed(param) {
        this.speed = param;
    }
}
