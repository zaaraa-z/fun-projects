const balance = document.getElementById('balance'),
  moneyIncome = document.getElementById('money-income'),
  moneyExpense = document.getElementById('money-expense'),
  historyList = document.getElementById('history-list'),
  itemInput = document.getElementById('item'),
  amoutInput = document.getElementById('amount'),
  deleteBtn = document.getElementById('del-btn'),
  add = document.getElementById('add-form');

const initialTransactions = [
  { id: 1, text: 'book', amount: 300 },
  { id: 2, text: 'pencil', amount: -100 },
  { id: 3, text: 'flower', amount: -250 },
  { id: 4, text: 'apple', amount: 80 },
];

const transactionItems = initialTransactions;

//------------------------------------------------------
function addNewTransaction(e) {
  e.preventDefault();

  const enteredItem = itemInput.value.trim();
  const enteredAmount = +amoutInput.value.trim();

  if (enteredAmount === '' || enteredItem === '') {
    alert('"Item" & "Amount" is required!');
  } else {
    const newTransaction = {
      id: createID(),
      text: enteredItem,
      amount: enteredAmount,
    };

    transactionItems.push(newTransaction);

    displayTransactions(newTransaction);
    updateTotals();
    itemInput.value = '';
    amoutInput.value = '';
  }
}
//-----------------
function createID() {
  return Math.floor(Math.random() * 1000);
}
//-----------------
function displayTransactions(item) {
  //identify that it is expense (+) or income (-)
  const moneySign = item.amount > 0 ? '+' : '-';

  const liEl = document.createElement('li');
  liEl.classList.add(item.amount < 0 ? 'expense' : 'income');

  liEl.innerHTML = `
  ${item.text}<span>${moneySign} $${Math.abs(item.amount)}</span>
  <button id="del-btn" onclick="deleteTransaction()">x</button>
  </li>
  `;

  historyList.appendChild(liEl);
}
//-----------------
function updateTotals() {
  //get all amounts
  const amountsArr = transactionItems.map((x) => x.amount);

  console.log(amountsArr);

  //calculate expenses
  moneyExpense.innerText =
    '$' +
    Math.abs(
      amountsArr
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2)
    );

  //calculate incomes
  moneyIncome.innerText =
    '$' +
    amountsArr
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);

  //calculate total balance
  balance.innerText =
    '$' + amountsArr.reduce((acc, item) => (acc += item), 0).toFixed(2);
}
//-----------------
function deleteTransaction() {}
//------------------------------------------------------
add.addEventListener('submit', addNewTransaction);

function init() {
  historyList.innerHTML = '';
  transactionItems.forEach(displayTransactions);
  updateTotals();
}

init();
