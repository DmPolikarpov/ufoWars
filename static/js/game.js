class Element extends Image {
    x0 = 0;
    y0 = 0;
    width = 0;
    height = 0;
    leftSwitch = true;
    rightSwitch = false;
    speed = 3;
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

}

class Bullet {
    x0 = 0;
    y0 = 0;
    width = 0;
    height = 0;
    color = "#FFFFFF";
    speed = 3;

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
}

const startGame = document.getElementById("btnNewGame");
const resetGame = document.getElementById("btnReset");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const backgroundImage = document.getElementById("background-image");
const userUfo = document.getElementById("user-ufo");
const enemyUfo = document.getElementById("enemy-ufo");
const shieldElement = document.getElementById("shield");
const addLogo = document.getElementsByClassName("addLogo")[0];
const startMessage = document.getElementsByClassName("start-message")[0];
playerScores = document.getElementById("score-value");
playerLifes = document.getElementById("attempts-value");
canvas.width = 1500;
canvas.height = 1000;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const enemy = new Element(684, 76, 132, 76, enemyUfo.src);
const user = new Element(684, 833, 132, 76, userUfo.src);
const shield = new Element(684, 734, 142, 19, shieldElement.src);

let game = false;
let runningGame;
let allEnemyBullets = [];
let scores = 0;
let lifes = 3;

const startSettings = () => {
    enemy.x0 = 684;
    enemy.y0 = 76;
    user.x0 = 684;
    user.y0 = 833;
    shield.x0 = 684;
    shield.y0 = 734;
}

let displayStatistic = () => {
    playerScores.textContent = scores;
    playerLifes.textContent = lifes;
}

const addEnemyBullet = () => {
    if (allEnemyBullets.length < 2) {
        let bullet = new Bullet(enemy.x0 + enemy.width / 2, enemy.y0 + enemy.height / 2, 10, 15, "#D40B27", ctx);
        bullet.draw();
        allEnemyBullets.push(bullet); 
    }
}

const drawElements = () => {
    clearCanvas();
    ctx.drawImage(backgroundImage, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(enemy, enemy.x0, enemy.y0, enemy.width, enemy.height); 
    ctx.drawImage(user, user.x0, user.y0, user.width, user.height); 
    ctx.drawImage(shield, shield.x0, shield.y0, shield.width, shield.height); 
    for (let i = 0; i < allEnemyBullets.length; i++) {
        allEnemyBullets[i].draw();
    }
}

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

const updateHorizontalPosition = (element) => {
    if (element.leftSwitch) {
        if ((element.x0 + element.width) < canvasWidth) {
            element.x0 += element.speed;
        } else {
            element.leftSwitch = false;
            element.rightSwitch = true;
        }
    } else if (element.rightSwitch) {
        if (element.x0 > 0) {
            element.x0 -= element.speed;
        } else {
            element.leftSwitch = true;
            element.rightSwitch = false;
        }
    }
}

const updateBulletPosition = () => {
    for (let i = 0; i < allEnemyBullets.length; i++) {
        if ((allEnemyBullets[i].y0 + allEnemyBullets[i].height) <= canvas.height) {
            allEnemyBullets[i].y0 += allEnemyBullets[i].speed;
        } else {
            allEnemyBullets[i].x0 = enemy.x0 + enemy.width / 2;
            allEnemyBullets[i].y0 = enemy.y0 + enemy.height / 2;
        }
        if (allEnemyBullets[i].y0 > canvas.height/2) {
            addEnemyBullet();
        }
        if (collideEvent(allEnemyBullets[i], shield)) {
            allEnemyBullets[i].x0 = enemy.x0 + enemy.width / 2;
            allEnemyBullets[i].y0 = enemy.y0 + enemy.height / 2;
            scores += 1;
        }
        if (collideEvent(allEnemyBullets[i], user)) {
            allEnemyBullets[i].x0 = enemy.x0 + enemy.width / 2;
            allEnemyBullets[i].y0 = enemy.y0 + enemy.height / 2;
            lifes -= 1;
        }
    }
}

const updateUserPosition = (element) => {
    if ((element.rightMove) & ((element.x0 + element.width) < canvasWidth)) {
        element.x0 += element.speed;
    }
    if ((element.leftMove) & (element.x0 > 0)) {
        element.x0 -= element.speed;
    }
}

const collideEvent = (firstElement, secondElement) => {
    if (firstElement.x0 > (secondElement.x0 + secondElement.width) || secondElement.x0 > (firstElement.x0 + firstElement.width) )
        return false;
    if (firstElement.y0 > (secondElement.y0 + secondElement.height) || secondElement.y0 > (firstElement.y0 + firstElement.height) )
        return false;
    return true;
}

window.addEventListener("keydown", (event) => {
    if (event.key === 'd') {
        user.leftMove = false;
        user.rightMove = true;
    } else if (event.key === 's') {
        user.rightMove = false;
        user.leftMove = true;
    } else if (event.key === "ArrowRight") {
        shield.leftMove = false;
        shield.rightMove = true;
    } else if (event.key === "ArrowLeft") {
        shield.rightMove = false;
        shield.leftMove = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.key === 'd') {
        user.leftMove = false;
        user.rightMove = false;
    } else if (event.key === 's') {
        user.rightMove = false;
        user.leftMove = false;
    } else if (event.key === "ArrowRight") {
        shield.leftMove = false;
        shield.rightMove = false;
    } else if (event.key === "ArrowLeft") {
        shield.rightMove = false;
        shield.leftMove = false;
    }
}); 


startGame.onclick = () => {
    if (!game) {
        game = true;
        startGame.classList.toggle("btnActive");
        resetGame.classList.toggle("btnActive");
        addLogo.classList.toggle("opened");
        startMessage.classList.toggle("opened");
        startSettings();
        drawElements();
        addEnemyBullet();
        runningGame = setInterval(() => {
            updateHorizontalPosition(enemy);
            updateUserPosition(user);
            updateUserPosition(shield);
            updateBulletPosition();
            drawElements();
            displayStatistic();
        }, 10);
    }
}

resetGame.onclick = () => {
    if (game) {
        clearInterval(runningGame);
        startGame.classList.toggle("btnActive");
        resetGame.classList.toggle("btnActive");
        addLogo.classList.toggle("opened");
        startMessage.classList.toggle("opened");
        game = false;
        clearCanvas();
    }
}