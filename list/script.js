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

//functions ------------------------------
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

function doubleWealth() {
  data = data.map((item) => {
    return { ...item, wealth: item.wealth * 2 };
  });
  updateList();
}

function add(userObj) {
  data.push(userObj);
  updateList();
}

function updateList(updatedData = data) {
  main.innerHTML = '<h3 id="title">People<strong> Wealth</strong></h3>';
  updatedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.user}</strong><strong>${formatMoney(
      item.wealth
    )}</strong>`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return '$ ' + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//event listeners ------------------------------
addBtn.addEventListener('click', createRandomUserAndWealth);
doubleBtn.addEventListener('click', doubleWealth);
sortBtn.addEventListener('click', sort);
