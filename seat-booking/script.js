const seatsContainer = document.querySelector('.seat-container');
const movieSelect = document.getElementById('movie');
const seats = document.querySelectorAll('.row .seat:not(.sold)');
const proceed = document.getElementsByTagName('button');
const seatsNumber = document.getElementById('number');
const totalPrice = document.getElementById('total');
let ticketPrice = +movieSelect.value;

//-----------------------------------------------------
function storeMovieData(movieIndex, movieTicketPrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMovieTicketPrice', movieTicketPrice);
}

function updateNumberAndPrice() {
  const selectedSeats = document.querySelectorAll('.row .selected');
  const selectedSeatsIndexArr = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  }); //tip

  localStorage.setItem(
    'selectedSeatsIndex',
    JSON.stringify(selectedSeatsIndexArr)
  ); //tip

  const selectedSeatsNumber = selectedSeats.length;
  seatsNumber.innerText = selectedSeatsNumber;
  totalPrice.innerText = selectedSeatsNumber * ticketPrice;
}
//-----------------------------------------------------

movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  updateNumberAndPrice();

  storeMovieData(e.target.selectedIndex, e.target.value); //tip
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
