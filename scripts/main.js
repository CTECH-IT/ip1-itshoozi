// Put your JavaScript here

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// set the level and the amount of gold coins collected to the start amount
let level = 1;
let coins = 0;

//set coin color to yellow
let coinColor = "#d4f229";

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

var audio = new Audio("Walking.mp3");

// level

function drawLevel() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Level " + level, 20, 20);
}

// amount of rings

function coinOne() {
  ctx.beginPath();
  ctx.arc(455, 25, 15, 0, Math.PI * 2);
  ctx.fillStyle = coinColor;
  ctx.fill();
  ctx.closePath();
}

function coinTwo() {
  ctx.beginPath();
  ctx.arc(415, 25, 15, 0, Math.PI * 2);
  ctx.fillStyle = coinColor;
  ctx.fill();
  ctx.closePath();
}

function coinThree() {
  ctx.beginPath();
  ctx.arc(375, 25, 15, 0, Math.PI * 2);
  ctx.fillStyle = coinColor;
  ctx.fill();
  ctx.closePath();
}

function drawRings() {
  if (coins == 1) {
    coinOne();
  } else if (coins == 2) {
    coinOne();
    coinTwo();
  } else if (coins == 3) {
    coinOne();
    coinTwo();
    coinThree();
  }
  if (coins == 3 && level == 3) {
    alert("You win, Congrats!");
    document.location.reload();
    clearInterval(interval);
  }
}

//define character

function drawCharacter() {
  ctx.beginPath();
  ctx.rect(characterX, characterY, characterWidth, characterHeight);
  ctx.fillStyle = "#20b0bd";
  ctx.fill();
  ctx.closePath();
}

let coinX = [140, 93, 375];
let coinY = [250, 59, 140];
let coinVisible = [true, true, true];
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
  } else if (level == 2) {
    ctx.beginPath();
    ctx.rect(20, 30, 50, 50);
    ctx.fillStyle = "#e1ff00";
    ctx.fill();
    ctx.closePath();
  } else if (level == 3) {
    ctx.beginPath();
    ctx.rect(20, 30, 50, 50);
    ctx.fillStyle = "#6ab0a9";
    ctx.fill();
    ctx.closePath();
  }
}

function collisionDetection() {
  for (let i = 0; i < 3; i++) {
    if (
      characterX > coinX[i] &&
      characterX < coinX[i] + 30 &&
      characterY > coinY[i] &&
      characterY < coinY[i] + 30 
      && coinVisible[i] == true
    ) {
      coinVisible[i] = false;
      coins ++;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawLevelMap();

  // movement
  if (rightPressed) {
    characterX += 2;
    audio.play();
    if (characterX + characterWidth > canvas.width) {
      characterX = canvas.width - characterWidth;
    }
  }
  if (leftPressed) {
    characterX -= 2;
    audio.play();
    if (characterX < 0) {
      characterX = 0;
    }
  }
  if (upPressed) {
    characterY -= 2;
    audio.play();

    if (characterY < 0) {
      characterY = 0;
    }
  }
  if (downPressed) {
    characterY += 2;
    audio.play();
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
    audio.pause();
  }

  drawCharacter();
  drawLevel();
  drawRings();

  collisionDetection();
}

// lets you cheat and gain levels faster :D
function cheat() {
  level++;
}

function coinCheat() {
  coins++;
}

// moving around

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

// character

// interval

let interval = setInterval(draw, 10);
