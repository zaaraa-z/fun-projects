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

//check the word and show the coresponding message
function checkWord(word) {
  const wordToNumber = +word;
  let guideMessage;

  if (Number.isNaN(wordToNumber)) {
    message.innerHTML = `<p>That's not a number...</p>`;
    return;
  }

  if (wordToNumber > 100 || wordToNumber < 1) {
    message.innerHTML = `<p>Between 1 & 100 please...</p>`;
    return;
  }

  if (wordToNumber > randomNumber) {
    message.innerHTML += `<p>Go lower!<p>`;
  } else if (wordToNumber < randomNumber) {
    message.innerHTML += `<p>Go higher!<p>`;
  } else {
    document.body.innerHTML = `
    <h1>
        Yes!!! You Guessed The Word! <br>
        <h3>It Was ${wordToNumber}</h3>
    </h1>
    <button class="play-again" id="play-again">Play Again</button>
    `;
  }
}

//----------------------event listeners----------------------
recognition.addEventListener('result', captureWord);
recognition.addEventListener('end', () => recognition.start());
