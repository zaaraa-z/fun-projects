const confirmBtn = document.getElementById('confirm-btn'),
  backBtn = document.getElementById('back-link'),
  inputArr = document.querySelectorAll('input'),
  nameInput = document.getElementById('name'),
  weightInput = document.getElementById('weight'),
  dynamicName = document.getElementById('dynamic-name'),
  plansContainer = document.getElementById('package-types'),
  plansArr = document.querySelectorAll('.package'),
  donePage = document.getElementById('done'),
  stepsContainer = document.getElementById('steps-container'),
  navSec = document.getElementById('nav');

let currentStep = 0;
showStep(currentStep);

//functions*****************************
//**************************************/
function showStep(i) {
  let steps = document.querySelectorAll('.steps');
  let navDots = document.querySelectorAll('.pagination .dot');

  steps[i].classList.add('active');
  navDots[i].classList.add('active');

  if (i == 0) {
    backBtn.style.display = 'none';
  } else {
    backBtn.style.display = 'block';
    if (i < steps.length - 1) {
      inputArr[i].focus();
    }
  }

  if (i == steps.length - 1) {
    confirmBtn.innerText = 'Complete';
  } else {
    confirmBtn.innerText = 'Continue';
  }
}

function weightInputValidation() {
  const wieghtValue = weightInput.value.trim();
  if (!isNaN(wieghtValue)) {
    return true;
  } else {
    weightInput.value = 'Only Number!';
    return false;
  }
}

//------------------
function continueBack(i) {
  let steps = document.querySelectorAll('.steps');
  if (i == 1 && !weightInputValidation()) return false;

  steps[currentStep].classList.remove('active');
  currentStep = currentStep + i;
  showStep(currentStep);
}

//------------------
function styleSelectedPackage(packageId, clickedEl) {
  //deactive other packages
  for (let i = 0; i < plansArr.length; i++) {
    plansArr[i].classList.remove('active');
    plansArr[i].style.backgroundColor = 'transparent';
  }

  //style active package
  clickedEl.classList.add('active');

  let packageColor =
    packageId === 'easy'
      ? '#7d7ef3'
      : packageId === 'medium'
      ? '#efbc67'
      : packageId === 'hard'
      ? '#ec506e'
      : packageId === 'extreme'
      ? '#01033a'
      : 'transparent';

  clickedEl.style.cssText = `background-color: ${packageColor}`;
}

//------------------
function storeData(packageId) {
  const name = nameInput.value.trim();
  const weight = weightInput.value.trim();

  if (name !== '') {
    localStorage.setItem('Name', name);
    dynamicName.innerText = localStorage.getItem('Name');
  }

  if (weight !== '') {
    if (!isNaN(weight)) {
      localStorage.setItem('Weight', weight);
    }
  }

  if (packageId) {
    localStorage.setItem(
      'Selected Workout Plan',
      packageId.charAt(0).toUpperCase() + packageId.slice(1)
    );
  }
}

//Events********************************
//**************************************/
inputArr.forEach(function (input) {
  input.addEventListener('input', (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() !== '') {
      confirmBtn.classList.add('active');
    } else {
      confirmBtn.classList.remove('active');
    }
  });
});

//------------------
confirmBtn.addEventListener('click', () => {
  if (confirmBtn.innerText === 'Complete') {
    stepsContainer.style.display = 'none';
    confirmBtn.classList.add('active');
    donePage.style.display = 'flex';
    navSec.style.display = 'none';
  } else {
    continueBack(1);
    confirmBtn.classList.remove('active');
  }
  storeData();
});

//------------------
backBtn.addEventListener('click', () => {
  let navDots = document.querySelectorAll('.pagination .dot');
  navDots[currentStep].classList.remove('active');
  continueBack(-1);
});

//------------------
plansContainer.addEventListener('click', (e) => {
  const clickedEl = e.target;
  if (clickedEl.classList.contains('package')) {
    confirmBtn.classList.add('active');

    const clickedPackageId = clickedEl.id;
    styleSelectedPackage(clickedPackageId, clickedEl);
    storeData(clickedPackageId);
  }
});
