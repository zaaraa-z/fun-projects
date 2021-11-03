const rules = document.getElementById('rules');
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

//------------Call Functions-----------------
drawBall();

//------------Event Listener-----------------
rulesBtn.addEventListener('click', () => {
  rules.className = 'show';
});

closeBtn.addEventListener('click', () => {
  rules.className = '';
});
