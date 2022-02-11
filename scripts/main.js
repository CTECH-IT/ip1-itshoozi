let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// set the level and the amount of gold coins collected to the start amount
let level = 1;
let coins = 0;

//sets the color of the coins and bombs for later
let coinColor = "rgb(253 224 71)";
let bombColor = "rgb(15 23 42)";

// sets the keypress to false at the start of the game
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

// define character information for later
let characterHeight = 20;
let characterWidth = 20;
let characterX = (canvas.width - characterWidth) / 2;
let characterY = (canvas.height - characterHeight) / 2;

// this calls the sound for walking
var walk = new Audio("Walking.mp3");

// this calls the coin beep sound
var coin = new Audio("coin.wav");


// shows the level in html
function drawLevel() {
    if (level < 4) {
        document.getElementById("level").innerHTML = "Level: " + level;
    }
}

// draws the posistion for coin #1
function coinOneShow(){
  document.getElementById("one").classList.remove("hidden");
}
function coinOneHide(){
  document.getElementById("one").classList.add("hidden");
}

// draws the posistion for coin #2
function coinTwoShow(){
  document.getElementById("two").classList.remove("hidden");
}
function coinTwoHide(){
  document.getElementById("two").classList.add("hidden");
}


// draws the posistion for coin #3
function coinThreeShow(){
  document.getElementById("three").classList.remove("hidden");
}
function coinThreeHide(){
  document.getElementById("three").classList.add("hidden");
}


// shows the amount of coins currently collected
function drawRings() {
    if (coins == 1) {
      coinOneShow();
    } else if (coins == 2) {
      coinOneShow();
      coinTwoShow();
    } else if (coins == 3) {
      coinOneShow();
      coinTwoShow();
      coinThreeShow();
    }
}

//draws the character

function drawCharacter() {
    ctx.beginPath();
    ctx.rect(characterX, characterY, characterWidth, characterHeight);
    ctx.fillStyle = "#20b0bd";
    ctx.fill();
    ctx.closePath();
}

let coinX = [140, 93, 375, 92, 392, 279, 140, 93, 375];
let coinY = [250, 59, 140, 150, 259, 78, 250, 59, 140];

let bombX = [92, 392, 375, 279, 375, 279];
let bombY = [250, 59, 78, 250, 59, 140];
let coinVisible = [true, true, true, true, true, true, true, true, true];
// detects the level and shows the map for that level
function drawLevelMap() {
    if (level == 1) {
        for (let i = 0; i < 3; i++) {
            if (coinVisible[i] == true) {
                ctx.beginPath();
                ctx.arc(coinX[i], coinY[i], 15, 0, Math.PI * 2);
                ctx.fillStyle = coinColor;
                ctx.fill();
                ctx.closePath();
            }
        }

        for (let i = 0; i < 2; i++) {
            ctx.beginPath();
            ctx.arc(bombX[i], bombY[i], 15, 0, Math.PI * 2);
            ctx.fillStyle = bombColor;
            ctx.fill();
            ctx.closePath();
        }
    } else if (level == 2) {
        for (let i = 3; i < 6; i++) {
            if (coinVisible[i] == true) {
                ctx.beginPath();
                ctx.arc(coinX[i], coinY[i], 15, 0, Math.PI * 2);
                ctx.fillStyle = coinColor;
                ctx.fill();
                ctx.closePath();
            }
        }

        for (let i = 3; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(bombX[i], bombY[i], 15, 0, Math.PI * 2);
            ctx.fillStyle = bombColor;
            ctx.fill();
            ctx.closePath();
        }
    } else if (level == 3) {
        for (let i = 6; i < 9; i++) {
            if (coinVisible[i] == true) {
                ctx.beginPath();
                ctx.arc(coinX[i], coinY[i], 15, 0, Math.PI * 2);
                ctx.fillStyle = coinColor;
                ctx.fill();
                ctx.closePath();
            }
        }

        for (let i = 5; i < 8; i++) {
            ctx.beginPath();
            ctx.arc(bombX[i], bombY[i], 15, 0, Math.PI * 2);
            ctx.fillStyle = bombColor;
            ctx.fill();
            ctx.closePath();
        }
    }
}

