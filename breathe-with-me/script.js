const container = document.getElementById('container'),
  text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

//---------------------------------------------
breatheAnimation();
//---------------------------------------------
function breatheAnimation() {
  text.innerText = 'Breathe in ...';
  container.className = 'breathe-in';

  setTimeout(() => {
    text.innerText = 'Hold ...';
    setTimeout(() => {
      text.innerText = 'Breathe out ...';
      container.className = 'breathe-out';
    }, holdTime);
  }, breatheTime);
}

setInterval(breatheAnimation, totalTime);
