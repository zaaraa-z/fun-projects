const petals = document.querySelectorAll('.petal');
const letters = document.getElementById('letters');
const wrong = document.getElementById('wrong');
const finalPopup = document.getElementById('final-popup-container');
const finalPopupMessage = document.getElementById('final-popup-message');

const playAgainBtn = document.getElementById('play-again');
const notification = document.getElementById('notification-container');

const wordArr = [
  'monitor',
  'program',
  'application',
  'keyboard',
  'javascript',
  'momentum',
  'appreciate',
  'hardworking',
  'application',
  'integrity',
  'litigation',
  'freckle',
];

let selectedWord = wordArr[Math.floor(Math.random() * wordArr.length)];

let correctLetters = [];
let wrongLetters = [];

function placeWord() {
  letters.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) =>
        `<span>${correctLetters.includes(letter) ? letter : ''}</span>`
    )
    .join('')}
  `;

  if (letters.innerText === selectedWord) {
    finalPopupMessage.innerText = 'You Saved My Flower!';
    finalPopup.style.display = 'flex';
  }
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const keyboardLetter = e.key;
    if (selectedWord.includes(keyboardLetter)) {
      if (!correctLetters.includes(keyboardLetter)) {
        correctLetters.push(keyboardLetter);
        placeWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(keyboardLetter)) {
        wrongLetters.push(keyboardLetter);
        updateWrongSec();
      } else {
        showNotification();
      }
    }
  }
});

//-----------------------------------------
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2500);
}

//-----------------------------------------
function updateWrongSec() {
  //show wrong letters
  if (wrongLetters.length > 0) {
    wrong.innerHTML = `<div class="wrong-info-container"><p>WRONG...</p>
    <span>${wrongLetters}</span></div>`;
  } else {
    wrong.innerHTML = '';
  }

  if (wrongLetters.length >= 7) {
    //check lost
    finalPopupMessage.innerText = "Oh! My Poor Flower...It's OK :)";
    finalPopup.style.display = 'flex';
  }

  //flower
  petals.forEach((petal, index) => {
    const currentWrongLettersNo = wrongLetters.length;
    if (index < currentWrongLettersNo) {
      petal.classList.add('drop');
    } else {
      petal.classList.remove('drop');
    }
  });
}

//-----------------------------------------
playAgainBtn.addEventListener('click', () => {
  finalPopup.style.display = 'none';

  wrongLetters.splice(0);
  correctLetters.splice(0);
  selectedWord = wordArr[Math.floor(Math.random() * wordArr.length)];
  // wrong.innerHTML = '';
  updateWrongSec();
  placeWord();
});

//-----------------------------------------
placeWord();
