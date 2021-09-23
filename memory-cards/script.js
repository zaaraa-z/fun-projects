const newCardBtn = document.getElementById('new-btn');
const addCardBtn = document.getElementById('add-btn');
const deleteCardBtn = document.getElementById('del-btn');
const closeForm = document.getElementById('close-btn');
const nextCardBtn = document.getElementById('next-btn');
const prevCardBtn = document.getElementById('prev-btn');
const currentCardNav = document.getElementById('current-nav');
const cardsContainer = document.getElementById('cards-container');
const cardFrom = document.getElementById('new-card-form');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');

const cardsArr = [];
let currentActiveCard = 0;

const cardsDataArr = [
  {
    question: 'What is "Woman" in Persian?',
    answer: 'zan (زَن)',
  },
  {
    question: 'What is "Woman" in Turkish?',
    answer: 'Kadin',
  },
  {
    question: 'What is "Woman" in German?',
    answer: 'Frau',
  },
];
//----------------------------------------------------------
function createCards() {
  cardsDataArr.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p>
        </div>
    </div>
  `;

  //flip that particular card on click
  card.addEventListener('click', function () {
    card.classList.toggle('show-answer');
  });

  //update array
  cardsArr.push(card);

  //append card element
  cardsContainer.appendChild(card);

  //update current card nav
  updateCardsNav();
}

function deleteCard() {
  const activeCard = document.querySelector('.card.active');
  activeCard.classList.remove('active');
}

function updateCardsNav() {
  currentCardNav.innerText = `${currentActiveCard + 1} / ${cardsArr.length}`;
}

//----------------------------------------------------------
newCardBtn.addEventListener('click', () => cardFrom.classList.add('show'));

closeForm.addEventListener('click', () => cardFrom.classList.remove('show'));

deleteCardBtn.addEventListener('click', deleteCard);

// nextCardBtn.addEventListener('click', () =>  )

createCards();
