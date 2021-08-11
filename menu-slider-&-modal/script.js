const toggleBtn = document.getElementById('toggle-btn');
const modalBtn = document.getElementById('modal-btn');
const closeBtn = document.getElementById('close-btn');
const modal = document.getElementById('modal-container');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});

modalBtn.addEventListener('click', () => {
  modal.classList.add('show-modal');
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show-modal');
});

modal.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.classList.remove('show-modal');
  }
});
