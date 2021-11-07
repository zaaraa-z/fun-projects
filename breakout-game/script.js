const rules = document.getElementById('rules');
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
let score = 0;
const brickColCount = 9;
const brickRowCount = 5;

//-----------------Canvas Drawings--------------------
//create & draw the ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 8,
  speed: 4,
  dx: 4,
  dy: -4,
};

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#9bd0bf';
  ctx.fill();
  ctx.closePath();
}

//create & draw the paddle
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#9bd0bf';
  ctx.fill();
  ctx.closePath();
}

//create score
function drawScore() {
  ctx.font = '17px Verdana, Geneva, Tahoma, sans-serif';
  ctx.fillText(`Score: ${score}`, canvas.width - 90, 25);
}

//create & draw the bricks
const brick = {
  w: 55,
  h: 15,
  padding: 8,
  offsetX: 70,
  offsetY: 60,
  visible: true,
};

const bricksArr = [];
for (let col = 0; col < brickColCount; col++) {
  bricksArr[col] = [];

  for (let row = 0; row < brickRowCount; row++) {
    const x = brick.offsetX + col * (brick.w + brick.padding);
    const y = brick.offsetY + row * (brick.h + brick.padding);

    bricksArr[col][row] = { x, y, ...brick };
  }
}

function drawBricks() {
  bricksArr.forEach((col) => {
    col.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#ca5164' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

//-----------------Canvas Animations--------------------
function movePaddle() {
  paddle.x += paddle.dx;

  //wall detection for paddle
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  //wall detection for ball
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  //paddle detection for ball
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  //bricks detection for ball
  bricksArr.forEach((col) => {
    col.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && //left brick side check
          ball.x + ball.size < brick.x + brick.w && //right brick side check
          ball.y + ball.size > brick.y && //top brick side check
          ball.y - ball.size < brick.y + brick.h //bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;

          //increase the score after hiting any brick
          increaseScore();
        }
      }
    });
  });
}

//---------------Score + winning & losing---------------
function increaseScore() {
  score++;

  if (score % (brickColCount * brickRowCount) === 0) {
    alert('You Won!');
    showAllBricks();
  }
}

function showAllBricks() {
  score = 0;
  bricksArr.forEach((col) => {
    col.forEach((brick) => (brick.visible = true));
  });
}

//-----------------------Draw All-----------------------
function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

//-------------Update Drawings & Animations-------------
function update() {
  movePaddle();
  moveBall();

  drawAll();

  //call built-in requestAnimationFrame method
  requestAnimationFrame(update);
}

update();

//-------------------------------------------------------
//-------------------Keyboard Funcs----------------------
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}

//-------------------Event Listener----------------------
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

rulesBtn.addEventListener('click', () => {
  rules.className = 'show';
});

closeBtn.addEventListener('click', () => {
  rules.className = '';
});
