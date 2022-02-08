// Put your JavaScript here

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let level = 1;
let score = 0;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

var audio = new Audio("Walking.mp3");


// level

function drawLevel() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Level " + level, 20, 20);
}

// amount of rings

function drawRings() {
  ctx.beginPath();
  ctx.arc(455, 25, 15, 0, Math.PI * 2);
  ctx.fillStyle = "#6432a8";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(415, 25, 15, 0, Math.PI * 2);
  ctx.fillStyle = "#6432a8";
  ctx.fill();
  ctx.closePath();
}

//define character



let characterHeight = 50;
let characterWidth = 50;
let characterX = (canvas.width - characterWidth) / 2;
let characterY = (canvas.height - characterHeight) / 2;

function drawCharacter(){
  ctx.beginPath();
  ctx.rect(characterX, characterY, characterWidth, characterHeight);
  ctx.fillStyle = "#6432a8";
  ctx.fill();
  ctx.closePath();

}

// detects the level and shows the map for that level
function drawLevelMap() {
  if (level == 1) {
    ctx.beginPath();
    ctx.rect(20, 30, 50, 50);
    ctx.fillStyle = "#6432a8";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(300, 30, 50, 50);
    ctx.fillStyle = "#6432a8";
    ctx.fill();
    ctx.closePath();
  } else if (level == 2) {
    ctx.beginPath();
    ctx.rect(20, 30, 50, 50);
    ctx.fillStyle = "#e1ff00";
    ctx.fill();
    ctx.closePath();
  } else if ( level == 3){
    ctx.beginPath();
    ctx.rect(20, 30, 50, 50);
    ctx.fillStyle = "#6ab0a9";
    ctx.fill();
    ctx.closePath();  
  } else if ( level > 3) {
    alert("You win, Congrats!");
    document.location.reload();
    clearInterval(interval);
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
  if(leftPressed == false && rightPressed == false && upPressed == false && downPressed == false){
    audio.pause();
  }

  drawCharacter();
  drawLevel();
  drawRings()

}

// lets you cheat and gain levels faster :D
function cheat() {
  level++;
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
