const settingBtn = document.getElementById('setting-btn'),
  timeEl = document.getElementById('time'),
  scoreEl = document.getElementById('score'),
  word = document.getElementById('word'),
  enteredTextInput = document.getElementById('entered-text'),
  settingForm = document.getElementById('setting-form'),
  difficultystatus = document.getElementById('difficulty'),
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

//---------------------------------------------------
showRandomWord();
enteredTextInput.focus();

function showSetting() {
  settingForm.classList.toggle('hide');
}

//---------------------------------------------------
function getRandomWord() {
  return wordsArr[Math.floor(Math.random() * wordsArr.length)];
}

function showRandomWord() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerText = score;
}

//---------------------------------------------------
enteredTextInput.addEventListener('input', (e) => {
  const enteredText = e.target.value;

  if (enteredText === randomWord) {
    showRandomWord();
    updateScore();

    e.target.value = '';
  }
});
