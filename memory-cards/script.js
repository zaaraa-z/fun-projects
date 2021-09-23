const newCardBtn = document.getElementById('new-btn');
const addCardBtn = document.getElementById('add-btn');
const deleteCardBtn = document.getElementById('del-btn');
const closeForm = document.getElementById('close-btn');
const nextCardBtn = document.getElementById('next-btn');
const prevCardBtn = document.getElementById('prev-btn');
const currentCardNav = document.getElementById('current-nav');
const cardsContainer = document.getElementById('cards-container');
const cardFrom = document.getElementById('new-card-form');
const question = document.getElementById('question');
const answer = document.getElementById('answer');

const cardsArr = [];
let currentActiveCard = 0;

const cardsDataArr = [
  {
    question: 'What is "Woman" in Persian?',
    answer: 'zan, زن',
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
newCardBtn.addEventListener('click', () => cardFrom.classList.add('show'));

closeForm.addEventListener('click', () => cardFrom.classList.remove('show'));
