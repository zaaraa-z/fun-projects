const message = document.getElementById('message');
const randomNumber = generateRandomNumber();

//--------------------define speech recognition----------------------
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();

//start recognition on load
recognition.start();

//--------------------------functions----------------------------
function generateRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}
console.log(randomNumber);

//capture user's word
function captureWord(e) {
  const word = e.results[0][0].transcript;

  showMessage(word);
  checkWord(word);
}

//show the word
function showMessage(word) {
  message.innerHTML = `
    <h2>Your Guess:</h2>
    <span id="guessed-number">${word}</span>
    `;
}

//----------------------event listeners----------------------
recognition.addEventListener('result', captureWord);
