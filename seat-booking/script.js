const seatsContainer = document.querySelector('.seat-container');
const movieSelect = document.getElementById('movie');
const seat = document.querySelectorAll('.row .seat:not(.sold)');
const proceed = document.getElementsByTagName('button');
const seatsNumber = document.getElementById('number');
const totalPrice = document.getElementById('total');
let ticketPrice = +movieSelect.value;

//-----------------------------------------------------
function updateNumberAndPrice() {
  const selectedSeats = document.querySelectorAll('.row .selected');
  const selectedSeatsNumber = selectedSeats.length;
  seatsNumber.innerText = selectedSeatsNumber;
  totalPrice.innerText = selectedSeatsNumber * ticketPrice;
}
//-----------------------------------------------------
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  console.log(ticketPrice);
  updateNumberAndPrice();
});

//-----------------------------------------------------

seatsContainer.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('sold')
  ) {
    e.target.classList.toggle('selected');
  }

  updateNumberAndPrice();
});
