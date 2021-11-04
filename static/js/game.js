//create variables for DOM elements
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
const playerScores = document.getElementById("score-value");
const playerLifes = document.getElementById("attempts-value");
//define sizes of canvas
canvas.width = 1500;
canvas.height = 1000;
//create variables for canvas properties
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
//create instanses of class Element for enemy space ship, user space ship and a shield
const enemy = new Element(684, 76, 132, 76, enemyUfo.src);
const user = new Element(684, 833, 132, 76, userUfo.src);
const shield = new Element(684, 734, 142, 19, shieldElement.src);
//create variables to control the game, store bullets, scores and lifes
let gameProcess = false;
let runningGame;
let pause;
let allEnemyBullets = [];
let scores;
let lifes;

//function that runs the game
let game = () => {
    if(!gameProcess) {
        scores = 0;
        lifes = 3;
        gameProcess = true;
        startGame.classList.toggle("btnActive");
        resetGame.classList.toggle("btnActive");
        addLogo.classList.toggle("opened");
        startMessage.classList.toggle("opened");
        startSettings();
        runningGame = setInterval(() => {
            if (!pause) {
                updateHorizontalPosition(enemy);
                updateUserPosition(user);
                updateUserPosition(shield);
                updateBulletPosition();
                drawElements();
                displayStatistic();
            }
        }, 10);
    } 
}
//function that stops the game
let stopGame = () => {
    if (gameProcess) {
        clearInterval(runningGame);
        startGame.classList.toggle("btnActive");
        resetGame.classList.toggle("btnActive");
        addLogo.classList.toggle("opened");
        startMessage.classList.toggle("opened");
        gameProcess = false;
        clearCanvas();
    }
}
//functionchecks number of user lifes and stops the game when user lost
let gameOver = () => {
    if(lifes === 0) {
        removeAllBullets();
        clearInterval(runningGame);
        clearCanvas();
        setTimeout(stopGame, 5000);
    }
}

//listens click events on startGame button and runs function game()
startGame.onclick = () => {
    game();
}
//listens click events on resetGame button and runs function stopGame()
resetGame.onclick = () => {
    stopGame();
}
//function contains all start settings and variable values
const startSettings = () => {
    enemy.x0 = 684;
    enemy.y0 = 76;
    user.x0 = 684;
    user.y0 = 833;
    shield.x0 = 684;
    shield.y0 = 734;
    pause = false;
    removeAllBullets();
    drawElements();
    setTimeout(addEnemyBullet, 3000 );
}
//function displays game statistic on the page
let displayStatistic = () => {
    playerScores.textContent = scores;
    playerLifes.textContent = lifes;
}
//function creates enemy bullet instanses, add them into the bullet array and draw them in the canvas
const addEnemyBullet = () => {
    if (allEnemyBullets.length < 2 && lifes !== 0) {
        let bullet = new Bullet(enemy.x0 + enemy.width / 2, enemy.y0 + enemy.height / 2, 10, 15, "#D40B27", ctx);
        bullet.draw();
        allEnemyBullets.push(bullet); 
    }
}
//function removes all bullets from the screen
const removeAllBullets = () => {
    allEnemyBullets.splice(0, allEnemyBullets.length);
}
//function draws all game elements on the screen
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
//completely clears the canvas 
const clearCanvas = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}
//function receives an element as an argument and updates its horisontal position 
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
//function updates enemy bullets positions
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
            pause = true;
            setTimeout(() => {
                startSettings();
                gameOver();
            }, 2000);
        }
    }
}
//function receives an element (user ship or shield) as an argument and updates its position 
const updateUserPosition = (element) => {
    if ((element.rightMove) & ((element.x0 + element.width) < canvasWidth)) {
        element.x0 += element.speed;
    }
    if ((element.leftMove) & (element.x0 > 0)) {
        element.x0 -= element.speed;
    }
}
//function checks collisions between two elements
// and returns true (if there is a collision) or false (if there is not any collision)
const collideEvent = (firstElement, secondElement) => {
    if (firstElement.x0 > (secondElement.x0 + secondElement.width) || secondElement.x0 > (firstElement.x0 + firstElement.width) )
        return false;
    if (firstElement.y0 > (secondElement.y0 + secondElement.height) || secondElement.y0 > (firstElement.y0 + firstElement.height) )
        return false;
    return true;
}
//listens and handles key down events
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
//listens and handles key up events
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

