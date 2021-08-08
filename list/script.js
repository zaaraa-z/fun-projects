const addBtn = document.getElementById('add');
const sortBtn = document.getElementById('sort');
const filterBtn = document.getElementById('filter');
const doubleBtn = document.getElementById('double');
const calculateBtn = document.getElementById('calculate');
let data = [];

//functions ------------------------------
function add(userObj) {
  data.push(userObj);
}

//fetch random user and add their wealth ------------------------------
async function createRandomUserAndWealth() {
  //tip
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const fetchedUserArr = data.results[0];
  const newUser = {
    user: `${fetchedUserArr.name.first} ${fetchedUserArr.name.last}`,
    wealth: Math.floor(Math.random() * 1000000),
  };

  add(newUser);
}

//event listeners ------------------------------
function showNewUsers() {
    data.forEach(element => {
        
    });
}