const settingBtn = document.getElementById('setting-btn'),
  timeEl = document.getElementById('time'),
  scoreEl = document.getElementById('score'),
  word = document.getElementById('word'),
  enteredTextInput = document.getElementById('entered-text'),
  settingForm = document.getElementById('setting-form'),
  difficultyStatus = document.getElementById('difficulty'),
  endGame = document.getElementById('end-game');

const wordsArr = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

let randomWord;
let score = 0;
let time = 10;

let difficulty =
  localStorage.getItem('savedDifficulty') !== null
    ? localStorage.getItem('savedDifficulty')
    : 'medium';

difficultyStatus.value = difficulty;

//---------------------------------------------------
enteredTextInput.focus();

const timer = setInterval(() => {
  updateTime();
}, 1000);

function showSetting() {
  settingForm.classList.toggle('hide');
}

//---------------------------------------------------
function getRandomWord() {
  return wordsArr[Math.floor(Math.random() * wordsArr.length)];
}
//-----------
function showRandomWord() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}
//-----------
function updateScore() {
  score++;
  scoreEl.innerText = score;
}
//-----------
function updateTime() {
  time--;
  timeEl.innerText = time + 's';

  if (time === 0) {
    clearInterval(timer);
    gameOver();
  }
}
//-----------
function gameOver() {
  endGame.innerHTML = `
    <h2>Time ran out</h2>
    <p>
        Your final score is
        <span id="final-score">${score}</span>
    </p>
    <button id="reload-btn" onclick="location.reload()">Reload</button>
  `;
  endGame.style.display = 'flex';
}

//---------------------------------------------------
showRandomWord();

enteredTextInput.addEventListener('input', (e) => {
  const enteredText = e.target.value;

  if (enteredText === randomWord) {
    showRandomWord();
    updateScore();
    e.target.value = '';

    if (difficulty === 'easy') {
      time += 7;
    } else if (difficulty === 'medium') {
      time += 5;
    } else {
      time += 2;
    }

    updateTime();
  }
});

settingForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('savedDifficulty', difficulty);
});
