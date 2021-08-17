const searchInput = document.getElementById('search-input'),
  submitSearch = document.getElementById('submit-search'), //tip: submit event only works on form element
  randomBtn = document.getElementById('random-btn'),
  resultHeading = document.getElementById('result-heading'),
  resultMeals = document.getElementById('result-meals'),
  resultSinglemeal = document.getElementById('result-single-meal');

//------------------------------------
//------------------------------------
function searchMeals(e) {
  e.preventDefault();

  //clear previous searched items on screen
  resultSinglemeal.innerHTML = '';
  resultMeals.innerHTML = '';

  let searchedWord = searchInput.value;
  if (searchedWord.trim()) {
    fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${searchedWord}
    `)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h3>Search Results for "${searchedWord}":</h3>`;

        if (data.meals === null) {
          resultHeading.innerHTML =
            '<h3>No meal has found! Please try again</h3>';
        } else {
          resultMeals.innerHTML = data.meals
            .map(
              (meal) =>
                `<div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-title" data-mealID="${meal.idMeal}">
                <h4>${meal.strMeal}</h4>
              </div>
            </div>`
            )
            .join(''); //tip
        }
      });

    searchInput.value = '';
  } else {
    alert('Please enter a search word');
  }
}

//------------------------------------
function RandomMeal() {
  resultMeals.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(`https://themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const randomMeal = data.meals[0];
      displayMealInfo(randomMeal);
    });
}

//------------------------------------
function getClickedMealID(e) {
  const clickedMealTitle = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-title');
    } else {
      return false;
    }
  });

  if (clickedMealTitle) {
    const clickedMealID = clickedMealTitle.getAttribute('data-mealID');
    fetchSingleMealInfoByID(clickedMealID);
  }
}

//------------------------------------
function fetchSingleMealInfoByID(mealID) {
  fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const mealInfoObj = data.meals[0];

      displayMealInfo(mealInfoObj);
      resultSinglemeal.scrollIntoView({ behavior: 'smooth' }); //tip: my idea!
    });
}

//------------------------------------
function displayMealInfo(meal) {
  const ingredientsArr = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredientsArr.push(
        `${meal[`strIngredient${i}`]}  - ${
          meal[`strMeasure${i}`] ? meal[`strMeasure${i}`] : ''
        }`
      );
    } else {
      break;
    }
  }

  resultSinglemeal.innerHTML = `
  <div class="single-meal">
    <h4>${meal.strMeal}</h4>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="single-meal-type-origin">
      ${
        meal.strCategory
          ? `<p>This Meal category is ${meal.strCategory}</p>`
          : ''
      }
      ${meal.strArea ? `<p>This Meal is ${meal.strArea}</p>` : ''}    
    </div>

    <div class="single-meal-main">
      <p>${meal.strInstructions}</p>
      <h4>Ingredients:</h4>
      <ul>
        ${ingredientsArr.map((ing) => `<li>${ing}</li>`).join('')}
      </ul>
    </div>
  </div>
  `;
}

//------------------------------------
//------------------------------------
submitSearch.addEventListener('submit', searchMeals);
randomBtn.addEventListener('click', RandomMeal);
resultMeals.addEventListener('click', getClickedMealID);
