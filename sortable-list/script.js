const list = document.getElementById('sortable-list');
const checkBtn = document.getElementById('check-btn');

//the main list in correct order
const biggestStates = [
  'Alaska',
  'Texas',
  'California',
  'Montana',
  'New Mexico',
  'Arizona',
  'Nevada',
  'Colorado',
  'Oregon',
  'Wyoming',
];

//the displaying list in DOM
const listArr = [];
// let index;

//------------------------------------------------------
function createList() {
  [...biggestStates]
    .map((item) => ({ name: item, number: Math.random() }))
    .sort((a, b) => a.number - b.number)
    .map((item) => item.name)
    .forEach((USState, index) => {
      const liEl = document.createElement('li');
      liEl.setAttribute('data-index', index);

      liEl.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="state-name">${USState}</p>
            <i class="fas fa-arrows-alt"></i>
        </div>
    `;

      listArr.push(liEl);
      list.appendChild(liEl);
    });
}

//------------------------------------------------------
createList();
