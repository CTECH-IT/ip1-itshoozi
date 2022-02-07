// Put your JavaScript here

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let level = 1;
let score = 0;


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

// level
function drawLevel() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Level " + level, 20, 20);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawLevelMap();
  drawLevel();
}

let interval = setInterval(draw, 10);

// cheat

function cheat() {
  level++;
}
