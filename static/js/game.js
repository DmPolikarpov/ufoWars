//create variables for DOM elements
const startGame = document.getElementById("btnNewGame");
const resetGame = document.getElementById("btnReset");
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const backgroundImage = document.getElementById("background-image");
const userUfo = document.getElementById("user-ufo");
const enemyUfo = document.getElementById("enemy-ufo");
const shieldElement = document.getElementById("shield");
const newObject = document.getElementById("object");
const addLogo = document.getElementsByClassName("addLogo")[0];
const startMessage = document.getElementsByClassName("start-message")[0];
const playerScores = document.getElementById("score-value");
const playerLifes = document.getElementById("attempts-value");
const strikes = document.getElementById("hits-value");
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
let allUserBullets = [];
let objectsGroup = [];
let level;
let scores;
let lifes;
let hits;

/******* functions to start, stop and reset a game *******/

//function that runs the game
let game = () => {
    if(!gameProcess) {
        scores = 0;
        lifes = 3;
        hits = 0;
        level = 1;
        gameProcess = true;
        startGame.classList.toggle("btnActive");
        resetGame.classList.toggle("btnActive");
        addLogo.classList.toggle("opened");
        startMessage.classList.toggle("opened");
        startSettings();
        runningGame = setInterval(() => {
            if (!pause) {
                updateHorizontalPosition(enemy);
                for (let i = 0; i < objectsGroup.length; i++) {
                    updateHorizontalPosition(objectsGroup[i]);
                }
                updateUserPosition(user);
                updateUserPosition(shield);
                updateEnemyBulletPosition();
                updateUserBulletPosition();
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
        gameProcess = false;
        removeAllObjects();
        clearCanvas();
        startGame.classList.toggle("btnActive");
        resetGame.classList.toggle("btnActive");
        addLogo.classList.toggle("opened");
        startMessage.classList.toggle("opened");
    }
}
//function takes a string of the message and font size as parameters and displays it on the screen
let screenMessage = (msg, size) => {
    clearCanvas();
    ctx.font = size + "px Brush Script MT";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText(msg, canvasWidth/2, canvasHeight/2);
}
//function checks number of user lifes and stops the game when user lost
let gameOver = () => {
    if(lifes === 0) {
        removeAllBullets();
        removeAllObjects();
        clearInterval(runningGame);
        screenMessage("GAME OVER", 150);
        setTimeout(stopGame, 5000);
    }
}
//funtion checks number of user strikes and stops the game when user won
let gameWon = () => {
    if(hits === 3) {
        removeAllBullets();
        removeAllObjects();
        clearInterval(runningGame);
        screenMessage("YOU WON", 170);
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
    enemy.x0 = randomX();
    enemy.y0 = 76;
    user.x0 = 684;
    user.y0 = 833;
    shield.x0 = 684;
    shield.y0 = 734;
    pause = false;
    removeAllBullets();
    drawElements();
    setTimeout(addEnemyBullet, 2000 );
}

/******* common game functions *******/

//function returns random number in a range between 0 and canvas.width
let randomX = () => {
    return Math.floor(Math.random() * (6 * canvasWidth / 7 ));
}
//function displays game statistic on the page
let displayStatistic = () => {
    playerScores.textContent = scores;
    playerLifes.textContent = lifes;
    strikes.textContent = hits;
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
    for (let i = 0; i < allUserBullets.length; i++) {
        allUserBullets[i].draw();
    }
    for (let i = 0; i < objectsGroup.length; i++) {
        ctx.drawImage(objectsGroup[i], objectsGroup[i].x0, objectsGroup[i].y0, objectsGroup[i].width, objectsGroup[i].height); 
    }
}
//completely clears the canvas 
const clearCanvas = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}
//function pauses the game after successful shoots and specify the settings
const strikeProcess = () => {
    pause = true;
    setTimeout(() => {
        startSettings();
        gameOver();
        gameWon();
    }, 2000);
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
    } else if (event.code === "Space") {
        addUserBullet();
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
//function pushes the game into the next level
let nextLevel = () => {
    switch (level) {
        case 1:
            for (let i = 0; i < allEnemyBullets.length; i++) {
                allEnemyBullets[i].speed = 1;
            };
            enemy.speed = 1;
            break;
        case 2:
            for (let i = 0; i < allEnemyBullets.length; i++) {
                allEnemyBullets[i].speed = 2;
            };
            enemy.speed = 2;
            break;
        case 3:
            for (let i = 0; i < allEnemyBullets.length; i++) {
                allEnemyBullets[i].speed = 3;
            };
            enemy.speed = 3;
            break;
        default:
            break;
    }
}

/******* functions that manage space ships, objects, collisions, scores */

//function creates new object instanses, add them into the objectGroup array
const addNewObject = () => {
    if (objectsGroup.length < 1 && level === 2) {
        let object = new Element(canvasWidth/2, canvasHeight/3, 174, 47, newObject.src);
        object.speed = 1;
        leftSwitch = false;
        rightSwitch = true;
        objectsGroup.push(object); 
    } else if (objectsGroup.length < 2 && level === 3) {
        let object = new Element(canvasWidth/3, canvasHeight/2, 174, 47, newObject.src);
        object.speed = 1.5;
        objectsGroup.push(object); 
    };
}


//function removes all objects from the screen
const removeAllObjects = () => {
    objectsGroup.splice(0, objectsGroup.length);
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

//function calculates scores after each successful strike
const addScores = () => {
    hits += 1;
    switch (hits) {
        case 1:
            scores += 20;
            break;
        case 2:
            scores += 50;
            break;
        case 3:
            scores += 100;
            break;
        default:
            break;
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

/******* functions to manage bullets *******/

//function creates enemy bullet instanses, add them into the enemy bullet array
const addEnemyBullet = () => {
    if (allEnemyBullets.length < 2 && lifes !== 0) {
        let bullet = new Bullet(enemy.x0 + enemy.width / 2, enemy.y0 + enemy.height / 2, 10, 15, "#D40B27", ctx);
        allEnemyBullets.push(bullet); 
    }
    nextLevel();
}
//function creates user bullet instanses, add them into the user bullet array 
const addUserBullet = () => {
    if (allUserBullets.length < 2 && hits !== 3) {
        let bullet = new Bullet(user.x0 + user.width / 2, user.y0 + user.height / 2, 10, 15, "#2cee25", ctx);
        allUserBullets.push(bullet);
    }
}
//function removes all bullets from the screen
const removeAllBullets = () => {
    allEnemyBullets.splice(0, allEnemyBullets.length);
    allUserBullets.splice(0, allUserBullets.length);
}
//function updates enemy bullets positions
const updateEnemyBulletPosition = () => {
    for (let i = 0; i < allEnemyBullets.length; i++) {
        if ((allEnemyBullets[i].y0 + allEnemyBullets[i].height) <= (canvasHeight - user.height / 3) ) {
            allEnemyBullets[i].y0 += allEnemyBullets[i].speed;
        } else {
            scores -= 15;
            strikeProcess();
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
            scores -= 10;
            strikeProcess();
        }
    }
}
//function updates positions of user bullets
const updateUserBulletPosition = () => {
    for (let i = 0; i < allUserBullets.length; i++) {
        if (collideEvent(allUserBullets[i], enemy)) {
            addScores();
            level += 1;
            addNewObject();
            strikeProcess();
        }
        userBulletAndObjectEvents(allUserBullets[i]); 
        if (allUserBullets[i]) {
            if (allUserBullets[i].y0 > 0) {
                allUserBullets[i].y0 -= allUserBullets[i].speed;
            } else {
                allUserBullets.splice(i, 1);
            }  
        }  
    }
}
//function takes user bullet and checks collisions between it and objects and process them
const userBulletAndObjectEvents = (bullet) => {
    for (let i = 0; i < objectsGroup.length; i++) {
        if (collideEvent(bullet, objectsGroup[i])) {
            allUserBullets.splice(i, 1);
        }
    }
}


