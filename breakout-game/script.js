const rules = document.getElementById('rules');
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');
let score = 0;
const brickRowCount = 9;
const brickColCount = 5;

//-----------------Canvas--------------------
//create & draw the ball
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
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
for (let row = 0; row < brickRowCount; row++) {
  bricksArr[row] = [];

  for (let col = 0; col < brickColCount; col++) {
    const x = brick.offsetX + row * (brick.w + brick.padding);
    const y = brick.offsetY + col * (brick.h + brick.padding);

    bricksArr[row][col] = { x, y, ...brick };
  }
}

console.log(bricksArr);

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

//------------Call Functions-----------------
function drawAll() {
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

drawAll();

//------------Event Listener-----------------
rulesBtn.addEventListener('click', () => {
  rules.className = 'show';
});

closeBtn.addEventListener('click', () => {
  rules.className = '';
});
