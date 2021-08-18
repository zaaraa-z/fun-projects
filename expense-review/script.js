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
function displayTransactions(item) {
  //identify that it is expense (+) or income (-)
  const moneySign = item.amount > 0 ? '+' : '-';

  const liEl = document.createElement('li');
  liEl.classList.add(item.amount < 0 ? 'expense' : 'income');

  liEl.innerHTML = `
  ${item.text}<span>${moneySign}${Math.abs(item.amount)}</span>
  <button id="del-btn">x</button>
  </li>
  `;

  historyList.appendChild(liEl);
}

//------------------------------------------------------
// add.addEventListener('submit', addAndDisplayTransactions);
// deleteBtn.addEventListener('click', deleteTransaction);
