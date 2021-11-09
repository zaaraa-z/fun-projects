const ulEl = document.getElementById('sortable-list');
const checkBtn = document.getElementById('check-btn');

//the main list in correct order
const biggestStatesArr = [
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

let dragStartLiIndex;

//the displaying list in the DOM
const listArr = [];

//------------------------------------------------------
function createList() {
  [...biggestStatesArr]
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
      ulEl.appendChild(liEl);

      addDragEventListeners();
    });
}

function addDragEventListeners() {
  const allLiEls = document.querySelectorAll('.sortable-list li');
  const allDraggables = document.querySelectorAll('.draggable');

  allDraggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  allLiEls.forEach((li) => {
    li.addEventListener('dragenter', dragEnter);
    li.addEventListener('dragover', dragOver);
    li.addEventListener('dragleave', dragLeave);
    li.addEventListener('drop', drop);
  });
}

function checkOrder() {
  listArr.forEach((item, index) => {
    const USState = item.querySelector('.draggable').innerText.trim();
    if (USState !== biggestStatesArr[index]) {
      item.classList.add('wrong');
    } else {
      item.classList.remove('wrong');
      item.classList.add('correct');
    }
  });
}

//drag and grop functions------------------------------------
function dragStart() {
  dragStartLiIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  this.classList.add('over');
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave() {
  this.classList.remove('over');
}

function drop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapListItems(dragStartLiIndex, dragEndIndex);

  this.classList.remove('over');
}

function swapListItems(start, end) {
  const draggableStart = listArr[start].querySelector('.draggable');
  const draggableEnd = listArr[end].querySelector('.draggable');

  listArr[start].appendChild(draggableEnd);
  listArr[end].appendChild(draggableStart);
}

//------------------------------------------------------
createList();

checkBtn.addEventListener('click', checkOrder);
