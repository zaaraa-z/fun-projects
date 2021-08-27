const textBoxBtn = document.getElementById('text-box-btn'),
  textarea = document.querySelector('textarea'),
  closeBtn = document.getElementById('close-btn'),
  textBoxContainer = document.getElementById('text-box-container'),
  readBtn = document.getElementById('read-btn'),
  voiceOptions = document.getElementById('voice-options'),
  samplesContainer = document.getElementById('smaples-container');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

//-----------------------------------------------------------
//show images + related sentences------------
data.forEach((item) => {
  const { image, text } = item;

  const sample = document.createElement('div');
  sample.classList.add('sample');
  sample.innerHTML = `
  <img src="${image}" alt="${text}"></img>
  <p>${text}</p>
  `;
  samplesContainer.appendChild(sample);

  //click event on every sample
  sample.addEventListener('click', () => {
    setTextMessage(text);
    speakTextMessage();

    sample.classList.add('active');
    setTimeout(() => {
      sample.classList.remove('active');
    }, 1300);
  });
});

//speech functions--------------------------
const message = new SpeechSynthesisUtterance();

function setTextMessage(text) {
  message.text = text;
}

function speakTextMessage() {
  speechSynthesis.speak(message);
}

//get and show voices--------------------------
voices = [];

function populateVoiceArr() {
  voices = SpeechSynthesis.getVoices();
  voices.forEach((voice) => {
    const optionEl = document.createElement('option');
    optionEl.value = voice.name;
    optionEl.innerText = `${voice.name} ${voice.lang}`;
    voiceOptions.appendChild(optionEl);
  });
}

//-----------------------------------------------------------
speechSynthesis.addEventListener('voiceschanged', populateVoiceArr);

closeBtn.addEventListener('click', () => {
  textBoxContainer.classList.remove('show');
});

textBoxBtn.addEventListener('click', () => {
  textBoxContainer.classList.add('show');
});

populateVoiceArr();
