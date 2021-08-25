const textBoxBtn = document.getElementById('text-box-btn'),
  textarea = document.querySelector('textarea'),
  closeBtn = document.getElementById('close-btn'),
  textBoxContainer = document.getElementById('text-box-container'),
  textBox = document.getElementById('text-box'),
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
data.forEach((item) => {
  const { image, text } = item;

  const sampleDiv = document.createElement('div');
  sampleDiv.classList.add('sample');
  sampleDiv.innerHTML = `
  <img src="${image}" alt="${text}"></img>
  <p>${text}</p>
  `;

  samplesContainer.appendChild(sampleDiv);
});

//-----------------------------------------------------------
closeBtn.addEventListener('click', () => {
  textBoxContainer.classList.toggle('show');
});

textBoxBtn.addEventListener('click', () => {
  textBoxContainer.classList.toggle('show');
});
