const main = document.getElementById('main');
const addBtn = document.getElementById('add');
const sortBtn = document.getElementById('sort');
const filterBtn = document.getElementById('filter');
const doubleBtn = document.getElementById('double');
const calculateBtn = document.getElementById('calculate');
let data = [];

createRandomUserAndWealth();
createRandomUserAndWealth();
createRandomUserAndWealth();

//-------------------------------------------
async function createRandomUserAndWealth() {
  //tip
  const res = await fetch('https://randomuser.me/api');
  const fetchedData = await res.json();
  const fetchedUserArr = fetchedData.results[0];
  const newUser = {
    user: `${fetchedUserArr.name.first} ${fetchedUserArr.name.last}`,
    wealth: Math.floor(Math.random() * 1000000),
  };

  add(newUser);
}

//-------------------------------------------
function add(userObj) {
  data.push(userObj);
  updateList();
}

function sortList() {
  data.sort((a, b) => b.wealth - a.wealth);
  updateList();
}

function filterList() {
  data = data.filter((item) => item.wealth > 1000000);
  updateList();
}

function doubleWealth() {
  data = data.map((item) => {
    return { ...item, wealth: item.wealth * 2 };
  });
  updateList();
}

function calculateTotalWealth() {
  const total = data.reduce(
    (accumulator, item) => accumulator + item.wealth,
    0
  );

  const totalElement = document.createElement('div');
  totalElement.innerHTML = `<h5 id="result">Total wealth: <strong>${formatMoney(
    total
  )}</strong></h5>`;
  main.appendChild(totalElement);
}

//-------------------------------------------
function updateList(updatedData = data) {
  main.innerHTML = '<h3 id="title">People<strong> Wealth</strong></h3>';
  updatedData.forEach((item) => {
    const personElement = document.createElement('div');
    personElement.classList.add('person');
    personElement.innerHTML = `<strong>${item.user}</strong><span>${formatMoney(
      item.wealth
    )}</span>`;
    main.appendChild(personElement);
  });
}

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//event listeners ------------------------------
addBtn.addEventListener('click', createRandomUserAndWealth);
sortBtn.addEventListener('click', sortList);
filterBtn.addEventListener('click', filterList);
doubleBtn.addEventListener('click', doubleWealth);
calculateBtn.addEventListener('click', calculateTotalWealth);
