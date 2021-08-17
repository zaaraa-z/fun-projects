const searchInput = document.getElementById('search-input'),
  submitSearch = document.getElementById('submit-search'), //tip: submit event only works on form element
  randomBtn = document.getElementById('random-btn'),
  resultHeading = document.getElementById('result-heading'),
  resultMeals = document.getElementById('result-meals'),
  resultSinglemeal = document.getElementById('result-single-meal');

//------------------------------------
function searchMeals(e) {
  e.preventDefault();

  //clear previous searched items on screen
  resultMeals.innerHTML = '';
  resultHeading.innerHTML = '';

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

function findRandomMeal() {}

//------------------------------------
submitSearch.addEventListener('submit', searchMeals);
randomBtn.addEventListener('click', findRandomMeal);