// detects if the player is touching the coins
function coinCollision() {
    if (level == 1) {
        for (let i = 0; i < 3; i++) {
            if (
                characterX > coinX[i] &&
                characterX < coinX[i] + 30 &&
                characterY > coinY[i] &&
                characterY < coinY[i] + 30 &&
                coinVisible[i] == true
            ) {
                coinVisible[i] = false;
                coins++;
                coin.play();
            }
        }
    } else if (level == 2) {
        for (let i = 3; i < 6; i++) {
            if (
                characterX > coinX[i] &&
                characterX < coinX[i] + 30 &&
                characterY > coinY[i] &&
                characterY < coinY[i] + 30 &&
                coinVisible[i] == true
            ) {
                coinVisible[i] = false;
                coins++;
                coin.play();
            }
        }
    } else if (level == 3) {
        for (let i = 6; i < 9; i++) {
            if (
                characterX > coinX[i] &&
                characterX < coinX[i] + 30 &&
                characterY > coinY[i] &&
                characterY < coinY[i] + 30 &&
                coinVisible[i] == true
            ) {
                coinVisible[i] = false;
                coins++;
                coin.play();
            }
        }
    }
}


// detects if the player is touching the bomb
function bombCollision() {
    if (level == 1) {
        for (let i = 0; i < 2; i++) {
            if (
                characterX > bombX[i] &&
                characterX < bombX[i] + 30 &&
                characterY > bombY[i] &&
                characterY < bombY[i] + 30
            ) {
                alert("bruh you suck at this game");
                document.location.reload();
                clearInterval(interval);
            }
        }
    } else if (level == 2) {
        for (let i = 3; i < 5; i++) {
            if (
                characterX > bombX[i] &&
                characterX < bombX[i] + 30 &&
                characterY > bombY[i] &&
                characterY < bombY[i] + 30
            ) {
                alert("bruh you suck at this game");
                document.location.reload();
                clearInterval(interval);
            }
        }
    } else if (level == 3) {
        for (let i = 5; i < 8; i++) {
            if (
                characterX > bombX[i] &&
                characterX < bombX[i] + 30 &&
                characterY > bombY[i] &&
                characterY < bombY[i] + 30
            ) {
                alert("bruh you suck at this game");
                document.location.reload();
                clearInterval(interval);
            }
        }
    }
}

function nextLevel() {
    if (coins == 3) {
        level++;
        coins = 0;
        coinOneHide();
        coinTwoHide();
        coinThreeHide();
    } else if (level > 3) {
        alert("You win, Congrats!");
        document.location.reload();
        clearInterval(interval);
    }
}

//this function is the main function that calls every other function, and makes sure that it is activated

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawLevelMap();

    // movement
    if (rightPressed) {
        characterX += 2;
        walk.play();
        if (characterX + characterWidth > canvas.width) {
            characterX = canvas.width - characterWidth;
        }
    }
    if (leftPressed) {
        characterX -= 2;
        walk.play();
        if (characterX < 0) {
            characterX = 0;
        }
    }
    if (upPressed) {
        characterY -= 2;
        walk.play();

        if (characterY < 0) {
            characterY = 0;
        }
    }
    if (downPressed) {
        characterY += 2;
        walk.play();
        if (characterY + characterHeight > canvas.height) {
            characterY = canvas.height - characterHeight;
        }
    }

    // this stops the walking sound from playing
    if (
        leftPressed == false &&
        rightPressed == false &&
        upPressed == false &&
        downPressed == false
    ) {
        walk.pause();
    }

    drawCharacter();
    nextLevel()
    drawLevel()
    drawRings();

    coinCollision();
    bombCollision()
}

// lets you cheat and gain levels faster :D
function coinCheat() {
    coins++;
}

// this function keeps track of if a key is let up and then sets it to false
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

// this function detects when a key is pressed down and sets active to true
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    } else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


let interval = setInterval(draw, 10);




// when you click start game it opens the modal
var tog = document.getElementById("tog");

tog.addEventListener("click", function() {

    document.getElementById("modal").classList.add("scale-100");
});


// if you have read this long, im so sorry