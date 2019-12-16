var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var score = 0;

var brickRowCount = 3, brickColumnCount = 5;
var brickWidth = 70, brickHeight = 18;
var brickpadding = 15;                      //間距
var brickOffsetTop = 30, brickOffsetLeft = 30;
var bricks = [];

for(var r=0; r<brickRowCount; r++) {     //初始化陣列
  bricks[r] = [];                           //加上二維
  for(var c=0; c<brickColumnCount; c++) {
    bricks[r][c] = { x:0, y:0, status: 1 };    //初始化座標, 是否消失
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  // console.log(e.key);
    if(e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
}

function drawBricks() {
  for(var r=0; r<brickRowCount; r++){
    for(var c=0; c<brickColumnCount; c++){
      if(bricks[r][c].status == 1){
        var brickX = brickOffsetLeft + (c * (brickpadding + brickWidth));   //定位每塊brick
        var brickY = brickOffsetTop + (r * (brickpadding + brickHeight));
        bricks[r][c].x = brickX;
        bricks[r][c].y = brickY;
        
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillstyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}

function collisionDetection() {
  for(var r=0; r<brickRowCount; r++) {
    for(var c=0; c<brickColumnCount; c++) {
      var b = bricks[r][c];
      if(b.status == 1) {
        if(x > b.x - ballRadius && x < b.x+brickWidth + ballRadius && y > b.y - ballRadius && y < b.y+brickHeight + ballRadius) {  //球跑進brick就反彈
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickColumnCount*brickRowCount) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "36px Arial";
            ctx.fillStyle = "#0095DD";
            ctx.textAlign = "center";
            ctx.fillText("congratulations!", canvas.width/2, canvas.height/2);
            cancelAnimationFrame(request);
          }
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  drawScore();
  collisionDetection();
  
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) { //左右反彈
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  if( y + dy < ballRadius) {
    dy = -dy;
  }else if(y + dy > canvas.height-ballRadius){
    if(x +dx >paddleX && x+dx<paddleX+paddleWidth){
      dy = -dy;
    }else{
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "36px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.textAlign = "center";
      ctx.fillText("game over!!",canvas.width/2, canvas.height/2);
      cancelAnimationFrame(request);
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  const request = requestAnimationFrame(draw);
  // console.log(request);
}
draw();
// const interval = setInterval(draw, 10);