const petal = document.querySelectorAll('.petal');
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

// correctLetters = selectedWord.split('');
let correctLetters = ['n', 'i', 't', 'g', 'r', 't', 'y', 'e'];
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
    }
  }
});

placeWord();
