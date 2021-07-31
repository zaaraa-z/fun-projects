const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const emailConform = document.getElementById('email-conform');
const password = document.getElementById('password');
const passwordConform = document.getElementById('password-conform');

//----------------------------------
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  formControl.querySelector('small').innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    const label = input.nextElementSibling.innerText;
    if (input.value.trim() === '') {
      showError(input, `${label} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  const label = input.nextElementSibling.innerText;
  const inputLength = input.value.length;
  if (inputLength < min || inputLength > max) {
    showError(input, `${label} must have ${min} to ${max} characters`);
  } else {
    showSuccess(input);
  }
}

function checkConformation(input1, input2) {
  const label = input1.nextElementSibling.innerText;
  if (input1.value === input2.value && input2.value == '') {
    showError(input2, `${label} is required`);
  } else if (input1.value === input2.value && input2.value !== '') {
    showSuccess(input2);
  } else {
    showError(input2, `${label}s don't match`);
  }
}
//----------------------------------

form.addEventListener('submit', function (e) {
  checkRequired([username, email, emailConform, password, passwordConform]);
  e.preventDefault();
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkEmail(emailConform);
  checkConformation(password, passwordConform);
  checkConformation(email, emailConform);
});
