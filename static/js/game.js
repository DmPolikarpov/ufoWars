//turns on the strict mode
"use strict";
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
let startMessage = document.getElementsByClassName("start-message")[0];
let playerScores = document.getElementById("score-value");
let totalBestResult = document.getElementById("bestResult-value");
let playerLives = document.getElementById("attempts-value");
let strikes = document.getElementById("hits-value");
//define sizes of canvas
canvas.width = 1500;
canvas.height = 1000;
//create variables for canvas properties
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
//import classes
import { UserSprite } from './userSprite.js';
import { EnemySprite } from './enemySprite.js';
import {Bullet} from './bullet.js';
//create instanses of classes for enemy space ship, user space ship and a shield
const enemy = new EnemySprite(684, 76, 132, 76, enemyUfo.src, canvas);
const user = new UserSprite(684, 833, 132, 76, userUfo.src, canvas);
const shield = new UserSprite(684, 734, 142, 19, shieldElement.src, canvas);
//create variables to control the game, store bullets, scores and lives
let gameProcess = false;
let runningGame;
let pause;
let allEnemyBullets = [];
let allUserBullets = [];
let objectsGroup = [];
let level;
let scores;
let lives;
let hits;

/******* functions to start, stop and reset a game *******/

//function that defines all initial values for scores, lives, hits, game level and runs the game
let game = () => {
        scores = 0;
        lives = 3;
        hits = 0;
        level = 1;
        user.setSpeed(3);
        shield.setSpeed(3);
        gameProcess = true;
        startSettings();
        runningGame = setInterval(() => {
            if (!pause) {
                enemy.updateHorizontalPosition();
                for (let i = 0; i < objectsGroup.length; i++) {
                    objectsGroup[i].updateHorizontalPosition();
                }
                user.updatePosition();
                shield.updatePosition();
                updateEnemyBulletPosition();
                updateUserBulletPosition();
                drawElements();
                displayStatistic();
            }
        }, 10);
    
}
//checks if the user is authorized, it so the function takes scores the current user collect, 
//compares them with the best score of that user and saves the best result
let saveScores = () => {
    if (sessionStorage.currentUser) {
        let currentUserEmail = JSON.parse(sessionStorage.getItem("currentUser")).email;
        let currentUser = JSON.parse(localStorage.getItem(currentUserEmail));
        if (currentUser.bestResult < scores) {
            currentUser.bestResult = scores;
        }
        localStorage.setItem(currentUserEmail, JSON.stringify(currentUser));
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
//function checks number of user lives and stops the game when user lost
let gameOver = () => {
    if(lives === 0) {
        saveScores();
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
        saveScores();
        setTimeout(stopGame, 5000);
    }
}
//listens click events on startGame button and runs function game()
startGame.onclick = () => {
    if(!gameProcess) {
        let counter = 3;
        let showAnimation;
        startGame.classList.toggle("btnActive");
        resetGame.classList.toggle("btnActive");
        addLogo.classList.toggle("opened");
        startMessage.classList.toggle("opened");
        showAnimation = setInterval(() => {
            if(counter > 0) {
                screenMessage(counter, 500);
                counter--;
            } else {
                clearInterval(showAnimation);
                game();
            }
        }, 1000);
    }
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
//function gets the best score
let getBestScore = () => {
    let bestScore = 0;
    for (let i = 0; i < localStorage.length; i++) {
        let email = localStorage.key(i);
        let bestUserResult = JSON.parse(localStorage.getItem(email)).bestResult;
        if (bestUserResult > bestScore) {
            bestScore = bestUserResult;
        }
    }
    return bestScore;
}
//function displays game statistic on the page
let displayStatistic = () => {
    playerScores.textContent = scores;
    playerLives.textContent = lifes;
    strikes.textContent = hits;
    totalBestResult.textContent = getBestScore();
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
                allEnemyBullets[i].setSpeed(1);
            };
            enemy.setSpeed(1);
            break;
        case 2:
            for (let i = 0; i < allEnemyBullets.length; i++) {
                allEnemyBullets[i].setSpeed(2);
            };
            enemy.setSpeed(2);
            break;
        case 3:
            for (let i = 0; i < allEnemyBullets.length; i++) {
                allEnemyBullets[i].setSpeed(3);
            };
            enemy.setSpeed(3);
            break;
        default:
            break;
    }
}

/******* functions that manage space ships, objects, collisions, scores */

//function creates new object instanses, add them into the objectGroup array
const addNewObject = () => {
    if (objectsGroup.length < 1 && level === 2) {
        let object = new EnemySprite(canvasWidth/2, canvasHeight/3, 174, 47, newObject.src, canvas);
        object.speed = 1;
        object.leftSwitch = false;
        object.rightSwitch = true;
        objectsGroup.push(object); 
    } else if (objectsGroup.length < 2 && level === 3) {
        let object = new EnemySprite(canvasWidth/3, canvasHeight/2, 174, 47, newObject.src, canvas);
        object.speed = 1.5;
        objectsGroup.push(object); 
    };
}


//function removes all objects from the screen
const removeAllObjects = () => {
    objectsGroup.splice(0, objectsGroup.length);
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
    if (allEnemyBullets.length < 3 && lives !== 0) {
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
        if (allEnemyBullets[i].y0 > canvas.height/3 && allEnemyBullets[i].nextBullet_Triggered == false) {
            addEnemyBullet();
            allEnemyBullets[i].nextBullet_Triggered = true
        }
        if (collideEvent(allEnemyBullets[i], shield)) {
            allEnemyBullets[i].x0 = enemy.x0 + enemy.width / 2;
            allEnemyBullets[i].y0 = enemy.y0 + enemy.height / 2;
            scores += 1;
        }
        if (collideEvent(allEnemyBullets[i], user)) {
            allEnemyBullets[i].x0 = enemy.x0 + enemy.width / 2;
            allEnemyBullets[i].y0 = enemy.y0 + enemy.height / 2;
            lives -= 1;
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


