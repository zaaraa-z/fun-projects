const seatsContainer = document.querySelector('.seat-container');
const movieSelect = document.getElementById('movie');
const seats = document.querySelectorAll('.row .seat:not(.sold)');
const proceed = document.getElementsByTagName('button');
const seatsNumber = document.getElementById('number');
const totalPrice = document.getElementById('total');
//-----------------------------------------------------
populateUI(); //tip: if we write this function after next variable, by reloading the UI, it can not receive the stored movie ticket price and will operate on the default one ($10)
//-----------------------------------------------------
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

function populateUI() {
  const selectedSeatsIndex = JSON.parse(
    localStorage.getItem('selectedSeatsIndex')
  );

  if (selectedSeatsIndex !== null && selectedSeatsIndex.length > 0) {
    seats.forEach(function (seat, index) {
      if (selectedSeatsIndex.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//-----------------------------------------------------

movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  updateNumberAndPrice();

  storeMovieData(e.target.selectedIndex, e.target.value); //tip
});

seatsContainer.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('sold')
  ) {
    e.target.classList.toggle('selected');
  }

  updateNumberAndPrice();
});

//to initial seat number and total price by reloading (based on sored data)
updateNumberAndPrice(); //tip
