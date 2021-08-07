const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swapBtn = document.getElementById('swap');

//functions--------------------------------------------------
function calculateRate() {
  let currencyOneValue = currencyOne.value;
  let currencyTwovalue = currencyTwo.value;
  // let amountOneValue = amountOne.value;
  // let amountTwoValue = amountTwo.value;
  //tip: these two must be defined inside fetch()

  fetch(
    `https://v6.exchangerate-api.com/v6/ff233b782c59a9feccd76979/latest/${currencyOneValue}`
  )
    .then((res) => res.json())
    .then((data) => {
      const fetchedRate = data.conversion_rates[currencyTwovalue];
      rate.innerHTML = `1 ${currencyOneValue} = ${fetchedRate} ${currencyTwovalue}`;
      amountTwo.value = (amountOne.value * fetchedRate).toFixed(2);
    });
}

//event listeners----------------------------------------------
currencyOne.addEventListener('change', calculateRate);
currencyTwo.addEventListener('change', calculateRate);
amountOne.addEventListener('input', calculateRate);
amountTwo.addEventListener('input', calculateRate);

swapBtn.addEventListener('click', () => {
  const tempCurrencyOne = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = tempCurrencyOne;

  calculateRate();
});

calculateRate();
