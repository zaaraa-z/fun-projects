const day = document.getElementById('day'),
  hour = document.getElementById('hour'),
  minute = document.getElementById('minute'),
  second = document.getElementById('second'),
  countdown = document.getElementById('countdown'),
  year = document.getElementById('year'),
  loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

//--------------------------------------------------
year.innerText = currentYear + 1;

function updateCountDown() {
  const currentTime = new Date();
  const remainingTime = newYearTime - currentTime; //in milisecond
  const remainingDay = Math.floor(remainingTime / 1000 / 60 / 60 / 24);
  const remainingHr = Math.floor((remainingTime / 1000 / 60 / 60) % 24);
  const remainingMin = Math.floor((remainingTime / 1000 / 60) % 60);
  const remainingSec = Math.floor((remainingTime / 1000) % 60);

  day.innerText = remainingDay;
  hour.innerText = remainingHr < 10 ? '0' + remainingHr : remainingHr;
  minute.innerText = remainingMin < 10 ? '0' + remainingMin : remainingMin;
  second.innerText = remainingSec < 10 ? '0' + remainingSec : remainingSec;
}

//show loading before countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = 'flex';
}, 1300);

//--------------------------------------------------
setInterval(updateCountDown, 1000);
